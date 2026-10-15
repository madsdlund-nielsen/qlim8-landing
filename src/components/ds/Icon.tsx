// Lucide line icons, from the allow-list in iconNames.ts. Stroke 1.75, round
// ends, sage (the design's accent: BRAND.md "Ikoner"). Server component.
import {
  BadgeCheck,
  Building2,
  Calculator,
  Check,
  ClipboardCheck,
  Clock,
  Database,
  Download,
  Eye,
  Factory,
  FileCheck,
  FileSpreadsheet,
  FileText,
  Globe,
  Hammer,
  Handshake,
  HardHat,
  HeartHandshake,
  Landmark,
  Layers,
  Leaf,
  Link2,
  ListChecks,
  Lock,
  Mail,
  Phone,
  Plug,
  Receipt,
  Scale,
  Search,
  Server,
  Share2,
  ShieldCheck,
  Sprout,
  Target,
  TrendingDown,
  Truck,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { ICON_NAMES, isIconName, type IconName } from "./iconNames";

export { ICON_NAMES };
export type { IconName };

const ICONS: Record<IconName, LucideIcon> = {
  BadgeCheck, Building2, Calculator, Check, ClipboardCheck, Clock, Database, Download, Eye, Factory, FileCheck,
  FileSpreadsheet, FileText, Globe, Hammer, Handshake, HardHat, HeartHandshake, Landmark, Layers, Leaf, Link2,
  ListChecks, Lock, Mail, Phone, Plug, Receipt, Scale, Search, Server, Share2, ShieldCheck, Sprout, Target,
  TrendingDown, Truck, Users, Zap,
};

export function Icon({ name, className }: { name: string; className?: string }) {
  // A name outside the allow-list (a CMS value) renders a check, never nothing
  // and never a crash.
  const Cmp = isIconName(name) ? ICONS[name] : Check;
  return <Cmp aria-hidden="true" strokeWidth={1.75} className={className ?? "h-6 w-6 text-sage"} />;
}
