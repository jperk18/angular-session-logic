import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginContainerComponent} from "./login-container/login-container.component";

const routes: Routes = [
  {
    title: "Login",
    path: "",
    component: LoginContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
