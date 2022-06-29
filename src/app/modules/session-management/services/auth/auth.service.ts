import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {
  LoginApiRequest,
  LoginApiResponse,
  LogoutApiRequest,
  LogoutApiResponse,
  RefreshTokenApiRequest,
  RefreshTokenApiResponse
} from "./models";

@Injectable()
export class AuthService {
  private readonly baseUrl = "https://myauthservice"

  constructor(private httpClient: HttpClient) {
  }

  readonly logInUrl = `${this.baseUrl}/login`
  logIn(req: LoginApiRequest): Observable<LoginApiResponse> {
    return this.httpClient.post<LoginApiResponse>(`${this.logInUrl}`, req)
  }

  readonly logOutUrl = `${this.baseUrl}/logout`
  logOut(req: LogoutApiRequest): Observable<LogoutApiResponse> {
    return this.httpClient.post<LogoutApiResponse>(`${this.logOutUrl}`, req)
  }

  readonly refreshTokenUrl = `${this.baseUrl}/refreshtoken`
  refreshToken(req: RefreshTokenApiRequest): Observable<RefreshTokenApiResponse> {
    return this.httpClient.post<RefreshTokenApiResponse>(`${this.refreshTokenUrl}`, req)
  }

  startsWithAuthServiceUrl(url:string): boolean {
    let authUrls = [this.logInUrl, this.logOutUrl, this.refreshTokenUrl]
    return authUrls.some(e => e.startsWith(url))
  }
}
