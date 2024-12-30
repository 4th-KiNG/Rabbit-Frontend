import { RefObject } from "react";

export interface ImageProps {
  url: string | undefined;
  className?: string;
  onClick?: () => void;
  ref?: RefObject<HTMLImageElement>;
}
