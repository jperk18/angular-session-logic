import {NgModule} from '@angular/core';
import {MetaReducer, StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {profileFeatureKey} from "./store/selectors/profile.selectors";
import {hydrationMetaReducer, sessionReducer} from "./store/reducers/profile.reducer";
import {ProfileEffects} from "./store/effects/profile.effects";

const metaReducers: MetaReducer[] = [hydrationMetaReducer];

@NgModule({
  imports: [
    StoreModule.forFeature(profileFeatureKey, sessionReducer, {metaReducers}),
    EffectsModule.forFeature([ProfileEffects])
  ]
})
export class ProfileManagementModule {
}