export interface LoginResponse<T> {
  idToken: string
  accessToken: string
  expiryDate: Date
  custom?: T
}

