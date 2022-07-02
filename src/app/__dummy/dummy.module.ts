import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthServiceImp} from "./fake-config-and-service";
import {FakeBackendHttpInterceptor} from "./fake-backend-http.interceptor";

@NgModule({
  providers: [
    AuthServiceImp,
    {provide: HTTP_INTERCEPTORS, useClass: FakeBackendHttpInterceptor, multi: true}
  ]
})
export class DummyDataModule {
}
