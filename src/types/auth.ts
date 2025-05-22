export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  isRegistered: boolean;
}

export interface UserInfo {
  id: number;
  email: string;
  name: string;
  position: string;
  university: string;
}

export interface SignUpData {
  position: string;
  university: string;
}
