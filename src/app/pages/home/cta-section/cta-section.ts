import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-cta-section',
  templateUrl: './cta-section.html',
  styleUrl: './cta-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CtaSection {}
