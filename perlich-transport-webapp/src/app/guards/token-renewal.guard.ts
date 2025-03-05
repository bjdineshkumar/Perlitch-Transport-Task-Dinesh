import { CanActivateFn } from '@angular/router';

export const TokenRenewalGuard: CanActivateFn = (route, state) => {
  return true;
};
