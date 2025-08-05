export interface SocialMedia {
  platform: string;
  url: string;
}

export interface RelevantLink {
  title: string;
  url: string;
}

export interface EventProfile {
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
}

