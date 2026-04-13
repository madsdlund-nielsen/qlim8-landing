import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Share2, Loader2, FileSpreadsheet, Wand2 } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { trackClick, trackFeatureUse } from "@/lib/analytics";
import { useI18n } from "@/lib/i18n";
import { useSubscription, useBillingPortal } from "@/hooks/useSubscription";
import { ReportWizard } from "@/components/reporting/ReportWizard";

type ReportType = "bank" | "excel" | "public" | null;

interface TenantData {
  id: string;
  name: string;
  publicSlug?: string;
  publicEnabled?: boolean;
}

interface ReportSummary {
  scope1: { marketBased: number; locationBased: number; count: number };
  scope2: { marketBased: number; locationBased: number; count: number };
  scope3: { marketBased: number; locationBased: number; count: number };
  total: { marketBased: number; locationBased: number; count: number };
  reductionTargets: any[];
  exportedAt: string;
}

export default function Reporting() {
  const { t } = useI18n();
  const { toast } = useToast();
  const [selectedReport, setSelectedReport] = useState<ReportType>("bank");
  const [isExporting, setIsExporting] = useState(false);
  const [showWizard, setShowWizard] = useState(false);
  const { hasFeature } = useSubscription();
  const { mutate: openBillingPortal, isPending: isOpeningPortal } = useBillingPortal();

  const reports = [
    {
      id: "bank",
      icon: FileText,
      title: t('reports.annualReport'),
      description: t('reports.annualReportDesc'),
      color: "emerald"
    },
    {
      id: "excel",
      icon: FileSpreadsheet,
      title: t('reports.excelExport'),
      description: t('reports.excelExportDesc'),
      color: "blue"
    },
    {
      id: "public",
      icon: Share2,
      title: t('reports.publicProfile'),
      description: t('reports.publicProfileDesc'),
      color: "purple"
    }
  ];

  const { data: summary } = useQuery<ReportSummary>({
    queryKey: ["/api/reports/summary"],
    queryFn: async () => {
      const res = await fetch("/api/reports/summary", { credentials: "include" });
      if (!res.ok) return null;
      return res.json();
    },
  });

  const { data: tenant } = useQuery<TenantData>({
    queryKey: ["/api/tenant"],
    queryFn: async () => {
      const res = await fetch("/api/tenant", { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch tenant");
      return res.json();
    },
  });

  const exportExcel = async () => {
    setIsExporting(true);
    try {
      const response = await fetch("/api/reports/download/excel", { credentials: "include" });
      if (!response.ok) throw new Error("Failed to export");
      
      const blob = await response.blob();
      const contentDisposition = response.headers.get('Content-Disposition');
      let filename = 'carbon-ledger.xlsx';
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="(.+)"/);
        if (match) filename = match[1];
      }
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast({ 
        title: t('reports.exportComplete'), 
        description: t('reports.excelDownloaded')
      });
    } catch (error) {
      toast({ 
        title: t('reports.exportFailed'), 
        description: t('reports.couldNotGenerateExcel'), 
        variant: "destructive" 
      });
    } finally {
      setIsExporting(false);
    }
  };

  const copyPublicLink = () => {
    if (!tenant?.publicSlug) {
      toast({ 
        title: t('reports.noPublicProfile'), 
        description: t('reports.enablePublicProfileFirst'), 
        variant: "destructive" 
      });
      return;
    }
    const link = `${window.location.origin}/public/${tenant.publicSlug}`;
    navigator.clipboard.writeText(link);
    toast({ 
      title: t('reports.linkCopied'), 
      description: t('reports.shareWithStakeholders')
    });
  };

  const downloadPDF = async () => {
    setIsExporting(true);
    try {
      const response = await fetch("/api/reports/download/pdf", { credentials: "include" });
      if (!response.ok) throw new Error("Failed to export");
      
      const blob = await response.blob();
      const contentDisposition = response.headers.get('Content-Disposition');
      let filename = 'climate-report.pdf';
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="(.+)"/);
        if (match) filename = match[1];
      }
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast({ 
        title: t('reports.reportGenerated'), 
        description: t('reports.pdfDownloaded')
      });
    } catch (error) {
      toast({ 
        title: t('reports.generationFailed'), 
        description: t('reports.couldNotGeneratePDF'), 
        variant: "destructive" 
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownload = (reportType?: ReportType) => {
    if (isExporting) return;
    const target = reportType || selectedReport;
    
    if (target === "bank" && !hasFeature("exportStudio.pdf")) {
      toast({
        title: t('featureGate.title'),
        description: t('featureGate.description').replace('{feature}', t('reports.annualReport')).replace('{tier}', 'Standard'),
      });
      openBillingPortal();
      return;
    }
    
    if (target === "public" && !hasFeature("exportStudio.publicBadge")) {
      toast({
        title: t('featureGate.title'),
        description: t('featureGate.description').replace('{feature}', t('reports.publicProfile')).replace('{tier}', 'Professionel'),
      });
      openBillingPortal();
      return;
    }
    
    trackFeatureUse(`Export Report: ${target}`);
    switch (target) {
      case "bank":
        downloadPDF();
        break;
      case "excel":
        exportExcel();
        break;
      case "public":
        copyPublicLink();
        break;
    }
  };

  return (
    <div className="space-y-8" data-testid="reporting-main">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-display">{t('reports.title')}</h1>
          <p className="text-muted-foreground mt-1">{t('reports.subtitle')}</p>
        </div>
        <Button 
          onClick={() => setShowWizard(true)}
          className="gap-2"
          data-testid="button-open-wizard"
        >
          <Wand2 className="h-4 w-4" />
          VSME Wizard
        </Button>
      </div>

      <ReportWizard open={showWizard} onOpenChange={setShowWizard} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => {
          const isSelected = selectedReport === report.id;
          const bgColorMap = {
            emerald: "bg-emerald-50 text-emerald-600 hover:bg-emerald-100",
            blue: "bg-blue-50 text-blue-600 hover:bg-blue-100",
            purple: "bg-purple-50 text-purple-600 hover:bg-purple-100"
          };
          
          return (
            <Card 
              key={report.id}
              className={`border-0 shadow-sm cursor-pointer transition-all duration-300 ${
                isSelected 
                  ? "ring-2 ring-primary shadow-md scale-105" 
                  : "ring-1 ring-black/5 hover:shadow-md"
              }`}
              onClick={() => setSelectedReport(report.id as ReportType)}
              data-testid={`report-card-${report.id}`}
            >
              <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                <div className={`h-16 w-16 rounded-2xl ${bgColorMap[report.color as keyof typeof bgColorMap]} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <report.icon className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{report.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 whitespace-pre-line">{report.description}</p>
                </div>
                <Button 
                  className="w-full mt-4" 
                  variant={isSelected ? "default" : "outline"}
                  disabled={isExporting || (report.id === "public" && !tenant?.publicEnabled)}
                  data-testid={`button-export-${report.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedReport(report.id as ReportType);
                    handleDownload(report.id as ReportType);
                  }}
                >
                  {isExporting && selectedReport === report.id ? (
                    <><Loader2 className="h-4 w-4 mr-2 animate-spin" />{t('reports.exporting')}</>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" /> 
                      {report.id === "bank" && t('reports.downloadPDF')}
                      {report.id === "excel" && t('reports.downloadExcel')}
                      {report.id === "public" && (tenant?.publicEnabled ? t('reports.copyLink') : t('reports.publicDisabled'))}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
