import {
  LoginRequest, LoginResponse, LogoutRequest,
  LogoutResponse,
  RefreshTokenRequest, RefreshTokenResponse,
  AuthenticationService
} from "../modules/session-management";
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

export interface AppUserCredentials{
  username: string,
  password: string
}

export interface AppLoginResponse{
  greeting: string
}

export interface AppLoginError{
  messages: string[]
}

@Injectable()
export class AuthServiceImp implements AuthenticationService {
  private readonly baseUrl = "https://myauthservice"

  constructor(private httpClient: HttpClient) {
  }

  readonly logInUrl = `${this.baseUrl}/login`
  logIn(req: LoginRequest<AppUserCredentials>): Observable<LoginResponse<AppLoginResponse>> {
    //COULD DO EXTRA WORK AND MAPPING FOR THIS SERVICE ALL. REMEMBER TO NULL CHECK ON PROPERTY WITHIN THE REQUEST IF USING IT
    return this.httpClient.post<LoginResponse<AppLoginResponse>>(`${this.logInUrl}`, req)
  }

  readonly logOutUrl = `${this.baseUrl}/logout`
  logOut(req: LogoutRequest): Observable<LogoutResponse> {
    //COULD DO EXTRA WORK AND MAPPING FOR THIS SERVICE ALL. REMEMBER TO NULL CHECK ON PROPERTY WITHIN THE REQUEST IF USING IT
    return this.httpClient.post<LogoutResponse>(`${this.logOutUrl}`, req)
  }

  readonly refreshTokenUrl = `${this.baseUrl}/refreshtoken`
  refreshToken(req: RefreshTokenRequest): Observable<RefreshTokenResponse<string>> {
    //COULD DO EXTRA WORK AND MAPPING FOR THIS SERVICE ALL. REMEMBER TO NULL CHECK ON PROPERTY WITHIN THE REQUEST IF USING IT
    return this.httpClient.post<RefreshTokenResponse<string>>(`${this.refreshTokenUrl}`, req)
  }

  isUrlToAppendTokenOn(url: string): Observable<boolean> {
    let urls = [this.logInUrl]
    return of(!urls.some(e => e.startsWith(url)));
  }

  isUrlToRefreshTokenOn(url: string): Observable<boolean> {
    let urls = [this.logInUrl, this.logOutUrl, this.refreshTokenUrl]
    return of(!urls.some(e => e.startsWith(url)))
  }
}
