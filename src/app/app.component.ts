import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { BreadcrumbSeoService } from './breadcrumbs/breadcrumb-seo.service';
import { LoggerService } from './shared/logger.service';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet, BreadcrumbsComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private logger: LoggerService = inject(LoggerService);
  title = 'angular-breadcrumb-global';
  private _seo = inject(BreadcrumbSeoService);

  ngOnInit() {
    this.logger.log('AppComponent initialized');
  }
}
