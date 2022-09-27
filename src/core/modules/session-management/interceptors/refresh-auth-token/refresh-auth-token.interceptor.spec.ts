import { AuthServiceImp } from '@/__dummy';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { SessionAuthenticationService } from '../../services/authentication/authentication.service';

import { RefreshAuthTokenInterceptor } from './refresh-auth-token.interceptor';

describe('RefreshAuthTokenInterceptor', () => {
  beforeAll((async () => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule, 
        StoreModule.forRoot({})
      ],
      providers: [
        { provide: SessionAuthenticationService, useClass: AuthServiceImp},    
        RefreshAuthTokenInterceptor
      ]
    })
  }))

  it('should be created', () => {
    const interceptor: RefreshAuthTokenInterceptor = TestBed.inject(RefreshAuthTokenInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
