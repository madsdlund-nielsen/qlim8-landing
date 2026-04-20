import { ReactNode } from "react";

interface FeatureGateProps {
  feature: string;
  children: ReactNode;
  fallback?: ReactNode;
}

export function FeatureGate({ children, fallback }: FeatureGateProps) {
  return <>{children || fallback}</>;
}
