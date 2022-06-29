import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {sessionFeatureKey} from "./store/selectors/session.selectors";
import {sessionReducer, hydrationMetaReducer} from "./store/reducers/session.reducer";
import {SessionEffects} from "./store/effects/session.effects";
import {MetaReducer} from "@ngrx/store";
import {AuthService} from "./services";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthTokenInterceptor} from "./interceptors";
import {FakeBackendHttpInterceptor} from "./__dummy_interceptors/fake-backend-http.interceptor";

export const metaReducers: MetaReducer[] = [hydrationMetaReducer];

@NgModule({
  imports: [
    HttpClientModule,
    StoreModule.forFeature(sessionFeatureKey, sessionReducer, {metaReducers}),
    EffectsModule.forFeature([SessionEffects])
  ],
  providers: [
    AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: FakeBackendHttpInterceptor, multi: true}
  ]
})
export class SessionManagementModule {
}
