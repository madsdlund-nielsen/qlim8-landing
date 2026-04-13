import { useState, useMemo, useRef } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { FileText, Loader2, Flame, Zap, Truck, Building2, Droplets, Leaf, Factory, Car, Compass, Sparkles, Download, Trash2, ChevronDown, ArrowLeft, ExternalLink } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { useOnboardingSafe } from "@/contexts/OnboardingContext";
import { useToast } from "@/hooks/use-toast";

interface EmissionEntry {
  id: string;
  scope: string;
  co2eMarketBased: string;
  co2eLocationBased: string;
  categoryMapped: string;
  transactionDate: string;
}

interface GeneratedReport {
  id: string;
  filename: string;
  reportYear: number;
  standardType: string;
  fileSizeBytes: number;
  createdAt: string;
}

const SCOPE_COLORS = {
  scope1: "#059669",
  scope2: "#0891b2",
  scope3: "#6366f1",
  outOfScope: "#9ca3af",
};

const CATEGORY_COLORS = [
  "#059669", "#10b981", "#34d399", "#6ee7b7",
  "#0891b2", "#06b6d4", "#22d3ee", "#67e8f9",
  "#6366f1", "#818cf8", "#a5b4fc", "#c7d2fe",
];

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  "Naturgas": Flame,
  "Gasolie": Droplets,
  "Elektricitet": Zap,
  "Fjernvarme": Building2,
  "Transport": Truck,
  "Benzin": Car,
  "Diesel": Droplets,
  "Affald": Factory,
  "Vand": Droplets,
  "default": Leaf,
};

function formatCO2e(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)} Mt`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)} t`;
  }
  return `${value.toFixed(1)} kg`;
}

function getCategoryIcon(category: string): React.ElementType {
  for (const [key, icon] of Object.entries(CATEGORY_ICONS)) {
    if (category.toLowerCase().includes(key.toLowerCase())) {
      return icon;
    }
  }
  return CATEGORY_ICONS.default;
}

interface Tenant {
  id: number;
  name: string;
}

export default function Dashboard() {
  const [, navigate] = useLocation();
  const [calculationMethod, setCalculationMethod] = useState<"market" | "location">("market");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [activeScopes, setActiveScopes] = useState<Set<string>>(new Set(["1", "2", "3"]));
  const [barChartView, setBarChartView] = useState<"categories" | "calendar">("categories");
  const [drillScope, setDrillScope] = useState<string | null>(null);
  const [drillCategory, setDrillCategory] = useState<string | null>(null);
  const whatsNewButtonRef = useRef<HTMLButtonElement>(null);

  const handleOpenWhatsNew = () => {
    window.dispatchEvent(new CustomEvent("openWhatsNew"));
  };

  const onboarding = useOnboardingSafe();
  const tourProgress = onboarding?.progressPercent ?? 0;
  const hasActiveTour = onboarding?.isActive ?? false;
  const isTourIncomplete = hasActiveTour && tourProgress < 100;

  const handleStartTour = () => {
    onboarding?.startFlow("new_user");
  };

  const { data: unseenCount = 0 } = useQuery<number>({
    queryKey: ["/api/announcements/unseen-count"],
    queryFn: async () => {
      const res = await fetch("/api/announcements/unseen", { credentials: "include" });
      if (!res.ok) return 0;
      const data = await res.json();
      return Array.isArray(data) ? data.length : 0;
    },
  });

  const { data: tenant } = useQuery<Tenant>({
    queryKey: ["/api/tenant"],
    queryFn: async () => {
      const res = await fetch("/api/tenant", { credentials: "include" });
      if (!res.ok) return null;
      return res.json();
    },
  });

  const { data: entries = [], isLoading } = useQuery<EmissionEntry[]>({
    queryKey: ["/api/emission-entries"],
    queryFn: async () => {
      const res = await fetch("/api/emission-entries", { credentials: "include" });
      if (!res.ok) return [];
      return res.json();
    },
  });

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [reportsModalYear, setReportsModalYear] = useState<number | null>(null);
  const [deleteReport, setDeleteReport] = useState<GeneratedReport | null>(null);

  const { data: generatedReports = [] } = useQuery<GeneratedReport[]>({
    queryKey: ["/api/reports/generated"],
    queryFn: async () => {
      const res = await fetch("/api/reports/generated", { credentials: "include" });
      if (!res.ok) return [];
      return res.json();
    },
  });

  const deleteReportMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/reports/generated/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/reports/generated"] });
      toast({ title: "Rapport slettet" });
      setDeleteReport(null);
    },
  });

  const reportYears = useMemo(() => {
    const years = new Set<number>();
    generatedReports.forEach((r) => years.add(r.reportYear));
    return Array.from(years).sort((a, b) => b - a);
  }, [generatedReports]);

  const reportsForSelectedYear = useMemo(() => {
    if (!reportsModalYear) return [];
    return generatedReports.filter((r) => r.reportYear === reportsModalYear);
  }, [generatedReports, reportsModalYear]);

  const availableYears = useMemo(() => {
    const years = new Set<number>();
    entries.forEach((entry) => {
      if (entry.transactionDate) {
        const year = new Date(entry.transactionDate).getFullYear();
        if (!isNaN(year)) years.add(year);
      }
    });
    return Array.from(years).sort((a, b) => b - a);
  }, [entries]);

  const filteredEntries = useMemo(() => {
    return entries.filter((entry) => {
      if (selectedYear !== "all") {
        const entryYear = new Date(entry.transactionDate).getFullYear();
        if (entryYear !== parseInt(selectedYear)) return false;
      }
      return true;
    });
  }, [entries, selectedYear]);

  const scopeTotals = useMemo(() => {
    const totals = { scope1: 0, scope2: 0, scope3: 0, outOfScope: 0 };
    filteredEntries.forEach((entry) => {
      const value = parseFloat(
        calculationMethod === "market" ? entry.co2eMarketBased : entry.co2eLocationBased
      ) || 0;
      const scope = entry.scope;
      if (scope === "1") totals.scope1 += value;
      else if (scope === "2") totals.scope2 += value;
      else if (scope === "3") totals.scope3 += value;
      else totals.outOfScope += value;
    });
    return totals;
  }, [filteredEntries, calculationMethod]);

  const totalEmissions = scopeTotals.scope1 + scopeTotals.scope2 + scopeTotals.scope3;
  const grandTotal = totalEmissions + scopeTotals.outOfScope;

  const donutDataOuter = [
    { name: "Scope 1", value: scopeTotals.scope1, color: SCOPE_COLORS.scope1 },
    { name: "Scope 2", value: scopeTotals.scope2, color: SCOPE_COLORS.scope2 },
    { name: "Scope 3", value: scopeTotals.scope3, color: SCOPE_COLORS.scope3 },
  ].filter((d) => d.value > 0);

  const donutDataInner = [
    { name: "Out of Scope", value: scopeTotals.outOfScope, color: SCOPE_COLORS.outOfScope },
  ].filter((d) => d.value > 0);

  const categoryData = useMemo(() => {
    const categoryMap = new Map<string, { scope1: number; scope2: number; scope3: number }>();
    filteredEntries
      .filter((entry) => activeScopes.has(entry.scope))
      .forEach((entry) => {
        const value = parseFloat(
          calculationMethod === "market" ? entry.co2eMarketBased : entry.co2eLocationBased
        ) || 0;
        const category = entry.categoryMapped || "Ukendt";
        const existing = categoryMap.get(category) || { scope1: 0, scope2: 0, scope3: 0 };
        if (entry.scope === "1") existing.scope1 += value;
        else if (entry.scope === "2") existing.scope2 += value;
        else if (entry.scope === "3") existing.scope3 += value;
        categoryMap.set(category, existing);
      });

    return Array.from(categoryMap.entries())
      .map(([name, data]) => ({
        name: name.length > 20 ? name.slice(0, 20) + "..." : name,
        fullName: name,
        scope1: activeScopes.has("1") ? data.scope1 : 0,
        scope2: activeScopes.has("2") ? data.scope2 : 0,
        scope3: activeScopes.has("3") ? data.scope3 : 0,
        total: data.scope1 + data.scope2 + data.scope3,
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 10);
  }, [filteredEntries, activeScopes, calculationMethod]);

  const monthlyData = useMemo(() => {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "Maj", "Jun",
      "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"
    ];
    const monthTotals = months.map((name) => ({ name, scope1: 0, scope2: 0, scope3: 0 }));

    filteredEntries
      .filter((entry) => activeScopes.has(entry.scope))
      .forEach((entry) => {
        const value = parseFloat(
          calculationMethod === "market" ? entry.co2eMarketBased : entry.co2eLocationBased
        ) || 0;
        const month = new Date(entry.transactionDate).getMonth();
        if (!isNaN(month) && month >= 0 && month < 12) {
          if (entry.scope === "1") monthTotals[month].scope1 += value;
          else if (entry.scope === "2") monthTotals[month].scope2 += value;
          else if (entry.scope === "3") monthTotals[month].scope3 += value;
        }
      });

    return monthTotals.map((m) => ({
      ...m,
      scope1: activeScopes.has("1") ? m.scope1 : 0,
      scope2: activeScopes.has("2") ? m.scope2 : 0,
      scope3: activeScopes.has("3") ? m.scope3 : 0,
    }));
  }, [filteredEntries, activeScopes, calculationMethod]);

  const topCategoriesByScope = useMemo(() => {
    const result: Record<string, Array<{ name: string; value: number; percent: number }>> = {
      "1": [],
      "2": [],
      "3": [],
    };

    ["1", "2", "3"].forEach((scope) => {
      const scopeEntries = filteredEntries.filter((e) => e.scope === scope);
      const scopeTotal = scopeEntries.reduce(
        (sum, e) =>
          sum + (parseFloat(calculationMethod === "market" ? e.co2eMarketBased : e.co2eLocationBased) || 0),
        0
      );

      const categoryMap = new Map<string, number>();
      scopeEntries.forEach((entry) => {
        const value = parseFloat(
          calculationMethod === "market" ? entry.co2eMarketBased : entry.co2eLocationBased
        ) || 0;
        const category = entry.categoryMapped || "Ukendt";
        categoryMap.set(category, (categoryMap.get(category) || 0) + value);
      });

      result[scope] = Array.from(categoryMap.entries())
        .map(([name, value]) => ({
          name,
          value,
          percent: scopeTotal > 0 ? (value / scopeTotal) * 100 : 0,
        }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 4);
    });

    return result;
  }, [filteredEntries, calculationMethod]);

  const drillCategoryData = useMemo(() => {
    if (!drillScope) return [];
    const categoryMap = new Map<string, number>();
    filteredEntries
      .filter((e) => e.scope === drillScope)
      .forEach((e) => {
        const value = parseFloat(
          calculationMethod === "market" ? e.co2eMarketBased : e.co2eLocationBased
        ) || 0;
        const cat = e.categoryMapped || "Ukendt";
        categoryMap.set(cat, (categoryMap.get(cat) || 0) + value);
      });
    return Array.from(categoryMap.entries())
      .map(([name, value], idx) => ({
        name: name.length > 24 ? name.slice(0, 24) + "…" : name,
        fullName: name,
        value,
        color: CATEGORY_COLORS[idx % CATEGORY_COLORS.length],
      }))
      .sort((a, b) => b.value - a.value);
  }, [filteredEntries, drillScope, calculationMethod]);

  const drillTotal = useMemo(() => drillCategoryData.reduce((s, d) => s + d.value, 0), [drillCategoryData]);

  const toggleScope = (scope: string) => {
    const newScopes = new Set(activeScopes);
    if (newScopes.has(scope)) {
      newScopes.delete(scope);
    } else {
      newScopes.add(scope);
    }
    setActiveScopes(newScopes);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard for {tenant?.name || "Din virksomhed"}</h1>
          <p className="text-sm text-muted-foreground">Overblik over din virksomheds klimaaftryk</p>
        </div>
        <div className="flex items-center gap-2">
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
            Tour
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
            Nyheder
            {unseenCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-medium text-white">
                {unseenCount > 9 ? "9+" : unseenCount}
              </span>
            )}
          </Button>
        </div>
      </div>

      <div className="px-6 pb-6 space-y-6">
        <div className="flex items-center justify-end gap-3">
          <Select value={calculationMethod} onValueChange={(v) => setCalculationMethod(v as "market" | "location")}>
            <SelectTrigger className="w-[160px]" data-testid="select-calculation-method">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="market">Market Based</SelectItem>
              <SelectItem value="location">Location Based</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[120px]" data-testid="select-year">
              <SelectValue placeholder="År" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle år</SelectItem>
              {availableYears.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-[140px] justify-between" data-testid="select-reports">
                <FileText className="h-4 w-4 mr-2" />
                <span>Rapporter</span>
                <ChevronDown className="h-4 w-4 ml-2 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {reportYears.length === 0 ? (
                <DropdownMenuItem disabled data-testid="item-no-reports">
                  Ingen rapporter
                </DropdownMenuItem>
              ) : (
                reportYears.map((year) => (
                  <DropdownMenuItem
                    key={year}
                    onClick={() => setReportsModalYear(year)}
                    data-testid={`item-report-year-${year}`}
                  >
                    {year} ({generatedReports.filter(r => r.reportYear === year).length})
                  </DropdownMenuItem>
                ))
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1" data-testid="card-donut-chart">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              {drillScope ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => { setDrillScope(null); setDrillCategory(null); }}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    data-testid="button-drill-back"
                    title="Tilbage til scope-oversigt"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <CardTitle className="text-base font-medium">
                    Scope {drillScope} — kategorier
                  </CardTitle>
                </div>
              ) : (
                <CardTitle className="text-base font-medium">Total emission per scope</CardTitle>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {drillScope ? (
              <>
                <div className="h-[280px] relative" data-testid="chart-drill-pie">
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center">
                      <p className="text-2xl font-bold">{formatCO2e(drillTotal)}</p>
                      <p className="text-xs text-muted-foreground">Scope {drillScope}</p>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={drillCategoryData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        innerRadius={60}
                        onClick={(payload: { fullName?: string; name?: string }) => {
                          const cat = payload.fullName || payload.name || "";
                          setDrillCategory(cat);
                          navigate(`/ledger?scope=${drillScope}&category=${encodeURIComponent(cat)}`);
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        {drillCategoryData.map((entry, index) => (
                          <Cell
                            key={`drill-${index}`}
                            fill={entry.color}
                            opacity={drillCategory && drillCategory !== entry.fullName ? 0.4 : 1}
                          />
                        ))}
                      </Pie>
                      <RechartsTooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const d = payload[0].payload;
                            const pct = drillTotal > 0 ? ((d.value / drillTotal) * 100).toFixed(1) : "0";
                            return (
                              <div className="bg-white p-2 rounded shadow-lg border text-sm">
                                <p className="font-medium text-xs">{d.fullName || d.name}</p>
                                <p>{formatCO2e(d.value)} ({pct}%)</p>
                                <p className="text-xs text-muted-foreground mt-1">Klik for at se poster →</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-1.5 max-h-[140px] overflow-y-auto" data-testid="legend-drill-categories">
                  {drillCategoryData.slice(0, 6).map((d, i) => {
                    const isSelected = drillCategory === d.fullName;
                    return (
                      <button
                        key={i}
                        className={cn(
                          "w-full flex items-center gap-2 text-xs rounded px-1 py-0.5 transition-colors text-left",
                          isSelected ? "bg-emerald-50 ring-1 ring-emerald-300 font-medium" : "hover:bg-muted/40"
                        )}
                        onClick={() => {
                          setDrillCategory(d.fullName);
                          navigate(`/ledger?scope=${drillScope}&category=${encodeURIComponent(d.fullName)}`);
                        }}
                        data-testid={`legend-drill-${i}`}
                      >
                        <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                        <span className="flex-1 truncate">{d.fullName}</span>
                        <span className="text-muted-foreground">{formatCO2e(d.value)}</span>
                        {isSelected && <ExternalLink className="h-3 w-3 text-emerald-600 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "w-full mt-3 gap-1.5 text-xs",
                    drillCategory && "border-emerald-500 text-emerald-700 hover:bg-emerald-50"
                  )}
                  onClick={() => {
                    if (drillCategory) {
                      navigate(`/ledger?scope=${drillScope}&category=${encodeURIComponent(drillCategory)}`);
                    } else {
                      navigate(`/ledger?scope=${drillScope}`);
                    }
                  }}
                  data-testid="button-see-all-scope"
                >
                  <ExternalLink className="h-3 w-3" />
                  {drillCategory ? `Se alle poster i ${drillCategory}` : `Udforsk Scope ${drillScope}`}
                </Button>
              </>
            ) : (
              <>
                <div className="h-[280px] relative" data-testid="chart-scope-donut">
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center">
                      <p className="text-2xl font-bold">{formatCO2e(totalEmissions)}</p>
                      <p className="text-xs text-muted-foreground">Total emission</p>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={donutDataOuter}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        innerRadius={70}
                        onClick={(payload: { name?: string }) => {
                          const scopeNum = payload.name?.replace("Scope ", "");
                          if (scopeNum) { setDrillScope(scopeNum); setDrillCategory(null); }
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        {donutDataOuter.map((entry, index) => (
                          <Cell key={`outer-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      {donutDataInner.length > 0 && (
                        <Pie
                          data={donutDataInner}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={65}
                          innerRadius={50}
                        >
                          {donutDataInner.map((entry, index) => (
                            <Cell key={`inner-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      )}
                      <RechartsTooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            const percent = grandTotal > 0 ? ((data.value / grandTotal) * 100).toFixed(1) : "0";
                            return (
                              <div className="bg-white p-2 rounded shadow-lg border text-sm">
                                <p className="font-medium">{data.name}</p>
                                <p>{formatCO2e(data.value)} ({percent}%)</p>
                                <p className="text-xs text-muted-foreground mt-1">Klik for at udforske →</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4 text-sm" data-testid="legend-scope-totals">
                  {([["1", SCOPE_COLORS.scope1, scopeTotals.scope1], ["2", SCOPE_COLORS.scope2, scopeTotals.scope2], ["3", SCOPE_COLORS.scope3, scopeTotals.scope3]] as [string, string, number][]).map(([s, color, total]) => (
                    <button
                      key={s}
                      className="flex items-center gap-2 hover:bg-muted/40 rounded px-1 py-0.5 transition-colors text-left"
                      onClick={() => { setDrillScope(s); setDrillCategory(null); }}
                      data-testid={`legend-scope${s}`}
                    >
                      <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: color }} />
                      <span>Scope {s}: {formatCO2e(total)}</span>
                    </button>
                  ))}
                  <div className="flex items-center gap-2" data-testid="legend-out-of-scope">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: SCOPE_COLORS.outOfScope }} />
                    <span>Out of scope: {formatCO2e(scopeTotals.outOfScope)}</span>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2" data-testid="card-bar-chart">
          <CardHeader className="pb-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <CardTitle className="text-base font-medium">Total emission per category</CardTitle>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {["1", "2", "3"].map((scope) => (
                    <Button
                      key={scope}
                      variant={activeScopes.has(scope) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleScope(scope)}
                      className={cn(
                        "text-xs px-3",
                        activeScopes.has(scope) && scope === "1" && "bg-emerald-600 hover:bg-emerald-700",
                        activeScopes.has(scope) && scope === "2" && "bg-cyan-600 hover:bg-cyan-700",
                        activeScopes.has(scope) && scope === "3" && "bg-indigo-600 hover:bg-indigo-700"
                      )}
                      data-testid={`toggle-scope-${scope}`}
                    >
                      Scope {scope}
                    </Button>
                  ))}
                </div>
                <Select value={barChartView} onValueChange={(v) => setBarChartView(v as "categories" | "calendar")}>
                  <SelectTrigger className="w-[140px]" data-testid="select-barchart-view">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="categories">Top 10 kategorier</SelectItem>
                    <SelectItem value="calendar">Månedlig fordeling</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartView === "categories" ? categoryData : monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 11 }}
                    interval={0}
                    angle={barChartView === "categories" ? -45 : 0}
                    textAnchor={barChartView === "categories" ? "end" : "middle"}
                    height={barChartView === "categories" ? 80 : 30}
                  />
                  <YAxis
                    tick={{ fontSize: 11 }}
                    tickFormatter={(value) => formatCO2e(value)}
                  />
                  <RechartsTooltip
                    cursor={false}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        const s1 = activeScopes.has("1") ? (data.scope1 || 0) : 0;
                        const s2 = activeScopes.has("2") ? (data.scope2 || 0) : 0;
                        const s3 = activeScopes.has("3") ? (data.scope3 || 0) : 0;
                        const total = s1 + s2 + s3;
                        return (
                          <div className="bg-white p-3 rounded shadow-lg border text-sm">
                            <p className="font-medium mb-2">{data.fullName || data.name}</p>
                            {activeScopes.has("1") && s1 > 0 && (
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: SCOPE_COLORS.scope1 }} />
                                <span>Scope 1: {formatCO2e(s1)}</span>
                              </div>
                            )}
                            {activeScopes.has("2") && s2 > 0 && (
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: SCOPE_COLORS.scope2 }} />
                                <span>Scope 2: {formatCO2e(s2)}</span>
                              </div>
                            )}
                            {activeScopes.has("3") && s3 > 0 && (
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: SCOPE_COLORS.scope3 }} />
                                <span>Scope 3: {formatCO2e(s3)}</span>
                              </div>
                            )}
                            <div className="border-t mt-2 pt-2 font-medium">
                              Total: {formatCO2e(total)}
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend
                    verticalAlign="top"
                    height={36}
                    formatter={(value) => {
                      if (value === "scope1") return "Scope 1";
                      if (value === "scope2") return "Scope 2";
                      if (value === "scope3") return "Scope 3";
                      return value;
                    }}
                  />
                  {activeScopes.has("1") && (
                    <Bar dataKey="scope1" stackId="stack" fill={SCOPE_COLORS.scope1} name="scope1" />
                  )}
                  {activeScopes.has("2") && (
                    <Bar dataKey="scope2" stackId="stack" fill={SCOPE_COLORS.scope2} name="scope2" />
                  )}
                  {activeScopes.has("3") && (
                    <Bar dataKey="scope3" stackId="stack" fill={SCOPE_COLORS.scope3} name="scope3" radius={[4, 4, 0, 0]} />
                  )}
                </BarChart>
              </ResponsiveContainer>
            </div>
            {barChartView === "calendar" && (
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Ovenstående barchart viser den månedlige udledning fordelt på scopes.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(["1", "2", "3"] as const).map((scope) => {
          const scopeKey = `scope${scope}` as keyof typeof scopeTotals;
          const scopeTotal = scopeTotals[scopeKey];
          const scopeColor = scope === "1" ? SCOPE_COLORS.scope1 : scope === "2" ? SCOPE_COLORS.scope2 : SCOPE_COLORS.scope3;
          const topCategories = topCategoriesByScope[scope];

          return (
            <Card key={scope} className="overflow-hidden" data-testid={`card-scope-${scope}`}>
              <CardHeader className="pb-2" style={{ borderTop: `4px solid ${scopeColor}` }}>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: scopeColor }} />
                  Scope {scope}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="text-2xl font-bold" data-testid={`text-scope-${scope}-total`}>{formatCO2e(scopeTotal)}</p>
                  <p className="text-xs text-muted-foreground">Current emission</p>
                </div>
                <div className="grid grid-cols-4 gap-2" data-testid={`grid-scope-${scope}-categories`}>
                  {topCategories.slice(0, 4).map((cat, i) => {
                    const Icon = getCategoryIcon(cat.name);
                    return (
                      <button
                        key={i}
                        className="flex flex-col items-center text-center hover:opacity-80 transition-opacity"
                        onClick={() => navigate(`/ledger?scope=${scope}&category=${encodeURIComponent(cat.name)}`)}
                        data-testid={`category-${scope}-${i}`}
                      >
                        <div className="relative w-12 h-12">
                          <svg className="w-12 h-12 -rotate-90">
                            <circle
                              cx="24"
                              cy="24"
                              r="20"
                              stroke="#e5e7eb"
                              strokeWidth="4"
                              fill="none"
                            />
                            <circle
                              cx="24"
                              cy="24"
                              r="20"
                              stroke={scopeColor}
                              strokeWidth="4"
                              fill="none"
                              strokeDasharray={`${(cat.percent / 100) * 125.6} 125.6`}
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Icon className="w-4 h-4 text-muted-foreground" />
                          </div>
                        </div>
                        <span className="text-[10px] text-muted-foreground mt-1 line-clamp-2">
                          {cat.name.length > 12 ? cat.name.slice(0, 12) + "..." : cat.name}
                        </span>
                        <span className="text-[10px] font-medium">{cat.percent.toFixed(0)}%</span>
                      </button>
                    );
                  })}
                  {topCategories.length === 0 && (
                    <p className="col-span-4 text-xs text-muted-foreground text-center py-4">
                      Ingen data
                    </p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full mt-3 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                  onClick={() => navigate(`/ledger?scope=${scope}`)}
                  data-testid={`button-explore-scope-${scope}`}
                >
                  Udforsk Scope {scope} →
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
      </div>

      <Dialog open={reportsModalYear !== null} onOpenChange={(open) => { if (!open) setReportsModalYear(null); }}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Rapporter — {reportsModalYear}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3" data-testid="reports-modal-list">
            {reportsForSelectedYear.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                Ingen rapporter for {reportsModalYear}
              </p>
            ) : (
              reportsForSelectedYear.map((report) => {
                const standardLabel = report.standardType === "csrd" ? "CSRD" : report.standardType === "vsme_comprehensive" ? "VSME Comprehensive" : report.standardType === "vsme_bp" ? "VSME Comprehensive (ældre)" : "VSME Basic";
                const sizeKB = (report.fileSizeBytes / 1024).toFixed(0);
                const date = new Date(report.createdAt).toLocaleDateString("da-DK", {
                  day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
                });
                return (
                  <div
                    key={report.id}
                    className="flex items-center justify-between p-3 rounded-lg border bg-card"
                    data-testid={`report-tile-${report.id}`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <FileText className="h-4 w-4 text-emerald-600 shrink-0" />
                        <span className="text-sm font-medium truncate">{report.filename}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                          {standardLabel}
                        </span>
                        <span>{date}</span>
                        <span>{sizeKB} KB</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 ml-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        data-testid={`btn-download-report-${report.id}`}
                        asChild
                      >
                        <a href={`/api/reports/generated/${report.id}/download`} download={report.filename}>
                          <Download className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        data-testid={`btn-delete-report-${report.id}`}
                        onClick={() => setDeleteReport(report)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteReport !== null} onOpenChange={(open) => { if (!open) setDeleteReport(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Slet rapport?</AlertDialogTitle>
            <AlertDialogDescription>
              Er du sikker på, at du vil slette denne rapport? Denne handling kan ikke fortrydes.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuller</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => deleteReport && deleteReportMutation.mutate(deleteReport.id)}
              data-testid="btn-confirm-delete-report"
            >
              Slet
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
