import {NgModule} from '@angular/core';
import {HomeContainerComponent} from './home-container/home-container.component';
import {HomePageComponent} from './home-page/home-page.component';
import {FormsModule} from "@angular/forms";
import {HomeRoutingModule} from "./home-routing.module";
import {ExtensionPopupModule} from "../extension-popup/extension-popup.module";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    HomeRoutingModule,
    FormsModule,
    ExtensionPopupModule,
    CommonModule
  ],
  declarations: [
    HomeContainerComponent,
    HomePageComponent
  ]
})
export class HomeModule {
}
