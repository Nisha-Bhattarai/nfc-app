import { Contact, CreateContactRequest } from '@/models/CreateContactRequest';
import { createContactApi, CreateContactResponse, getContactsApi, ContactsResponse, updateContactApi, deleteContactApi } from '../../repositories/ContactRepository';

export const createContact = async (
    contact: CreateContactRequest,
    onSuccess: (message: string) => void,
    onError: (message: string) => void) => {
    try {
        const data: CreateContactResponse = await createContactApi(contact);
        onSuccess(data.message);
    } catch (error: any) {
        const message = error?.response?.data?.message || 'Failed to create contact. Please try again.';
        onError(message);
    }
};

export const fetchContactLists = async (
  onSuccess: (res: Contact[]) => void,
  onError: (err: string) => void
) => {
  try {
    const response = await getContactsApi();
    onSuccess(response.contacts);
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      'Something went wrong. Please try again.';
    onError(message);
  }
};

export const updateContact = async (
    contactId: string,
    contact: CreateContactRequest,
    onSuccess: (message: string) => void,
    onError: (message: string) => void) => {
    try {
        const data: CreateContactResponse = await updateContactApi(contactId, contact);
        onSuccess(data.message);
    } catch (error: any) {
        const message = error?.response?.data?.message || 'Failed to create contact. Please try again.';
        onError(message);
    }
};

export const deleteContact = async (
  id: string,
  onSuccess: (res: any) => void,
  onError: (err: string) => void
) => {
  try {
    const response = await deleteContactApi(id);
    onSuccess(response);
  } catch (error: any) {
    console.log(error);
    const message =
      error?.response?.data?.message ||
      error?.message ||
      'Something went wrong. Please try again.';
    onError(message);
  }
};