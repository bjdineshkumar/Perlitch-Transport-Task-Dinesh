import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { tokenRenewalGuard } from './token-renewal.guard';

describe('tokenRenewalGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => tokenRenewalGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
