import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { StatItem } from '../../../core/models/home.model';
import { OrbitingAvatars } from './orbiting-avatars/orbiting-avatars';
import { ScrollRevealDirective } from '../../../shared/scroll-reveal/scroll-reveal.directive';
import { CountUpDirective } from '../../../shared/count-up/count-up.directive';

@Component({
  selector: 'app-stats-section',
  templateUrl: './stats-section.html',
  styleUrl: './stats-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [OrbitingAvatars, ScrollRevealDirective, CountUpDirective],
})
export class StatsSection {
  protected readonly stats = signal<StatItem[]>([
    { value: '110+', countTarget: 110, countSuffix: '+', label: 'Top Agencies', colorClass: 'primary' },
    { value: '1M', countTarget: 1, countSuffix: 'M', label: 'Advertisers', colorClass: 'primary' },
    {
      value: '98.99%',
      countTarget: 98.99,
      countSuffix: '%',
      countDecimals: 2,
      label: 'Seamless Transactions',
      colorClass: 'primary',
      icon: 'verified',
      fullWidth: true,
    },
  ]);
}
