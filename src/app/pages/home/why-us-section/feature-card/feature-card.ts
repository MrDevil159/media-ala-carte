import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FeatureCard } from '../../../../core/models/home.model';
import { TiltDirective } from '../../../../shared/tilt/tilt.directive';

@Component({
  selector: 'app-feature-card',
  imports: [TiltDirective],
  templateUrl: './feature-card.html',
  styleUrl: './feature-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureCardComponent {
  readonly card = input.required<FeatureCard>();
}
