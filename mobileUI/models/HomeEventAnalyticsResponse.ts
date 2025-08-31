export interface HomeEventAnalyticsResponse {
  comparingProfiles: ComparingProfile[];
  user: User;
  recentProfiles: ComparingProfile[];
  analytics: Analytics[];
  scanOverTimesData: ScanOverTime[];
  detailedAnalytics: DetailedAnalytics[];
}

export interface ComparingProfile {
  _id: string;
  userId: string;
  eventProfileName: string;
  eventName: string;
  startDate: string;
  endDate: string;
  location: string;
  aboutEvent: string;
  personalEmail: string;
  workEmail: string;
  personalPhone: string;
  workPhone: string;
  socialMedia: SocialMedia[];
  relevantLinks: RelevantLink[];
  skills: string[];
  certifications: string[];
  photoGallery: string[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  isRunningProfile: boolean;
}

export interface SocialMedia {
  platform: string;
  url: string;
}

export interface RelevantLink {
  title: string;
  url: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isVerified: boolean;
}

export interface Analytics {
  profile: ComparingProfile;
  totalScans: number;
  peakScanTime: string | null;
}

export interface ScanOverTime {
  title: string;
  data: {
    hour: string;
    label: string;
    value: number;
  }[];
}

export interface DetailedAnalytics {
  profile: string;
  scans: Scan[];
}

export interface Scan {
  deviceId: string;
  device: string;
  location: string;
  latitude: number;
  longitude: number;
  ipAddress: string;
  createdAt: string;
}
