import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { fromEvent, map, startWith } from 'rxjs';
import { ServiceCard } from '../../../core/models/home.model';
import { ServiceCardComponent } from './service-card/service-card';
import { ScrollRevealDirective } from '../../../shared/scroll-reveal/scroll-reveal.directive';

@Component({
  selector: 'app-services-section',
  imports: [ServiceCardComponent, ScrollRevealDirective],
  templateUrl: './services-section.html',
  styleUrl: './services-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesSection {
  private readonly window = inject(DOCUMENT).defaultView!;

  protected readonly isMobile = toSignal(
    fromEvent(this.window, 'resize').pipe(
      startWith(null),
      map(() => this.window.innerWidth < 768)
    ),
    { initialValue: this.window.innerWidth < 768 }
  );

  protected readonly activeIndex = signal(0);

  protected setActive(index: number): void {
    this.activeIndex.set(index);
  }

  protected isActive = computed(() => (index: number) =>
    this.isMobile() || this.activeIndex() === index
  );

  protected readonly services = signal<ServiceCard[]>([
    {
      imageUrl: '/assets/advertisers.webp',
      imageAlt: 'Sophisticated workspace with analytics monitors',
      imagePosition: 'center left',
      badge: 'FOR BRANDS',
      badgeColor: 'primary',
      title: 'Advertisers',
      description:
        'Create, distribute and manage your campaign across multiple channels.',
      accentColor: 'primary',
    },
    {
      imageUrl: '/assets/agencies.webp',
      imageAlt: 'Creative agency team brainstorming around interactive table',
      imagePosition: 'center right',
      badge: 'FOR TEAMS',
      badgeColor: 'primary',
      title: 'Agencies',
      description:
        'Get new clients and contracts and enhance the workflow with automatised tools.',
      accentColor: 'primary',
    },
    {
      imageUrl: '/assets/media_owners.webp',
      imageAlt: 'High-tech broadcast master control room',
      imagePosition: 'center left',
      badge: 'FOR PUBLISHERS',
      badgeColor: 'primary',
      title: 'Media Owners',
      description:
        'Get a new stream of bookings, manage campaigns and contracts all in one place.',
      accentColor: 'primary',
    },
  ]);
}
