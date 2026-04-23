import { afterNextRender, ChangeDetectionStrategy, Component, inject, OnDestroy, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ThemeService } from '../../core/services/theme.service';
import { NavItem } from '../../core/models/navigation.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
})
export class Header implements OnDestroy {
  protected readonly theme = inject(ThemeService);

  protected readonly navLinks = signal<NavItem[]>([
    { label: 'The Platform', sectionId: 'hero', isActive: true },
    { label: 'Services', sectionId: 'services' },
    { label: 'Why Us', sectionId: 'why-us' },
    { label: 'Stats', sectionId: 'stats' },
    { label: 'Contact Us', sectionId: 'contact' },
  ]);

  protected readonly mobileMenuOpen = signal(false);
  protected readonly isScrolled = signal(false);
  protected activeSection = signal('hero');

  private readonly onScroll = () => {
    this.isScrolled.set(window.scrollY > 30);
    this.updateActiveSection();
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

  scrollTo(sectionId: string): void {
    const el = document.getElementById(sectionId);
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - headerOffset, behavior: 'smooth' });
    }
    this.activeSection.set(sectionId);
    this.mobileMenuOpen.set(false);
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.mobileMenuOpen.set(false);
  }

  private updateActiveSection(): void {
    const sections = ['hero', 'services', 'why-us', 'stats', 'contact', 'footer'];
    const headerOffset = 120;
    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i]);
      if (el && el.getBoundingClientRect().top <= headerOffset) {
        this.activeSection.set(sections[i]);
        return;
      }
    }
    this.activeSection.set('hero');
  }

  ngOnDestroy(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.onScroll);
    }
  }
}
