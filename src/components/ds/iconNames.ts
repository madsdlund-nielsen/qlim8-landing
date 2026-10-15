// The icons copy may name (trust.items[].icon in src/content/marketing/types.ts).
// Lucide line icons only, by their Lucide names. The allow-list is plain data,
// with no JSX, so src/lib/marketingCopy.test.ts can import it under node; the
// Icon component (Icon.tsx) maps every name here to its component and
// re-exports the list. Adding an icon: add the name here and the import in
// Icon.tsx; the test fails for a name that is in one and not the other.
export const ICON_NAMES = [
  "Landmark",
  "FileCheck",
  "FileText",
  "FileSpreadsheet",
  "Users",
  "ShieldCheck",
  "BadgeCheck",
  "Eye",
  "Download",
  "Share2",
  "Leaf",
  "Sprout",
  "Calculator",
  "Link2",
  "Clock",
  "Lock",
  "Server",
  "Database",
  "Scale",
  "Handshake",
  "HeartHandshake",
  "Truck",
  "HardHat",
  "Factory",
  "Hammer",
  "Building2",
  "Zap",
  "Plug",
  "Search",
  "ListChecks",
  "ClipboardCheck",
  "Receipt",
  "Layers",
  "Target",
  "TrendingDown",
  "Globe",
  "Phone",
  "Mail",
  "Check",
] as const;

export type IconName = (typeof ICON_NAMES)[number];

export function isIconName(name: string): name is IconName {
  return (ICON_NAMES as readonly string[]).includes(name);
}
