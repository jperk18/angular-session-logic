import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {AuthServiceImp} from "./__dummy/fake-config-and-service";
import {DummyDataModule} from "./__dummy/dummy.module";
import {SessionManagementModule} from "./modules/session-management";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
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
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production})
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
