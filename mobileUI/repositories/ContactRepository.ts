import apiService from '../services/apiService';
import { CreateContactRequest } from '../models/CreateContactRequest';
import { Contact } from '../models/CreateContactRequest';

export interface CreateContactResponse {
    message: string;
    contact: Contact;
}

export interface ContactsResponse {
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

export const getContactsApi = async (): Promise<ContactsResponse> => {
  const response = await apiService.get<ContactsResponse>('contact/getContacts');
  return response.data;
};

export const updateContactApi = async (
  contactId: string,
  contact: CreateContactRequest
): Promise<CreateContactResponse> => {
  const response = await apiService.put<CreateContactResponse>(
    `contact/update/${contactId}`,
    contact
  );
  return response.data;
};

export const deleteContactApi = async (id: string) => {
  const response = await apiService.delete(`/contact/delete/${id}`);
  return response.data;
};
