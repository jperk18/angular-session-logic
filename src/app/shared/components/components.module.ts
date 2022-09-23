import {NgModule} from '@angular/core';
import {TimerCounterComponent} from './extension-popup/components/timer/timer-counter.component'
import {CommonModule} from "@angular/common";
import { ExtensionPopupContainerComponent } from './extension-popup/extension-popup-container/extension-popup-container.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    TimerCounterComponent,
    ExtensionPopupContainerComponent
  ],
  declarations: [
    TimerCounterComponent,
    ExtensionPopupContainerComponent
  ]
})
export class ComponentsModule {
}
