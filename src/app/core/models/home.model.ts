export interface ServiceCard {
  readonly imageUrl: string;
  readonly imageAlt: string;
  readonly imagePosition?: string;
  readonly badge: string;
  readonly badgeColor: 'primary' | 'secondary';
  readonly title: string;
  readonly description: string;
  readonly accentColor: 'primary' | 'secondary';
}

export interface FeatureCard {
  readonly icon: string;
  readonly iconColor: 'primary' | 'secondary' | 'primary-dim';
  readonly title: string;
  readonly description: string;
}

export interface StatItem {
  readonly value: string;
  readonly label: string;
  readonly colorClass: 'primary' | 'secondary';
  readonly icon?: string;
  readonly fullWidth?: boolean;
}

export interface ChecklistItem {
  readonly text: string;
}
