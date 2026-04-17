import * as Icons from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: keyof typeof Icons;
  label?: string;
  isExternal?: boolean;
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}
