import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ScrollRevealDirective } from '../../../shared/scroll-reveal/scroll-reveal.directive';

@Component({
  selector: 'app-contact-section',
  templateUrl: './contact-section.html',
  styleUrl: './contact-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ScrollRevealDirective],
})
export class ContactSection {
  protected readonly submitted = signal(false);
  protected readonly sending = signal(false);

  protected onSubmit(event: Event): void {
    event.preventDefault();
    this.sending.set(true);

    // Simulate form submission
    setTimeout(() => {
      this.sending.set(false);
      this.submitted.set(true);
    }, 1200);
  }
}
