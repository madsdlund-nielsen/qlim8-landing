import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Leaf, Building2, Target, TrendingDown, Globe, Award, Loader2 } from "lucide-react";

interface PublicProfileData {
  tenant: {
    name: string;
    industry?: string;
    description?: string;
    logoUrl?: string;
    website?: string;
    employeeCount?: number;
  };
  emissions: {
    scope1: number;
    scope2: number;
    scope3: number;
    total: number;
    reportPeriod: string;
  };
  targets: Array<{
    id: string;
    name: string;
    baselineYear: number;
    targetYear: number;
    targetReductionPercent: number;
    baselineEmissions: number;
    currentProgress: number;
  }>;
  hasVsmeBasic: boolean;
}

export default function PublicProfile() {
  const { slug } = useParams<{ slug: string }>();

  const { data, isLoading, error } = useQuery<PublicProfileData>({
    queryKey: ["/api/public/profile", slug],
    queryFn: async () => {
      const res = await fetch(`/api/public/profile/${slug}`);
      if (!res.ok) {
        if (res.status === 404) throw new Error("Profile not found");
        throw new Error("Failed to load profile");
      }
      return res.json();
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Building2 className="h-8 w-8 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Virksomhedsprofil ikke fundet</h1>
          <p className="text-gray-600 mb-6">Denne klimaprofil findes ikke eller er ikke offentlig tilgængelig endnu.</p>
          <a href="/" className="inline-flex items-center justify-center px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
            Tilbage til forsiden
          </a>
        </div>
      </div>
    );
  }

  const { tenant, emissions, targets, hasVsmeBasic } = data;

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          {tenant.logoUrl && (
            <img
              src={tenant.logoUrl}
              alt={`${tenant.name} logo`}
              className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl mx-auto mb-4 shadow-sm"
            />
          )}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{tenant.name}</h1>
          {tenant.industry && (
            <Badge variant="secondary" className="mb-4 text-xs sm:text-sm">{tenant.industry}</Badge>
          )}
          {tenant.description && (
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">{tenant.description}</p>
          )}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-4 text-sm text-muted-foreground">
            {tenant.website && (
              <a href={tenant.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-emerald-600 min-h-[44px]">
                <Globe className="h-4 w-4" />
                Hjemmeside
              </a>
            )}
            {tenant.employeeCount && (
              <span className="flex items-center gap-1">
                <Building2 className="h-4 w-4" />
                {tenant.employeeCount} medarbejdere
              </span>
            )}
          </div>
        </div>

        {/* Emissions Overview */}
        <Card className="mb-6 sm:mb-8">
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Leaf className="h-5 w-5 text-emerald-600" />
              Klimaaftryk for {emissions.reportPeriod}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6 sm:mb-8">
              <div className="text-4xl sm:text-5xl font-bold text-emerald-600 mb-2">
                {emissions.total.toLocaleString('da-DK', { maximumFractionDigits: 1 })}
              </div>
              <div className="text-sm sm:text-base text-muted-foreground">ton CO2e</div>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              <div className="text-center p-3 sm:p-4 rounded-lg bg-amber-50 border border-amber-100">
                <div className="text-lg sm:text-2xl font-semibold text-amber-700">
                  {emissions.scope1.toLocaleString('da-DK', { maximumFractionDigits: 1 })}
                </div>
                <div className="text-xs sm:text-sm text-amber-600">Scope 1</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground mt-1 hidden sm:block">Direkte udledninger</div>
              </div>
              <div className="text-center p-3 sm:p-4 rounded-lg bg-blue-50 border border-blue-100">
                <div className="text-lg sm:text-2xl font-semibold text-blue-700">
                  {emissions.scope2.toLocaleString('da-DK', { maximumFractionDigits: 1 })}
                </div>
                <div className="text-xs sm:text-sm text-blue-600">Scope 2</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground mt-1 hidden sm:block">El & varme</div>
              </div>
              <div className="text-center p-3 sm:p-4 rounded-lg bg-purple-50 border border-purple-100">
                <div className="text-lg sm:text-2xl font-semibold text-purple-700">
                  {emissions.scope3.toLocaleString('da-DK', { maximumFractionDigits: 1 })}
                </div>
                <div className="text-xs sm:text-sm text-purple-600">Scope 3</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground mt-1 hidden sm:block">Værdikæde</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reduction Targets */}
        {targets.length > 0 && (
          <Card className="mb-6 sm:mb-8">
            <CardHeader className="pb-2 sm:pb-4">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Target className="h-5 w-5 text-emerald-600" />
                Reduktionsmål
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              {targets.map((target) => (
                <div key={target.id} className="p-4 rounded-lg bg-gray-50 border">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 mb-3">
                    <div>
                      <h3 className="font-semibold text-sm sm:text-base">{target.name}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {target.baselineYear} → {target.targetYear}
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <div className="flex items-center gap-1 text-emerald-600 font-semibold text-sm sm:text-base">
                        <TrendingDown className="h-4 w-4" />
                        {target.targetReductionPercent}%
                      </div>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">reduktionsmål</p>
                    </div>
                  </div>
                  <Progress value={Math.min(target.currentProgress, 100)} className="h-2" />
                  <div className="flex justify-between mt-2 text-[10px] sm:text-xs text-muted-foreground">
                    <span>{target.baselineEmissions.toLocaleString('da-DK')} t basisår</span>
                    <span>{target.currentProgress.toFixed(0)}% fremskridt</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Compliance Badges */}
        <Card>
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Award className="h-5 w-5 text-emerald-600" />
              Rapporteringsstandard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <Badge variant="outline" className="py-1.5 sm:py-2 px-3 sm:px-4 text-xs sm:text-sm bg-emerald-50 border-emerald-200 text-emerald-700">
                GHG Protokol
              </Badge>
              {hasVsmeBasic && (
                <Badge variant="outline" className="py-1.5 sm:py-2 px-3 sm:px-4 text-xs sm:text-sm bg-blue-50 border-blue-200 text-blue-700">
                  VSME Basis
                </Badge>
              )}
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-4">
              Denne klimarapport følger internationalt anerkendte standarder for et transparent og nøjagtigt klimaregnskab.
            </p>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 sm:mt-12 text-xs sm:text-sm text-muted-foreground">
          <p>Drevet af <span className="font-semibold text-emerald-600">qlim8</span> - Klimaoperativsystem for SMV'er</p>
        </div>
      </div>
    </div>
  );
}
