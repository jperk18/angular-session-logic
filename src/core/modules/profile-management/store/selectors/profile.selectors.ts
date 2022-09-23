import {createFeatureSelector, createSelector} from '@ngrx/store';
import { Role } from '../models/profile';
import * as ProfileInformation from "../reducers/profile.reducer";

export const profileFeatureKey = 'profile';

export interface State {
  session: ProfileInformation.State;
}

export const selectProfileFeature = createFeatureSelector<ProfileInformation.State>(profileFeatureKey);

export const selectProfile = createSelector(
  selectProfileFeature,
  (state: ProfileInformation.State) => state.profile
);

export const selectProfileFullName = createSelector(
  selectProfileFeature,
  (state: ProfileInformation.State) => state.profile?.name
);

export const selectProfileUserName = createSelector(
  selectProfileFeature,
  (state: ProfileInformation.State) => state.profile?.preferred_username
);

export const selectProfileHasRole = (role: Role) => {
  return createSelector(
    selectProfileFeature,
    (state: ProfileInformation.State) => {
      let userRole = ""
      switch (role){
        case Role.Guest:
          userRole = "guest"
          break;
        case Role.Admin:
          userRole = "admin"
          break;
        default:
          userRole = "user"
          break;
      }
      let i = state.profile?.claims.find(x => x.role == userRole)
      return i != undefined;
    }
  );
};