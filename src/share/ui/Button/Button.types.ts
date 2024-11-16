import { ReactNode } from "react";

export interface IButton {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}
