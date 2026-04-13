import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from "recharts";
import { AlertCircle, ArrowUpRight, Users, Building2, Wallet, CheckCircle2, Leaf, HelpCircle, Loader2, Sparkles, Compass } from "lucide-react";
import { useRef } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useQuery } from "@tanstack/react-query";
import { useI18n } from "@/lib/i18n";
import { useLocation } from "wouter";
import { useOnboardingSafe } from "@/contexts/OnboardingContext";
import { cn } from "@/lib/utils";

interface ActionItem {
  id: string;
  title: string;
  description: string;
  type: "destructive" | "warning" | "info";
  link?: string;
  priority: number;
}

interface DashboardTotals {
  scope1: { marketBased: number; locationBased: number; count: number };
  scope2: { marketBased: number; locationBased: number; count: number };
  scope3: { marketBased: number; locationBased: number; count: number };
  total: { marketBased: number; locationBased: number; count: number };
}

interface IntensityMetric {
  value: string;
  unit: string;
  label: string;
}

export default function Dashboard() {
  const { t } = useI18n();
  const [, setLocation] = useLocation();
  const whatsNewButtonRef = useRef<HTMLButtonElement>(null);

  const handleOpenWhatsNew = () => {
    window.dispatchEvent(new CustomEvent("openWhatsNew"));
  };

  // Onboarding tour
  const onboarding = useOnboardingSafe();
  const tourProgress = onboarding?.progressPercent ?? 0;
  const hasActiveTour = onboarding?.isActive ?? false;
  const isTourIncomplete = hasActiveTour && tourProgress < 100;
  
  const handleStartTour = () => {
    onboarding?.startFlow("new_user");
  };

  const defaultEmissionsData = [
    { name: t('dashboard.scope1'), value: 0, color: "hsl(var(--chart-1))" },
    { name: t('dashboard.scope2'), value: 0, color: "hsl(var(--chart-3))" },
    { name: t('dashboard.scope3'), value: 0, color: "hsl(var(--chart-4))" },
  ];

  const { data: actions = [] } = useQuery<ActionItem[]>({
    queryKey: ["/api/dashboard/actions"],
    queryFn: async () => {
      const res = await fetch("/api/dashboard/actions", { credentials: "include" });
      if (!res.ok) return [];
      return res.json();
    },
  });

  const { data: totals, isLoading, refetch } = useQuery<DashboardTotals>({
    queryKey: ["/api/dashboard/totals"],
    queryFn: async () => {
      const res = await fetch("/api/dashboard/totals", { credentials: "include" });
      if (!res.ok) {
        return {
          scope1: { marketBased: 0, locationBased: 0, count: 0 },
          scope2: { marketBased: 0, locationBased: 0, count: 0 },
          scope3: { marketBased: 0, locationBased: 0, count: 0 },
          total: { marketBased: 0, locationBased: 0, count: 0 },
        };
      }
      return res.json();
    },
  });

  const { data: dataQuality = 0 } = useQuery<number>({
    queryKey: ["/api/dashboard/data-quality"],
    queryFn: async () => {
      const res = await fetch("/api/dashboard/data-quality", { credentials: "include" });
      if (!res.ok) return 0;
      const data = await res.json();
      return Math.round((data.confidence || 0) * 100);
    },
  });

  const { data: intensityData = { value: "—", unit: "", label: t('dashboard.perSpend') } } = useQuery<IntensityMetric>({
    queryKey: ["/api/dashboard/intensity"],
    queryFn: async () => {
      const res = await fetch("/api/dashboard/intensity", { credentials: "include" });
      if (!res.ok) return { value: "—", unit: "", label: t('dashboard.perSpend') };
      return res.json();
    },
  });

  const { data: unseenCount = 0 } = useQuery<number>({
    queryKey: ["/api/announcements/unseen-count"],
    queryFn: async () => {
      const res = await fetch("/api/announcements/unseen", { credentials: "include" });
      if (!res.ok) return 0;
      const data = await res.json();
      return Array.isArray(data) ? data.length : 0;
    },
  });

  const emissionsData = totals ? [
    { name: t('dashboard.scope1'), value: totals.scope1.marketBased || 0.01, color: "hsl(var(--chart-1))" },
    { name: t('dashboard.scope2'), value: totals.scope2.marketBased || 0.01, color: "hsl(var(--chart-3))" },
    { name: t('dashboard.scope3'), value: totals.scope3.marketBased || 0.01, color: "hsl(var(--chart-4))" },
  ] : defaultEmissionsData;

  const totalEmissions = totals?.total.marketBased || 0;


  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{t('dashboard.title')}</h1>
          <p className="text-muted-foreground mt-1">{t('dashboard.subtitle')}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{t('dashboard.lastUpdated')}: {new Date().toLocaleTimeString('en-DK', { hour: '2-digit', minute: '2-digit' })}</span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleStartTour}
            data-testid="button-start-tour"
            className={cn(
              "gap-2 relative transition-all",
              isTourIncomplete && "border-emerald-500 ring-2 ring-emerald-500/20 hover:ring-emerald-500/40"
            )}
          >
            <Compass className="h-4 w-4" />
            {t('dashboard.tour') || 'Tour'}
            {isTourIncomplete && tourProgress > 0 && (
              <span className="text-xs text-emerald-600 font-medium">
                {tourProgress}%
              </span>
            )}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleOpenWhatsNew}
            ref={whatsNewButtonRef}
            data-testid="button-whats-new"
            className="gap-2 relative"
          >
            <Sparkles className="h-4 w-4" />
            {t('dashboard.whatsNew')}
            {unseenCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-medium text-white">
                {unseenCount > 9 ? "9+" : unseenCount}
              </span>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-testid="dashboard-summary">
        <Card className="relative overflow-hidden border-0 ring-1 ring-black/5 shadow-sm bg-gradient-to-br from-emerald-50/50 to-transparent">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t('dashboard.totalEmissions')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-display">
              {isLoading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <>
                  {totalEmissions > 1000 
                    ? `${(totalEmissions / 1000).toFixed(1)}` 
                    : totalEmissions.toFixed(1)
                  } <span className="text-lg font-normal text-muted-foreground">{totalEmissions > 1000 ? t('common.tco2e') : t('common.kgco2e')}</span>
                </>
              )}
            </div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              {totals?.total.count || 0} {t('dashboard.emissionEntriesRecorded')}
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 ring-1 ring-black/5 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t('dashboard.emissionIntensity')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-display">{intensityData.value} <span className="text-lg font-normal text-muted-foreground">{intensityData.unit}</span></div>
            <p className="text-xs text-muted-foreground mt-1">{intensityData.label}</p>
          </CardContent>
        </Card>

        <Card className="border-0 ring-1 ring-black/5 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t('dashboard.dataQuality')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2 cursor-help">
                  <div className="text-3xl font-bold font-display">{dataQuality}%</div>
                  <HelpCircle className="h-4 w-4 text-muted-foreground/50 hover:text-muted-foreground transition-colors" />
                </div>
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-xs">
                <div className="space-y-2 text-xs">
                  <p className="font-semibold text-white">{t('dashboard.dataSpecificityLevels')}</p>
                  <div className="space-y-1.5">
                    <div className="flex items-start gap-2">
                      <div className="text-emerald-400 font-bold">1</div>
                      <div>
                        <p className="text-white/90 font-medium">{t('dashboard.productLevel')}</p>
                        <p className="text-white/60 text-[10px]">{t('dashboard.productLevelDesc')}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="text-emerald-400 font-bold">2</div>
                      <div>
                        <p className="text-white/90 font-medium">{t('dashboard.activityLevel')}</p>
                        <p className="text-white/60 text-[10px]">{t('dashboard.activityLevelDesc')}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="text-blue-400 font-bold">3</div>
                      <div>
                        <p className="text-white/90 font-medium">{t('dashboard.facilityLevel')}</p>
                        <p className="text-white/60 text-[10px]">{t('dashboard.facilityLevelDesc')}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="text-slate-400 font-bold">4</div>
                      <div>
                        <p className="text-white/90 font-medium">{t('dashboard.businessUnitLevel')}</p>
                        <p className="text-white/60 text-[10px]">{t('dashboard.businessUnitLevelDesc')}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="text-slate-400 font-bold">5</div>
                      <div>
                        <p className="text-white/90 font-medium">{t('dashboard.corporateLevel')}</p>
                        <p className="text-white/60 text-[10px]">{t('dashboard.corporateLevelDesc')}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-white/50 text-[10px] mt-2 border-t border-white/20 pt-2">{t('dashboard.collectMoreData')}</p>
                </div>
              </TooltipContent>
            </Tooltip>
            <div className="w-full bg-secondary h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: `${dataQuality}%` }} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <Card className="lg:col-span-2 border-0 ring-1 ring-black/5 shadow-sm h-[400px]">
          <CardHeader>
            <CardTitle>{t('dashboard.emissionsBreakdown')}</CardTitle>
            <CardDescription>{t('dashboard.distributionAcrossScopes')}</CardDescription>
          </CardHeader>
          <CardContent className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={emissionsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {emissionsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-0 ring-1 ring-black/5 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                {t('dashboard.actionRequired')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {actions.length === 0 ? (
                <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald-50 text-emerald-700">
                  <CheckCircle2 className="h-5 w-5" />
                  <p className="text-sm">{t('dashboard.allCaughtUp')}</p>
                </div>
              ) : (
                actions.map(action => (
                  <div 
                    key={action.id} 
                    className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer group"
                    onClick={() => action.link && setLocation(action.link)}
                    data-testid={`action-card-${action.id}`}
                  >
                    <div className={`mt-1 h-2 w-2 rounded-full ${
                      action.type === 'destructive' ? 'bg-destructive' : 
                      action.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                    }`} />
                    <div>
                      <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                        {t(action.title)}
                      </h4>
                      <p className="text-xs text-muted-foreground">{t(action.description)}</p>
                    </div>
                    {action.link && (
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground ml-auto group-hover:text-primary transition-colors" />
                    )}
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
