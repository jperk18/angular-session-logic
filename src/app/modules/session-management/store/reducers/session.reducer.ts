import {ActionReducer, createReducer, INIT, on, UPDATE} from '@ngrx/store';
import * as SessionsActions from '../actions/session.actions';
import {TokenInformation} from "../models/tokenInformation";

export interface State {
  loggedIn: boolean;
  token?: TokenInformation;
  session: {
    extendSessionBlockStatus: boolean
    refreshTokenBlockStatus: boolean
    latestRefreshTokenDateTime?: Date
  }
}

export const initialState: State = {
  loggedIn: false,
  token: undefined,
  session: {
    extendSessionBlockStatus: false,
    refreshTokenBlockStatus: false,
    latestRefreshTokenDateTime: undefined
  }
};

export const sessionReducer = createReducer(
  initialState,
  on(SessionsActions.LoginSuccess, (state, {token}) => ({...state, loggedIn: true, token: token})),
  on(SessionsActions.LoginFailed, () => initialState),
  on(SessionsActions.LogOut, () => initialState),
  on(SessionsActions.ExtendSession, (state) => ({
    ...state,
    session: { ...state.session, extendSessionBlockStatus: true }
  })),
  on(SessionsActions.RefreshToken, (state) => ({
    ...state,
    session: { ...state.session, refreshTokenBlockStatus: true }
  })),
  on(SessionsActions.RefreshTokenSuccess, (state, {token , latestRefreshTokenDateTime}) => ({
    ...state,
    token: token,
    session: { extendSessionBlockStatus: false, refreshTokenBlockStatus: false, latestRefreshTokenDateTime: latestRefreshTokenDateTime }
  })),
  on(SessionsActions.RefreshTokenFailed, (state) => ({
    ...state,
    session: { ...state.session, extendSessionBlockStatus: false, refreshTokenBlockStatus: false }
  }))
);

export const hydrationMetaReducer = (
  reducer: ActionReducer<State>
): ActionReducer<State> => {
  let storeKey = "session_state";
  return (state, action) => {
    if (action.type === INIT || action.type === UPDATE) {
      const storageValue = localStorage.getItem(storeKey);
      if (storageValue) {
        try {
          return JSON.parse(atob(storageValue));
        } catch {
          localStorage.removeItem(storeKey);
        }
      }
    }

    const nextState = reducer(state, action);
    localStorage.setItem(storeKey, btoa(JSON.stringify(nextState)));
    return nextState;
  };
};
