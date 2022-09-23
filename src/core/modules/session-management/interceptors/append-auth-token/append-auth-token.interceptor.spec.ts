import { TestBed } from '@angular/core/testing';

import { AppendAuthTokenInterceptor } from './append-auth-token.interceptor';

describe('AppendAuthTokenInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AppendAuthTokenInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AppendAuthTokenInterceptor = TestBed.inject(AppendAuthTokenInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
