import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ServiceCard } from '../../../../core/models/home.model';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.html',
  styleUrl: './service-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceCardComponent {
  readonly card = input.required<ServiceCard>();
  readonly active = input<boolean>(false);
}
