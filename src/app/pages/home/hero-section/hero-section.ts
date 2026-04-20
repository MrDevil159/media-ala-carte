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
})
export class HeroSection {}
