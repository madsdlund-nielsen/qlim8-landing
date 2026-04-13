import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Lightbulb, ArrowRight, Leaf, TrendingDown, Plus, Target, Calendar, Percent, Loader2, Trash2, Edit2, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { trackClick, trackFeatureUse } from "@/lib/analytics";
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { useI18n } from "@/lib/i18n";
import { FeatureGate } from "@/components/FeatureGate";

interface ReductionTarget {
  id: string;
  tenantId: string;
  name: string;
  baselineYear: number;
  baselineEmissions: string;
  targetYear: number;
  targetReductionPercent: string;
  scope: "1" | "2" | "3" | "1+2" | "all" | null;
  category: string | null;
  description: string | null;
  isActive: boolean;
  createdAt: string;
}

interface DashboardTotals {
  scope1: { marketBased: number; locationBased: number; count: number };
  scope2: { marketBased: number; locationBased: number; count: number };
  scope3: { marketBased: number; locationBased: number; count: number };
  total: { marketBased: number; locationBased: number; count: number };
}

interface HistoryData {
  year: number;
  emissions: number;
}

interface TrajectoryData {
  year: number;
  value: number;
}

interface TargetHistoryResponse {
  history: HistoryData[];
  trajectory: TrajectoryData[];
  baselineYear: number;
  targetYear: number;
}

function TargetProgressChart({ 
  targetId, 
  baselineYear, 
  targetYear,
  baselineEmissions,
  targetEmissions,
  currentEmissions,
  progress
}: { 
  targetId: string;
  baselineYear: number;
  targetYear: number;
  baselineEmissions: number;
  targetEmissions: number;
  currentEmissions: number;
  progress: number;
}) {
  const { t } = useI18n();
  const { data: historyData, isLoading } = useQuery<TargetHistoryResponse>({
    queryKey: [`/api/reduction-targets/${targetId}/history`],
    queryFn: async () => {
      const res = await fetch(`/api/reduction-targets/${targetId}/history`, { credentials: "include" });
      if (!res.ok) return { history: [], trajectory: [], baselineYear: 0, targetYear: 0 };
      return res.json();
    },
  });

  const currentYear = new Date().getFullYear();

  const chartData: Array<{ year: number; actual: number | null; target: number | null; isCurrent: boolean }> = [];
  
  if (historyData?.trajectory) {
    historyData.trajectory.forEach((t) => {
      const historyPoint = historyData.history.find((h) => h.year === t.year);
      chartData.push({
        year: t.year,
        actual: historyPoint ? historyPoint.emissions : null,
        target: t.value,
        isCurrent: t.year === currentYear,
      });
    });
    chartData.sort((a, b) => a.year - b.year);
  }

  const hasAnyData = historyData && (historyData.history.length > 0 || historyData.trajectory.length > 0);
  const hasActualEmissions = chartData.some(d => d.actual !== null && d.actual > 0);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center text-sm">
        <span className="text-muted-foreground">{t('reduction.progress')}: <span className="font-mono font-medium text-foreground">{progress}%</span></span>
        <div className="flex gap-4 text-xs">
          <span className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
            {t('reduction.actual')}
          </span>
          <span className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-amber-500" />
            {t('reduction.targetPath')}
          </span>
        </div>
      </div>

      {isLoading ? (
        <div className="h-[200px] flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : hasAnyData ? (
        <ResponsiveContainer width="100%" height={200}>
          <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="year" 
              tick={{ fontSize: 11 }}
              axisLine={{ stroke: '#e5e7eb' }}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 11 }}
              axisLine={{ stroke: '#e5e7eb' }}
              tickLine={false}
              tickFormatter={(v) => `${(v/1000).toFixed(0)}k`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '12px'
              }}
              formatter={(value: number) => [`${value.toLocaleString()} t`, '']}
              labelFormatter={(label) => `${t('reduction.year')} ${label}`}
            />
            <ReferenceLine y={targetEmissions} stroke="#10b981" strokeDasharray="5 5" label={{ value: t('reduction.target'), fontSize: 10, fill: '#10b981' }} />
            <Bar 
              dataKey="actual" 
              fill="#10b981" 
              radius={[4, 4, 0, 0]}
              name={t('reduction.actualEmissions')}
            />
            <Line 
              type="monotone" 
              dataKey="target" 
              stroke="#f59e0b" 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              name={t('reduction.targetPath')}
            />
          </ComposedChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-[200px] flex flex-col items-center justify-center text-muted-foreground border border-dashed rounded-lg">
          <TrendingDown className="h-8 w-8 mb-2 opacity-50" />
          <p className="text-sm">{t('reduction.noEmissionData')}</p>
          <p className="text-xs">{t('reduction.addEntriesToSeeChart')}</p>
        </div>
      )}

      <Progress value={progress} className="h-2" />

      <div className="grid grid-cols-3 gap-4 pt-3 border-t border-border/50">
        <div>
          <div className="text-xs text-muted-foreground uppercase tracking-wider">{t('reduction.baseline')} ({baselineYear})</div>
          <div className="font-mono font-medium">{baselineEmissions.toLocaleString()} t</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground uppercase tracking-wider">{t('reduction.target')} ({targetYear})</div>
          <div className="font-mono font-medium text-emerald-600">{targetEmissions.toLocaleString()} t</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground uppercase tracking-wider">{t('reduction.current')}</div>
          <div className="font-mono font-medium">{currentEmissions.toLocaleString()} t</div>
        </div>
      </div>
    </div>
  );
}

export default function Reduction() {
  const { t } = useI18n();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newTarget, setNewTarget] = useState({
    name: "",
    baselineYear: new Date().getFullYear() - 1,
    baselineEmissions: "",
    targetYear: 2030,
    targetReductionPercent: 50,
    scope: "",
    description: "",
  });

  const { data: targets = [], isLoading: targetsLoading } = useQuery<ReductionTarget[]>({
    queryKey: ["/api/reduction-targets"],
    queryFn: async () => {
      const res = await fetch("/api/reduction-targets", { credentials: "include" });
      if (!res.ok) return [];
      return res.json();
    },
  });

  const { data: totals } = useQuery<DashboardTotals>({
    queryKey: ["/api/dashboard/totals"],
    queryFn: async () => {
      const res = await fetch("/api/dashboard/totals", { credentials: "include" });
      if (!res.ok) return null;
      return res.json();
    },
  });

  const createTarget = useMutation({
    mutationFn: async (data: typeof newTarget) => {
      const res = await fetch("/api/reduction-targets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: data.name,
          baselineYear: data.baselineYear,
          baselineEmissions: parseFloat(data.baselineEmissions),
          targetYear: data.targetYear,
          targetReductionPercent: data.targetReductionPercent,
          scope: data.scope || undefined,
          description: data.description || undefined,
        }),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || t('reduction.failedToCreateTarget'));
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/reduction-targets"] });
      toast({ title: t('reduction.targetCreated'), description: t('reduction.targetCreatedDesc') });
      setCreateDialogOpen(false);
      setNewTarget({
        name: "",
        baselineYear: new Date().getFullYear() - 1,
        baselineEmissions: "",
        targetYear: 2030,
        targetReductionPercent: 50,
        scope: "",
        description: "",
      });
    },
    onError: (error: Error) => {
      toast({ title: t('reduction.failedToCreateTarget'), description: error.message, variant: "destructive" });
    },
  });

  const deleteTarget = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/reduction-targets/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error(t('reduction.failedToDeleteTarget'));
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/reduction-targets"] });
      toast({ title: t('reduction.targetDeleted') });
    },
    onError: () => {
      toast({ title: t('reduction.failedToDeleteTarget'), variant: "destructive" });
    },
  });

  const currentYear = new Date().getFullYear();

  const getCurrentEmissions = (scope: string | null) => {
    if (!totals) return 0;
    switch (scope) {
      case "1":
        return totals.scope1.marketBased;
      case "2":
        return totals.scope2.marketBased;
      case "3":
        return totals.scope3.marketBased;
      case "1+2":
        return totals.scope1.marketBased + totals.scope2.marketBased;
      case "all":
      case null:
        return totals.total.marketBased;
      default:
        return totals.total.marketBased;
    }
  };

  const calculateProgress = (target: ReductionTarget) => {
    const currentEmissions = getCurrentEmissions(target.scope);
    const baseline = parseFloat(target.baselineEmissions);
    const reductionGoal = baseline * (parseFloat(target.targetReductionPercent) / 100);
    const targetEmissions = baseline - reductionGoal;
    
    if (currentEmissions >= baseline) return 0;
    if (currentEmissions <= targetEmissions) return 100;
    
    const achieved = baseline - currentEmissions;
    return Math.min(100, Math.round((achieved / reductionGoal) * 100));
  };

  const recommendedActions = [
    {
      id: 1,
      title: t('reduction.actionHeatPump'),
      desc: t('reduction.actionHeatPumpDesc'),
      impact: t('reduction.highImpact'),
      savings: "4.2 tCO2e/yr",
      cost: t('reduction.investment') + ": 120k DKK",
      roi: t('reduction.roi') + ": 3.5 " + t('reduction.years'),
      scope: "1"
    },
    {
      id: 2,
      title: t('reduction.actionTravelPolicy'),
      desc: t('reduction.actionTravelPolicyDesc'),
      impact: t('reduction.mediumImpact'),
      savings: "1.8 tCO2e/yr",
      cost: t('reduction.cost') + ": 0 DKK",
      roi: t('reduction.immediateSavings'),
      scope: "3"
    },
    {
      id: 3,
      title: t('reduction.actionGreenPower'),
      desc: t('reduction.actionGreenPowerDesc'),
      impact: t('reduction.highImpact'),
      savings: "2.5 tCO2e/yr",
      cost: t('reduction.cost') + ": +5%",
      roi: t('reduction.immediateImpact'),
      scope: "2"
    }
  ];

  return (
    <FeatureGate feature="reductionHub">
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-display">{t('reduction.title')}</h1>
          <p className="text-muted-foreground mt-1">{t('reduction.subtitle')}</p>
        </div>
        <Button onClick={() => setCreateDialogOpen(true)} data-testid="button-create-target">
          <Plus className="h-4 w-4 mr-2" />
          {t('reduction.setTarget')}
        </Button>
      </div>

      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              {t('reduction.setReductionTarget')}
            </DialogTitle>
            <DialogDescription>
              {t('reduction.setReductionTargetDesc')}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>{t('reduction.targetName')} *</Label>
              <Input
                placeholder={t('reduction.targetNamePlaceholder')}
                value={newTarget.name}
                onChange={(e) => setNewTarget({ ...newTarget, name: e.target.value })}
                data-testid="input-target-name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t('reduction.baselineYear')}</Label>
                <Select
                  value={newTarget.baselineYear.toString()}
                  onValueChange={(v) => setNewTarget({ ...newTarget, baselineYear: parseInt(v) })}
                >
                  <SelectTrigger data-testid="select-baseline-year">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[2020, 2021, 2022, 2023, 2024].map((year) => (
                      <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>{t('reduction.baselineEmissions')} (tCO2e) *</Label>
                <Input
                  type="number"
                  placeholder={t('reduction.baselineEmissionsPlaceholder')}
                  value={newTarget.baselineEmissions}
                  onChange={(e) => setNewTarget({ ...newTarget, baselineEmissions: e.target.value })}
                  data-testid="input-baseline-emissions"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t('reduction.targetYear')}</Label>
                <Select
                  value={newTarget.targetYear.toString()}
                  onValueChange={(v) => setNewTarget({ ...newTarget, targetYear: parseInt(v) })}
                >
                  <SelectTrigger data-testid="select-target-year">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[2025, 2026, 2027, 2028, 2029, 2030, 2035, 2040, 2045, 2050].map((year) => (
                      <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>{t('reduction.targetReduction')} (%)</Label>
                <Select
                  value={newTarget.targetReductionPercent.toString()}
                  onValueChange={(v) => setNewTarget({ ...newTarget, targetReductionPercent: parseInt(v) })}
                >
                  <SelectTrigger data-testid="select-reduction-percent">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[10, 20, 25, 30, 40, 50, 60, 70, 80, 90, 100].map((pct) => (
                      <SelectItem key={pct} value={pct.toString()}>{pct}%</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>{t('reduction.scopeOptional')}</Label>
              <Select
                value={newTarget.scope}
                onValueChange={(v) => setNewTarget({ ...newTarget, scope: v })}
              >
                <SelectTrigger data-testid="select-scope">
                  <SelectValue placeholder={t('reduction.allScopes')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('reduction.allScopes')}</SelectItem>
                  <SelectItem value="1">{t('reduction.scope1Direct')}</SelectItem>
                  <SelectItem value="2">{t('reduction.scope2Energy')}</SelectItem>
                  <SelectItem value="1+2">{t('reduction.scope1Plus2')}</SelectItem>
                  <SelectItem value="3">{t('reduction.scope3ValueChain')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>{t('reduction.descriptionOptional')}</Label>
              <Textarea
                placeholder={t('reduction.descriptionPlaceholder')}
                value={newTarget.description}
                onChange={(e) => setNewTarget({ ...newTarget, description: e.target.value })}
                data-testid="input-description"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>{t('common.cancel')}</Button>
            <Button
              onClick={() => {
                trackFeatureUse('Create Reduction Target');
                createTarget.mutate(newTarget);
              }}
              disabled={createTarget.isPending || !newTarget.name || !newTarget.baselineEmissions}
              data-testid="button-save-target"
            >
              {createTarget.isPending ? (
                <><Loader2 className="h-4 w-4 mr-2 animate-spin" />{t('reduction.creating')}</>
              ) : (
                <><Target className="h-4 w-4 mr-2" />{t('reduction.createTarget')}</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-lg font-bold font-display">{t('reduction.yourTargets')}</h2>
          
          {targetsLoading ? (
            <div className="flex items-center justify-center h-32">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : targets.length === 0 ? (
            <Card className="border-0 ring-1 ring-black/5 shadow-sm">
              <CardContent className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <Target className="h-12 w-12 mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">{t('reduction.noTargets')}</p>
                <p className="text-sm mb-4">{t('reduction.noTargetsDesc')}</p>
                <Button onClick={() => setCreateDialogOpen(true)} variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  {t('reduction.setFirstTarget')}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {targets.map((target) => {
                const progress = calculateProgress(target);
                const baseline = parseFloat(target.baselineEmissions);
                const reductionGoal = baseline * (parseFloat(target.targetReductionPercent) / 100);
                const targetEmissions = baseline - reductionGoal;
                const currentEmissions = getCurrentEmissions(target.scope);
                const yearsLeft = target.targetYear - currentYear;
                
                return (
                  <Card 
                    key={target.id} 
                    className="border-0 ring-1 ring-black/5 shadow-sm"
                    data-testid={`target-${target.id}`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-bold flex items-center gap-2">
                            {target.name}
                            {target.scope && (
                              <Badge variant="outline" className="text-xs">Scope {target.scope}</Badge>
                            )}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {target.baselineYear} → {target.targetYear} 
                            <span className="mx-2">•</span>
                            {parseFloat(target.targetReductionPercent)}% {t('reduction.reductionLabel')}
                          </p>
                        </div>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              disabled={deleteTarget.isPending}
                              data-testid={`delete-target-${target.id}`}
                            >
                              <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>{t('reduction.deleteTargetConfirm')}</AlertDialogTitle>
                              <AlertDialogDescription>
                                {t('reduction.deleteTargetConfirmDesc').replace('{name}', target.name)}
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteTarget.mutate(target.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                {t('common.delete')}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>

                      <TargetProgressChart 
                        targetId={target.id}
                        baselineYear={target.baselineYear}
                        targetYear={target.targetYear}
                        baselineEmissions={baseline}
                        targetEmissions={targetEmissions}
                        currentEmissions={currentEmissions}
                        progress={progress}
                      />

                      {yearsLeft > 0 && (
                        <div className="mt-4 p-3 rounded-lg bg-muted/50 flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{yearsLeft} {yearsLeft > 1 ? t('reduction.yearsRemaining') : t('reduction.yearRemaining')}</span>
                        </div>
                      )}

                      {target.description && (
                        <p className="mt-4 text-sm text-muted-foreground">{target.description}</p>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          <h2 className="text-lg font-bold font-display mt-8">{t('reduction.recommendedActions')}</h2>
          
          {recommendedActions.map((action) => (
            <Card key={action.id} className="border-0 ring-1 ring-black/5 shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="h-12 w-12 shrink-0 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Lightbulb className="h-6 w-6" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-bold">{action.title}</h3>
                      <Badge variant="outline" className="text-xs">Scope {action.scope}</Badge>
                    </div>
                    <p className="text-muted-foreground">{action.desc}</p>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4 pt-4 border-t border-border/50">
                      <div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider">{t('reduction.impact')}</div>
                        <div className="font-medium text-emerald-700 font-mono">{action.savings}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider">{t('reduction.economics')}</div>
                        <div className="font-medium text-foreground text-sm">{action.roi}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <h2 className="text-lg font-bold font-display">{t('reduction.summary')}</h2>
          <Card className="bg-primary text-primary-foreground border-0 shadow-lg overflow-hidden relative">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 bg-white/10 rounded-full blur-3xl" />
            
            <CardHeader>
              <CardTitle className="text-primary-foreground">{t('reduction.currentEmissions')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 relative z-10">
              <div className="text-center py-4">
                <div className="text-5xl font-bold font-display tracking-tight">
                  {(totals?.total.marketBased || 0) > 0 ? ((totals?.total.marketBased || 0) / 1000).toFixed(1) : '0'}
                </div>
                <div className="text-sm text-primary-foreground/70 mt-1">{t('reduction.tonsCO2eTotal')}</div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-primary-foreground/80">Scope 1</span>
                  <span className="font-mono">{(totals?.scope1.marketBased || 0).toFixed(2)} t</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-primary-foreground/80">Scope 2</span>
                  <span className="font-mono">{(totals?.scope2.marketBased || 0).toFixed(2)} t</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-primary-foreground/80">Scope 3</span>
                  <span className="font-mono">{(totals?.scope3.marketBased || 0).toFixed(2)} t</span>
                </div>
              </div>

              {targets.length > 0 && (
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2 text-sm text-emerald-300">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>{targets.length} {targets.length > 1 ? t('reduction.activeTargets') : t('reduction.activeTarget')}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-0 ring-1 ring-black/5 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">{t('reduction.sbtiAlignment')}</CardTitle>
              <CardDescription>{t('reduction.sbtiDesc')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 rounded-lg bg-muted/50 text-sm">
                <p className="font-medium mb-1">{t('reduction.pathway15')}</p>
                <p className="text-muted-foreground text-xs">{t('reduction.pathway15Desc')}</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 text-sm">
                <p className="font-medium mb-1">{t('reduction.pathwayWellBelow2')}</p>
                <p className="text-muted-foreground text-xs">{t('reduction.pathwayWellBelow2Desc')}</p>
              </div>
              <Button variant="outline" className="w-full text-sm">
                <ArrowRight className="h-4 w-4 mr-2" />
                {t('reduction.learnAboutSBTi')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </FeatureGate>
  );
}
