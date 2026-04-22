export interface ServiceCard {
  readonly imageUrl: string;
  readonly imageAlt: string;
  readonly imagePosition?: string;
  readonly badge: string;
  readonly title: string;
  readonly description: string;
}

export interface FeatureCard {
  readonly icon: string;
  readonly iconColor: 'primary' | 'secondary' | 'primary-dim';
  readonly title: string;
  readonly description: string;
  readonly path?: string;
}

export interface StatItem {
  readonly value: string;
  readonly label: string;
  readonly icon?: string;
  readonly fullWidth?: boolean;
  readonly countTarget?: number;
  readonly countSuffix?: string;
  readonly countDecimals?: number;
}

export interface ChecklistItem {
  readonly text: string;
}
