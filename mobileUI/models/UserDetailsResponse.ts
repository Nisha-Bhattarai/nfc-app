export interface UserDetailsResponse {
  user: User;
  hubspotConnection: string | null;
}

export interface User {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  profilePicture: string
}