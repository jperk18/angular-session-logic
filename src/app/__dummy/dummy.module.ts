import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthServiceImp} from "./fake-config-and-service";
import {FakeBackendHttpInterceptor} from "./fake-backend-http.interceptor";

@NgModule({
  imports:[
    HttpClientModule
  ],
  providers: [
    AuthServiceImp,
    {provide: HTTP_INTERCEPTORS, useClass: FakeBackendHttpInterceptor, multi: true}
  ]
})
export class DummyDataModule {
}
