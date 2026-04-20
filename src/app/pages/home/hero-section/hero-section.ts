import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MarqueeRibbons } from '../marquee-ribbons/marquee-ribbons';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.scss',
  imports: [MarqueeRibbons, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSection {}
