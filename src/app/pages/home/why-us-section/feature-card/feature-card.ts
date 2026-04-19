import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FeatureCard } from '../../../../core/models/home.model';

@Component({
  selector: 'app-feature-card',
  templateUrl: './feature-card.html',
  styleUrl: './feature-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureCardComponent {
  readonly card = input.required<FeatureCard>();
}
