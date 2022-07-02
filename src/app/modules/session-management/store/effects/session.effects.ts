import {Inject, Injectable} from '@angular/core';
import {Actions, concatLatestFrom, createEffect, ofType} from '@ngrx/effects';
import {filter, interval, of, switchMap, tap} from 'rxjs';
import {map, mergeMap, catchError} from 'rxjs/operators';
import * as moment from 'moment'
import * as SessionActions from '../actions/session.actions'
import * as fromSession from '../reducers/session.reducer';
import * as SessionSelectors from '../selectors/session.selectors'
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {SessionManagementConfigService, SessionAuthenticationService, AuthenticationService} from "../../services";
import {SessionManagementConfig} from "../../services/sessionManagementConfigService/models/session-management.config";

@Injectable()
export class SessionEffects {
  constructor(
    @Inject(SessionManagementConfigService) private config: SessionManagementConfig,
    @Inject(SessionAuthenticationService) private authService: AuthenticationService,
    private actions$: Actions,
    private store: Store<fromSession.State>,
    private router: Router
  ) {
  }

  sessionTimerForExtendSession$ = createEffect(() =>
    interval(this.config.timerIntervalCheckInMilliseconds).pipe(
      concatLatestFrom(action => this.store.select(SessionSelectors.selectIsUserLoggedIn)),
      concatLatestFrom(action => this.store.select(SessionSelectors.selectTokenExpiryDateTime)),
      concatLatestFrom(action => this.store.select(SessionSelectors.selectExtendSessionStatus)),
      concatLatestFrom(action => this.store.select(SessionSelectors.selectRefreshSessionStatus)),
      filter(([[[[timer, isLoggedIn], expiryDateTime], extendingSessionStatus], refreshingSessionStatus]) =>
        isLoggedIn && expiryDateTime != undefined && !refreshingSessionStatus
      ),
      mergeMap(([[[[timer, isLoggedIn], expiryDateTime], extendingSessionStatus], refreshingSessionStatus]) => {
        let now = moment();
        let startTimeForExpirySessionBuffer = moment(expiryDateTime).subtract(this.config.extendSessionRangeInMinutes, <moment.unitOfTime.DurationConstructor>"minute")
        let endTimeForExpirySessionBuffer = moment(expiryDateTime)
        return of({now, startTimeForExpirySessionBuffer, endTimeForExpirySessionBuffer, extendingSessionStatus})
      }),
      filter(({now, startTimeForExpirySessionBuffer, endTimeForExpirySessionBuffer, extendingSessionStatus}) =>
        now >= startTimeForExpirySessionBuffer && ((now >= endTimeForExpirySessionBuffer) || (!extendingSessionStatus && now < endTimeForExpirySessionBuffer))
      ),
      map(({now, startTimeForExpirySessionBuffer, endTimeForExpirySessionBuffer, extendingSessionStatus}) =>
        now >= endTimeForExpirySessionBuffer ? SessionActions.LogOut() : SessionActions.ExtendSession()
      )
    )
  );

  logOn$ = createEffect(() => this.actions$.pipe(
      ofType(SessionActions.Login),
      switchMap((action) =>
        this.authService.logIn(action).pipe(
          map(res => SessionActions.LoginSuccess({token: {value: res.token, expiryDateTime: res.expiryDate}})),
          catchError(() => of(SessionActions.LoginFailed))
        )
      )
    )
  );

  loginAfterFail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionActions.LogOut),
      concatLatestFrom(action => this.store.select(SessionSelectors.selectTokenValue)),
      switchMap(([action, token]) =>
        this.authService.logOut({token: <string>token}).pipe(
          map(res => this.router.navigate([this.config.loginOrRootPagePath])),
          catchError(() => this.router.navigate([this.config.loginOrRootPagePath]))
        )
      )
    ), {dispatch: false})

  loginAfterSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionActions.LoginSuccess),
      tap(() => this.router.navigate([this.config.landingPagePath]))
    ), {dispatch: false})

  refreshSession$ = createEffect(() => this.actions$.pipe(
      ofType(SessionActions.RefreshSession),
      concatLatestFrom(action => this.store.select(SessionSelectors.selectLastRefreshTokenTime)),
      concatLatestFrom(action => this.store.select(SessionSelectors.selectTokenValue)),
      concatLatestFrom(action => this.store.select(SessionSelectors.selectIsUserLoggedIn)),
      filter(([[[action, lastRefreshTokenTime], token], isUserLoggedIn]) => token != undefined && isUserLoggedIn),
      mergeMap(([[[action, lastRefreshTokenTime], token], isUserLoggedIn]) =>
        of({action, lastRefreshTokenTime, token, now: moment()})
      ),
      filter(({action, lastRefreshTokenTime, token, now}) =>
        action.forceSessionExtension || (lastRefreshTokenTime == undefined || now > moment(lastRefreshTokenTime).add(this.config.refreshBufferInSeconds, <moment.unitOfTime.DurationConstructor>"second"))
      ),
      map(({action, lastRefreshTokenTime, token, now}) =>
        SessionActions.RefreshToken({token: <string>token, now: now.toDate()})
      )
    )
  );

  refreshToken$ = createEffect(() => this.actions$.pipe(
      ofType(SessionActions.RefreshToken),
      switchMap(action =>
        this.authService.refreshToken({token: action.token}).pipe(
          map(res => SessionActions.RefreshTokenSuccess({
            token: {value: res.token, expiryDateTime: res.expiryDate},
            latestRefreshTokenDateTime: action.now
          })),
          catchError(() => of(SessionActions.RefreshTokenFailed()))
        )
      )
    )
  );
}
