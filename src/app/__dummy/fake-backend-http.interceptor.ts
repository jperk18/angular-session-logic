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
          token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSmFuZSBTbWl0aCIsImNsYWltcyI6W3sicm9sZSI6Imd1ZXN0Iiwic2NvcGUiOiJjbGllbnRfbmFtZSJ9XSwiZW1haWwiOiJqYW5lX3NtaXRoQHh4eHh4eC5jb20iLCJpYXQiOjE2NDc3NzMzOTIsInByZWZlcnJlZF91c2VybmFtZSI6ImphbmVfc21pdGgiLCJzdWIiOiIxMjM0NTY3ODkwIiwidXBkYXRlZF9hdCI6MTY0Nzc3MzM5MiwiZXhwIjoxNjQ3NzczMzkyfQ.U0ohhberXFKLRoW6wyw75U-Q_B3xm3HpVgRzT6bZqJ0"
          break;
        case('homelander'):
          token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSG9tZWxhbmRlciIsImNsYWltcyI6W3sicm9sZSI6ImFkbWluIiwic2NvcGUiOiJhbGwifV0sImVtYWlsIjoiaG9tZWxhbmRlckB4eHh4eHguY29tIiwiaWF0IjoxNjQ3NzczMzkyLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJob21lX2xhbmRlciIsInN1YiI6IjEyMzQ1Njc4OTAiLCJ1cGRhdGVkX2F0IjoxNjQ3NzczMzkyLCJleHAiOjE2NDc3NzMzOTJ9.cibzYPwe5nooBGLgBrvG0qUBbKubwNVGSphb0fVWBUI"
          break;
        case('john'):
        default:
          token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJjbGFpbXMiOlt7InJvbGUiOiJ1c2VyIiwic2NvcGUiOiJyZWFkX29ubHlfYWxsIn1dLCJlbWFpbCI6ImpvaG5fZG9lQHh4eHh4eC5jb20iLCJpYXQiOjE2NDc3NzMzOTIsInByZWZlcnJlZF91c2VybmFtZSI6ImpvaG5fZG9lIiwic3ViIjoiMTIzNDU2Nzg5MCIsInVwZGF0ZWRfYXQiOjE2NDc3NzMzOTIsImV4cCI6MTY0Nzc3MzM5Mn0.wBml4ktShIcDa_sZ3HUfcexcIlzfRSGcuw3nvj50-j4"
          break;
      }

      let rep: LoginResponse<AppLoginResponse> = { 
        id_token: FakeBackendHttpInterceptor.makeRandom(50),
        access_token: token,
        refresh_token: FakeBackendHttpInterceptor.makeRandom(50),
        token_type: 'Bearer',
        expires_in: moment().add(this.sessionDurationInMinutes, <moment.unitOfTime.DurationConstructor>"minute").toDate()
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
