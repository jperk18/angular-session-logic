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
  readonly client_id: string,
  readonly client_secret: string,

  logIn(req: LoginRequest<LoginRequestObj>): Observable<LoginResponse<LoginResponseObj>>
  logOut(req: LogoutRequest): Observable<LogoutResponse>
  refreshToken(req: RefreshTokenRequest): Observable<RefreshTokenResponse<RefreshTokenResponseObj>>
  isUrlToRefreshTokenOn(url: string): Observable<boolean>
  isUrlToAppendTokenOn(url: string): Observable<boolean>
}

export const SessionAuthenticationService = new InjectionToken<AuthenticationService>("AuthenticationService")
