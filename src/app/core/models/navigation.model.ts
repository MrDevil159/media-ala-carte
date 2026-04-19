export interface NavLink {
  readonly label: string;
  readonly href: string;
  readonly isActive?: boolean;
}

export interface FooterColumn {
  readonly heading: string;
  readonly links: ReadonlyArray<NavLink>;
}
