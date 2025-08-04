// repositories/ProfileRepository.ts
import apiService from '../services/apiService';
import {PrimaryProfile} from '../models/PrimaryProfileListResponse'

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


export interface GetPrimaryProfilesResponse {
  message: string;
  profiles: PrimaryProfile[];
}

export const getPrimaryProfilesApi = async (): Promise<PrimaryProfile[]> => {
  const response = await apiService.get<GetPrimaryProfilesResponse>('/profile/primary');
  return response.data.profiles;
};

export interface EventProfileRequest {
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
}

export const createEventProfileApi = async (payload: EventProfileRequest) => {
  const response = await apiService.post('/profile/event', payload);
  return response.data;
};