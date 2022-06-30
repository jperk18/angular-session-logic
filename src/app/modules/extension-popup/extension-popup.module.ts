import {NgModule} from '@angular/core';
import {TimerComponent} from './components/timer/timer.component'
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    TimerComponent
  ],
  declarations: [
    TimerComponent
  ]
})
export class ExtensionPopupModule {
}
