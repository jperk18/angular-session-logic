import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {sessionFeatureKey} from "./store/selectors/session.selectors";
import {sessionReducer, hydrationMetaReducer} from "./store/reducers/session.reducer";
import {SessionEffects} from "./store/effects/session.effects";
import { MetaReducer } from "@ngrx/store";

export const metaReducers: MetaReducer[] = [hydrationMetaReducer];

@NgModule({
  imports: [
    StoreModule.forFeature(sessionFeatureKey, sessionReducer, {metaReducers}),
    EffectsModule.forFeature([SessionEffects])
  ],
  providers: []
})
export class SessionManagementModule { }
