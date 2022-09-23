import { createAction, props } from '@ngrx/store';
import { Profile } from '../models/profile';

//Internal actions that are called from effect and not outside store components
export const SetProfile = createAction('[PROFILE] (INTERNAL) SET PROFILE', props<{profile: Profile}>());
export const ClearProfile = createAction('[PROFILE] (INTERNAL) CLEAR PROFILE');