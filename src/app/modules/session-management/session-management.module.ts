import {ModuleWithProviders, NgModule, Provider, Type} from '@angular/core';
import {MetaReducer, StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {sessionFeatureKey} from "./store/selectors/session.selectors";
import {hydrationMetaReducer, sessionReducer} from "./store/reducers/session.reducer";
import {SessionEffects} from "./store/effects/session.effects";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AppendAuthTokenInterceptor, RefreshAuthTokenInterceptor} from "./interceptors";
import {SessionManagementConfigService, SessionAuthenticationService, AuthenticationService} from "./services";
import {SessionManagementConfig} from "./services/sessionManagementConfigService/models/session-management.config";

const metaReducers: MetaReducer[] = [hydrationMetaReducer];

@NgModule({
  imports: [
    HttpClientModule,
    StoreModule.forFeature(sessionFeatureKey, sessionReducer, {metaReducers}),
    EffectsModule.forFeature([SessionEffects])
  ]
})
export class SessionHandlerModule {
}


@NgModule()
export class SessionManagementModule {
  static forRoot(config: SessionManagementConfig, authenticationService: Type<AuthenticationService>, includeAppendAuthBearerTokenInterceptor: boolean = true, includeRefreshAuthTokenInterceptor: boolean = true): ModuleWithProviders<SessionHandlerModule> {

    let sessionProviders: Provider = [
      {
        provide: SessionManagementConfigService,
        useValue: config
      },
      {
        provide: SessionAuthenticationService,
        useClass: authenticationService
      }
    ]

    if(includeAppendAuthBearerTokenInterceptor)
      sessionProviders.push({provide: HTTP_INTERCEPTORS, useClass: AppendAuthTokenInterceptor, multi: true})

    if(includeRefreshAuthTokenInterceptor)
      sessionProviders.push({provide: HTTP_INTERCEPTORS, useClass: RefreshAuthTokenInterceptor, multi: true})

    return {
      ngModule: SessionHandlerModule,
      providers: sessionProviders
    };
  }
}
