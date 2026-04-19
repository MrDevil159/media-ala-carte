import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export interface AvatarOrbitItem {
  type: 'avatar';
  src: string;
  alt: string;
}

export interface DotOrbitItem {
  type: 'dot';
}

export type OrbitItem = AvatarOrbitItem | DotOrbitItem;

export interface RingConfig {
  radiusRem: number;
  durationS: number;
  /** Starting angle offset in degrees */
  initialDeg?: number;
  items: OrbitItem[];
}

interface PlacedItem {
  type: 'avatar' | 'dot';
  src: string;
  alt: string;
  x: number;
  y: number;
  floatDelay: string;
}

interface ProcessedRing extends RingConfig {
  radiusPx: number;
  placedItems: PlacedItem[];
}

const DEFAULT_RINGS: RingConfig[] = [
  {
    radiusRem: 10,
    durationS: 32,
    initialDeg: 30,
    items: [
      { type: 'avatar', src: 'https://i.pravatar.cc/150?img=32', alt: 'Community member' },
      { type: 'dot' },
      { type: 'avatar', src: 'https://i.pravatar.cc/150?img=47', alt: 'Community member' },
      { type: 'dot' },
    ],
  },
  {
    radiusRem: 18,
    durationS: 52,
    initialDeg: -20,
    items: [
      { type: 'avatar', src: 'https://i.pravatar.cc/150?img=11', alt: 'Community member' },
      { type: 'dot' },
      { type: 'avatar', src: 'https://i.pravatar.cc/150?img=25', alt: 'Community member' },
      { type: 'dot' },
      { type: 'avatar', src: 'https://i.pravatar.cc/150?img=44', alt: 'Community member' },
    ],
  },
  {
    radiusRem: 27,
    durationS: 72,
    initialDeg: 8,
    items: [
      { type: 'avatar', src: 'https://i.pravatar.cc/150?img=16', alt: 'Community member' },
      { type: 'dot' },
      { type: 'avatar', src: 'https://i.pravatar.cc/150?img=21', alt: 'Community member' },
      { type: 'dot' },
      { type: 'avatar', src: 'https://i.pravatar.cc/150?img=38', alt: 'Community member' },
      { type: 'dot' },
    ],
  },
];

@Component({
  selector: 'app-orbiting-avatars',
  templateUrl: './orbiting-avatars.html',
  styleUrl: './orbiting-avatars.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrbitingAvatars {
  readonly rings = input<RingConfig[]>(DEFAULT_RINGS);

  protected readonly processedRings = computed<ProcessedRing[]>(() =>
    this.rings().map(ring => {
      const radiusPx = ring.radiusRem * 16;
      const initialRad = ((ring.initialDeg ?? 0) * Math.PI) / 180;
      return {
        ...ring,
        radiusPx,
        placedItems: ring.items.map((item, i): PlacedItem => {
          const angle = initialRad + (i / ring.items.length) * 2 * Math.PI;
          return {
            type: item.type,
            src: item.type === 'avatar' ? item.src : '',
            alt: item.type === 'avatar' ? item.alt : '',
            x: Math.cos(angle) * radiusPx,
            y: Math.sin(angle) * radiusPx,
            floatDelay: `${-(i * 1.4)}s`,
          };
        }),
      };
    })
  );

  protected readonly clipperHeightRem = computed(() => {
    const maxRadius = Math.max(...this.rings().map(r => r.radiusRem));
    // Center sits at top: 0; we only show the bottom semicircle,
    // so height = radius + half-avatar overflow (1.75rem).
    return maxRadius + 1.75;
  });
}
