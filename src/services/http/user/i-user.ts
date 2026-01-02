export interface IUser {
  name: string;
  password: string;
  email: string;
  role: string;
  preferredUsername: string;
  id?: number;
  createdAt?: Date;
  updatedAt?: Date | string;
}
