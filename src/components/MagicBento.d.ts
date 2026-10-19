import type { CSSProperties, FC, MouseEventHandler, ReactNode } from "react";

export type MagicBentoVisual =
  "analytics" | "dashboard" | "collaboration" | "automation" | "integration" | "security";

export type MagicBentoItem = {
  id?: string | number;
  label?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  image?: string;
  visual?: ReactNode | MagicBentoVisual;
  content?: ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  colSpan?: number;
  rowSpan?: number;
};

export type MagicBentoProps = {
  items?: MagicBentoItem[];
  columns?: number;
  rowHeight?: number;
  gap?: number;
  radius?: number;
  theme?: "dark" | "light";
  glowColor?: string;
  textAutoHide?: boolean;
  enableBorderGlow?: boolean;
  enableSpotlight?: boolean;
  spotlightRadius?: number;
  enableStars?: boolean;
  particleCount?: number;
  enableTilt?: boolean;
  enableMagnetism?: boolean;
  clickEffect?: boolean;
  intro?: boolean;
  disableAnimations?: boolean;
  onItemClick?: (item: MagicBentoItem, index: number) => void;
  className?: string;
  style?: CSSProperties;
};

declare const MagicBento: FC<MagicBentoProps>;

export default MagicBento;
