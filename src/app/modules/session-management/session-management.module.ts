import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {sessionFeatureKey} from "./store/selectors/session.selectors";
import {sessionReducer} from "./store/reducers/session.reducer";
import {SessionEffects} from "./store/effects/session.effects";


@NgModule({
  imports: [
    StoreModule.forFeature(sessionFeatureKey, sessionReducer),
    EffectsModule.forFeature([SessionEffects])
  ],
  providers: []
})
export class SessionManagementModule { }
