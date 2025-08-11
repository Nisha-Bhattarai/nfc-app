import apiService from '../services/apiService';
import { CreateContactRequest } from '../models/CreateContactRequest';
import { Contact } from '../models/CreateContactRequest';

export interface CreateContactResponse {
    message: string;
    contact: Contact;
}

export interface ContactListResponse {
  message: string;
  contacts: Contact[];
}

export const createContactApi = async (
  contact: CreateContactRequest
): Promise<CreateContactResponse> => {
  const response = await apiService.post<CreateContactResponse>(
    'contact/create',
    contact
  );
  return response.data;
};

export const getContactsApi = async (): Promise<ContactListResponse> => {
  const response = await apiService.get<ContactListResponse>('contact/getContacts');
  return response.data;
};
