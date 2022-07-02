export interface RefreshTokenResponse<T> {
  token: string
  expiryDate: Date
  custom?: Date
}
