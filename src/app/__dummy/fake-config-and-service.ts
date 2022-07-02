import {
  LoginRequest, LoginResponse, LogoutRequest,
  LogoutResponse,
  RefreshTokenRequest, RefreshTokenResponse,
  AuthenticationService
} from "../modules/session-management";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

export interface AppUserCredentials{
  username: string,
  password: string
}

@Injectable()
export class AuthServiceImp implements AuthenticationService {
  private readonly baseUrl = "https://myauthservice"

  constructor(private httpClient: HttpClient) {
  }

  readonly logInUrl = `${this.baseUrl}/login`
  logIn(req: LoginRequest<AppUserCredentials>): Observable<LoginResponse<null>> {
    return this.httpClient.post<LoginResponse<null>>(`${this.logInUrl}`, req)
  }

  readonly logOutUrl = `${this.baseUrl}/logout`
  logOut(req: LogoutRequest<string>): Observable<LogoutResponse<null>> {
    return this.httpClient.post<LogoutResponse<null>>(`${this.logOutUrl}`, req)
  }

  readonly refreshTokenUrl = `${this.baseUrl}/refreshtoken`
  refreshToken(req: RefreshTokenRequest<null>): Observable<RefreshTokenResponse<null>> {
    return this.httpClient.post<RefreshTokenResponse<null>>(`${this.refreshTokenUrl}`, req)
  }

  startsWithUrlsToNotRefreshTokenOn(url:string): boolean {
    let authUrls = [this.logInUrl, this.logOutUrl, this.refreshTokenUrl]
    return authUrls.some(e => e.startsWith(url))
  }
}
