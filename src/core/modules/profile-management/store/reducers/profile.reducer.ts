import {ActionReducer, createReducer, INIT, on, UPDATE} from '@ngrx/store';
import * as ProfileActions from '../actions/profile.actions';
import {Profile} from "../models/profile";

export interface State {
  profile?: Profile;
}

export const initialState: State = {
  profile: undefined,
};

export const sessionReducer = createReducer(
  initialState,
  on(ProfileActions.SetProfile, (state, {profile}) => ({
    profile: profile
  })),
  on(ProfileActions.ClearProfile, (state) => (initialState))
);

export const hydrationMetaReducer = (
  reducer: ActionReducer<State>
): ActionReducer<State> => {
  let storeKey = "profile_state";
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
