import { effect, inject, Injectable, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly doc = inject(DOCUMENT);
  private readonly storage = this.doc.defaultView?.localStorage;

  readonly isDark = signal(this.storage?.getItem('theme') !== 'light');

  constructor() {
    effect(() => {
      const dark = this.isDark();
      this.doc.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
      this.storage?.setItem('theme', dark ? 'dark' : 'light');
    });
  }

  toggle(): void {
    this.isDark.update(v => !v);
  }
}
