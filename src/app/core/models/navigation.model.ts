export interface NavLink {
  readonly label: string;
  readonly path?: string;
  readonly url?: string;
  readonly isActive?: boolean;
}

export interface FooterColumn {
  readonly heading: string;
  readonly links: ReadonlyArray<NavLink>;
}

export interface NavItem {
  label: string;
  sectionId: string;
  isActive?: boolean;
}