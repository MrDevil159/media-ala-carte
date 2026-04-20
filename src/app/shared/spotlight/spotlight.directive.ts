import { afterNextRender, Directive, ElementRef, inject, OnDestroy, Renderer2 } from '@angular/core';

@Directive({
  selector: '[spotlight]',
  host: {
    '(mousemove)': 'onMove($event)',
    '(mouseleave)': 'onLeave()',
  },
})
export class SpotlightDirective implements OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private glowEl: HTMLElement | null = null;
  private rafId = 0;

  constructor() {
    afterNextRender(() => {
      const glow: HTMLElement = this.renderer.createElement('div');
      this.renderer.addClass(glow, 'spotlight-glow');
      this.renderer.appendChild(this.el.nativeElement, glow);
      this.glowEl = glow;
    });
  }

  ngOnDestroy(): void {
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }

  onMove(e: MouseEvent): void {
    if (!this.glowEl || this.rafId) return;
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
    const clientX = e.clientX;
    const clientY = e.clientY;
    this.rafId = requestAnimationFrame(() => {
      this.rafId = 0;
      if (!this.glowEl) return;
      const rect = this.el.nativeElement.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      this.glowEl.style.transform = `translate(${x}px, ${y}px)`;
      this.glowEl.style.opacity = '1';
    });
  }

  onLeave(): void {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = 0;
    }
    if (this.glowEl) this.glowEl.style.opacity = '0';
  }
}
