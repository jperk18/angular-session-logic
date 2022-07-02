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

export interface AuthenticationService {
  logIn(req: LoginRequest<any>): Observable<LoginResponse<any>>

  logOut(req: LogoutRequest<any>): Observable<LogoutResponse<any>>

  refreshToken(req: RefreshTokenRequest<any>): Observable<RefreshTokenResponse<any>>

  startsWithUrlsToNotRefreshTokenOn(url: string): boolean
}

export const SessionAuthenticationService = new InjectionToken<AuthenticationService>("AuthenticationService")
