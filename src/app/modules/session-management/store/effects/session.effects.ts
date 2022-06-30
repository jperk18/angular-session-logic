import {Injectable} from '@angular/core';
import {Actions, concatLatestFrom, createEffect, ofType} from '@ngrx/effects';
import {filter, interval, of, switchMap, tap} from 'rxjs';
import {map, mergeMap, catchError} from 'rxjs/operators';
import * as moment from 'moment'
import * as SessionActions from '../actions/session.actions'
import * as fromSession from '../reducers/session.reducer';
import * as SessionSelectors from '../selectors/session.selectors'
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {AuthService} from "../../services";

@Injectable()
export class SessionEffects {
  constructor(
    private actions$: Actions,
    private store: Store<fromSession.State>,
    private authService: AuthService,
    private router: Router
  ) {
  }

  private readonly timerIntervalCheckInMilliseconds: number = 1000
  private readonly extendSessionRangeInMinutes: number = 5
  private readonly refreshBufferInSeconds: number = 15
  private readonly rootPath: string = '/'
  private readonly landingPathPath: string = '/home'

  sessionTimerForExtendSession$ = createEffect(() =>
    interval(this.timerIntervalCheckInMilliseconds).pipe(
      concatLatestFrom(action => this.store.select(SessionSelectors.selectIsUserLoggedIn)),
      concatLatestFrom(action => this.store.select(SessionSelectors.selectTokenExpiryDateTime)),
      concatLatestFrom(action => this.store.select(SessionSelectors.selectExtendSessionStatus)),
      concatLatestFrom(action => this.store.select(SessionSelectors.selectRefreshSessionStatus)),
      filter(([[[[timer, isLoggedIn], expiryDateTime], extendingSessionStatus], refreshingSessionStatus]) =>
        isLoggedIn && expiryDateTime != undefined && !refreshingSessionStatus
      ),
      mergeMap(([[[[timer, isLoggedIn], expiryDateTime], extendingSessionStatus], refreshingSessionStatus]) => {
        let now = moment();
        let startTimeForExpirySessionBuffer = moment(expiryDateTime).subtract(this.extendSessionRangeInMinutes, <moment.unitOfTime.DurationConstructor>"minute")
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
      switchMap((payload) =>
        this.authService.logIn({username: payload.username, password: payload.password}).pipe(
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
          map(res => this.router.navigate([this.rootPath])),
          catchError(() => this.router.navigate([this.rootPath]))
        )
      )
    ), {dispatch: false})

  loginAfterSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionActions.LoginSuccess),
      tap(() => this.router.navigate([this.landingPathPath]))
    ), {dispatch: false})

  refreshToken$ = createEffect(() => this.actions$.pipe(
      ofType(SessionActions.RefreshToken),
      concatLatestFrom(action => this.store.select(SessionSelectors.selectLastRefreshTokenTime)),
      concatLatestFrom(action => this.store.select(SessionSelectors.selectTokenValue)),
      mergeMap(([[action, lastRefreshTokenTime], token]) => of({action, lastRefreshTokenTime, token, now: moment()})),
      filter(({action, lastRefreshTokenTime, token, now}) =>
        lastRefreshTokenTime == undefined || now > moment(lastRefreshTokenTime).add(this.refreshBufferInSeconds, <moment.unitOfTime.DurationConstructor>"second")
      ),
      switchMap(({action, lastRefreshTokenTime, token, now}) =>
        this.authService.refreshToken({token: <string>token}).pipe(
          map(res => SessionActions.RefreshTokenSuccess({
            token: {value: res.token, expiryDateTime: res.expiryDate},
            latestRefreshTokenDateTime: now.toDate()
          })),
          catchError(() => of(SessionActions.RefreshTokenFailed()))
        )
      )
    )
  );
}
