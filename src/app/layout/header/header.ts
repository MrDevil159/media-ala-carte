import { afterNextRender, ChangeDetectionStrategy, Component, inject, OnDestroy, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavLink } from '../../core/models/navigation.model';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage, RouterLink],
})
export class Header implements OnDestroy {
  protected readonly theme = inject(ThemeService);

  protected readonly navLinks = signal<NavLink[]>([
    { label: 'The Platform', path: '/', isActive: true },
    { label: 'Features', path: '/' },
    { label: 'Benefits', path: '/' },
    { label: 'About Us', path: '/' },
    { label: 'Contact Us', path: '/' },
  ]);

  protected readonly mobileMenuOpen = signal(false);
  protected readonly isScrolled = signal(false);

  private readonly onScroll = () => {
    this.isScrolled.set(window.scrollY > 30);
  };

  constructor() {
    afterNextRender(() => {
      this.onScroll();
      window.addEventListener('scroll', this.onScroll, { passive: true });
    });
  }

  protected readonly themeBurst = signal(false);

  toggleTheme(): void {
    this.theme.toggle();
    this.themeBurst.set(true);
    setTimeout(() => this.themeBurst.set(false), 600);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((open) => !open);
  }

  ngOnDestroy(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.onScroll);
    }
  }
}
