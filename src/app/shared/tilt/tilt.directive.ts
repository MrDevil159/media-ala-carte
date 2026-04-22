import { Directive, ElementRef, inject, input, numberAttribute, OnDestroy, Renderer2, afterNextRender } from '@angular/core';
import { fromEvent, Subject, takeUntil } from 'rxjs';

@Directive({
  selector: '[tilt]',
})
export class TiltDirective implements OnDestroy {
  readonly max = input(10, { transform: numberAttribute, alias: 'tiltMax' });

  private readonly el = inject(ElementRef<HTMLElement>).nativeElement;
  private readonly renderer = inject(Renderer2);
  private rafId = 0;
  private destroy$ = new Subject<void>();

  constructor() {
    afterNextRender(() => {
      fromEvent<MouseEvent>(this.el, 'mousemove')
        .pipe(takeUntil(this.destroy$))
        .subscribe(e => this.onMove(e));
        
      fromEvent<MouseEvent>(this.el, 'mouseleave')
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.onLeave());
    });
  }

  onMove(e: MouseEvent): void {
    if (this.rafId || window.matchMedia('(hover: none), (prefers-reduced-motion: reduce)').matches) return;
    this.rafId = requestAnimationFrame(() => {
      this.rafId = 0;
      const rect = this.el.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      const m = this.max();
      const transform = `perspective(800px) rotateX(${-y * m}deg) rotateY(${x * m}deg) scale3d(1.02, 1.02, 1.02)`;
      this.renderer.setStyle(this.el, 'transform', transform);
    });
  }

  onLeave(): void {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = 0;
    }
    this.renderer.removeStyle(this.el, 'transform');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.onLeave();
  }
}
