import { ChevronRight } from "lucide-react";

interface BreadcrumbsProps {
  // qlim8 → hub → … → current (current rendered unlinked).
  trail: { name: string; href: string }[];
}

export function Breadcrumbs({ trail }: BreadcrumbsProps) {
  return (
    <nav aria-label="Brødkrumme" className="mb-8">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-gray-500">
        {trail.map((crumb, i) => {
          const isLast = i === trail.length - 1;
          return (
            <li key={crumb.href} className="flex items-center gap-x-1.5">
              {isLast ? (
                <span className="text-gray-700 font-medium" aria-current="page">
                  {crumb.name}
                </span>
              ) : (
                <a href={crumb.href} className="hover:text-primary transition-colors">
                  {crumb.name}
                </a>
              )}
              {!isLast && <ChevronRight className="h-3.5 w-3.5 text-gray-300" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
