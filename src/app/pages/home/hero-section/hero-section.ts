import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MarqueeRibbons } from '../marquee-ribbons/marquee-ribbons';
import { ScrollRevealDirective } from '../../../shared/scroll-reveal/scroll-reveal.directive';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.scss',
  imports: [MarqueeRibbons, NgOptimizedImage, ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // ── Mouse-reactive glow (commented out — laggy on low-end devices) ──────
  // host: {
  //   '(mousemove)': 'onMouseMove($event)',
  //   '(mouseleave)': 'onMouseLeave()',
  //   '(mousedown)': 'onMouseDown()',
  //   '(mouseup)': 'onMouseUp()',
  // },
})
export class HeroSection {
  // private readonly el = inject(ElementRef<HTMLElement>);
  // private readonly platformId = inject(PLATFORM_ID);
  // private targetAx = 0; private targetAy = 0;
  // private targetBx = 0; private targetBy = 0;
  // private currentAx = 0; private currentAy = 0;
  // private currentBx = 0; private currentBy = 0;
  // private rafId?: number;
  // private isMouseInside = false;
  //
  // constructor() {
  //   afterNextRender(() => {
  //     if (!isPlatformBrowser(this.platformId)) return;
  //     this.loop();
  //   });
  // }
  //
  // onMouseMove(e: MouseEvent): void {
  //   const rect = this.el.nativeElement.getBoundingClientRect();
  //   const dx = (e.clientX - rect.left) / rect.width - 0.5;
  //   const dy = (e.clientY - rect.top) / rect.height - 0.5;
  //   const MAX = 200;
  //   this.targetAx = -dx * MAX; this.targetAy = -dy * MAX;
  //   this.targetBx =  dx * MAX; this.targetBy =  dy * MAX;
  //   if (!this.isMouseInside) {
  //     this.isMouseInside = true;
  //     this.el.nativeElement.classList.add('mouse-active');
  //   }
  // }
  //
  // onMouseLeave(): void {
  //   this.isMouseInside = false;
  //   this.targetAx = this.targetAy = this.targetBx = this.targetBy = 0;
  //   this.el.nativeElement.classList.remove('mouse-active', 'mouse-down');
  // }
  //
  // onMouseDown(): void { this.el.nativeElement.classList.add('mouse-down'); }
  // onMouseUp(): void   { this.el.nativeElement.classList.remove('mouse-down'); }
  //
  // private loop(): void {
  //   const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  //   const SPEED = 0.1;
  //   this.currentAx = lerp(this.currentAx, this.targetAx, SPEED);
  //   this.currentAy = lerp(this.currentAy, this.targetAy, SPEED);
  //   this.currentBx = lerp(this.currentBx, this.targetBx, SPEED);
  //   this.currentBy = lerp(this.currentBy, this.targetBy, SPEED);
  //   const s = this.el.nativeElement.style;
  //   s.setProperty('--glow-a-x', `${this.currentAx}px`);
  //   s.setProperty('--glow-a-y', `${this.currentAy}px`);
  //   s.setProperty('--glow-b-x', `${this.currentBx}px`);
  //   s.setProperty('--glow-b-y', `${this.currentBy}px`);
  //   this.rafId = requestAnimationFrame(() => this.loop());
  // }
  //
  // ngOnDestroy(): void {
  //   if (this.rafId !== undefined) cancelAnimationFrame(this.rafId);
  // }
}
