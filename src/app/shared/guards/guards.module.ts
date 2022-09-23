import {NgModule} from '@angular/core';
import { SiteAuthGuard } from './site/site.auth.guard';
import { LoginAuthGuard } from './login/login.auth.guard';

@NgModule({
  providers:[
    SiteAuthGuard,
    LoginAuthGuard
  ]
})
export class GuardsModule {
}