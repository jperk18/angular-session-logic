import {
  LoginRequest, LoginResponse, LogoutRequest,
  LogoutResponse,
  RefreshTokenRequest, RefreshTokenResponse,
  AuthenticationService
} from "@core/session-management";
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

  //This should be driven from angular configuration. However this demo 
  private readonly authConfig = {
    issuer: "https://xxxxxxxxxx/oidc/2",
    redirectUri: "https://xxxxxxxxxx",
    clientId: "xxxxxx-xxxxx-xxxx-xxxx-xxxxxxxxxxxx",
    clientSecret: "xxxxxx-xxxxx-xxxx-xxxx-xxxxxxxxxxxx",
    responseType: "id_token token",
    scope: "profile",
    showDebugInformtion: true
  }

  constructor(private httpClient: HttpClient) {
    
  }
  
  readonly logInUrl = `${this.authConfig.issuer}/login`
  logIn(req: LoginRequest<AppUserCredentials>): Observable<LoginResponse<AppLoginResponse>> {
    //COULD DO EXTRA WORK AND MAPPING FOR THIS SERVICE ALL. REMEMBER TO NULL CHECK ON PROPERTY WITHIN THE REQUEST IF USING IT
    return this.httpClient.post<LoginResponse<AppLoginResponse>>(`${this.logInUrl}`, { ...req, 
      grant_type: "login",
      client_id: this.authConfig.clientId,
      client_secret: this.authConfig.clientSecret})
  }

  readonly logOutUrl = `${this.authConfig.issuer}/logout`
  logOut(req: LogoutRequest): Observable<LogoutResponse> {
    //COULD DO EXTRA WORK AND MAPPING FOR THIS SERVICE ALL. REMEMBER TO NULL CHECK ON PROPERTY WITHIN THE REQUEST IF USING IT
    return this.httpClient.post<LogoutResponse>(`${this.logOutUrl}`, req)
  }

  readonly refreshTokenUrl = `${this.authConfig.issuer}/refreshtoken`
  refreshToken(req: RefreshTokenRequest): Observable<RefreshTokenResponse<string>> {
    //COULD DO EXTRA WORK AND MAPPING FOR THIS SERVICE ALL. REMEMBER TO NULL CHECK ON PROPERTY WITHIN THE REQUEST IF USING IT
    return this.httpClient.post<RefreshTokenResponse<string>>(`${this.refreshTokenUrl}`, {...req, 
      grant_type: 'refresh_token',
      client_id: this.authConfig.clientId,
      client_secret: this.authConfig.clientSecret})
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
