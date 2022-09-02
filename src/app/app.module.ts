import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {DummyDataModule} from "./__dummy/dummy.module";
import {AuthServiceImp} from "./__dummy/fake-config-and-service";
import {SessionManagementModule} from "./modules/session-management";
import { ProfileManagementModule } from './modules/profile-management/profile-management.module';
import { SiteAuthGuard } from './guards/site.auth.guard';
import { LoginAuthGuard } from './guards/login.auth.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
  providers:[
    SiteAuthGuard,
    LoginAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
