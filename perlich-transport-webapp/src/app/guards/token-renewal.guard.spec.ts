import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { TokenRenewalGuard } from './token-renewal.guard';

describe('tokenRenewalGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => TokenRenewalGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
