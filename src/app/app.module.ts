import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {DummyDataModule, AuthServiceImp} from "@dummy";
import {SessionManagementModule} from '@core/session-management'
import {ProfileManagementModule} from "@core/profile-management"
import {SharedModule} from "@shared";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    DummyDataModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    SessionManagementModule.forRoot({
      timerIntervalCheckInMilliseconds: 1000,
      extendSessionRangeInMinutes: 5,
      refreshBufferInSeconds: 15,
      loginOrRootPagePath: '/',
      landingPagePath: '/home'
    }, AuthServiceImp),
    ProfileManagementModule,
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production})
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
