import { afterNextRender, Directive, ElementRef, HostListener, inject, OnDestroy, Renderer2 } from '@angular/core';

@Directive({
  selector: '[spotlight]',
  standalone: true,
})
export class SpotlightDirective implements OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private glowEl: HTMLElement | null = null;
  private rafId = 0;
  private lastMouseX = -1;
  private lastMouseY = -1;

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

  @HostListener('mousemove', ['$event'])
  onMove(e: MouseEvent): void {
    this.lastMouseX = e.clientX;
    this.lastMouseY = e.clientY;
    this.updateSpotlight();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (this.lastMouseX !== -1) {
      this.updateSpotlight();
    }
  }

  private updateSpotlight(): void {
    if (!this.glowEl) return;
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

    if (this.rafId) cancelAnimationFrame(this.rafId);

    this.rafId = requestAnimationFrame(() => {
      this.rafId = 0;
      if (!this.glowEl) return;

      const rect = this.el.nativeElement.getBoundingClientRect();
      const x = this.lastMouseX - rect.left;
      const y = this.lastMouseY - rect.top;

      this.glowEl.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      this.glowEl.style.opacity = '1';
    });
  }

  @HostListener('mouseleave')
  onLeave(): void {
    this.lastMouseX = -1;
    this.lastMouseY = -1;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = 0;
    }
    if (this.glowEl) this.glowEl.style.opacity = '0';
  }
}
