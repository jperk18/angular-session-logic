import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import {delay, Observable, of} from 'rxjs';
import {AppLoginResponse, AuthServiceImp} from "./fake-config-and-service";
import * as moment from "moment";
import {
  LoginResponse,
  LogoutResponse,
  RefreshTokenResponse
} from "../modules/session-management";

@Injectable()
export class FakeBackendHttpInterceptor implements HttpInterceptor {
  private sessionDurationInMinutes: number = 30
  constructor(private authService: AuthServiceImp) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.handleRequests(request, next);
  }
  /**
   * Handle request's and support with mock data.
   * @param req
   * @param next
   */
  handleRequests(req: HttpRequest<any>, next: HttpHandler): any {
    const { url, method } = req

    if (url.startsWith(this.authService.logInUrl)) {
      let token = ""

      switch(req.body.credentials.username){
        case("jane"):
          token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkphbmUgU21pdGgiLCJpYXQiOjE1MTYyMzkwMjIsImNsYWltcyI6W3sicm9sZSI6Imd1ZXN0Iiwic2NvcGUiOiJjbGllbnRfbmFtZSJ9XX0.MYF_xbsx_-gWAVPcBjw_JthqOnQ2D7lmdYB_z5jEgZI"
          break;
        case('homelander'):
          token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkhvbWVsYW5kZXIiLCJpYXQiOjE1MTYyMzkwMjIsImNsYWltcyI6W3sicm9sZSI6ImFkbWluIiwic2NvcGUiOiJhbGwifV19.RhMEIGp3jbQQklbTDfJH0KPYlSMMsciJTk-gAIQViEQ"
          break;
        case('john'):
        default:
          token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJjbGFpbXMiOlt7InJvbGUiOiJ1c2VyIiwic2NvcGUiOiJyZWFkX29ubHlfYWxsIn1dfQ.IT2OA4yzzvDSSrFH3TcAqVnO1Mnfa_l0mbAW7DXEtEI"
          break;
      }

      let rep: LoginResponse<AppLoginResponse> = { 
        idToken: FakeBackendHttpInterceptor.makeRandom(50),
        accessToken: token,
        expiryDate: moment().add(this.sessionDurationInMinutes, <moment.unitOfTime.DurationConstructor>"minute").toDate()
      }
      return of(new HttpResponse({ status: 200, body: rep })).pipe(delay(500));
    }

    if (url.startsWith(this.authService.refreshTokenUrl)) {
      let rep: RefreshTokenResponse<string> = { token: FakeBackendHttpInterceptor.makeRandom(50), expiryDate: moment().add(this.sessionDurationInMinutes, <moment.unitOfTime.DurationConstructor>"minute").toDate(), custom: "refreshModelIfNeeded"}
      return of(new HttpResponse({ status: 200, body: rep })).pipe(delay(500));
    }

    if (url.startsWith(this.authService.logOutUrl)) {
      let rep: LogoutResponse = { logout: true }
      return of(new HttpResponse({ status: 200, body: rep })).pipe(delay(500));
    }

    return next.handle(req);
  }

  private static makeRandom(lengthOfCode: number, possible: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890,./;'[]\=-)(*&^%$#@!~`") {
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}
