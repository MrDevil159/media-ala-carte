import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MarqueeRibbons } from '../marquee-ribbons/marquee-ribbons';
import { ScrollRevealDirective } from '../../../shared/scroll-reveal/scroll-reveal.directive';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.scss',
  imports: [MarqueeRibbons, ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSection {
  private platformId = inject(PLATFORM_ID);
  protected isMobile = signal(false);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.checkMobile();
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.checkMobile();
    }
  }

  private checkMobile() {
    this.isMobile.set(window.innerWidth < 1024);
  }
}
