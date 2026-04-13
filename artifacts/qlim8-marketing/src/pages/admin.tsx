import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { 
  Users, 
  Activity, 
  AlertTriangle, 
  Megaphone, 
  Settings, 
  Loader2, 
  XCircle,
  BarChart3,
  MousePointer,
  Mail
} from "lucide-react";

import { OverviewTab } from "@/components/admin/OverviewTab";
import { ErrorsTab } from "@/components/admin/ErrorsTab";
import { UsersTab } from "@/components/admin/UsersTab";
import { SessionsTab } from "@/components/admin/SessionsTab";
import { BehaviorTab } from "@/components/admin/BehaviorTab";
import { AnnouncementsTab } from "@/components/admin/AnnouncementsTab";
import { SettingsTab } from "@/components/admin/SettingsTab";
import { LeadsTab } from "@/components/admin/LeadsTab";

interface AdminCheckResponse {
  authorized: boolean;
  role?: "admin" | "super_admin";
}

export default function Admin() {
  const [, navigate] = useLocation();
  
  const { data: authCheck, isLoading: isAuthLoading } = useQuery<AdminCheckResponse>({
    queryKey: ["/api/admin/check"],
    queryFn: async () => {
      const res = await fetch("/api/admin/check", { credentials: "include" });
      if (!res.ok) return { authorized: false };
      return res.json();
    },
  });

  useEffect(() => {
    if (!isAuthLoading && authCheck && !authCheck.authorized) {
      const timer = setTimeout(() => navigate("/"), 2000);
      return () => clearTimeout(timer);
    }
  }, [authCheck, isAuthLoading, navigate]);

  if (isAuthLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (!authCheck?.authorized) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <XCircle className="h-16 w-16 text-destructive" />
        <h1 className="text-2xl font-bold" data-testid="text-access-denied">Access Denied</h1>
        <p className="text-muted-foreground">You don't have permission to access the admin dashboard.</p>
        <p className="text-sm text-muted-foreground">Redirecting to home...</p>
      </div>
    );
  }

  const isSuperAdmin = authCheck.role === "super_admin";

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Platform administration and monitoring</p>
        </div>
        <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50">
          {authCheck.role === "super_admin" ? "Super Admin" : "Admin"}
        </Badge>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="overview" data-testid="tab-overview">
            <BarChart3 className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="errors" data-testid="tab-errors">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Errors
          </TabsTrigger>
          <TabsTrigger value="users" data-testid="tab-users">
            <Users className="h-4 w-4 mr-2" />
            Users
          </TabsTrigger>
          <TabsTrigger value="sessions" data-testid="tab-sessions">
            <Activity className="h-4 w-4 mr-2" />
            Sessions
          </TabsTrigger>
          <TabsTrigger value="behavior" data-testid="tab-behavior">
            <MousePointer className="h-4 w-4 mr-2" />
            Behavior
          </TabsTrigger>
          <TabsTrigger value="leads" data-testid="tab-leads">
            <Mail className="h-4 w-4 mr-2" />
            Leads
          </TabsTrigger>
          <TabsTrigger value="announcements" data-testid="tab-announcements">
            <Megaphone className="h-4 w-4 mr-2" />
            Announcements
          </TabsTrigger>
          {isSuperAdmin && (
            <TabsTrigger value="settings" data-testid="tab-settings">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab />
        </TabsContent>

        <TabsContent value="errors">
          <ErrorsTab />
        </TabsContent>

        <TabsContent value="users">
          <UsersTab isSuperAdmin={isSuperAdmin} />
        </TabsContent>

        <TabsContent value="sessions">
          <SessionsTab />
        </TabsContent>

        <TabsContent value="behavior">
          <BehaviorTab />
        </TabsContent>

        <TabsContent value="leads">
          <LeadsTab />
        </TabsContent>

        <TabsContent value="announcements">
          <AnnouncementsTab />
        </TabsContent>

        {isSuperAdmin && (
          <TabsContent value="settings">
            <SettingsTab />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
