import { CreateContactRequest } from '@/models/CreateContactRequest';
import { createContactApi, CreateContactResponse } from '../../repositories/ContactRepository';

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