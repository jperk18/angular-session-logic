import {Observable} from "rxjs";
import {
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  LogoutResponse,
  RefreshTokenRequest,
  RefreshTokenResponse
} from "./models";
import {InjectionToken} from "@angular/core";

export type LoginRequestObj = any;
export type LoginResponseObj = any;
export type LogoutRequestObj = any;
export type LogoutResponseObj = any;
export type RefreshTokenRequestObj = any;
export type RefreshTokenResponseObj = any;

export interface AuthenticationService {
  logIn(req: LoginRequest<LoginRequestObj>): Observable<LoginResponse<LoginResponseObj>>

  logOut(req: LogoutRequest<LogoutRequestObj>): Observable<LogoutResponse<LogoutResponseObj>>

  refreshToken(req: RefreshTokenRequest<RefreshTokenRequestObj>): Observable<RefreshTokenResponse<RefreshTokenResponseObj>>

  startsWithUrlsToNotRefreshTokenOn(url: string): boolean
}

export const SessionAuthenticationService = new InjectionToken<AuthenticationService>("AuthenticationService")
