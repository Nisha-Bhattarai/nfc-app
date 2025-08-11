export interface CreateContactRequest {
    name: string;
    email: string;
    phone: string;
    note?: string;
    image?: string;
}

export interface Contact {
    _id: string;
  name: string;
  email: string;
  phone: string;
  note?: string;
  avatar?: string;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}