import { cn } from "@/lib/utils";

type LogoType = "icon" | "horizontal" | "vertical";

interface LogoProps {
  type?: LogoType;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Logo({ type = "icon", size = "md", className }: LogoProps) {
  const textSizeClasses = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-2xl"
  };

  const containerClasses = {
    icon: "flex items-center justify-center",
    horizontal: "flex items-center gap-2",
    vertical: "flex flex-col items-center gap-2"
  };

  return (
    <div className={cn(containerClasses[type], className)}>
      <span 
        className={cn(
          "font-semibold tracking-tight text-foreground",
          textSizeClasses[size]
        )}
        data-testid={`text-logo-${type}`}
      >
        qlim8
      </span>
    </div>
  );
}
