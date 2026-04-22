import { afterNextRender, Directive, ElementRef, inject, OnDestroy, Renderer2 } from '@angular/core';

@Directive({
  selector: '[spotlight]',
  standalone: true,
  host: {
    '(mousemove)': 'onMove($event)',
    '(mouseleave)': 'leave()',
  }
})
export class SpotlightDirective implements OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>).nativeElement;
  private readonly renderer = inject(Renderer2);
  
  private glowEl?: HTMLElement;
  private rafId = 0;
  private mouseX = -1;
  private mouseY = -1;
  private unlistenScroll?: () => void;

  constructor() {
    afterNextRender(() => {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          this.initGlow();
          observer.disconnect();
        }
      }, { rootMargin: '100px' });
      
      observer.observe(this.el);
    });
  }

  private initGlow(): void {
    this.glowEl = this.renderer.createElement('div');
    this.renderer.addClass(this.glowEl, 'spotlight-glow');
    this.renderer.appendChild(this.el, this.glowEl);
  }

  onMove(e: MouseEvent): void {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;

    if (!this.unlistenScroll) {
      this.unlistenScroll = this.renderer.listen('window', 'scroll', () => this.update());
    }

    this.update();
  }

  update(): void {
    if (this.rafId || this.mouseX === -1 || !this.glowEl || window.matchMedia('(hover: none)').matches) return;

    this.rafId = requestAnimationFrame(() => {
      this.rafId = 0;
      const rect = this.el.getBoundingClientRect();
      const x = this.mouseX - rect.left;
      const y = this.mouseY - rect.top;
      this.glowEl!.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      this.glowEl!.style.opacity = '1';
    });
  }

  leave(): void {
    this.mouseX = -1;
    if (this.unlistenScroll) {
      this.unlistenScroll();
      this.unlistenScroll = undefined;
    }

    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = 0;
    }
    if (this.glowEl) this.glowEl.style.opacity = '0';
  }

  ngOnDestroy(): void {
    this.leave();
  }
}
