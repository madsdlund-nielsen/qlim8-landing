import { useMutation } from "@tanstack/react-query";

export interface TenantInfo {
  id: string;
  name: string;
  industry: string | null;
  isSandbox: boolean;
  country: string | null;
  reportingCurrency: string | null;
}

export function useTenant() {
  const deactivateSandboxMutation = useMutation({
    mutationFn: async () => {},
  });

  return {
    tenant: null as TenantInfo | null,
    isSandbox: false,
    isLoading: false,
    deactivateSandbox: deactivateSandboxMutation.mutateAsync,
    isDeactivating: false,
    deactivateError: null,
  };
}
