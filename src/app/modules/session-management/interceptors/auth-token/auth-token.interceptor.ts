import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {combineLatest, first, forkJoin, Observable, pipe} from 'rxjs';
import {AuthService} from "../../services";
import {select, Store} from "@ngrx/store";
import * as fromSession from "../../store/reducers/session.reducer";
import {selectIsUserLoggedIn, selectTokenValue} from "../../store/selectors/session.selectors";
import {mergeMap} from "rxjs/operators";

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private store: Store<fromSession.State>) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return combineLatest([this.store.select(selectIsUserLoggedIn), this.store.select(selectTokenValue)]).pipe(
      first(),
      mergeMap(([isUserLoggedIn, token]) => {
        if (isUserLoggedIn && !this.authService.startsWithAuthServiceUrl(request.url)) {
          request = request.clone({
            setHeaders: {Authorization: `Bearer ${token}`}
          });
        }

        return next.handle(request);
      }),
    )
  }
}
