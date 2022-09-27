import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as SessionInformation from "../reducers/session.reducer";
import {ServiceStateResponse} from "../models/serviceStateResponse";

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

export const selectIdTokenValue = createSelector(
  selectSessionFeature,
  (state: SessionInformation.State) => state.tokens?.id
);

export const selectAccessTokenValue = createSelector(
  selectSessionFeature,
  (state: SessionInformation.State) => state.tokens?.access
);

export const selectRefreshTokenValue = createSelector(
  selectSessionFeature,
  (state: SessionInformation.State) => state.tokens?.refresh
);

export const selectTokenExpiryDateTime = createSelector(
  selectSessionFeature,
  (state: SessionInformation.State) => state.tokenExpiry == undefined ? undefined : new Date(state.tokenExpiry)
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

export const selectCustomLoginResponse = <TServiceResponse, TErrorResponse>() => {
  return createSelector(
    selectSessionFeature,
    (state: SessionInformation.State) => state.customResponse.loginResponse == undefined ? undefined : <ServiceStateResponse<TServiceResponse, TErrorResponse>>state.customResponse.loginResponse
  );
};

export const selectCustomRefreshResponse = <TServiceResponse, TErrorResponse>() => {
  return createSelector(
    selectSessionFeature,
    (state: SessionInformation.State) => state.customResponse.refreshResponse == undefined ? undefined : <ServiceStateResponse<TServiceResponse, TErrorResponse>>state.customResponse.refreshResponse
  );
};

export const selectShowSessionPopup = createSelector(
  selectExtendSessionStatus,
  selectRefreshSessionStatus,
  (extendSessionStatus, refreshSessionStatus) => extendSessionStatus && !refreshSessionStatus
);
