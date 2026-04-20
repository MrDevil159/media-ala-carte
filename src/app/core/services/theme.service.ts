import { effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly doc = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly storage = this.isBrowser ? this.doc.defaultView?.localStorage : null;

  readonly isDark = signal(this.storage?.getItem('theme') !== 'light');

  constructor() {
    effect(() => {
      const dark = this.isDark();
      if (this.isBrowser) {
        this.doc.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
        this.storage?.setItem('theme', dark ? 'dark' : 'light');
      }
    });
  }

  toggle(): void {
    this.isDark.update(v => !v);
  }
}

