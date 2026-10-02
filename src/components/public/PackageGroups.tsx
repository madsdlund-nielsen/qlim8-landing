// The package page once the app's catalog sells something by itself: three
// groups (start for free, buy it yourself, talk to us) and the comparison of
// the company packages, all from GET /api/public/packages. Server component.
//
// A package's curated name and tagline still come from the CMS-editable page
// copy when it has an entry for the package key. Its list is what the API
// says it adds over the package before it (packageFeatures): a curated list
// is shown only for a package the API lists nothing for.
import { DEMO_HREF, DEMO_LABEL } from "@/content/cta";
import {
  ctaLabel,
  groupPackages,
  packageFeatures,
  priceLines,
  trialLine,
  type ComparisonCell,
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
  if (value === undefined || value === false) return <span className="block text-center text-gray-300">-</span>;
  if (value === true) return <span className="block text-center text-gray-900">✓</span>;
  return <span className="block text-center text-[12px] font-medium text-gray-700 leading-tight">{value}</span>;
}

function PackageCard({ data, pkg, copy }: { data: PublicPackages; pkg: PublicPackage; copy?: PackageCardCopy }) {
  const price = priceLines(pkg);
  const { label: includedLabel, items: features } = packageFeatures(data, pkg, copy?.features);
  const href = pkg.cta.kind === "demo" || !pkg.cta.url ? DEMO_HREF : pkg.cta.url;
  const label = pkg.cta.kind === "demo" ? DEMO_LABEL : ctaLabel(pkg);
  const primary = pkg.cta.kind !== "demo";
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col" data-testid={`plan-${pkg.key}`}>
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-900 mb-1">{copy?.name ?? pkg.name}</h3>
        {(copy?.tagline ?? pkg.tagline ?? pkg.audience) && (
          <p className="text-sm text-gray-600">{copy?.tagline ?? pkg.tagline ?? pkg.audience}</p>
        )}
      </div>
      {price && (
        <div className="mb-4" data-testid={`price-${pkg.key}`}>
          <p className="text-2xl font-bold text-gray-900">{price.main}</p>
          {price.note && <p className="text-xs text-gray-500 mt-1">{price.note}</p>}
          {trialLine(pkg) && (
            <p className="text-xs font-medium text-primary mt-2" data-testid={`trial-${pkg.key}`}>
              {trialLine(pkg)}
            </p>
          )}
        </div>
      )}
      <a
        href={href}
        className={
          "w-full py-2.5 px-4 rounded-full text-sm font-medium transition-all flex items-center justify-center mb-6 " +
          (primary
            ? "bg-primary text-white hover:bg-primary/90"
            : "border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white")
        }
        data-testid={`button-${pkg.cta.kind}-${pkg.key}`}
      >
        {label}
      </a>
      {features.length > 0 && (
        <>
          {includedLabel && <p className="font-semibold text-gray-900 text-sm mb-3">{includedLabel}:</p>}
          <ul className="space-y-1.5 flex-1 text-sm text-gray-700">
            {features.map((f) => (
              <li key={f} className="flex gap-2.5">
                <span className="mt-2 h-1 w-2.5 shrink-0 bg-primary" aria-hidden="true" />
                <span>{f}</span>
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
  const order: PackageGroup[] = ["free", "selfServe", "contact"];
  const columns = data.comparison.packages;
  return (
    <>
      {order
        .filter((g) => groups[g].length > 0)
        .map((g) => (
          <section key={g} className="mb-12" data-testid={`package-group-${g}`}>
            <h2 className="text-xl font-bold text-gray-900 mb-1">{GROUP_TITLES[g].title}</h2>
            <p className="text-sm text-gray-600 mb-5">{GROUP_TITLES[g].body}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {groups[g].map((pkg) => (
                <PackageCard key={pkg.key} data={data} pkg={pkg} copy={cardCopy[pkg.key]} />
              ))}
            </div>
          </section>
        ))}

      {columns.length > 0 && data.comparison.rows.length > 0 && (
        <div className="mt-8 overflow-x-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-t border-gray-200 pt-10">{comparisonTitle}</h2>
          <table className="w-full border-collapse" data-testid="feature-comparison-table">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 pr-4 text-sm font-medium text-gray-500">Funktion</th>
                {columns.map((c) => (
                  <th key={c.key} className="text-center py-3 px-3 text-sm font-semibold text-gray-900">
                    {c.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.comparison.rows.map((row, i) => (
                <tr key={row.key} className={`border-b border-gray-100 ${i % 2 === 0 ? "" : "bg-gray-50/50"}`} data-testid={`feature-row-${i}`}>
                  <td className="py-3 pr-4 text-sm text-gray-700">{row.label}</td>
                  {columns.map((c) => (
                    <td key={c.key} className="py-3 px-3 text-center">
                      <Cell value={row.cells[c.key]} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
