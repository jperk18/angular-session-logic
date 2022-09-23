import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeContainerComponent} from "./home-container/home-container.component";
import {SiteAuthGuard} from "@shared/guards";

const routes: Routes = [
  {
    path: "",
    canActivate:[SiteAuthGuard],
    component: HomeContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
