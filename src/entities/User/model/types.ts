export interface User {
  id: number;
  firstName: string | null;
  secondName: string | null;
  email: string | null;
  password?: string | null;
}

export type RegisterUserData = Omit<User, 'id'>;

export interface LoginUser {
  email: string | null;
  password?: string | null;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}