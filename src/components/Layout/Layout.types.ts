import { type TablerIconsProps } from '@tabler/icons-react';
import { type ReactElement } from 'react';

type TablerIcon = (props: TablerIconsProps) => JSX.Element;

export type LayoutProps = {
  children: ReactElement;
};

export type NavbarLinkProps = {
  icon: TablerIcon;
  label: string;
  active?: boolean;
  href?: string;
  onClick?: () => void;
};

export type NavLinkType = {
  icon: TablerIcon;
  label: string;
  href: string;
};
