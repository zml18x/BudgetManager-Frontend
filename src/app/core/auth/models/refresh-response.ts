export interface RefreshResponse {
  tokenType: string | null;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
}
