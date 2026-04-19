import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
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
export class Header {
  protected readonly theme = inject(ThemeService);

  protected readonly navLinks = signal<NavLink[]>([
    { label: 'The Platform', path: '/', isActive: true },
    { label: 'Features', path: '/' },
    { label: 'Benefits', path: '/' },
    { label: 'About Us', path: '/' },
    { label: 'Contact Us', path: '/' },
  ]);

  protected readonly mobileMenuOpen = signal(false);

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((open) => !open);
  }
}
