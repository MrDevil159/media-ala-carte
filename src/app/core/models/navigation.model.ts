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
