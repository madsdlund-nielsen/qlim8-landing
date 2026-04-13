import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { TrendingDown, Plus, Target, Calendar, Loader2, Trash2, Edit2, ChevronRight, Zap, DollarSign, ArrowLeft, Sparkles, Lightbulb } from "lucide-react";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Area, AreaChart } from "recharts";
import { useI18n } from "@/lib/i18n";
import { FeatureGate } from "@/components/FeatureGate";

interface Scenario {
  id: string;
  tenantId: string;
  name: string;
  description: string | null;
  baselineYear: number;
  baselineEmissions: string;
  targetYear: number;
  isActive: boolean;
  createdAt: string;
  actions?: ScenarioAction[];
}

interface ScenarioAction {
  id: string;
  scenarioId: string;
  name: string;
  description: string | null;
  category: string | null;
  reductionType: "absolute" | "percentage";
  reductionValue: string;
  implementationYear: number;
  annualCost: string | null;
  oneTimeCost: string | null;
  isEnabled: boolean;
  createdAt: string;
}

interface ScenarioSuggestion {
  name: string;
  description: string;
  category: string;
  reductionType: "absolute" | "percentage";
  reductionValue: number;
  annualCost: number;
  oneTimeCost: number;
  targetCategory: string;
  reasoning: string;
}

const categoryOptions = [
  "Energy",
  "Travel",
  "Procurement",
  "Waste",
  "Fleet",
  "Buildings",
  "Other",
];

function ScenarioList({ onSelectScenario }: { onSelectScenario: (id: string) => void }) {
  const { t } = useI18n();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [baselineManuallyEdited, setBaselineManuallyEdited] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    baselineYear: new Date().getFullYear() - 1,
    baselineEmissions: 0,
    targetYear: new Date().getFullYear() + 5,
  });

  const { data: scenarios, isLoading } = useQuery<Scenario[]>({
    queryKey: ["/api/scenarios"],
    queryFn: async () => {
      const res = await fetch("/api/scenarios", { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch scenarios");
      return res.json();
    },
  });

  // Validate baseline year for API requests
  const isValidYear = !isNaN(formData.baselineYear) && formData.baselineYear >= 1900 && formData.baselineYear <= 2100;

  // Reset manually edited flag when dialog opens
  useEffect(() => {
    if (showCreateDialog) {
      setBaselineManuallyEdited(false);
    }
  }, [showCreateDialog]);

  // Fetch baseline emissions when year changes (only if valid year and dialog is open)
  const { data: baselineData, isLoading: baselineLoading } = useQuery<{ year: number; totalEmissions: number }>({
    queryKey: ["/api/emissions/baseline", formData.baselineYear],
    queryFn: async () => {
      const res = await fetch(`/api/emissions/baseline?year=${formData.baselineYear}`, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch baseline");
      return res.json();
    },
    enabled: showCreateDialog && isValidYear,
    retry: false,
  });

  // Auto-fill baseline emissions when data is fetched (only if not manually edited)
  useEffect(() => {
    if (baselineData && !baselineManuallyEdited && baselineData.year === formData.baselineYear) {
      setFormData(prev => ({ ...prev, baselineEmissions: baselineData.totalEmissions }));
    }
  }, [baselineData, baselineManuallyEdited, formData.baselineYear]);

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const res = await fetch("/api/scenarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create scenario");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/scenarios"] });
      setShowCreateDialog(false);
      setBaselineManuallyEdited(false);
      setFormData({
        name: "",
        description: "",
        baselineYear: new Date().getFullYear() - 1,
        baselineEmissions: 0,
        targetYear: new Date().getFullYear() + 5,
      });
      toast({ title: t('scenarios.scenarioCreated'), description: t('scenarios.scenarioCreatedDesc') });
    },
    onError: () => {
      toast({ title: t('common.error'), description: t('common.somethingWentWrong'), variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/scenarios/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete scenario");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/scenarios"] });
      toast({ title: t('scenarios.scenarioDeleted') });
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">{t('scenarios.title')}</h1>
          <p className="text-muted-foreground mt-1">{t('scenarios.subtitle')}</p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)} data-testid="button-create-scenario">
          <Plus className="h-4 w-4 mr-2" />
          {t('scenarios.newScenario')}
        </Button>
      </div>

      {scenarios && scenarios.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Target className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium mb-2">{t('scenarios.noScenarios')}</h3>
            <p className="text-muted-foreground text-center max-w-md mb-4">
              {t('scenarios.noScenariosDesc')}
            </p>
            <Button onClick={() => setShowCreateDialog(true)} data-testid="button-create-first-scenario">
              <Plus className="h-4 w-4 mr-2" />
              {t('scenarios.createScenario')}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {scenarios?.map((scenario) => (
            <Card
              key={scenario.id}
              className="cursor-pointer hover:border-emerald-300 transition-colors"
              onClick={() => onSelectScenario(scenario.id)}
              data-testid={`card-scenario-${scenario.id}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{scenario.name}</CardTitle>
                    {scenario.description && (
                      <CardDescription className="mt-1 line-clamp-2">{scenario.description}</CardDescription>
                    )}
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{scenario.baselineYear} → {scenario.targetYear}</span>
                  </div>
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                    {parseFloat(scenario.baselineEmissions).toLocaleString()} kg CO₂e
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('scenarios.createNewScenario')}</DialogTitle>
            <DialogDescription>
              {t('scenarios.createNewScenarioDesc')}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t('scenarios.scenarioName')}</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={t('scenarios.scenarioNamePlaceholder')}
                data-testid="input-scenario-name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">{t('scenarios.descriptionOptional')}</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder={t('scenarios.descriptionPlaceholder')}
                data-testid="input-scenario-description"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="baselineYear">{t('scenarios.baselineYear')}</Label>
                <Input
                  id="baselineYear"
                  type="number"
                  value={formData.baselineYear}
                  onChange={(e) => {
                    setFormData({ ...formData, baselineYear: parseInt(e.target.value) });
                    setBaselineManuallyEdited(false);
                  }}
                  data-testid="input-baseline-year"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="targetYear">{t('scenarios.targetYear')}</Label>
                <Input
                  id="targetYear"
                  type="number"
                  value={formData.targetYear}
                  onChange={(e) => setFormData({ ...formData, targetYear: parseInt(e.target.value) })}
                  data-testid="input-target-year"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="baselineEmissions">{t('scenarios.baselineEmissions')}</Label>
                {baselineLoading && (
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Loader2 className="h-3 w-3 animate-spin" /> {t('scenarios.loading')}
                  </span>
                )}
                {!baselineLoading && baselineData && baselineData.totalEmissions === 0 && (
                  <span className="text-xs text-muted-foreground">{t('scenarios.noDataForYear').replace('{year}', formData.baselineYear.toString())}</span>
                )}
              </div>
              <Input
                id="baselineEmissions"
                type="number"
                value={formData.baselineEmissions}
                onChange={(e) => {
                  setFormData({ ...formData, baselineEmissions: parseFloat(e.target.value) || 0 });
                  setBaselineManuallyEdited(true);
                }}
                placeholder={t('scenarios.baselineEmissionsPlaceholder')}
                data-testid="input-baseline-emissions"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setShowCreateDialog(false); setBaselineManuallyEdited(false); }}>{t('common.cancel')}</Button>
            <Button
              onClick={() => createMutation.mutate(formData)}
              disabled={!formData.name || createMutation.isPending}
              data-testid="button-save-scenario"
            >
              {createMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              {t('scenarios.createScenario')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ScenarioDetail({ scenarioId, onBack }: { scenarioId: string; onBack: () => void }) {
  const { t } = useI18n();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [showActionDialog, setShowActionDialog] = useState(false);
  const [editingAction, setEditingAction] = useState<ScenarioAction | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [actionFormData, setActionFormData] = useState({
    name: "",
    description: "",
    category: "",
    reductionType: "percentage" as "absolute" | "percentage",
    reductionValue: 0,
    implementationYear: new Date().getFullYear(),
    annualCost: 0,
    oneTimeCost: 0,
    isEnabled: true,
  });

  const { data: scenario, isLoading } = useQuery<Scenario>({
    queryKey: [`/api/scenarios/${scenarioId}`],
    queryFn: async () => {
      const res = await fetch(`/api/scenarios/${scenarioId}`, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch scenario");
      return res.json();
    },
  });

  const { data: suggestionsData, isLoading: suggestionsLoading, refetch: refetchSuggestions } = useQuery<{ suggestions: ScenarioSuggestion[] }>({
    queryKey: [`/api/scenarios/${scenarioId}/suggestions`],
    queryFn: async () => {
      const res = await fetch(`/api/scenarios/${scenarioId}/suggestions`, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch suggestions");
      return res.json();
    },
    enabled: showSuggestions,
  });

  const deleteScenarioMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/scenarios/${scenarioId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete scenario");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/scenarios"] });
      toast({ title: t('scenarios.scenarioDeleted'), description: t('scenarios.scenarioDeletedDesc') });
      onBack();
    },
    onError: () => {
      toast({ title: t('common.error'), description: t('common.somethingWentWrong'), variant: "destructive" });
    },
  });

  const createActionMutation = useMutation({
    mutationFn: async (data: typeof actionFormData) => {
      const res = await fetch(`/api/scenarios/${scenarioId}/actions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create action");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/scenarios/${scenarioId}`] });
      closeActionDialog();
      toast({ title: t('scenarios.actionAdded'), description: t('scenarios.actionAddedDesc') });
    },
    onError: () => {
      toast({ title: t('common.error'), description: t('common.somethingWentWrong'), variant: "destructive" });
    },
  });

  const updateActionMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<typeof actionFormData> }) => {
      const res = await fetch(`/api/scenario-actions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update action");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/scenarios/${scenarioId}`] });
      closeActionDialog();
      toast({ title: t('scenarios.actionUpdated') });
    },
  });

  const deleteActionMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/scenario-actions/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete action");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/scenarios/${scenarioId}`] });
      toast({ title: t('scenarios.actionDeleted') });
    },
  });

  const toggleActionMutation = useMutation({
    mutationFn: async ({ id, isEnabled }: { id: string; isEnabled: boolean }) => {
      const res = await fetch(`/api/scenario-actions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ isEnabled }),
      });
      if (!res.ok) throw new Error("Failed to toggle action");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/scenarios/${scenarioId}`] });
    },
  });

  const closeActionDialog = () => {
    setShowActionDialog(false);
    setEditingAction(null);
    setActionFormData({
      name: "",
      description: "",
      category: "",
      reductionType: "percentage",
      reductionValue: 0,
      implementationYear: new Date().getFullYear(),
      annualCost: 0,
      oneTimeCost: 0,
      isEnabled: true,
    });
  };

  const openEditAction = (action: ScenarioAction) => {
    setEditingAction(action);
    setActionFormData({
      name: action.name,
      description: action.description || "",
      category: action.category || "",
      reductionType: action.reductionType,
      reductionValue: parseFloat(action.reductionValue),
      implementationYear: action.implementationYear,
      annualCost: action.annualCost ? parseFloat(action.annualCost) : 0,
      oneTimeCost: action.oneTimeCost ? parseFloat(action.oneTimeCost) : 0,
      isEnabled: action.isEnabled,
    });
    setShowActionDialog(true);
  };

  const applySuggestion = (suggestion: ScenarioSuggestion) => {
    setActionFormData({
      name: suggestion.name,
      description: suggestion.description,
      category: suggestion.category,
      reductionType: suggestion.reductionType,
      reductionValue: suggestion.reductionValue,
      implementationYear: new Date().getFullYear() + 1,
      annualCost: suggestion.annualCost,
      oneTimeCost: suggestion.oneTimeCost,
      isEnabled: true,
    });
    setShowActionDialog(true);
    setShowSuggestions(false);
  };

  const calculateProjections = () => {
    if (!scenario) return [];
    
    const baseline = parseFloat(scenario.baselineEmissions);
    const years = [];
    const enabledActions = scenario.actions?.filter((a) => a.isEnabled) || [];
    
    for (let year = scenario.baselineYear; year <= scenario.targetYear; year++) {
      let emissions = baseline;
      let cumulativeReduction = 0;
      
      enabledActions.forEach((action) => {
        if (year >= action.implementationYear) {
          const value = parseFloat(action.reductionValue);
          if (action.reductionType === "absolute") {
            cumulativeReduction += value;
          } else {
            cumulativeReduction += (baseline * value) / 100;
          }
        }
      });
      
      emissions = Math.max(0, baseline - cumulativeReduction);
      years.push({ year, baseline, projected: emissions });
    }
    
    return years;
  };

  const calculateTotalCosts = () => {
    if (!scenario?.actions) return { oneTime: 0, annual: 0, total: 0 };
    
    const enabledActions = scenario.actions.filter((a) => a.isEnabled);
    const oneTime = enabledActions.reduce((sum, a) => sum + (a.oneTimeCost ? parseFloat(a.oneTimeCost) : 0), 0);
    const annual = enabledActions.reduce((sum, a) => sum + (a.annualCost ? parseFloat(a.annualCost) : 0), 0);
    const yearsRemaining = scenario.targetYear - new Date().getFullYear();
    const total = oneTime + annual * Math.max(0, yearsRemaining);
    
    return { oneTime, annual, total };
  };

  const calculateTotalReduction = () => {
    if (!scenario?.actions) return { absolute: 0, percentage: 0 };
    
    const baseline = parseFloat(scenario.baselineEmissions);
    const enabledActions = scenario.actions.filter((a) => a.isEnabled);
    let totalAbsolute = 0;
    
    enabledActions.forEach((action) => {
      const value = parseFloat(action.reductionValue);
      if (action.reductionType === "absolute") {
        totalAbsolute += value;
      } else {
        totalAbsolute += (baseline * value) / 100;
      }
    });
    
    const percentage = baseline > 0 ? (totalAbsolute / baseline) * 100 : 0;
    return { absolute: totalAbsolute, percentage: Math.min(100, percentage) };
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!scenario) {
    return <div>{t('scenarios.scenarioNotFound')}</div>;
  }

  const projections = calculateProjections();
  const costs = calculateTotalCosts();
  const reduction = calculateTotalReduction();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack} data-testid="button-back">
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t('common.back')}
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-display font-bold text-foreground">{scenario.name}</h1>
          {scenario.description && (
            <p className="text-muted-foreground mt-1">{scenario.description}</p>
          )}
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="sm" className="text-destructive hover:text-destructive" data-testid="button-delete-scenario">
              <Trash2 className="h-4 w-4 mr-2" />
              {t('scenarios.deleteScenario')}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t('scenarios.deleteScenario')}</AlertDialogTitle>
              <AlertDialogDescription>
                {t('scenarios.deleteScenarioConfirm').replace('{name}', scenario.name)}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteScenarioMutation.mutate()}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                disabled={deleteScenarioMutation.isPending}
              >
                {deleteScenarioMutation.isPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                {t('common.delete')}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-100">
                <TrendingDown className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t('scenarios.projectedReduction')}</p>
                <p className="text-2xl font-bold text-emerald-600">{reduction.percentage.toFixed(1)}%</p>
                <p className="text-xs text-muted-foreground">{reduction.absolute.toLocaleString()} kg CO₂e</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100">
                <DollarSign className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t('scenarios.totalInvestment')}</p>
                <p className="text-2xl font-bold">{costs.total.toLocaleString()} DKK</p>
                <p className="text-xs text-muted-foreground">
                  {costs.oneTime.toLocaleString()} {t('scenarios.oneTimePlus')} {costs.annual.toLocaleString()}{t('scenarios.perYear')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-100">
                <Zap className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t('scenarios.activeActions')}</p>
                <p className="text-2xl font-bold">
                  {scenario.actions?.filter((a) => a.isEnabled).length || 0}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t('scenarios.ofTotal').replace('{total}', String(scenario.actions?.length || 0))}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('scenarios.emissionTrajectory')}</CardTitle>
          <CardDescription>
            {t('scenarios.emissionTrajectoryDesc').replace('{startYear}', String(scenario.baselineYear)).replace('{endYear}', String(scenario.targetYear))}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={projections} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="baselineGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="projectedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                formatter={(value: number) => [`${value.toLocaleString()} kg CO₂e`]}
                labelFormatter={(label) => t('scenarios.yearLabel').replace('{year}', String(label))}
              />
              <Area
                type="monotone"
                dataKey="baseline"
                stroke="#f59e0b"
                strokeWidth={2}
                strokeDasharray="5 5"
                fill="url(#baselineGradient)"
                name={t('scenarios.baselineNoAction')}
              />
              <Area
                type="monotone"
                dataKey="projected"
                stroke="#10b981"
                strokeWidth={2}
                fill="url(#projectedGradient)"
                name={t('scenarios.projected')}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* AI Suggestions Panel */}
      {showSuggestions && (
        <Card className="border-purple-200 bg-gradient-to-r from-purple-50/50 to-indigo-50/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                <CardTitle className="text-purple-900">{t('scenarios.aiSuggestions')}</CardTitle>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowSuggestions(false)}>
                {t('scenarios.close')}
              </Button>
            </div>
            <CardDescription>
              {t('scenarios.aiSuggestionsDesc')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {suggestionsLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-purple-600 mr-2" />
                <span className="text-muted-foreground">{t('scenarios.analyzingEmissions')}</span>
              </div>
            ) : suggestionsData?.suggestions && suggestionsData.suggestions.length > 0 ? (
              <div className="grid gap-3 md:grid-cols-2">
                {suggestionsData.suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border bg-white hover:border-purple-300 hover:shadow-sm transition-all cursor-pointer"
                    onClick={() => applySuggestion(suggestion)}
                    data-testid={`suggestion-${index}`}
                  >
                    <div className="flex items-start gap-3">
                      <Lightbulb className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm">{suggestion.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {suggestion.description}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-xs">
                          <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                            −{suggestion.reductionValue}{suggestion.reductionType === "percentage" ? "%" : " kg"}
                          </Badge>
                          <span className="text-muted-foreground">
                            {suggestion.oneTimeCost > 0 && `${suggestion.oneTimeCost.toLocaleString()} DKK`}
                            {suggestion.oneTimeCost > 0 && suggestion.annualCost !== 0 && " + "}
                            {suggestion.annualCost !== 0 && `${suggestion.annualCost.toLocaleString()} DKK/yr`}
                          </span>
                        </div>
                        <p className="text-xs text-purple-600 mt-2 italic">{suggestion.reasoning}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Sparkles className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>{t('scenarios.noSuggestions')}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>{t('scenarios.reductionActions')}</CardTitle>
            <CardDescription>{t('scenarios.reductionActionsDesc')}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setShowSuggestions(true);
                refetchSuggestions();
              }}
              data-testid="button-ai-suggestions"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              {t('scenarios.aiSuggestions')}
            </Button>
            <Button onClick={() => setShowActionDialog(true)} data-testid="button-add-action">
              <Plus className="h-4 w-4 mr-2" />
              {t('scenarios.addAction')}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {scenario.actions && scenario.actions.length > 0 ? (
            <div className="space-y-3">
              {scenario.actions.map((action) => (
                <div
                  key={action.id}
                  className={`p-4 rounded-lg border ${action.isEnabled ? "bg-white" : "bg-muted/50 opacity-60"}`}
                  data-testid={`action-${action.id}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <Switch
                        checked={action.isEnabled}
                        onCheckedChange={(checked) =>
                          toggleActionMutation.mutate({ id: action.id, isEnabled: checked })
                        }
                        data-testid={`switch-action-${action.id}`}
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{action.name}</h4>
                          {action.category && (
                            <Badge variant="outline" className="text-xs">
                              {action.category}
                            </Badge>
                          )}
                        </div>
                        {action.description && (
                          <p className="text-sm text-muted-foreground mt-1">{action.description}</p>
                        )}
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <span className="text-emerald-600 font-medium">
                            {action.reductionType === "percentage"
                              ? `−${parseFloat(action.reductionValue)}%`
                              : `−${parseFloat(action.reductionValue).toLocaleString()} kg`}
                          </span>
                          <span className="text-muted-foreground">{t('scenarios.from')} {action.implementationYear}</span>
                          {(action.annualCost || action.oneTimeCost) && (
                            <span className="text-muted-foreground">
                              {action.oneTimeCost && `${parseFloat(action.oneTimeCost).toLocaleString()} DKK`}
                              {action.oneTimeCost && action.annualCost && " + "}
                              {action.annualCost && `${parseFloat(action.annualCost).toLocaleString()} DKK/yr`}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditAction(action)}
                        data-testid={`button-edit-action-${action.id}`}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" data-testid={`button-delete-action-${action.id}`}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>{t('scenarios.deleteAction')}</AlertDialogTitle>
                            <AlertDialogDescription>
                              {t('scenarios.deleteActionConfirm').replace('{name}', action.name)}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteActionMutation.mutate(action.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              {t('common.delete')}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Zap className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>{t('scenarios.noActionsYet')}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={showActionDialog} onOpenChange={(open) => !open && closeActionDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingAction ? t('scenarios.editAction') : t('scenarios.addReductionAction')}</DialogTitle>
            <DialogDescription>
              {t('scenarios.actionDesc')}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="actionName">{t('scenarios.actionName')}</Label>
              <Input
                id="actionName"
                value={actionFormData.name}
                onChange={(e) => setActionFormData({ ...actionFormData, name: e.target.value })}
                placeholder={t('scenarios.actionNamePlaceholder')}
                data-testid="input-action-name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="actionDescription">{t('scenarios.actionDescriptionOptional')}</Label>
              <Textarea
                id="actionDescription"
                value={actionFormData.description}
                onChange={(e) => setActionFormData({ ...actionFormData, description: e.target.value })}
                placeholder={t('scenarios.actionDescriptionPlaceholder')}
                data-testid="input-action-description"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">{t('scenarios.category')}</Label>
                <Select
                  value={actionFormData.category}
                  onValueChange={(value) => setActionFormData({ ...actionFormData, category: value })}
                >
                  <SelectTrigger data-testid="select-action-category">
                    <SelectValue placeholder={t('scenarios.selectCategory')} />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {t(`scenarios.category${cat}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="implementationYear">{t('scenarios.implementationYear')}</Label>
                <Input
                  id="implementationYear"
                  type="number"
                  value={actionFormData.implementationYear}
                  onChange={(e) =>
                    setActionFormData({ ...actionFormData, implementationYear: parseInt(e.target.value) })
                  }
                  data-testid="input-implementation-year"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t('scenarios.reductionType')}</Label>
                <Select
                  value={actionFormData.reductionType}
                  onValueChange={(value: "absolute" | "percentage") =>
                    setActionFormData({ ...actionFormData, reductionType: value })
                  }
                >
                  <SelectTrigger data-testid="select-reduction-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">{t('scenarios.percentage')}</SelectItem>
                    <SelectItem value="absolute">{t('scenarios.absolute')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reductionValue">
                  {actionFormData.reductionType === "percentage" ? t('scenarios.reductionValuePercent') : t('scenarios.reductionValueKg')}
                </Label>
                <Input
                  id="reductionValue"
                  type="number"
                  value={actionFormData.reductionValue}
                  onChange={(e) =>
                    setActionFormData({ ...actionFormData, reductionValue: parseFloat(e.target.value) })
                  }
                  data-testid="input-reduction-value"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="oneTimeCost">{t('scenarios.oneTimeCost')}</Label>
                <Input
                  id="oneTimeCost"
                  type="number"
                  value={actionFormData.oneTimeCost}
                  onChange={(e) =>
                    setActionFormData({ ...actionFormData, oneTimeCost: parseFloat(e.target.value) })
                  }
                  data-testid="input-one-time-cost"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="annualCost">{t('scenarios.annualCost')}</Label>
                <Input
                  id="annualCost"
                  type="number"
                  value={actionFormData.annualCost}
                  onChange={(e) =>
                    setActionFormData({ ...actionFormData, annualCost: parseFloat(e.target.value) })
                  }
                  data-testid="input-annual-cost"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeActionDialog}>
              {t('common.cancel')}
            </Button>
            <Button
              onClick={() => {
                if (editingAction) {
                  updateActionMutation.mutate({ id: editingAction.id, data: actionFormData });
                } else {
                  createActionMutation.mutate(actionFormData);
                }
              }}
              disabled={!actionFormData.name || createActionMutation.isPending || updateActionMutation.isPending}
              data-testid="button-save-action"
            >
              {(createActionMutation.isPending || updateActionMutation.isPending) && (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              )}
              {editingAction ? t('scenarios.saveChanges') : t('scenarios.addAction')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function ScenarioPlanner() {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(null);

  return (
    <FeatureGate feature="scenarioBuilder">
      <div className="p-6 max-w-7xl mx-auto">
        {selectedScenarioId ? (
          <ScenarioDetail scenarioId={selectedScenarioId} onBack={() => setSelectedScenarioId(null)} />
        ) : (
          <ScenarioList onSelectScenario={setSelectedScenarioId} />
        )}
      </div>
    </FeatureGate>
  );
}
