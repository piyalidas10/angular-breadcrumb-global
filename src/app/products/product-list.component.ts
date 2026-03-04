import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  standalone: true,
  selector: 'app-product-list',
  template: `
    <h2>Products</h2>
    <ul>
      <li *ngFor="let p of products">
        <a [routerLink]="['/products', p.slug]">
          {{ p.name }}
        </a>
      </li>
    </ul>
  `,
  imports: [CommonModule, RouterLink]
})
export class ProductListComponent {
  products = [
    { name: 'Angular Book', slug: 'angular-book' },
    { name: 'RxJS Guide', slug: 'rxjs-guide' }
  ];
}
