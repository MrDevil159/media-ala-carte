import {
  afterNextRender,
  Directive,
  ElementRef,
  inject,
  input,
  numberAttribute,
  OnDestroy,
  signal,
} from '@angular/core';

type RevealDirection = 'up' | 'left' | 'right' | 'fade';

@Directive({
  selector: '[scrollReveal]',
  host: {
    class: 'scroll-reveal',
    '[class.scroll-reveal--up]': 'revealDirection() === "up"',
    '[class.scroll-reveal--left]': 'revealDirection() === "left"',
    '[class.scroll-reveal--right]': 'revealDirection() === "right"',
    '[class.scroll-reveal--fade]': 'revealDirection() === "fade"',
    '[class.is-revealed]': 'isRevealed()',
  },
})
export class ScrollRevealDirective implements OnDestroy {
  readonly revealDelay = input(0, { transform: numberAttribute });
  readonly revealDirection = input<RevealDirection>('up');

  private readonly el = inject(ElementRef<HTMLElement>);
  protected readonly isRevealed = signal(false);
  private observer?: IntersectionObserver;

  constructor() {
    afterNextRender(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        this.isRevealed.set(true);
        return;
      }

      this.observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              const delay = this.revealDelay();
              if (delay > 0) {
                setTimeout(() => this.isRevealed.set(true), delay);
              } else {
                this.isRevealed.set(true);
              }
              this.observer?.disconnect();
            }
          }
        },
        { threshold: 0.1, rootMargin: '0px 0px -20px 0px' }
      );

      this.observer.observe(this.el.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
