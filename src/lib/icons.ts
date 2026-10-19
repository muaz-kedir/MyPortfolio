import {
  BrainCircuit,
  Cpu,
  Gauge,
  Layers,
  Lightbulb,
  MousePointerClick,
  Network,
  Rocket,
  Shield,
  Sparkles,
  Target,
  Users,
  Wand2,
  Zap,
  type LucideIcon,
} from "lucide-react";

/**
 * Icon registry for editable "features" (Why Work With Me). Admins pick a name
 * from this map, which is stored as a plain string in Firestore.
 */
export const FEATURE_ICONS: Record<string, LucideIcon> = {
  brain: BrainCircuit,
  layers: Layers,
  rocket: Rocket,
  pointer: MousePointerClick,
  cpu: Cpu,
  network: Network,
  target: Target,
  lightbulb: Lightbulb,
  sparkles: Sparkles,
  zap: Zap,
  shield: Shield,
  gauge: Gauge,
  users: Users,
  wand: Wand2,
};

export const FEATURE_ICON_NAMES = Object.keys(FEATURE_ICONS);

export function resolveFeatureIcon(name: string | undefined): LucideIcon {
  if (name && FEATURE_ICONS[name]) {
    return FEATURE_ICONS[name];
  }
  return Sparkles;
}
