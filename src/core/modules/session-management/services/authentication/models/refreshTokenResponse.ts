export interface RefreshTokenResponse<T> {
  access_token: string
  refresh_token: string
  token_type: string
  expires_in: Date
  custom?: T
}
