import { afterNextRender, ChangeDetectionStrategy, Component, OnDestroy, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { inject as injectAnalytics } from '@vercel/analytics';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { PageLoader } from './shared/page-loader/page-loader.directive';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  hostDirectives: [PageLoader],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnDestroy {
  protected readonly showScrollTop = signal(false);

  private readonly onScroll = () => {
    this.showScrollTop.set(window.scrollY > 400);
  };

  constructor() {
    afterNextRender(() => {
      // Initialize Vercel Web Analytics
      injectAnalytics({
        mode: 'auto',
        debug: false,
      });
      
      window.addEventListener('scroll', this.onScroll, { passive: true });
    });
  }

  protected scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngOnDestroy(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.onScroll);
    }
  }
}
