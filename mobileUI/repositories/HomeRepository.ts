import apiService from '../services/apiService';
import { HomeAnalyticsResponse } from '../models/HomeAnalyticsResponse';
import { authEmitter } from "../utils/authEmitter";
import { HomeEventAnalyticsResponse, ScanOverTime, DetailedAnalytics } from '../models/HomeEventAnalyticsResponse';
import { ProfilesResponse } from '../models/ProfilesResponse';
import { getSession, getRunningProfile, saveSession, setRunningProfile } from '../utils/sessionStorage'; // <-- adjust path
import { UserInfoModel } from '../models/UserInfoModel';

export const getUserInfoFromSession = async (): Promise<UserInfoModel | null> => {
  try {
    const session = await getSession();
    if (!session?.user?.id) {
            authEmitter.emit("logout");

      throw new Error('User not found in session');
    }
    const runningProfile = await getRunningProfile();
    const userInfo: UserInfoModel = {
      userId: session.user.id,
      firstName: session.user.firstName,
      runningProfileId: runningProfile.runningProfileId,
      profileType: runningProfile.runningProfileType,
      profilePicture: runningProfile.runningProfilePicture ?? '',
    };
    return userInfo;
  } catch (err) {
    console.error('Failed to get user info from session', err);
    return null;
  }
};

export const getHomeAnalytics = async (): Promise<HomeAnalyticsResponse> => {
  try {
    const session = await getSession();
    if (!session?.user?.id) {
      throw new Error("User not found in session");
    }

    const userId = session.user.id;
    const response = await apiService.get<HomeAnalyticsResponse>(
      `primaryProfile/getHomeAnalytics/${userId}`
    );

    const data = response.data;

    const scanDates: string[] = data.scanDates || [];

    const dayWise: Record<string, number> = {};
    const hourWise: Record<string, number> = {};
    const dayHourWise: Record<string, number> = {};

    for (const dateStr of scanDates) {
      const date = new Date(dateStr);

      const day = date.toLocaleDateString("en-US", { weekday: "long" });
      const hour = date.getHours().toString().padStart(2, "0");

      dayWise[day] = (dayWise[day] || 0) + 1;

      hourWise[hour] = (hourWise[hour] || 0) + 1;

      const key = `${day}-${hour}`;
      dayHourWise[key] = (dayHourWise[key] || 0) + 1;
    }
    let peakScanTime = data.peakScanTime;
    if (peakScanTime) {
      const [startStr, endStr] = peakScanTime.split(" - ");
      const start = new Date(startStr);
      const end = new Date(endStr);

      const formatLocalHM = (d: Date) =>
        `${d.getHours().toString().padStart(2, "0")}:${d
          .getMinutes()
          .toString()
          .padStart(2, "0")}`;

      peakScanTime = `${formatLocalHM(start)} - ${formatLocalHM(end)}`;
    }

    const result: HomeAnalyticsResponse = {
      user: data.user,
      profile: data.profile,
      scanDates: data.scanDates,
      totalScans: data.totalScans,
      uniqueScanners: data.uniqueScanners,
      topLocation: data.topLocation,
      peakScanTime: peakScanTime,
      scansOverTime: data.scansOverTime,
      latestScans: data.latestScans,
      dayWise: dayWise,
      hourWise: hourWise,
      dayHourWise: dayHourWise,
    };
    console.log("Result ====> \n\n\n", JSON.stringify(result))
    return result;
  } catch (err) {
    console.error("Failed to fetch home analytics", err);
    throw err;
  }
};

export const getEventHomeAnalytics = async (
  comparingProfileId?: string
): Promise<HomeEventAnalyticsResponse> => {
  try {
    const session = await getSession();
    if (!session?.user?.id) {
      throw new Error("User not found in session");
    }

    const userId = session.user.id;

    const response = await apiService.get<HomeEventAnalyticsResponse>(
      `eventProfile/getHomeAnalytics/${userId}${comparingProfileId
        ? `?comparingProfileId=${encodeURIComponent(comparingProfileId)}`
        : ""
      }`
    );

    const data = response.data;

    console.log("Main data ============> \n\n\n", JSON.stringify(data));

    const formatted: HomeEventAnalyticsResponse = {
      comparingProfiles: data.comparingProfiles,
      user: data.user,
      recentProfiles: data.recentProfiles,
      analytics: data.analytics.map(a => ({
        ...a,
        peakScanTime: formatPeakScanTimeLocal(a.peakScanTime),
      })),
      detailedAnalytics: data.detailedAnalytics,
      scanOverTimesData: buildLocalScanOverTimesData(data.detailedAnalytics),
    };

    return formatted;
  } catch (err) {
    console.error("Failed to fetch event home analytics", err);
    throw err;
  }
};

function formatPeakScanTimeLocal(peakScanTime: any | null): string | null {
  if (!peakScanTime) return null;

  const startDate = new Date(peakScanTime.min).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  const endDate = new Date(peakScanTime.max).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

console.log("startDate ===>\n\n\n\n", startDate)
  return `${startDate} - ${endDate}`;
}

function buildLocalScanOverTimesData(detailedAnalytics: DetailedAnalytics[]): ScanOverTime[] {
  return detailedAnalytics.map(profileData => {
    // initialize 24 hours with value=0
    const hours = Array.from({ length: 24 }, (_, hour) => ({
      hour,
      label: `${hour % 12 === 0 ? 12 : hour % 12} ${hour < 12 ? "AM" : "PM"}`,
      value: 0,
    }));

    // group scans by local hour
    profileData.scans.forEach(scan => {
      const date = new Date(scan.createdAt);
      const localHour = date.getHours();
      hours[localHour].value += 1;
    });

    return {
      title: profileData.profile,
      data: hours,
    };
  });
}




export const getProfiles = async (): Promise<ProfilesResponse> => {
  try {
    const response = await apiService.get<ProfilesResponse>("profile/all");
    console.log("Get all Profiles =======> \n \n\n", JSON.stringify(response.data));
    return response.data;
  } catch (err) {
    console.error('Failed to fetch profiles', err);
    throw err;
  }
};

interface SetRunningProfileRequest {
  profileId: string;
  profileType: string;
}

interface SetRunningProfileResponse {
  message: string;
  success: boolean;
}

export const setRunningProfileApi = async (profileId: string, profileType: string, profilePicture: string): Promise<SetRunningProfileResponse> => {
  try {
    const payload: SetRunningProfileRequest = { profileId: profileId, profileType: profileType };
    const response = await apiService.put<SetRunningProfileResponse>("profile/updateRunningProfile", payload);
    console.log("Running profilePic:============> \n \n \n", profilePicture)
    await setRunningProfile(profileId, profileType, profilePicture)
    return response.data;
  } catch (err) {
    console.error("Failed to set running profile", err);
    throw err;
  }
};