import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeContainerComponent} from "./home-container/home-container.component";
import {AuthenticatedGuard} from "./guards/authenticated.guard";

const routes: Routes = [
  {
    path: "",
    canActivate:[AuthenticatedGuard],
    component: HomeContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    AuthenticatedGuard,
  ]
})
export class HomeRoutingModule {
}
