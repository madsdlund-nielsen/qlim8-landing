import { ChevronRight } from "lucide-react";

interface BreadcrumbsProps {
  // qlim8 → hub → … → current (current rendered unlinked).
  trail: { name: string; href: string }[];
}

export function Breadcrumbs({ trail }: BreadcrumbsProps) {
  return (
    <nav aria-label="Brødkrumme" className="mb-8">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-body-sm text-muted-foreground">
        {trail.map((crumb, i) => {
          const isLast = i === trail.length - 1;
          return (
            <li key={crumb.href} className="flex items-center gap-x-1.5">
              {isLast ? (
                <span className="font-semibold text-foreground" aria-current="page">
                  {crumb.name}
                </span>
              ) : (
                <a href={crumb.href} className="underline-offset-4 transition-colors duration-200 hover:text-primary hover:underline">
                  {crumb.name}
                </a>
              )}
              {!isLast && <ChevronRight className="h-3.5 w-3.5 text-sage" aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
