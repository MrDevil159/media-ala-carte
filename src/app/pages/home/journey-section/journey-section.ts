import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-journey-section',
  templateUrl: './journey-section.html',
  styleUrl: './journey-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JourneySection {}
