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
  private renderer = inject(Renderer2);
  private el = inject(ElementRef);

  @HostListener('mouseenter')
  onMouseEnter() {
    if (!this.tooltipText) return;
    this.createTooltip();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.removeTooltip();
  }

  @HostListener('mousedown')
  onMouseDown() {
    this.removeTooltip();
  }

  ngOnDestroy() {
    this.removeTooltip();
  }

  private createTooltip() {
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

    // Position above the element
    const top = hostRect.top - tooltipRect.height - 10;
    const left = hostRect.left + (hostRect.width - tooltipRect.width) / 2;

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
