import {Inject, Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {combineLatest, first, Observable} from 'rxjs';
import {SessionAuthenticationService, AuthenticationService} from "../../services";
import {Store} from "@ngrx/store";
import * as fromSession from "../../store/reducers/session.reducer";
import {selectIsUserLoggedIn, selectTokenValue} from "../../store/selectors/session.selectors";
import {mergeMap} from "rxjs/operators";

@Injectable()
export class AppendAuthTokenInterceptor implements HttpInterceptor {

  constructor(@Inject(SessionAuthenticationService) private authService: AuthenticationService, private store: Store<fromSession.State>) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return combineLatest([this.store.select(selectIsUserLoggedIn), this.store.select(selectTokenValue)]).pipe(
      first(),
      mergeMap(([isUserLoggedIn, token]) => {
        if (isUserLoggedIn && !this.authService.startsWithUrlsToNotRefreshTokenOn(request.url)) {
          request = request.clone({
            setHeaders: {Authorization: `Bearer ${token}`}
          });
        }

        return next.handle(request);
      }),
    )
  }
}
