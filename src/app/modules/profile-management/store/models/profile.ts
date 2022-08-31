export interface Profile {
  sub: string,
  name: string,
  iat: Date,
  claims: Claim[]
}

export interface Claim {
  role: string,
  scope: string
}

export enum Role {
  User,
  Admin,
  Guest
}