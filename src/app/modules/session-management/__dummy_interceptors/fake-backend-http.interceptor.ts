import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HTTP_INTERCEPTORS
} from '@angular/common/http';
import {delay, Observable, of} from 'rxjs';
import {AuthService} from "../services";
import {LoginApiResponse, LogoutApiResponse, RefreshTokenApiResponse} from "../services/auth/models";
import * as moment from "moment";

@Injectable()
export class FakeBackendHttpInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

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
      let rep: LoginApiResponse = { token: FakeBackendHttpInterceptor.makeRandom(50), expiryDate: moment().add(30, <moment.unitOfTime.DurationConstructor>"minute").toDate()}
      return of(new HttpResponse({ status: 200, body: rep })).pipe(delay(500));
    }

    if (url.startsWith(this.authService.refreshTokenUrl)) {
      let rep: RefreshTokenApiResponse = { token: FakeBackendHttpInterceptor.makeRandom(50), expiryDate: moment().add(30, <moment.unitOfTime.DurationConstructor>"minute").toDate()}
      return of(new HttpResponse({ status: 200, body: rep })).pipe(delay(500));
    }

    if (url.startsWith(this.authService.logOutUrl)) {
      let rep: LogoutApiResponse = { logout: true }
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
