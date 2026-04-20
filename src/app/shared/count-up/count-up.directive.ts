import {
  afterNextRender,
  Directive,
  ElementRef,
  inject,
  input,
  numberAttribute,
  OnDestroy,
} from '@angular/core';

@Directive({
  selector: '[countUp]',
})
export class CountUpDirective implements OnDestroy {
  readonly countUpTarget = input.required<number>();
  readonly countUpSuffix = input('');
  readonly countUpDecimals = input(0, { transform: numberAttribute });
  readonly countUpDuration = input(1600, { transform: numberAttribute });

  private readonly el = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;
  private rafId?: number;

  constructor() {
    afterNextRender(() => {
      const suffix = this.countUpSuffix();
      const decimals = this.countUpDecimals();
      this.el.nativeElement.textContent = (0).toFixed(decimals) + suffix;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        this.showFinal();
        return;
      }

      this.observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              this.startCount();
              this.observer?.disconnect();
            }
          }
        },
        { threshold: 0.4 }
      );

      this.observer.observe(this.el.nativeElement);
    });
  }

  private showFinal(): void {
    const target = this.countUpTarget();
    const decimals = this.countUpDecimals();
    this.el.nativeElement.textContent = target.toFixed(decimals) + this.countUpSuffix();
  }

  private startCount(): void {
    const target = this.countUpTarget();
    const suffix = this.countUpSuffix();
    const decimals = this.countUpDecimals();
    const duration = this.countUpDuration();
    const start = performance.now();
    const el = this.el.nativeElement;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = (eased * target).toFixed(decimals) + suffix;

      if (progress < 1) {
        this.rafId = requestAnimationFrame(tick);
      }
    };

    this.rafId = requestAnimationFrame(tick);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.rafId !== undefined) cancelAnimationFrame(this.rafId);
  }
}
