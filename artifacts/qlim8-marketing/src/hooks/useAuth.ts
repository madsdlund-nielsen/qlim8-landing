import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  profileImageUrl?: string | null;
  tenantId?: string | null;
  role?: string | null;
  platformRole?: string | null;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export function useAuth() {
  const { toast } = useToast();

  const loginMutation = useMutation({
    mutationFn: async (_credentials: LoginData): Promise<User> => {
      toast({ title: "Log ind", description: "Venligst log ind via qlim8.com" });
      throw new Error("Brug qlim8.com til at logge ind");
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (_credentials: RegisterData): Promise<User> => {
      toast({ title: "Opret konto", description: "Opret konto via qlim8.com" });
      throw new Error("Brug qlim8.com til at oprette konto");
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      queryClient.clear();
    },
  });

  return {
    user: null as User | null,
    isLoading: false,
    isAuthenticated: false,
    error: null,
    loginMutation,
    logoutMutation,
    registerMutation,
  };
}
