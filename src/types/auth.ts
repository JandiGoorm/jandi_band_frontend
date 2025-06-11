export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  isRegistered: boolean;
}

export interface UserInfo {
  id: number;
  profilePhoto: string;
  nickname: string;
  position: string;
  university: string;
}

export interface SignUpData {
  position: string;
  university: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}
