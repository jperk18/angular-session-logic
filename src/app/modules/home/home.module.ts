import {NgModule} from '@angular/core';
import {HomeContainerComponent} from './home-container/home-container.component';
import {HomePageComponent} from './home-page/home-page.component';
import {FormsModule} from "@angular/forms";
import {HomeRoutingModule} from "./home-routing.module";

@NgModule({
  imports: [
    HomeRoutingModule,
    FormsModule
  ],
  declarations: [
    HomeContainerComponent,
    HomePageComponent
  ]
})
export class HomeModule {
}
