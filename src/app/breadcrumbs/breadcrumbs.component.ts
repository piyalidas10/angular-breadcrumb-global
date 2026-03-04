import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BreadcrumbService } from './breadcrumb.service';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [NgFor, RouterLink],
  template: `
    @if (crumbs().length) {
      <nav aria-label="Breadcrumb">
        <a *ngFor="let b of crumbs(); let last = last"
          [routerLink]="b.url"
          [attr.aria-current]="last ? 'page' : null">
          {{ b.label }}
        </a>
      </nav>
    } @else {
      <p>No Breadcrumb found</p>
    }    
  `
})
export class BreadcrumbsComponent {
  private svc = inject(BreadcrumbService);
  crumbs = this.svc.breadcrumbs;
  constructor() { 
    console.log('BreadcrumbsComponent loaded', this.crumbs());
  }
}
