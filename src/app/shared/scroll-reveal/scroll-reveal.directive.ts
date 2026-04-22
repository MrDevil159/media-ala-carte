import { afterNextRender, Directive, ElementRef, inject, input, numberAttribute, signal } from '@angular/core';

@Directive({
  selector: '[scrollReveal]',
  standalone: true,
  host: {
    'class': 'scroll-reveal',
    '[class.is-revealed]': 'isRevealed()',
    '[class.scroll-reveal--up]': 'direction() === "up"',
    '[class.scroll-reveal--left]': 'direction() === "left"',
    '[class.scroll-reveal--right]': 'direction() === "right"',
    '[class.scroll-reveal--fade]': 'direction() === "fade"',
  }
})
export class ScrollRevealDirective {
  readonly delay = input(0, { transform: numberAttribute, alias: 'revealDelay' });
  readonly direction = input<'up' | 'left' | 'right' | 'fade'>('up', { alias: 'revealDirection' });

  private readonly el = inject(ElementRef).nativeElement;
  protected readonly isRevealed = signal(false);

  constructor() {
    afterNextRender(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return this.isRevealed.set(true);
      }
      new IntersectionObserver(([entry], obs) => {
        if (entry.isIntersecting) {
          setTimeout(() => this.isRevealed.set(true), this.delay());
          obs.disconnect();
        }
      }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' }).observe(this.el);
    });
  }
}
