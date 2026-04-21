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
    const apply = () => this.isDark.update(v => !v);

    if (!this.isBrowser) {
      apply();
      return;
    }

    const reducedMotion = this.doc.defaultView
      ?.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      apply();
      return;
    }

    if ('startViewTransition' in this.doc) {
      (this.doc as Document & { startViewTransition: (cb: () => void) => void })
        .startViewTransition(apply);
    } else {
      this.curtainFallback(apply);
    }
  }

  private curtainFallback(apply: () => void): void {
    // Colour of the curtain = the background of the theme we're switching TO
    const curtainColor = this.isDark() ? '#f4f4f6' : '#0e0e0f';

    const overlay = this.doc.createElement('div');
    overlay.setAttribute('aria-hidden', 'true');
    overlay.style.cssText = [
      'position:fixed',
      'inset:0',
      `background:${curtainColor}`,
      'transform:translateY(-100%)',
      'z-index:99999',
      'pointer-events:none',
    ].join(';');

    this.doc.body.appendChild(overlay);

    const opts: KeyframeAnimationOptions = { duration: 260, fill: 'forwards' };

    overlay.animate(
      [{ transform: 'translateY(-100%)' }, { transform: 'translateY(0)' }],
      { ...opts, easing: 'ease-in' },
    ).finished.then(() => {
      apply();
      return overlay.animate(
        [{ transform: 'translateY(0)' }, { transform: 'translateY(100%)' }],
        { ...opts, easing: 'ease-out' },
      ).finished;
    }).then(() => overlay.remove())
      .catch(() => { apply(); overlay.remove(); });
  }
}

