import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ChecklistItem, FeatureCard } from '../../../core/models/home.model';
import { FeatureCardComponent } from './feature-card/feature-card';
import { ScrollRevealDirective } from '../../../shared/scroll-reveal/scroll-reveal.directive';
import { SpotlightDirective } from '../../../shared/spotlight/spotlight.directive';

@Component({
  selector: 'app-why-us-section',
  imports: [FeatureCardComponent, ScrollRevealDirective, SpotlightDirective],
  templateUrl: './why-us-section.html',
  styleUrl: './why-us-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhyUsSection {
  protected readonly features = signal<FeatureCard[]>([
    {
      icon: 'dynamic_form',
      iconColor: 'primary',
      title: 'Campaign Planning',
      description: 'Plan and optimize your ad campaigns with datadriven insights and seamless collaboration for maximum impact.',
      path: '/'
    },
    {
      icon: 'shopping_cart',
      iconColor: 'primary',
      title: 'Media Buying',
      description: 'Effortlessly book media slots with AI-powered automation, ensuring cost efficiency and better reach.',
      path: '/'
    },
    {
      icon: 'rocket_launch',
      iconColor: 'primary',
      title: 'Ad Distribution',
      description: 'Distribute ads across multiple channels while ensuring precise targeting and real-time tracking.',
      path: '/'
    },
    {
      icon: 'insights',
      iconColor: 'primary',
      title: 'Performance Analytics',
      description: 'Gain actionable insights with real-time performance tracking to maximize your ROI and refine future strategies..',
      path: '/'
    },
  ]);

  protected readonly checklist = signal<ChecklistItem[]>([
    { text: 'Integrated API for seamless CRM and ERP connectivity.' },
    { text: 'Blockchain-verified transaction logs for absolute transparency.' },
    { text: 'Global compliance with GDPR, CCPA, and regional media laws.' },
  ]);
}

