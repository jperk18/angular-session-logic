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
      let rep: LoginResponse<AppLoginResponse> = { token: FakeBackendHttpInterceptor.makeRandom(50), expiryDate: moment().add(this.sessionDurationInMinutes, <moment.unitOfTime.DurationConstructor>"minute").toDate(), custom: <AppLoginResponse>{ greeting: "Hello User!"}}
      return of(new HttpResponse({ status: 200, body: rep })).pipe(delay(500));
    }

    if (url.startsWith(this.authService.refreshTokenUrl)) {
      let rep: RefreshTokenResponse<null> = { token: FakeBackendHttpInterceptor.makeRandom(50), expiryDate: moment().add(this.sessionDurationInMinutes, <moment.unitOfTime.DurationConstructor>"minute").toDate()}
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
