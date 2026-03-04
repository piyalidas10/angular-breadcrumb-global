import { Routes } from '@angular/router';
import { productResolver } from './product.resolver';

export const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./product-list.component')
        .then(m => m.ProductListComponent),
    data: {
      breadcrumb: 'Products'
    }
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./product-detail.component')
        .then(m => m.ProductDetailComponent),
    resolve: {
      product: productResolver
    },
    data: {
      breadcrumb: (ctx: any) => ctx.product.name
    }
  }
];

export default PRODUCT_ROUTES;
