import { TestBed } from '@angular/core/testing';

import { RefreshAuthTokenInterceptor } from './refresh-auth-token.interceptor';

describe('RefreshAuthTokenInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RefreshAuthTokenInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: RefreshAuthTokenInterceptor = TestBed.inject(RefreshAuthTokenInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
