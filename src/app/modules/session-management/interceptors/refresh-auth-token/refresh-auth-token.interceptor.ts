import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { first, Observable} from 'rxjs';
import {AuthService} from "../../services";
import {Store} from "@ngrx/store";
import * as fromSession from "../../store/reducers/session.reducer";
import {selectIsUserLoggedIn} from "../../store/selectors/session.selectors";
import {mergeMap} from "rxjs/operators";
import {RefreshToken} from "../../store/actions/session.actions";

@Injectable()
export class RefreshAuthTokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private store: Store<fromSession.State>) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.store.select(selectIsUserLoggedIn).pipe(
      first(),
      mergeMap(isUserLoggedIn => {
        if (isUserLoggedIn && !this.authService.startsWithAuthServiceUrl(request.url))
          this.store.dispatch(RefreshToken({ forceSessionExtension: false }));
        return next.handle(request);
      }),
    )
  }
}
