import {Inject, Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { first, Observable} from 'rxjs';
import {Store} from "@ngrx/store";
import * as fromSession from "../../store/reducers/session.reducer";
import {selectIsUserLoggedIn} from "../../store/selectors/session.selectors";
import {mergeMap} from "rxjs/operators";
import {RefreshSession} from "../../store/actions/session.actions";
import {SessionAuthenticationService, AuthenticationService} from "../../services";

@Injectable()
export class RefreshAuthTokenInterceptor implements HttpInterceptor {

  constructor(@Inject(SessionAuthenticationService) private authService: AuthenticationService, private store: Store<fromSession.State>) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.store.select(selectIsUserLoggedIn).pipe(
      first(),
      mergeMap(isUserLoggedIn => {
        if (isUserLoggedIn && !this.authService.startsWithUrlsToNotRefreshTokenOn(request.url))
          this.store.dispatch(RefreshSession({ forceSessionExtension: false }));
        return next.handle(request);
      }),
    )
  }
}
