import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { FooterColumn, NavLink } from '../../core/models/navigation.model';

@Component({
  selector: 'app-footer',
  imports: [NgOptimizedImage],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  protected readonly columns = signal<FooterColumn[]>([
    {
      heading: 'Product',
      links: [
        { label: 'The Platform', href: '#' },
        { label: 'Features', href: '#' },
        { label: 'Benefits', href: '#' },
        { label: 'Request a Demo', href: '#' }
      ],
    },
    {
      heading: 'Resources / Legal',
      links: [
        { label: 'About Us', href: '#' },
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
        { label: 'Cookie Policy', href: '#' },
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
    { label: 'Website', href: '#' },
    { label: 'Email', href: '#' },
    { label: 'Community', href: '#' },
  ]);

  protected readonly socialIcons: Record<string, string> = {
    Website: 'public',
    Email: 'alternate_email',
    Community: 'group',
  };

  protected readonly currentYear = new Date().getFullYear();
}
