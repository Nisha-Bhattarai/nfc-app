
export interface SocialMediaLink {
  platform: string;
  url: string;
}

export interface RelevantLink {
  title: string;
  url: string;
}

export interface PrimaryProfile {
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
  socialMedia: SocialMediaLink[];
  relevantLinks: RelevantLink[];
  photoGallery: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  isDeleted: boolean;
}
