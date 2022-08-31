import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map} from 'rxjs/operators';
import * as SessionActions from '../../../session-management/store/actions/session.actions'
import * as ProfileActions from '../actions/profile.actions'
import jwtDecode from 'jwt-decode';

@Injectable()
export class ProfileEffects {
  constructor(
    private actions$: Actions,
  ) {
  }

  loginAfterSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionActions.LoginSuccess),
      map(x => ProfileActions.SetProfile({ profile: jwtDecode(x.token.value) }))
    ))

    loginAfterFail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionActions.LoginSuccess),
      ofType(SessionActions.LoginFailed),
      map(x => ProfileActions.ClearProfile())
    ))
}
