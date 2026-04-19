import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FooterColumn, NavLink } from '../../core/models/navigation.model';

@Component({
  selector: 'app-footer',
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  protected readonly columns = signal<FooterColumn[]>([
    {
      heading: 'Product',
      links: [
        { label: 'The Platform', path: '/' },
        { label: 'Features', path: '/' },
        { label: 'Benefits', path: '/' },
        { label: 'Request a Demo', path: '/' }
      ],
    },
    {
      heading: 'Resources / Legal',
      links: [
        { label: 'About Us', path: '/' },
        { label: 'Privacy Policy', path: '/' },
        { label: 'Terms of Service', path: '/' },
        { label: 'Cookie Policy', path: '/' },
      ],
    },
  ]);

  protected readonly contactAddress = signal([
    'Makateb 2 Building Floor 4, Office 406',
    'Dubai Production City, Dubai',
    'United Arab Of Emirates',
  ]);

  protected readonly contactEmail = signal('admin@mediaalacarte.net');

  protected readonly socialLinks = signal<NavLink[]>([
    { label: 'Website', url: '/' },
    { label: 'Email', url: '/' },
    { label: 'Community', url: '/' },
  ]);

  protected readonly socialIcons: Record<string, string> = {
    Website: 'public',
    Email: 'alternate_email',
    Community: 'group',
  };

  protected readonly currentYear = new Date().getFullYear();

  protected scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
