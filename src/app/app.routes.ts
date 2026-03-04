import { Routes } from '@angular/router';
import { productResolver } from './products/product.resolver';
import { adminGuard } from './shared/auth.gurard';

/**
 * Application Routes
 * “loadComponent only works with standalone components and must explicitly return the component class via .then(m => m.ComponentName).”
 */

export const APP_ROUTES: Routes = [
  // Home
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then(m => m.HomeComponent),
    data: { breadcrumb: 'Home' }
  },

  // Product list
  {
    path: 'products',
    loadComponent: () =>
      import('./products/product-list.component').then(m => m.ProductListComponent),
    data: { breadcrumb: 'Products' }
  },

  // Product detail (slug-based)
  {
    path: 'products/:slug',
    loadComponent: () =>
      import('./products/product-detail.component').then(m => m.ProductDetailComponent),
    resolve: { product: productResolver },
    data: {
      breadcrumb: (ctx: any) => ctx.product.name
    }
  },

  // Admin (guarded)
  /**
   * data: {
      breadcrumb: 'Admin',
      breadcrumbVisible: () => inject(AuthService).hasRole('admin')
    }
   * Never call inject() inside route data directly; use a function wrapper.
   * inject() CANNOT be called: inside route data, inside arbitrary functions, during navigation evaluation
   * inject() only works in: constructors, providers, guards, resolvers, runInInjectionContext
   * So when BreadcrumbService tries to evaluate breadcrumbVisible, Angular throws NG0203.
   * 
   * app.routes.ts:45 ERROR RuntimeError: NG0203: The `_AuthService` token injection failed. `inject()` function must be called 
   * from an injection context such as a constructor, a factory function, a field initializer, 
   * or a function used with `runInInjectionContext`. Find more at https://angular.dev/errors/NG0203
   */
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./admin/admin.component').then(m => m.AdminComponent),
    data: {
      breadcrumb: 'Admin',
      requiresAdmin: true // ✅ simple metadata ONLY
    }
  },

  // 404 / Not Found
  {
    path: '**',
    loadComponent: () =>
      import('./not-found/not-found.component').then(m => m.NotFoundComponent),
    data: { breadcrumb: 'Not Found' }
  }
];