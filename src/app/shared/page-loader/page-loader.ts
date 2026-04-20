import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';

const MIN_DISPLAY_MS = 1800;
const CURTAIN_DURATION_MS = 1100;

@Component({
  selector: 'app-page-loader',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageLoader implements OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);
  private timers: ReturnType<typeof setTimeout>[] = [];

  constructor() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    afterNextRender(() => {
      const el = this.document.getElementById('mac-page-loader');
      if (!el) return;

      const t1 = setTimeout(() => {
        el.classList.add('is-leaving');

        const t2 = setTimeout(() => {
          el.style.display = 'none';
          this.document.body.classList.remove('mac-loading');
        }, CURTAIN_DURATION_MS);

        this.timers.push(t2);
      }, MIN_DISPLAY_MS);

      this.timers.push(t1);
    });
  }

  ngOnDestroy(): void {
    this.timers.forEach(clearTimeout);
  }
}
