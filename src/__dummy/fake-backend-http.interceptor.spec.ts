import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { FakeBackendHttpInterceptor } from './fake-backend-http.interceptor';
import { AuthServiceImp } from './fake-config-and-service';

describe('FakeBackendHttpInterceptor', () => {
  beforeAll((async () => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [
        FakeBackendHttpInterceptor,
        AuthServiceImp
        ]
    })
  }))

  it('should be created', () => {
    const interceptor: FakeBackendHttpInterceptor = TestBed.inject(FakeBackendHttpInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
