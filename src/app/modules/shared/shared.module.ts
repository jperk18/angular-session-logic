import {NgModule} from '@angular/core';
import { SiteAuthGuard } from './guards/site.auth.guard';
import { LoginAuthGuard } from './guards/login.auth.guard';

@NgModule({
  providers:[
    SiteAuthGuard,
    LoginAuthGuard
  ]
})
export class SharedModule {
}