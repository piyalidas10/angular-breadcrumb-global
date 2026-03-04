// src/app/products/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from './product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private http: HttpClient) {}

  getById(id: string): Observable<Product> {
    // return this.http.get<Product>(`/api/products/${id}`);
    return this.http.get<Product>(`http://localhost:3000/products/${id}`);
  }

  getBySlug(slug: string) {
    return this.http
      .get<Product[]>(`http://localhost:3000/products?slug=${slug}`)
      .pipe(map(r => r[0]));
  }
}
