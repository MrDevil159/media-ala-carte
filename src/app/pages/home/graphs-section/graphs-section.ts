import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TooltipDirective } from '../../../shared/tooltip/tooltip.directive';

export interface BarPoint  { month: string; height: number; tooltip: string; }
export interface LinePoint { month: string; tooltip: string; }
export interface DonutSlice { label: string; pct: number; tooltip: string; color: string; }

export interface GraphItem {
  title: string;
  desc: string;
  type: 'line' | 'bars' | 'donut';
  badge: string;
  longDesc: string;
  bars?: BarPoint[];
  linePoints?: LinePoint[];
  donutSlices?: DonutSlice[];
}

@Component({
  selector: 'app-graphs-section',
  templateUrl: './graphs-section.html',
  styleUrl: './graphs-section.scss',
  imports: [TooltipDirective],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphsSectionComponent {

  protected readonly graphs = signal<GraphItem[]>([
    {
      title: 'AI-Driven Insights',
      desc: 'Predictive media planning',
      type: 'line',
      badge: 'Plan',
      longDesc: 'Harness machine learning to forecast campaign outcomes. Media Alacarte simplifies media planning to help businesses grow smarter and allocate budgets efficiently.',
      linePoints: [
        { month: 'Jan', tooltip: '142 campaigns' },
        { month: 'Mar', tooltip: '189 campaigns' },
        { month: 'May', tooltip: '97 campaigns'  },
        { month: 'Jul', tooltip: '215 campaigns' },
        { month: 'Sep', tooltip: '174 campaigns' },
        { month: 'Nov', tooltip: '231 campaigns' },
      ]
    },
    {
      title: 'Cross-Channel ROI',
      desc: 'Unified revenue analytics',
      type: 'bars',
      badge: 'Analyze',
      longDesc: 'Monitor real-time analytics to track performance across all platforms. Empower your team to make smarter decisions and maximize your overall media ROI.',
      bars: [
        { month: 'Jul', height: 55, tooltip: '$1.2M' },
        { month: 'Aug', height: 72, tooltip: '$1.8M' },
        { month: 'Sep', height: 48, tooltip: '$0.9M' },
        { month: 'Oct', height: 84, tooltip: '$2.4M' },
        { month: 'Nov', height: 62, tooltip: '$1.5M' },
        { month: 'Dec', height: 95, tooltip: '$3.1M' },
      ]
    },
    {
      title: 'Media Lifecycle',
      desc: 'Cross-channel delivery',
      type: 'line',
      badge: 'Execute',
      longDesc: 'Streamline the entire media lifecycle from execution to audience delivery. Track reach seamlessly to achieve better results and scale sustainable growth.',
      linePoints: [
        { month: 'Jan', tooltip: '4.2M reach' },
        { month: 'Mar', tooltip: '6.8M reach' },
        { month: 'May', tooltip: '3.1M reach' },
        { month: 'Jul', tooltip: '9.5M reach' },
        { month: 'Sep', tooltip: '7.2M reach' },
        { month: 'Nov', tooltip: '11.4M reach' },
      ]
    },
    {
      title: 'Smart Allocation',
      desc: 'Optimized channel mix',
      type: 'donut',
      badge: 'Strategy',
      longDesc: 'Visualize your campaign strategy. Media Alacarte combines cross-channel campaign management to ensure the perfect mix of digital, audio, and streaming media.',
      donutSlices: [
        { label: 'Online', pct: 62, color: 'var(--color-primary)',     tooltip: 'Digital & Social — 62%' },
        { label: 'Posters',  pct: 16, color: 'var(--color-secondary)',   tooltip: 'Posters — 16%' },
        { label: 'TV',     pct: 22, color: 'var(--color-primary-dim)', tooltip: 'TV & Streaming — 22%'  },
      ]
    },
  ]);

}
