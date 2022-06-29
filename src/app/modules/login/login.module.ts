import {NgModule} from '@angular/core';
import {LoginContainerComponent} from './login-container/login-container.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {FormsModule} from "@angular/forms";
import {LoginRoutingModule} from "./login-routing.module";

@NgModule({
  imports: [
    LoginRoutingModule,
    FormsModule
  ],
  declarations: [
    LoginContainerComponent,
    LoginPageComponent
  ]
})
export class LoginModule {
}
