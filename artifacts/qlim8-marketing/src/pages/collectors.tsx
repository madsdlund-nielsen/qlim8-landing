import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Plus, Link2, Database, FileUp, Sparkles, Loader2, FlaskConical } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { trackFeatureUse } from "@/lib/analytics";
import { useI18n } from "@/lib/i18n";
import { FeatureGate } from "@/components/FeatureGate";

import {
  DataSourcesModal,
  ManualEntryDialog,
  InvoiceUploadWizard,
  CSVUploadWizard,
  EconomicConnectionDialog,
  DineroConnectionDialog,
  APIKeysDialog,
  ConnectionGuideDialog,
  BatchImportPanel,
  Category,
  Activity,
  AISuggestion,
  AICategorizationResult,
  EntryFormData,
  defaultEntryForm,
} from "@/components/collectors";

export default function Collectors() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { t } = useI18n();
  const { user } = useAuth();
  
  const isAdminUser = user?.platformRole === "admin" || user?.platformRole === "super_admin";

  const [modalOpen, setModalOpen] = useState(false);
  const [manualEntryOpen, setManualEntryOpen] = useState(false);
  const [invoiceWizardOpen, setInvoiceWizardOpen] = useState(false);
  const [uploadWizardOpen, setUploadWizardOpen] = useState(false);
  const [economicModalOpen, setEconomicModalOpen] = useState(false);
  const [dineroModalOpen, setDineroModalOpen] = useState(false);
  const [apiKeysModalOpen, setApiKeysModalOpen] = useState(false);
  const [connectionGuideOpen, setConnectionGuideOpen] = useState(false);

  const [entryForm, setEntryForm] = useState<EntryFormData>(defaultEntryForm);
  const [aiSuggestions, setAiSuggestions] = useState<AISuggestion[]>([]);
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);
  const [aiSource, setAiSource] = useState<"ai" | "keyword_fallback" | null>(null);

  const { data: economicStatus, refetch: refetchEconomic } = useQuery<{
    connected: boolean;
    id?: string;
    name?: string;
    lastSyncAt?: string;
    status?: string;
    syncError?: string;
  }>({
    queryKey: ["/api/integrations/economic"],
    queryFn: async () => {
      const res = await fetch("/api/integrations/economic", { credentials: "include" });
      if (!res.ok) return { connected: false };
      return res.json();
    },
  });

  const connectEconomic = useMutation({
    mutationFn: async (tokens: { appSecretToken: string; agreementGrantToken: string }) => {
      const res = await fetch("/api/integrations/economic/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(tokens),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to connect");
      }
      return res.json();
    },
    onSuccess: () => {
      refetchEconomic();
      setEconomicModalOpen(false);
      toast({ title: t('collectors.connectedToEconomic') });
    },
    onError: (error: Error) => {
      toast({ title: t('collectors.connectionFailed'), description: error.message, variant: "destructive" });
    },
  });

  const disconnectEconomic = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/integrations/economic", {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to disconnect");
      return res.json();
    },
    onSuccess: () => {
      refetchEconomic();
      toast({ title: t('collectors.disconnectedFromEconomic') });
    },
    onError: (error: Error) => {
      toast({ title: t('collectors.disconnectFailed'), description: error.message, variant: "destructive" });
    },
  });

  const syncEconomic = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/integrations/economic/sync", {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to sync");
      }
      return res.json();
    },
    onSuccess: (data) => {
      refetchEconomic();
      queryClient.invalidateQueries({ queryKey: ["/api/activities"] });
      toast({
        title: t('collectors.syncComplete'),
        description: t('collectors.syncCompleteDesc').replace('{imported}', data.imported).replace('{skipped}', data.skipped),
      });
    },
    onError: (error: Error) => {
      toast({ title: t('collectors.syncFailed'), description: error.message, variant: "destructive" });
    },
  });

  const { data: dineroStatus, refetch: refetchDinero } = useQuery<{
    connected: boolean;
    id?: string;
    organizationName?: string;
    lastSyncAt?: string;
    status?: string;
    syncError?: string;
  }>({
    queryKey: ["/api/integrations/dinero"],
    queryFn: async () => {
      const res = await fetch("/api/integrations/dinero", { credentials: "include" });
      if (!res.ok) return { connected: false };
      return res.json();
    },
  });

  const connectDinero = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/integrations/dinero/auth-url", { credentials: "include" });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to get auth URL");
      }
      const { authUrl } = await res.json();
      window.location.href = authUrl;
    },
    onError: (error: Error) => {
      toast({ title: "Forbindelse fejlede", description: error.message, variant: "destructive" });
    },
  });

  const disconnectDinero = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/integrations/dinero", {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to disconnect");
      return res.json();
    },
    onSuccess: () => {
      refetchDinero();
      toast({ title: "Dinero afbrudt" });
    },
    onError: (error: Error) => {
      toast({ title: "Afbrydelse fejlede", description: error.message, variant: "destructive" });
    },
  });

  const syncDinero = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/integrations/dinero/sync", {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to sync");
      }
      return res.json();
    },
    onSuccess: (data) => {
      refetchDinero();
      queryClient.invalidateQueries({ queryKey: ["/api/activities"] });
      toast({
        title: "Synkronisering fuldført",
        description: `Importerede ${data.imported} nye transaktioner (${data.skipped} sprunget over)`,
      });
    },
    onError: (error: Error) => {
      toast({ title: "Synkronisering fejlede", description: error.message, variant: "destructive" });
    },
  });

  const { data: aiStatus } = useQuery<{ enabled: boolean; message: string }>({
    queryKey: ["/api/ai/status"],
    queryFn: async () => {
      const res = await fetch("/api/ai/status", { credentials: "include" });
      if (!res.ok) return { enabled: false, message: "AI not available" };
      return res.json();
    },
  });

  const getAiSuggestions = useMutation({
    mutationFn: async (data: { description: string; amount?: number }) => {
      const res = await fetch("/api/ai/categorize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to get AI suggestions");
      }
      return res.json() as Promise<AICategorizationResult>;
    },
    onSuccess: (data) => {
      setAiSuggestions(data.suggestions);
      setAiSource(data.source || null);
      setShowAiSuggestions(true);
    },
    onError: (error: Error) => {
      toast({
        title: t('collectors.aiSuggestionFailed'),
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
    queryFn: async () => {
      const res = await fetch("/api/categories", { credentials: "include" });
      if (!res.ok) return [];
      return res.json();
    },
  });

  const { data: activities = [], isLoading: activitiesLoading } = useQuery<Activity[]>({
    queryKey: ["/api/activities"],
    queryFn: async () => {
      const res = await fetch("/api/activities", { credentials: "include" });
      if (!res.ok) return [];
      return res.json();
    },
  });

  const { data: mockDataStatus, refetch: refetchMockData } = useQuery<{
    loaded: boolean;
    entryCount: number;
  }>({
    queryKey: ["/api/admin/mock-data/status"],
    queryFn: async () => {
      const res = await fetch("/api/admin/mock-data/status", { credentials: "include" });
      if (!res.ok) return { loaded: false, entryCount: 0 };
      return res.json();
    },
    enabled: isAdminUser,
  });

  const loadMockData = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/admin/mock-data/load", {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to load mock data");
      }
      return res.json();
    },
    onSuccess: (data) => {
      refetchMockData();
      queryClient.invalidateQueries({ queryKey: ["/api/activities"] });
      queryClient.invalidateQueries({ queryKey: ["/api/emission-entries"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/totals"] });
      toast({
        title: "Mock data loaded",
        description: `${data.created} test entries added to your carbon ledger`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to load mock data",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const removeMockData = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/admin/mock-data/remove", {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to remove mock data");
      }
      return res.json();
    },
    onSuccess: (data) => {
      refetchMockData();
      queryClient.invalidateQueries({ queryKey: ["/api/activities"] });
      queryClient.invalidateQueries({ queryKey: ["/api/emission-entries"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/totals"] });
      toast({
        title: "Mock data removed",
        description: `${data.removed} test entries removed from your carbon ledger`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to remove mock data",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleMockDataToggle = (checked: boolean) => {
    if (checked) {
      loadMockData.mutate();
    } else {
      removeMockData.mutate();
    }
  };

  const createEntry = useMutation({
    mutationFn: async (data: EntryFormData) => {
      const res = await fetch("/api/manual-entry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          description: data.description,
          categoryName: data.category,
          transactionDate: new Date(data.transactionDate).toISOString(),
          amount: parseFloat(data.amount),
          quantity: data.quantity ? parseFloat(data.quantity) : undefined,
          unit: data.unit || undefined,
          isGreenPower: data.isGreenPower,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create entry");
      }
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/activities"] });
      queryClient.invalidateQueries({ queryKey: ["/api/emission-entries"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/totals"] });

      const emissions = data.calculation?.co2eMarketBased || 0;
      toast({
        title: t('collectors.entryAdded'),
        description: t('collectors.entryAddedDesc').replace('{emissions}', emissions.toFixed(2)),
      });

      setManualEntryOpen(false);
      setEntryForm(defaultEntryForm);
    },
    onError: (error: Error) => {
      toast({
        title: t('collectors.entryFailed'),
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleGetAiSuggestions = () => {
    if (!entryForm.description.trim()) {
      toast({
        title: t('collectors.descriptionRequired'),
        description: t('collectors.descriptionRequiredDesc'),
        variant: "destructive",
      });
      return;
    }
    getAiSuggestions.mutate({
      description: entryForm.description,
      amount: entryForm.amount ? parseFloat(entryForm.amount) : undefined,
    });
  };

  const handleSelectAiSuggestion = (categoryName: string) => {
    const normalised = categoryName.toLowerCase().trim();
    const scored = categories.map(c => {
      const cn = c.name.toLowerCase();
      let score = 0;
      if (cn === normalised) score = 4;
      else if (cn.startsWith(normalised) || normalised.startsWith(cn)) score = 3;
      else if (cn.includes(normalised)) score = 2;
      else if (normalised.includes(cn)) score = 1;
      return { name: c.name, score };
    }).filter(c => c.score > 0).sort((a, b) => b.score - a.score);
    const resolved = scored.length > 0 ? scored[0].name : categoryName;
    setEntryForm({ ...entryForm, category: resolved });
    setShowAiSuggestions(false);
  };

  const handleSubmitEntry = () => {
    if (!entryForm.description || !entryForm.category || !entryForm.amount) {
      toast({
        title: t('collectors.missingFields'),
        description: t('collectors.missingFieldsDesc'),
        variant: "destructive",
      });
      return;
    }
    trackFeatureUse('Submit Manual Entry');
    createEntry.mutate(entryForm);
  };

  const handleSelectSource = (sourceId: string) => {
    trackFeatureUse(`Select Data Source: ${sourceId}`);
    setModalOpen(false);

    if (sourceId === "manual") {
      setManualEntryOpen(true);
    } else if (sourceId === "economic") {
      setEconomicModalOpen(true);
    } else if (sourceId === "dinero") {
      setDineroModalOpen(true);
    } else if (sourceId === "invoice") {
      setInvoiceWizardOpen(true);
    } else if (sourceId === "csv") {
      setUploadWizardOpen(true);
    } else if (sourceId === "api") {
      setApiKeysModalOpen(true);
    } else {
      toast({
        title: t('collectors.comingSoon'),
        description: t('collectors.comingSoonDesc'),
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-display">{t('collectors.title')}</h1>
          <p className="text-muted-foreground mt-1">{t('collectors.subtitle')}</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setManualEntryOpen(true)} data-testid="button-manual-entry">
            <Plus className="h-4 w-4 mr-2" />
            {t('collectors.addEntry')}
          </Button>
          <Button onClick={() => setModalOpen(true)} data-testid="button-connect-data-source">
            <Link2 className="h-4 w-4 mr-2" />
            {t('collectors.connectSource')}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="sources" className="space-y-6">
        <TabsList>
          <TabsTrigger value="sources">{t('collectors.dataSources')}</TabsTrigger>
          <TabsTrigger value="recent">{t('collectors.recentActivity')}</TabsTrigger>
          <TabsTrigger value="batch-import">Historisk import</TabsTrigger>
        </TabsList>

        <TabsContent value="sources" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card
              className="cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => handleSelectSource("invoice")}
              data-testid="card-invoice-source"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{t('collectors.aiInvoice')}</CardTitle>
                    <CardDescription className="text-xs">{t('collectors.aiInvoiceDesc')}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Badge className="bg-purple-100 text-purple-700 border-purple-200">{t('collectors.recommended')}</Badge>
              </CardContent>
            </Card>

            <FeatureGate feature="dataCollector.apiIntegrations">
              <Card
                className="cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => handleSelectSource("dinero")}
                data-testid="card-dinero-source"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Database className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-base">Dinero</CardTitle>
                      <CardDescription className="text-xs">Dansk regnskabssystem til SMV</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {dineroStatus?.connected ? (
                    <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">{t('collectors.connected')}</Badge>
                  ) : (
                    <Badge variant="outline">{t('collectors.notConnected')}</Badge>
                  )}
                </CardContent>
              </Card>
            </FeatureGate>

            <Card
              className="cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => handleSelectSource("csv")}
              data-testid="card-csv-source"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <FileUp className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{t('collectors.excelUpload')}</CardTitle>
                    <CardDescription className="text-xs">{t('collectors.excelUploadDesc')}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Badge variant="outline">{t('collectors.available')}</Badge>
              </CardContent>
            </Card>
          </div>

          {isAdminUser && (
            <Card className="border-dashed border-orange-300 bg-orange-50/50" data-testid="card-mock-data">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center">
                      <FlaskConical className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <CardTitle className="text-base flex items-center gap-2">
                        Test Data
                        <Badge variant="outline" className="text-xs font-normal">Admin Only</Badge>
                      </CardTitle>
                      <CardDescription className="text-xs">
                        Load 62 mock invoice entries for testing the calculation engine
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {(loadMockData.isPending || removeMockData.isPending) && (
                      <Loader2 className="h-4 w-4 animate-spin text-orange-600" />
                    )}
                    <Switch
                      checked={mockDataStatus?.loaded || false}
                      onCheckedChange={handleMockDataToggle}
                      disabled={loadMockData.isPending || removeMockData.isPending}
                      data-testid="switch-mock-data"
                    />
                  </div>
                </div>
              </CardHeader>
              {mockDataStatus?.loaded && (
                <CardContent className="pt-0">
                  <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                    {mockDataStatus.entryCount} entries loaded
                  </Badge>
                </CardContent>
              )}
            </Card>
          )}
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('collectors.recentActivities')}</CardTitle>
              <CardDescription>{t('collectors.recentActivitiesDesc')}</CardDescription>
            </CardHeader>
            <CardContent>
              {activitiesLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : activities.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>{t('collectors.noActivities')}</p>
                </div>
              ) : (
                <ScrollArea className="h-[400px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t('ledger.description')}</TableHead>
                        <TableHead>{t('ledger.amount')}</TableHead>
                        <TableHead>{t('ledger.date')}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {activities.slice(0, 20).map((activity) => (
                        <TableRow key={activity.id}>
                          <TableCell className="font-medium">{activity.description}</TableCell>
                          <TableCell>
                            {parseFloat(activity.amount).toLocaleString()} {activity.currency}
                          </TableCell>
                          <TableCell>
                            {new Date(activity.transactionDate).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="batch-import" className="space-y-6">
          <BatchImportPanel />
        </TabsContent>
      </Tabs>

      <DataSourcesModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSelectSource={handleSelectSource}
      />

      <ManualEntryDialog
        open={manualEntryOpen}
        onOpenChange={setManualEntryOpen}
        entryForm={entryForm}
        setEntryForm={setEntryForm}
        categories={categories}
        aiStatus={aiStatus}
        aiSuggestions={aiSuggestions}
        showAiSuggestions={showAiSuggestions}
        setShowAiSuggestions={setShowAiSuggestions}
        aiSource={aiSource}
        onGetAiSuggestions={handleGetAiSuggestions}
        onSelectAiSuggestion={handleSelectAiSuggestion}
        onSubmit={handleSubmitEntry}
        isLoading={createEntry.isPending}
        isAiLoading={getAiSuggestions.isPending}
      />

      <InvoiceUploadWizard
        open={invoiceWizardOpen}
        onOpenChange={setInvoiceWizardOpen}
        categories={categories}
        aiStatus={aiStatus}
      />

      <CSVUploadWizard
        open={uploadWizardOpen}
        onOpenChange={setUploadWizardOpen}
        categories={categories}
      />

      <EconomicConnectionDialog
        open={economicModalOpen}
        onOpenChange={setEconomicModalOpen}
        economicStatus={economicStatus}
        onConnect={(tokens) => connectEconomic.mutate(tokens)}
        onDisconnect={() => disconnectEconomic.mutate()}
        onSync={() => syncEconomic.mutate()}
        isConnecting={connectEconomic.isPending}
        isDisconnecting={disconnectEconomic.isPending}
        isSyncing={syncEconomic.isPending}
      />

      <APIKeysDialog
        open={apiKeysModalOpen}
        onOpenChange={setApiKeysModalOpen}
        onOpenGuide={() => setConnectionGuideOpen(true)}
      />

      <ConnectionGuideDialog
        open={connectionGuideOpen}
        onOpenChange={setConnectionGuideOpen}
      />

      <DineroConnectionDialog
        open={dineroModalOpen}
        onOpenChange={setDineroModalOpen}
        dineroStatus={dineroStatus}
        onConnect={() => connectDinero.mutate()}
        onDisconnect={() => disconnectDinero.mutate()}
        onSync={() => syncDinero.mutate()}
        isConnecting={connectDinero.isPending}
        isDisconnecting={disconnectDinero.isPending}
        isSyncing={syncDinero.isPending}
      />
    </div>
  );
}
