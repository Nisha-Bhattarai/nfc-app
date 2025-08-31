export interface ProfilesResponse {
  user: User;
  profiles: Profiles[];
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isVerified: boolean;
}


export interface Profiles {
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
  isRunningProfile: boolean; // radio button selected if this is true
  profileType: string; // PRIMARY or EVENT
}

export interface SocialMedia {
  platform: string;
  url: string;
}

export interface RelevantLink {
  title: string;
  url: string;
}