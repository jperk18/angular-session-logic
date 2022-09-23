export interface Profile {
  name: string,
  at_hash: string,
  aud: string,
  claims: Claim[]
  email: string,
  exp: Date,
  family_name: string,
  given_name: string,
  iat: Date,
  iss: string,
  nonce: string,
  preferred_username: string,
  sub: string,
  s_hash: string,
  sid: string,
  updated_at: Date
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