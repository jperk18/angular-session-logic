import {Injectable} from '@angular/core';
import {Actions, concatLatestFrom, createEffect, ofType} from '@ngrx/effects';
import {filter, interval, of} from 'rxjs';
import {map, mergeMap, catchError} from 'rxjs/operators';
import * as moment from 'moment'
import * as SessionActions from '../actions/session.actions'
import {TokenInformation} from "../models/tokenInformation";
import * as fromSession from '../reducers/session.reducer';
import * as SessionSelectors from '../selectors/session.selectors'
import {Store} from "@ngrx/store";

@Injectable()
export class SessionEffects {
  constructor(
    private actions$: Actions,
    private store: Store<fromSession.State>
  ) {
  }

  private readonly timerIntervalCheckInMilliseconds: number = 1000
  private readonly extendSessionRangeInMinutes: number = 5
  private readonly refreshBufferInMinutes: number = 1

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
      map(payload => {

        //This would be a service call but hardcoding for example.
        let token: TokenInformation = {
          value: "JWT Token Value",
          expiryDateTime: moment().add(30, <moment.unitOfTime.DurationConstructor>"minute").toDate(),
        }

        return SessionActions.LoginSuccess({token: token});
        //Failure for service
        //return SessionActions.LoginFailed()
      })
    )
  );

  refreshToken$ = createEffect(() => this.actions$.pipe(
      ofType(SessionActions.RefreshToken),
      concatLatestFrom(action => this.store.select(SessionSelectors.selectLastRefreshTokenTime)),
      mergeMap(([action, lastRefreshTokenTime]) => of({action, lastRefreshTokenTime, now: moment()})),
      filter(({action, lastRefreshTokenTime, now}) =>
        lastRefreshTokenTime == undefined || now > moment(lastRefreshTokenTime).add(this.refreshBufferInMinutes, <moment.unitOfTime.DurationConstructor>"minute")
      ),
      map(({action, lastRefreshTokenTime, now}) => {
        //This would be a service call but hardcoding for example.
        let token: TokenInformation = {
          value: "Refreshed JWT Token Value",
          expiryDateTime: now.add(30, <moment.unitOfTime.DurationConstructor>"minute").toDate(),
        }

        return SessionActions.RefreshTokenSuccess({token: token, latestRefreshTokenDateTime: now.toDate()})
        //Failure for service
        //return SessionActions.RefreshTokenFailed({latestRefreshTokenDateTime: now.toDate()})
      })
    )
  );
}
