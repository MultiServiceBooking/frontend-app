export enum UserRole {
  GUEST = 'GUEST',
  ADMIN = 'ADMIN',
  MARKETING_MANAGER = 'MARKETING_MANAGER'
}

export interface User {
    id: number;
    name: string;
    surname: string;
    email: string;
    password: string;
    phoneNumber: string;
    role: UserRole;
    hotelId: number;
  }
  