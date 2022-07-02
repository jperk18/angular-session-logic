import { createAction, props } from '@ngrx/store';
import {TokenInformation} from "../models/tokenInformation";
import {LoginRequest, LogoutRequest } from "../../services/authentication/models";

export const Login = createAction('[SESSION] LOGIN', props<LoginRequest<any>>());
export const LogOut = createAction('[SESSION] LOGOUT');
export const RefreshSession = createAction('[SESSION] ATTEMPT REFRESH SESSION', props<{forceSessionExtension: boolean}>());

//Internal actions that are called from effect and not outside store components
export const RefreshToken = createAction('[SESSION] (INTERNAL) REFRESH TOKEN', props<{token: string, now: Date}>());
export const RefreshTokenSuccess = createAction('[SESSION] (INTERNAL) REFRESH TOKEN SUCCESS', props<{token: TokenInformation, latestRefreshTokenDateTime: Date}>());
export const RefreshTokenFailed = createAction('[SESSION] (INTERNAL) REFRESH TOKEN FAILED');
export const ExtendSession = createAction('[SESSION] (INTERNAL) EXTEND SESSION');
export const LoginSuccess = createAction('[SESSION] (INTERNAL) LOGIN SUCCESS', props<{token: TokenInformation}>());
export const LoginFailed = createAction('[SESSION] (INTERNAL) LOGIN FAILED');

