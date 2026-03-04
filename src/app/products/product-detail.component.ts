import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  template: `<h1>{{ product?.name }}</h1>`
})
export class ProductDetailComponent {
  private route = inject(ActivatedRoute);
  product = this.route.snapshot.data['product'];
}
