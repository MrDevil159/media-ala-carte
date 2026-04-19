import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { StatItem } from '../../../core/models/home.model';
import { OrbitingAvatars } from './orbiting-avatars/orbiting-avatars';

@Component({
  selector: 'app-stats-section',
  templateUrl: './stats-section.html',
  styleUrl: './stats-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [OrbitingAvatars],
})
export class StatsSection {
  protected readonly stats = signal<StatItem[]>([
    { value: '110+', label: 'Top Agencies', colorClass: 'primary' },
    { value: '1M', label: 'Advertisers', colorClass: 'primary' },
    {
      value: '98.99%',
      label: 'Seamless Transactions',
      colorClass: 'primary',
      icon: 'verified',
      fullWidth: true,
    },
  ]);
}
