import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { BreadcrumbSeoService } from './breadcrumbs/breadcrumb-seo.service';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet, BreadcrumbsComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-breadcrumb-global';
  private _seo = inject(BreadcrumbSeoService);
}
