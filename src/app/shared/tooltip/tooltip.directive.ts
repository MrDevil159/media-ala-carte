import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
  inject,
  OnDestroy
} from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true,
})
export class TooltipDirective implements OnDestroy {
  @Input('appTooltip') tooltipText = '';
  private tooltipElement: HTMLElement | null = null;
  private lastCreateTime = 0;
  private renderer = inject(Renderer2);
  private el = inject(ElementRef);

  @HostListener('mouseenter')
  onMouseEnter() {
    if (!this.tooltipText || this.tooltipElement) return;
    this.createTooltip();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.removeTooltip();
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.tooltipText) return;
    event.stopPropagation();

    const now = Date.now();
    if (this.tooltipElement && (now - this.lastCreateTime > 300)) {
      this.removeTooltip();
    } else if (!this.tooltipElement) {
      this.createTooltip();
    }
  }

  @HostListener('document:click')
  onDocumentClick() {
    this.removeTooltip();
  }

  @HostListener('window:scroll')
  onScroll() {
    this.removeTooltip();
  }

  ngOnDestroy() {
    this.removeTooltip();
  }

  private createTooltip() {
    this.lastCreateTime = Date.now();
    this.tooltipElement = this.renderer.createElement('div');
    this.renderer.addClass(this.tooltipElement, 'global-tooltip');
    
    const textSpan = this.renderer.createElement('span');
    this.renderer.setProperty(textSpan, 'innerHTML', this.tooltipText);
    this.renderer.appendChild(this.tooltipElement, textSpan);
    
    // Add arrow
    const arrow = this.renderer.createElement('div');
    this.renderer.addClass(arrow, 'global-tooltip-arrow');
    this.renderer.appendChild(this.tooltipElement, arrow);

    this.renderer.appendChild(document.body, this.tooltipElement);

    const hostRect = this.el.nativeElement.getBoundingClientRect();
    const tooltipRect = this.tooltipElement!.getBoundingClientRect();

    // Determine vertical placement
    let top = hostRect.top - tooltipRect.height - 10;
    let placement = 'top';

    // If it bleeds off the top of the viewport, flip to bottom
    if (top < 10) {
      top = hostRect.bottom + 10;
      placement = 'bottom';
      this.renderer.addClass(this.tooltipElement, 'global-tooltip--bottom');
    }

    // Determine horizontal placement
    let left = hostRect.left + (hostRect.width - tooltipRect.width) / 2;
    
    // Keep within horizontal viewport bounds
    const margin = 10;
    if (left < margin) {
      left = margin;
    } else if (left + tooltipRect.width > window.innerWidth - margin) {
      left = window.innerWidth - tooltipRect.width - margin;
    }

    this.renderer.setStyle(this.tooltipElement, 'position', 'absolute');
    this.renderer.setStyle(this.tooltipElement, 'top', `${top + window.scrollY}px`);
    this.renderer.setStyle(this.tooltipElement, 'left', `${left + window.scrollX}px`);
    
    // Trigger animation
    requestAnimationFrame(() => {
      if (this.tooltipElement) {
        this.renderer.addClass(this.tooltipElement, 'global-tooltip--visible');
      }
    });
  }

  private removeTooltip() {
    if (this.tooltipElement) {
      this.renderer.removeChild(document.body, this.tooltipElement);
      this.tooltipElement = null;
    }
  }
}
