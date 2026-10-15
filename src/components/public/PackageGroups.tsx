// The package page once the app's catalog sells something by itself: three
// groups (start for free, buy it yourself, talk to us) and the comparison of
// the company packages, all from GET /api/public/packages. Server component.
//
// A package's curated name and tagline still come from the CMS-editable page
// copy when it has an entry for the package key. Its list is what the API
// says it adds over the package before it (packageFeatures): a curated list
// is shown only for a package the API lists nothing for. A capability the app
// has not built is listed marked "Planlagt", never as built.
import { Button } from "@/components/ds/Button";
import { DEMO_HREF, DEMO_LABEL } from "@/content/cta";
import {
  comparisonSections,
  ctaLabel,
  groupPackages,
  packageFeatures,
  priceLines,
  salesLine,
  trialLine,
  type ComparisonCell,
  type ComparisonRow,
  type PackageGroup,
  type PublicPackage,
  type PublicPackages,
} from "@/lib/packageView";

export interface PackageCardCopy {
  name?: string;
  tagline?: string;
  /** Shown only for a package the API lists no capabilities for. */
  features?: string[];
}

const GROUP_TITLES: Record<PackageGroup, { title: string; body: string }> = {
  free: { title: "Kom gratis i gang", body: "Opret jer selv og kom i gang i dag." },
  selfServe: { title: "Køb selv", body: "Faktureres årligt. Priserne er ekskl. moms." },
  contact: { title: "Kontakt os", body: "Vi finder pakken sammen med jer efter en demo." },
};

function Cell({ value }: { value: ComparisonCell | undefined }) {
  if (value === undefined || value === false) return <span className="block text-center text-muted-foreground">-</span>;
  if (value === true) return <span className="block text-center text-primary">✓</span>;
  return <span className="block text-center text-trust font-medium text-foreground leading-tight">{value}</span>;
}

/** The mark on a line or row that is on the roadmap, not built. */
function PlannedMark() {
  return (
    <span className="ml-2 inline-block rounded-full border border-border-strong px-2 py-0.5 align-middle text-trust font-medium text-muted-foreground" data-testid="planned-mark">
      Planlagt
    </span>
  );
}

function PackageCard({
  data,
  pkg,
  copy,
  anchorId,
}: {
  data: PublicPackages;
  pkg: PublicPackage;
  copy?: PackageCardCopy;
  anchorId?: string;
}) {
  const price = priceLines(pkg);
  const { label: includedLabel, entries: features } = packageFeatures(data, pkg, copy?.features);
  const sales = price ? null : salesLine(pkg);
  const href = pkg.cta.kind === "demo" || !pkg.cta.url ? DEMO_HREF : pkg.cta.url;
  const label = pkg.cta.kind === "demo" ? DEMO_LABEL : ctaLabel(pkg);
  const primary = pkg.cta.kind !== "demo";
  return (
    <div id={anchorId} className="bg-card rounded-lg border border-border shadow-soft p-6 flex flex-col" data-testid={`plan-${pkg.key}`}>
      <div className="mb-4">
        <h3 className="mb-1">{copy?.name ?? pkg.name}</h3>
        {(copy?.tagline ?? pkg.tagline ?? pkg.audience) && (
          <p className="text-body-sm text-muted-foreground">{copy?.tagline ?? pkg.tagline ?? pkg.audience}</p>
        )}
      </div>
      {sales && (
        <div className="mb-4" data-testid={`price-${pkg.key}`}>
          <p className="font-display text-2xl font-medium text-primary">{sales}</p>
        </div>
      )}
      {price && (
        <div className="mb-4" data-testid={`price-${pkg.key}`}>
          <p className="font-display text-2xl font-medium text-primary">{price.main}</p>
          {price.note && <p className="text-trust text-muted-foreground mt-1">{price.note}</p>}
          {trialLine(pkg) && (
            <p className="text-trust font-semibold text-primary mt-2" data-testid={`trial-${pkg.key}`}>
              {trialLine(pkg)}
            </p>
          )}
        </div>
      )}
      <Button
        href={href}
        variant={primary ? "primary" : "outline"}
        full
        className="mb-6"
        data-testid={`button-${pkg.cta.kind}-${pkg.key}`}
      >
        {label}
      </Button>
      {features.length > 0 && (
        <>
          {includedLabel && <p className="font-semibold text-foreground text-body-sm mb-3">{includedLabel}:</p>}
          <ul className="space-y-1.5 flex-1 text-body-sm text-foreground">
            {features.map((f) => (
              <li key={f.text} className="flex gap-2.5">
                <span className="mt-2 h-1 w-2.5 shrink-0 bg-sage" aria-hidden="true" />
                <span>
                  {f.text}
                  {f.planned && <PlannedMark />}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export function PackageGroups({
  data,
  cardCopy = {},
  comparisonTitle,
}: {
  data: PublicPackages;
  cardCopy?: Record<string, PackageCardCopy | undefined>;
  comparisonTitle: string;
}) {
  const groups = groupPackages(data);
  // "Opret gratis rådgiver-konto" in page copy links to /priser#raadgivere: the
  // anchor sits on the first advisor package, wherever its group puts it.
  const firstAdvisorKey = [...data.packages].sort((a, b) => a.displayRank - b.displayRank).find((p) => p.accountType === "advisor")?.key;
  const order: PackageGroup[] = ["free", "selfServe", "contact"];
  const columns = data.comparison.packages;
  const sections = comparisonSections(data);
  const rowCount = sections ? sections.reduce((n, sec) => n + sec.rows.length, 0) : data.comparison.rows.length;
  let rowIndex = 0;
  const renderRow = (row: ComparisonRow) => {
    const i = rowIndex++;
    return (
      <tr key={row.key} className={`border-b border-border ${i % 2 === 0 ? "" : "bg-band"}`} data-testid={`feature-row-${i}`}>
        <td className="py-3 pr-4 text-body-sm text-foreground">
          {row.label}
          {row.status === "planned" && <PlannedMark />}
        </td>
        {columns.map((c) => (
          <td key={c.key} className="py-3 px-3 text-center">
            <Cell value={row.cells[c.key]} />
          </td>
        ))}
      </tr>
    );
  };
  return (
    <>
      {order
        .filter((g) => groups[g].length > 0)
        .map((g) => (
          <section key={g} className="mb-12" data-testid={`package-group-${g}`}>
            <h2 className="mb-1 text-h3">{GROUP_TITLES[g].title}</h2>
            <p className="text-body-sm text-muted-foreground mb-5">{GROUP_TITLES[g].body}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {groups[g].map((pkg) => (
                <PackageCard
                  key={pkg.key}
                  data={data}
                  pkg={pkg}
                  copy={cardCopy[pkg.key]}
                  anchorId={pkg.key === firstAdvisorKey ? "raadgivere" : undefined}
                />
              ))}
            </div>
          </section>
        ))}

      {columns.length > 0 && rowCount > 0 && (
        <div className="mt-8 overflow-x-auto">
          <h2 className="mb-6 border-t border-border pt-10">{comparisonTitle}</h2>
          <table className="w-full border-collapse" data-testid="feature-comparison-table">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 pr-4 text-body-sm font-medium text-muted-foreground">Funktion</th>
                {columns.map((c) => (
                  <th key={c.key} className="text-center py-3 px-3 text-body-sm font-semibold text-foreground">
                    {c.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sections
                ? sections.flatMap((sec) => [
                    <tr key={`section-${sec.key}`} className="border-b border-border" data-testid={`feature-section-${sec.key}`}>
                      <th colSpan={columns.length + 1} className="pt-6 pb-2 text-left text-trust font-semibold uppercase tracking-wide text-muted-foreground">
                        {sec.label}
                      </th>
                    </tr>,
                    ...sec.rows.map(renderRow),
                  ])
                : data.comparison.rows.map(renderRow)}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
