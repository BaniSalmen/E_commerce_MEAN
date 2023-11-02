import { TestBed } from '@angular/core/testing';

import { Jwt1Interceptor } from './jwt1.interceptor';

describe('Jwt1Interceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      Jwt1Interceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: Jwt1Interceptor = TestBed.inject(Jwt1Interceptor);
    expect(interceptor).toBeTruthy();
  });
});
