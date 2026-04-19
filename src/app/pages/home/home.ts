import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroSection } from './hero-section/hero-section';
import { MarqueeRibbons } from './marquee-ribbons/marquee-ribbons';
import { ServicesSection } from './services-section/services-section';
import { WhyUsSection } from './why-us-section/why-us-section';
import { StatsSection } from './stats-section/stats-section';
import { CtaSection } from './cta-section/cta-section';
import { SectionSpinner } from '../../shared/section-spinner/section-spinner';

@Component({
  selector: 'app-home',
  imports: [HeroSection, ServicesSection, WhyUsSection, StatsSection, CtaSection, SectionSpinner],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {}
