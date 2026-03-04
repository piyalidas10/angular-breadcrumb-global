import {
  Injectable,
  inject,
  signal
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router
} from '@angular/router';
import { filter } from 'rxjs';
import { Breadcrumb } from './breadcrumb.model';
import { AuthService } from '../shared/auth.service';

@Injectable({ providedIn: 'root' })
export class BreadcrumbService {

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private auth = inject(AuthService);

  // Public read-only signal
  readonly breadcrumbs = signal<Breadcrumb[]>([]);

  // Cache: routeKey → breadcrumbs
  private cache = new Map<string, Breadcrumb[]>();

  constructor() {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => this.build());
  }

  // ─────────────────────────────────────────────
  // Core build pipeline
  // ─────────────────────────────────────────────
  private build(): void {
    const key = this.createCacheKey();

    if (this.cache.has(key)) {
      this.breadcrumbs.set(this.cache.get(key)!);
      return;
    }

    const crumbs = this.computeCrumbs();
    this.cache.set(key, crumbs);
    this.breadcrumbs.set(crumbs);
  }

  // ─────────────────────────────────────────────
  // Breadcrumb computation (SSR-safe)
  // ─────────────────────────────────────────────
  private computeCrumbs(): Breadcrumb[] {
    const crumbs: Breadcrumb[] = [];
    let route: ActivatedRoute | null = this.route.root;

    while (route) {
      const snapshot = route.snapshot;
      const data = snapshot.data;

      // 🔐 Visibility check (SAFE)
      if (data['requiresAdmin'] && !this.auth.hasRole('admin')) {
        return crumbs;
      }

      if (data?.['breadcrumb']) {

        // Guard / role / condition-based visibility
        const visible = data['breadcrumbVisible'];
        if (!visible || visible(data)) {

          const label =
            typeof data['breadcrumb'] === 'function'
              ? data['breadcrumb'](data)
              : data['breadcrumb'];

          crumbs.push({
            label,
            url: this.buildUrl(route)
          });
        }
      }

      route = route.firstChild;
    }

    return crumbs;
  }

  // ─────────────────────────────────────────────
  // URL builder (slug-safe)
  // ─────────────────────────────────────────────
  private buildUrl(route: ActivatedRoute): string {
    return '/' + route.pathFromRoot
      .flatMap(r => r.snapshot.url)
      .map(s => s.path)
      .join('/');
  }

  // ─────────────────────────────────────────────
  // Cache key strategy
  // ─────────────────────────────────────────────
  private createCacheKey(): string {
    return this.route.root.pathFromRoot
      .map(r => r.snapshot.url.map(u => u.path).join('/'))
      .join('/');
  }
}
