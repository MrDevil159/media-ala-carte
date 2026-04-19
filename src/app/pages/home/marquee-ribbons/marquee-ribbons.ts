import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-marquee-ribbons',
  templateUrl: './marquee-ribbons.html',
  styleUrl: './marquee-ribbons.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarqueeRibbons {
  private readonly topItems = signal([
    'We simplify media buying with smarter strategies, seamless execution, and measurable impact.'
  ]);

  private readonly bottomItems = signal([
    'Coming soon: Smarter media solutions for agencies and media owners!'
  ]);

  // Repeat items enough times to fill the full ribbon width for a seamless loop
  protected readonly topTrack = computed(() =>
    Array.from({ length: 4 }, () => this.topItems()).flat()
  );

  protected readonly bottomTrack = computed(() =>
    Array.from({ length: 4 }, () => this.bottomItems()).flat()
  );
}