import { createAction, props } from '@ngrx/store';
import {TokenInformation} from "../models/tokenInformation";

export const Login = createAction('[SESSION] LOGIN', props<{username: string, password: string}>());
export const LoginSuccess = createAction('[SESSION] LOGIN SUCCESS', props<{token: TokenInformation}>());
export const LoginFailed = createAction('[SESSION] LOGIN FAILED');

export const ExtendSession = createAction('[SESSION] EXTEND SESSION');

export const RefreshToken = createAction('[SESSION] REFRESH TOKEN', props<{forceSessionExtension: boolean}>());
export const RefreshTokenSuccess = createAction('[SESSION] REFRESH TOKEN SUCCESS', props<{token: TokenInformation, latestRefreshTokenDateTime: Date}>());
export const RefreshTokenFailed = createAction('[SESSION] REFRESH TOKEN FAILED');

export const LogOut = createAction('[SESSION] LOGOUT');

