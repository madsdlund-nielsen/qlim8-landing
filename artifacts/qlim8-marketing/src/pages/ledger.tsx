import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BulkUploadProgress } from "@/components/BulkUploadProgress";
import { useI18n } from "@/lib/i18n";
import {
  LedgerFilters,
  LedgerTable,
  AuditDrawer,
  CategoryChangeDialog,
  type Department,
  type EnrichedEmissionEntry,
  type CategoryChangeAudit,
  type EmissionCategory,
} from "@/components/ledger";

export default function Ledger() {
  const { t } = useI18n();
  const [location] = useLocation();
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null);
  const [scopeFilter, setScopeFilter] = useState("all");
  const [deptFilter, setDeptFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [vendorFilter, setVendorFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const scope = params.get("scope");
    const category = params.get("category");
    const vendor = params.get("vendor");
    setScopeFilter(scope || "all");
    setCategoryFilter(category || "all");
    setVendorFilter(vendor || "all");
  }, [location]);

  const resetFilters = () => {
    setSearchQuery("");
    setScopeFilter("all");
    setDeptFilter("all");
    setCategoryFilter("all");
    setVendorFilter("all");
  };

  const { data: departments = [] } = useQuery<Department[]>({
    queryKey: ["/api/departments"],
    queryFn: async () => {
      const res = await fetch("/api/departments", { credentials: "include" });
      if (!res.ok) return [];
      return res.json();
    },
  });
  
  const { data: entries = [], isLoading } = useQuery<EnrichedEmissionEntry[]>({
    queryKey: ["/api/emission-entries"],
    queryFn: async () => {
      const res = await fetch("/api/emission-entries", { credentials: "include" });
      if (!res.ok) return [];
      return res.json();
    },
  });

  const { data: categories = [] } = useQuery<EmissionCategory[]>({
    queryKey: ["/api/categories"],
    queryFn: async () => {
      const res = await fetch("/api/categories", { credentials: "include" });
      if (!res.ok) return [];
      return res.json();
    },
  });

  const { data: categoryHistory = [] } = useQuery<CategoryChangeAudit[]>({
    queryKey: ["/api/emission-entries", selectedEntry, "category-history"],
    queryFn: async () => {
      if (!selectedEntry) return [];
      const res = await fetch(`/api/emission-entries/${selectedEntry}/category-history`, { credentials: "include" });
      if (!res.ok) return [];
      return res.json();
    },
    enabled: !!selectedEntry,
  });

  const changeCategoryMutation = useMutation({
    mutationFn: async ({ entryId, newCategory, reason }: { entryId: string; newCategory: string; reason?: string }) => {
      const res = await fetch(`/api/emission-entries/${entryId}/category`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ newCategory, reason }),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to change category");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/emission-entries"] });
      queryClient.invalidateQueries({ queryKey: ["/api/emission-entries", selectedEntry, "category-history"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/totals"] });
      setShowCategoryModal(false);
    },
  });

  const filteredEntries = entries.filter(entry => {
    const matchesScope = scopeFilter === "all" || entry.scope === scopeFilter;
    const matchesDept = deptFilter === "all" || entry.departmentId === deptFilter;
    const matchesCategory = categoryFilter === "all" || entry.categoryMapped === categoryFilter;
    const matchesVendor = vendorFilter === "all" ||
      (entry.activityDescription || entry.categoryMapped || "") === vendorFilter;
    const matchesSearch = searchQuery === "" || 
      entry.activityDescription?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.categoryMapped.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesScope && matchesDept && matchesCategory && matchesVendor && matchesSearch;
  });

  const openedEntry = entries.find(e => e.id === selectedEntry);
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-display">{t('ledger.title')}</h1>
          <p className="text-muted-foreground mt-1">{t('ledger.subtitle')}</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> {t('ledger.exportData')}
          </Button>
        </div>
      </div>

      <BulkUploadProgress />

      <Card className="border-0 ring-1 ring-black/5 shadow-sm" data-testid="ledger-table-card">
        <LedgerFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          scopeFilter={scopeFilter}
          onScopeChange={setScopeFilter}
          deptFilter={deptFilter}
          onDeptChange={setDeptFilter}
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
          vendorFilter={vendorFilter}
          onVendorChange={setVendorFilter}
          departments={departments}
          onReset={resetFilters}
        />

        <CardContent className="p-0">
          <LedgerTable
            entries={filteredEntries}
            isLoading={isLoading}
            onSelectEntry={setSelectedEntry}
            onScopeClick={(scope) => setScopeFilter(scope)}
            onCategoryClick={(category) => setCategoryFilter(category)}
          />
        </CardContent>
      </Card>

      {openedEntry && (
        <AuditDrawer
          entry={openedEntry}
          categoryHistory={categoryHistory}
          showHistory={showHistory}
          onToggleHistory={() => setShowHistory(!showHistory)}
          onClose={() => setSelectedEntry(null)}
          onChangeCategory={() => setShowCategoryModal(true)}
        />
      )}

      <CategoryChangeDialog
        open={showCategoryModal}
        currentCategory={openedEntry?.categoryMapped}
        categories={categories}
        isPending={changeCategoryMutation.isPending}
        error={changeCategoryMutation.isError ? changeCategoryMutation.error : null}
        onClose={() => setShowCategoryModal(false)}
        onSubmit={(newCategory, reason) => {
          if (selectedEntry) {
            changeCategoryMutation.mutate({ entryId: selectedEntry, newCategory, reason });
          }
        }}
      />
    </div>
  );
}
