﻿import { createAction, props } from '@ngrx/store';
import {LoginRequest } from "../../services/authentication/models";
import {LoginRequestObj, LoginResponseObj, RefreshTokenResponseObj} from "../../services";

//This action follows a full flow through to service and store
export const Login = createAction('[SESSION] LOGIN', props<LoginRequest<LoginRequestObj>>());
//This action is a simple action requiring no crafted request.  Therefore auth service will only be given the token needed
export const LogOut = createAction('[SESSION] LOGOUT');
//This action is a simple action requiring no crafted request.  Therefore auth service will only be given the token needed
export const RefreshSession = createAction('[SESSION] ATTEMPT REFRESH SESSION', props<{forceSessionExtension?: true}>());

//Internal actions that are called from effect and not outside store components
export const RefreshToken = createAction('[SESSION] (INTERNAL) REFRESH TOKEN', props<{token: string, now: Date}>());
export const RefreshTokenSuccess = createAction('[SESSION] (INTERNAL) REFRESH TOKEN SUCCESS', props<{acccess: string, refresh: string, expires: Date, latestRefreshTokenDateTime: Date, additionalServiceProps?: RefreshTokenResponseObj}>());
export const RefreshTokenFailed = createAction('[SESSION] (INTERNAL) REFRESH TOKEN FAILED', props<{errorResponse: any}>());
export const ExtendSession = createAction('[SESSION] (INTERNAL) EXTEND SESSION');
export const LoginSuccess = createAction('[SESSION] (INTERNAL) LOGIN SUCCESS', props<{id: string, acccess: string, refresh: string, expires: Date, additionalServiceProps?: LoginResponseObj}>());
export const LoginFailed = createAction('[SESSION] (INTERNAL) LOGIN FAILED', props<{errorResponse: any}>());
export const LogOutSuccess = createAction('[SESSION] (INTERNAL) LOGOUT SUCCESS');


