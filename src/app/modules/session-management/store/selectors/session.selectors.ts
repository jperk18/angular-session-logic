import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as SessionInformation from "../reducers/session.reducer";

export const sessionFeatureKey = 'session';

export interface State {
  session: SessionInformation.State;
}

//export const selectSessionFeature = (state: AppState) => state.session;
export const selectSessionFeature = createFeatureSelector<SessionInformation.State>(sessionFeatureKey);

export const selectIsUserLoggedIn = createSelector(
  selectSessionFeature,
  (state: SessionInformation.State) => state.loggedIn
);

export const selectTokenValue = createSelector(
  selectSessionFeature,
  (state: SessionInformation.State) => state.token?.value
);

export const selectTokenExpiryDateTime = createSelector(
  selectSessionFeature,
  (state: SessionInformation.State) => state.token?.expiryDateTime == undefined ? undefined : new Date(state.token.expiryDateTime)
);

export const selectExtendSessionStatus = createSelector(
  selectSessionFeature,
  (state: SessionInformation.State) => state.session.extendSessionBlockStatus
);

export const selectRefreshSessionStatus = createSelector(
  selectSessionFeature,
  (state: SessionInformation.State) => state.session.refreshTokenBlockStatus
);

export const selectLastRefreshTokenTime = createSelector(
  selectSessionFeature,
  (state: SessionInformation.State) => state.session?.latestRefreshTokenDateTime == undefined ? undefined : new Date(state.session.latestRefreshTokenDateTime)
);

export const selectCustomLoginResponse = <TServiceResponse>() => {
  return createSelector(
    selectSessionFeature,
    (state: SessionInformation.State) => state.customResponse.loginResponse == undefined ? undefined : <TServiceResponse>state.customResponse.loginResponse
  );
};

export const selectCustomRefreshResponse = <TServiceResponse>() => {
  return createSelector(
    selectSessionFeature,
    (state: SessionInformation.State) => state.customResponse.refreshResponse == undefined ? undefined : <TServiceResponse>state.customResponse.refreshResponse
  );
};

export const selectShowSessionPopup = createSelector(
  selectExtendSessionStatus,
  selectRefreshSessionStatus,
  (extendSessionStatus, refreshSessionStatus) => extendSessionStatus && !refreshSessionStatus
);
