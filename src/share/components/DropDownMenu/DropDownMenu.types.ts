import { ReactNode } from "react";

export interface DropDownMenuProps {
  items: DropDownItem[];
}

export interface DropDownItem {
  title: string;
  key: string;
  startContent?: ReactNode;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | undefined;
  className?: string;
  onClick?: () => void;
}
