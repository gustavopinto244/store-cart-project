export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userId: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  error?: string;
}

export interface RegisterResponse {
  userId: string;
  message: string;
}

export interface LogoutResponse {}

export interface LogoutResponse {}
