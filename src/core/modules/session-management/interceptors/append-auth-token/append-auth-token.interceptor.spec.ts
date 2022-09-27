import { AuthServiceImp } from '@/__dummy';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { SessionAuthenticationService } from '../../services/authentication/authentication.service';

import { AppendAuthTokenInterceptor } from './append-auth-token.interceptor';

describe('AppendAuthTokenInterceptor', () => {
  beforeAll((async () => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule, 
        StoreModule.forRoot({})
      ],
      providers: [
        { provide: SessionAuthenticationService, useClass: AuthServiceImp},    
        AppendAuthTokenInterceptor
      ]
    })
  }))

  it('should be created', () => {
    const interceptor: AppendAuthTokenInterceptor = TestBed.inject(AppendAuthTokenInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
