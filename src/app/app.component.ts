import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
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

  ngOnInit() {
    this.logger.debug('AppComponent initialized');
    this.logger.info('AppComponent is running');
    this.logger.warn('This is a warning from AppComponent');
    this.logger.error('This is an error from AppComponent');
  }
}
