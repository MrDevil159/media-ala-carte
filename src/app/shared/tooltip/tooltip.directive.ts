import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, inject, input, OnDestroy, Renderer2, afterNextRender } from '@angular/core';
import { fromEvent, Subject, takeUntil } from 'rxjs';

@Directive({
  selector: '[appTooltip]',
  standalone: true,
})
export class TooltipDirective implements OnDestroy {
  readonly text = input('', { alias: 'appTooltip' });
  
  private readonly document = inject(DOCUMENT);
  private readonly renderer = inject(Renderer2);
  private readonly el = inject(ElementRef<HTMLElement>).nativeElement;
  
  private tooltipEl?: HTMLElement;
  private unlistens: (() => void)[] = [];
  private lastOpen = 0;
  private destroy$ = new Subject<void>();

  constructor() {
    afterNextRender(() => {
      fromEvent<MouseEvent>(this.el, 'mouseenter')
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.show());

      fromEvent<MouseEvent>(this.el, 'mouseleave')
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.hide());

      fromEvent<MouseEvent>(this.el, 'click')
        .pipe(takeUntil(this.destroy$))
        .subscribe((e) => this.toggle(e));
    });
  }

  show() {
    if (!this.text() || this.tooltipEl) return;

    // 1. Create Tooltip
    this.tooltipEl = this.renderer.createElement('div');
    this.renderer.addClass(this.tooltipEl, 'global-tooltip');
    this.tooltipEl!.innerHTML = `<span>${this.text()}</span><div class="global-tooltip-arrow"></div>`;
    this.renderer.appendChild(this.document.body, this.tooltipEl);

    // 2. Position it
    this.position();
    this.lastOpen = Date.now();

    // 3. Optimized Listeners: Only listen to global events while visible
    this.unlistens.push(
      this.renderer.listen('window', 'scroll', () => this.hide()),
      this.renderer.listen('document', 'click', () => this.hide())
    );

    requestAnimationFrame(() => this.tooltipEl?.classList.add('global-tooltip--visible'));
  }

  hide() {
    if (this.tooltipEl) {
      this.renderer.removeChild(this.document.body, this.tooltipEl);
      this.tooltipEl = undefined;
    }
    // Cleanup global listeners immediately
    this.unlistens.forEach(fn => fn());
    this.unlistens = [];
  }

  toggle(e: MouseEvent) {
    e.stopPropagation();
    // Prevent immediate closing on mobile/click if just opened
    if (this.tooltipEl && Date.now() - this.lastOpen < 300) return;
    this.tooltipEl ? this.hide() : this.show();
  }

  private position() {
    if (!this.tooltipEl) return;
    const host = this.el.getBoundingClientRect();
    const tip = this.tooltipEl.getBoundingClientRect();
    const margin = 10;

    let top = host.top - tip.height - margin;
    let left = host.left + (host.width - tip.width) / 2;

    // Flip to bottom if off-screen top
    if (top < margin) {
      top = host.bottom + margin;
      this.renderer.addClass(this.tooltipEl, 'global-tooltip--bottom');
    }

    // Keep within horizontal bounds
    left = Math.max(margin, Math.min(left, window.innerWidth - tip.width - margin));

    this.renderer.setStyle(this.tooltipEl, 'top', `${top + window.scrollY}px`);
    this.renderer.setStyle(this.tooltipEl, 'left', `${left + window.scrollX}px`);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.hide();
  }
}
