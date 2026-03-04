import { Injectable, effect, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RendererFactory2 } from '@angular/core';
import { BreadcrumbService } from './breadcrumb.service';

@Injectable({ providedIn: 'root' })
export class BreadcrumbSeoService {

  private breadcrumbs = inject(BreadcrumbService).breadcrumbs;
  private renderer = inject(RendererFactory2).createRenderer(null, null);
  private document = inject(DOCUMENT);

  constructor() {
    effect(() => {
      const crumbs = this.breadcrumbs();
      if (crumbs.length) {
        this.renderJsonLd(crumbs);
      }
    });
  }

  private renderJsonLd(crumbs: any[]) {
    this.removeExisting();

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.label,
        item: `https://example.com${c.url}`
      }))
    };

    const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.className = 'seo-breadcrumbs';
    script.text = JSON.stringify(jsonLd);

    this.renderer.appendChild(this.document.head, script);
  }

  private removeExisting() {
    this.document.head
      .querySelector('script.seo-breadcrumbs')
      ?.remove();
  }
}
