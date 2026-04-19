import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MarqueeRibbons } from '../marquee-ribbons/marquee-ribbons';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.scss',
  imports: [MarqueeRibbons],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSection {}
