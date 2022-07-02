export interface LoginResponse<T> {
  token: string
  expiryDate: Date
  custom?: T
}

