import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroSection } from './hero-section/hero-section';
import { ServicesSection } from './services-section/services-section';
import { WhyUsSection } from './why-us-section/why-us-section';
import { StatsSection } from './stats-section/stats-section';
import { CtaSection } from './cta-section/cta-section';
import { ContactSection } from './contact-section/contact-section';
import { SectionSpinner } from '../../shared/section-spinner/section-spinner';
import { SpotlightDirective } from '../../shared/spotlight/spotlight.directive';

@Component({
  selector: 'app-home',
  imports: [HeroSection, ServicesSection, WhyUsSection, StatsSection, CtaSection, ContactSection, SectionSpinner, SpotlightDirective],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {}
