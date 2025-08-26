export interface HomeAnalyticsResponse {
  user: User;
  profile: Profile;
  totalScans: number;
  uniqueScanners: number;
  topLocation: string;
  peakScanTime: string;
  scansOverTime: ScanOverTime[];
  dayWise: Record<string, number>;
  hourWise: Record<string, number>;
  dayHourWise: Record<string, number>;
  latestScans: LatestScan[];
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isVerified: boolean;
}

export interface Profile {
  _id: string;
  userId: string;
  profileName: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  company: string;
  location: string;
  bio: string;
  personalEmail: string;
  workEmail: string;
  personalPhone: string;
  workPhone: string;
  profilePicture: string;
  socialMedia: SocialMedia[];
  relevantLinks: RelevantLink[];
  photoGallery: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  isDeleted: boolean;
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

export interface ScanOverTime {
  date: string;   // YYYY-MM-DD
  count: number;
}

export interface LatestScan { 
  date: string;   // ISO string
  device: string;
  location: string;
  ipAddress: string;
}
