import {NgModule} from '@angular/core';
import { GuardsModule } from './guards';
import { ComponentsModule } from './components';

@NgModule({
  imports:[GuardsModule, ComponentsModule]
})
export class SharedModule {
}