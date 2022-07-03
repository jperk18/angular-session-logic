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
export type RefreshTokenResponseObj = any;

export interface AuthenticationService {
  logIn(req: LoginRequest<LoginRequestObj>): Observable<LoginResponse<LoginResponseObj>>

  logOut(req: LogoutRequest): Observable<LogoutResponse>

  refreshToken(req: RefreshTokenRequest): Observable<RefreshTokenResponse<RefreshTokenResponseObj>>

  startsWithUrlsToNotRefreshTokenOn(url: string): boolean
}

export const SessionAuthenticationService = new InjectionToken<AuthenticationService>("AuthenticationService")
