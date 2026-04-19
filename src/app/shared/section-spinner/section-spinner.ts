import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-section-spinner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="section-spinner" aria-label="Loading section" aria-busy="true">
      <span class="section-spinner__ring" aria-hidden="true"></span>
    </div>
  `,
  styles: `
    :host { display: block; }

    .section-spinner {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 200px;

      &__ring {
        display: block;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: var(--radius-full);
        border: 3px solid rgba(255, 139, 154, 0.2);
        border-top-color: var(--color-primary);
        animation: spin 0.7s linear infinite;
      }
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `,
})
export class SectionSpinner {}
