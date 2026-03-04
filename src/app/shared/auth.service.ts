import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = signal({ id: '1', name: 'John Doe', role: 'admin' });

  hasRole(role: string) {
    return this.user().role === role;
  }
}

/**
 * This is signal-friendly, SSR-safe.
 * Used in guards (canActivate) and breadcrumbs (breadcrumbVisible).
 */