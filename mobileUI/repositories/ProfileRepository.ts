// repositories/ProfileRepository.ts
import apiService from '../services/apiService';

export interface SocialMedia {
  platform: string;
  url: string;
}

export interface RelevantLink {
  title: string;
  url: string;
}

export interface PrimaryProfileRequest {
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
  profilePicture: string; // URL of profile picture
  photoGallery: string[]; // URLs of additional photos
  socialMedia: SocialMedia[];
  relevantLinks: RelevantLink[];
}

export const createPrimaryProfileApi = async (payload: PrimaryProfileRequest) => {
  const response = await apiService.post('/profile/primary', payload);
  return response.data;
};
