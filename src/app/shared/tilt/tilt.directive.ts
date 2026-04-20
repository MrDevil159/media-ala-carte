import { Directive, ElementRef, inject, input, numberAttribute } from '@angular/core';

@Directive({
  selector: '[tilt]',
  host: {
    '(mousemove)': 'onMove($event)',
    '(mouseleave)': 'onLeave()',
  },
})
export class TiltDirective {
  private readonly el = inject(ElementRef<HTMLElement>);
  readonly tiltMax = input(10, { transform: numberAttribute });

  onMove(e: MouseEvent): void {
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = this.el.nativeElement.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    const max = this.tiltMax();
    this.el.nativeElement.style.transform =
      `perspective(800px) rotateX(${-dy * max}deg) rotateY(${dx * max}deg) scale3d(1.02, 1.02, 1.02)`;
  }

  onLeave(): void {
    this.el.nativeElement.style.transform = '';
  }
}
