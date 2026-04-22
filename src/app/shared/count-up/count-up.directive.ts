import { Directive, ElementRef, inject, input, numberAttribute, Renderer2, afterNextRender } from '@angular/core';
import { animationFrames, map, takeWhile, endWith } from 'rxjs';

@Directive({ selector: '[countUp]', standalone: true })
export class CountUpDirective {
  readonly target = input.required<number>({ alias: 'countUpTarget' });
  readonly suffix = input('', { alias: 'countUpSuffix' });
  readonly decimals = input(0, { transform: numberAttribute, alias: 'countUpDecimals' });
  readonly duration = input(1600, { transform: numberAttribute, alias: 'countUpDuration' });

  private readonly el = inject(ElementRef).nativeElement;
  private readonly renderer = inject(Renderer2);

  constructor() {
    afterNextRender(() => {
      this.update(0);
      new IntersectionObserver(([e], obs) => {
        if (e.isIntersecting) {
          this.startAnimation();
          obs.disconnect();
        }
      }, { threshold: 0.4 }).observe(this.el);
    });
  }

  private startAnimation() {
    const duration = this.duration();
    animationFrames().pipe(
      map(({ elapsed }) => Math.min(elapsed / duration, 1)),
      takeWhile(p => p < 1),
      endWith(1)
    ).subscribe(p => {
      const eased = 1 - Math.pow(1 - p, 3);
      this.update(eased * this.target());
    });
  }

  private update(v: number) {
    const text = v.toFixed(this.decimals()) + this.suffix();
    this.renderer.setProperty(this.el, 'textContent', text);
  }
}
