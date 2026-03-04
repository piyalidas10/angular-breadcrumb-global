import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

/**
 * @param route 
 * @param state 
 * @returns 
 * CanActivateFn always expects (route, state) — do not call it manually.
 * For breadcrumb visibility, check AuthService signals, not the guard directly.
 * SSR + hydration works seamlessly this way.
 */

export const adminGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  return auth.user()?.role === 'admin';
};

// Note: route and state are required parameters even if unused.