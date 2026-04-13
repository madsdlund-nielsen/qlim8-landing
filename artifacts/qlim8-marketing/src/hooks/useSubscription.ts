import { useMutation } from "@tanstack/react-query";

type SubscriptionTier = "free" | "starter" | "pro" | "enterprise";
type FeatureKey = string;

export function useSubscription() {
  const hasFeature = (_feature: FeatureKey): boolean => false;

  return {
    hasActiveSubscription: false,
    subscriptionStatus: "none" as const,
    tier: null as SubscriptionTier | null,
    tierDisplayName: null as string | null,
    features: [] as FeatureKey[],
    hasFeature,
    isSandbox: false,
    isLoading: false,
    error: null,
    refetch: async () => {},
  };
}

export function useBillingPortal() {
  return useMutation({
    mutationFn: async () => {
      window.location.href = "https://qlim8.com/pricing";
    },
  });
}
