import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useI18n, languages, type Language } from "@/lib/i18n";
import { Building2, MapPin, Users, Code, Loader2, Upload, Plus, Trash2, Layers, Globe, Share2 } from "lucide-react";
import { useState, useRef, useEffect, useMemo } from "react";

interface TenantData {
  id: string;
  name: string;
  industry?: string;
  reportingCurrency: string;
  logoUrl?: string;
  description?: string;
  website?: string;
  address?: string;
  cvr?: string;
  employeeCount?: number;
  publicSlug?: string;
  publicEnabled?: boolean;
  country?: string;
}

const SUPPORTED_COUNTRIES = [
  { code: "DK", name: "Denmark", flag: "🇩🇰", nameLocal: "Danmark" },
  { code: "SE", name: "Sweden", flag: "🇸🇪", nameLocal: "Sverige" },
  { code: "NO", name: "Norway", flag: "🇳🇴", nameLocal: "Norge" },
  { code: "DE", name: "Germany", flag: "🇩🇪", nameLocal: "Deutschland" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱", nameLocal: "Nederland" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", nameLocal: "United Kingdom" },
  { code: "PL", name: "Poland", flag: "🇵🇱", nameLocal: "Polska" },
  { code: "UA", name: "Ukraine", flag: "🇺🇦", nameLocal: "Україна" },
] as const;

interface Department {
  id: string;
  name: string;
  code?: string;
  description?: string;
  isActive: boolean;
}

export default function Settings() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { language, setLanguage, t } = useI18n();
  const [formData, setFormData] = useState<Partial<TenantData>>({});
  const [previewLogo, setPreviewLogo] = useState<string | null>(null);
  const [deptModalOpen, setDeptModalOpen] = useState(false);
  const [deptForm, setDeptForm] = useState({ name: "", code: "", description: "" });

  const { data: tenant, isLoading } = useQuery<TenantData>({
    queryKey: ["/api/tenant"],
    queryFn: async () => {
      const res = await fetch("/api/tenant", { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch tenant");
      return res.json();
    },
  });

  useEffect(() => {
    if (tenant) {
      setFormData(tenant);
      setPreviewLogo(tenant.logoUrl || null);
    }
  }, [tenant]);

  const hasUnsavedChanges = useMemo(() => {
    if (!tenant) return false;
    const keysToCompare: (keyof TenantData)[] = ['name', 'industry', 'description', 'website', 'address', 'cvr', 'employeeCount', 'publicSlug', 'publicEnabled', 'country'];
    return keysToCompare.some(key => {
      const originalValue = tenant[key];
      const currentValue = formData[key];
      if (originalValue === null || originalValue === undefined) {
        return currentValue !== null && currentValue !== undefined && currentValue !== '';
      }
      if (currentValue === null || currentValue === undefined || currentValue === '') {
        return originalValue !== null && originalValue !== undefined;
      }
      return String(originalValue) !== String(currentValue);
    });
  }, [tenant, formData]);

  const updateTenant = useMutation({
    mutationFn: async (data: Partial<TenantData>) => {
      const res = await fetch("/api/tenant", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update settings");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tenant"] });
      toast({ title: t('settings.savedSuccess') });
    },
    onError: (error: Error) => {
      toast({ title: t('common.error'), description: error.message, variant: "destructive" });
    },
  });

  const { data: departmentsData } = useQuery<Department[]>({
    queryKey: ["/api/departments"],
    queryFn: async () => {
      const res = await fetch("/api/departments", { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch departments");
      return res.json();
    },
  });

  const createDepartment = useMutation({
    mutationFn: async (data: { name: string; code?: string; description?: string }) => {
      const res = await fetch("/api/departments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create department");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/departments"] });
      setDeptModalOpen(false);
      setDeptForm({ name: "", code: "", description: "" });
      toast({ title: t('settings.departmentCreated') });
    },
    onError: (error: Error) => {
      toast({ title: t('common.error'), description: error.message, variant: "destructive" });
    },
  });

  const deactivateDepartment = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/departments/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to deactivate department");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/departments"] });
      toast({ title: t('settings.departmentDeactivated'), description: t('settings.historicalDataPreserved') });
    },
    onError: (error: Error) => {
      toast({ title: t('common.error'), description: error.message, variant: "destructive" });
    },
  });

  const [isUploadingLogo, setIsUploadingLogo] = useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewLogo(event.target?.result as string);
    };
    reader.readAsDataURL(file);

    setIsUploadingLogo(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append('logo', file);

      const res = await fetch('/api/tenant/logo', {
        method: 'POST',
        credentials: 'include',
        body: formDataUpload,
      });

      if (!res.ok) {
        throw new Error('Failed to upload logo');
      }

      const result = await res.json();
      setFormData(prev => ({ ...prev, logoUrl: result.logoUrl }));
      setPreviewLogo(result.logoUrl);
      queryClient.invalidateQueries({ queryKey: ["/api/tenant"] });
      toast({ title: t('settings.logoUploadSuccess') });
    } catch (error: any) {
      toast({ title: t('common.error'), description: error.message, variant: "destructive" });
      setPreviewLogo(tenant?.logoUrl || null);
    } finally {
      setIsUploadingLogo(false);
    }
  };

  const handleSave = () => {
    updateTenant.mutate(formData);
  };

  const handleCreateDepartment = () => {
    if (!deptForm.name.trim()) return;
    createDepartment.mutate(deptForm);
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-96"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('settings.title')}</h1>
        <p className="text-muted-foreground mt-2">{t('settings.subtitle')}</p>
      </div>

      <div className="grid gap-6">
        {/* Organization Logo & Name */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              {t('settings.organizationProfile')}
            </CardTitle>
            <CardDescription>{t('settings.organizationProfileDesc')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Logo Upload */}
              <div className="md:col-span-1">
                <Label className="text-sm font-semibold mb-3 block">{t('settings.companyLogo')}</Label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full aspect-square rounded-lg border-2 border-dashed border-border/50 hover:border-primary/50 flex items-center justify-center cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors"
                  data-testid="button-upload-logo"
                >
                  {previewLogo ? (
                    <img src={previewLogo} alt="Logo preview" className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <div className="text-center">
                      <Upload className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
                      <p className="text-xs text-muted-foreground">{t('settings.uploadLogo')}</p>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  data-testid="input-logo-file"
                />
              </div>

              {/* Company Name & Industry */}
              <div className="md:col-span-2 space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">{t('settings.companyName')}</Label>
                  <Input
                    value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t('settings.companyNamePlaceholder')}
                    data-testid="input-company-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">{t('settings.industry')}</Label>
                  <Input
                    value={formData.industry || ""}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    placeholder={t('settings.industryPlaceholder')}
                    data-testid="input-industry"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold">{t('settings.companyDescription')}</Label>
              <Textarea
                value={formData.description || ""}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder={t('settings.companyDescriptionPlaceholder')}
                className="min-h-24 resize-none"
                data-testid="textarea-description"
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact & Location */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              {t('settings.contactInformation')}
            </CardTitle>
            <CardDescription>{t('settings.contactInformationDesc')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">{t('settings.website')}</Label>
                <Input
                  value={formData.website || ""}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder={t('settings.websitePlaceholder')}
                  type="url"
                  data-testid="input-website"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">{t('settings.cvrNumber')}</Label>
                <Input
                  value={formData.cvr || ""}
                  onChange={(e) => setFormData({ ...formData, cvr: e.target.value })}
                  placeholder={t('settings.cvrPlaceholder')}
                  data-testid="input-cvr"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold">{t('settings.address')}</Label>
              <Textarea
                value={formData.address || ""}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder={t('settings.addressPlaceholder')}
                className="min-h-20 resize-none"
                data-testid="textarea-address"
              />
            </div>
          </CardContent>
        </Card>

        {/* Organization Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              {t('settings.organizationDetails')}
            </CardTitle>
            <CardDescription>{t('settings.organizationDetailsDesc')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">{t('settings.employeeCount')}</Label>
                <Input
                  type="number"
                  value={formData.employeeCount || ""}
                  onChange={(e) => setFormData({ ...formData, employeeCount: e.target.value ? parseInt(e.target.value) : undefined })}
                  placeholder={t('settings.employeeCountPlaceholder')}
                  min="0"
                  data-testid="input-employee-count"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">{t('settings.reportingCurrency')}</Label>
                <Input
                  value={formData.reportingCurrency || "DKK"}
                  onChange={(e) => setFormData({ ...formData, reportingCurrency: e.target.value })}
                  placeholder="DKK"
                  disabled
                  className="bg-muted"
                  data-testid="input-currency"
                />
                <p className="text-xs text-muted-foreground">{t('settings.currencyDescription')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Language & Region */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              {t('settings.languageRegion')}
            </CardTitle>
            <CardDescription>{t('settings.languageRegionDesc')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">{t('settings.displayLanguage')}</Label>
                <Select value={language} onValueChange={(val) => setLanguage(val as Language)}>
                  <SelectTrigger data-testid="select-language">
                    <SelectValue placeholder={t('settings.selectLanguage')} />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code} data-testid={`select-language-${lang.code}`}>
                        <span className="flex items-center gap-2">
                          <span>{lang.flag}</span>
                          <span>{lang.name}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">{t('settings.displayLanguageDesc')}</p>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">{t('settings.country')}</Label>
                <Select 
                  value={formData.country || "DK"} 
                  onValueChange={(val) => setFormData({ ...formData, country: val })}
                >
                  <SelectTrigger data-testid="select-country">
                    <SelectValue placeholder={t('settings.selectCountry')} />
                  </SelectTrigger>
                  <SelectContent>
                    {SUPPORTED_COUNTRIES.map((country) => (
                      <SelectItem key={country.code} value={country.code} data-testid={`select-country-${country.code}`}>
                        <span className="flex items-center gap-2">
                          <span>{country.flag}</span>
                          <span>{country.name}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">{t('settings.countryDesc')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Public Profile */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5" />
              {t('settings.publicProfile')}
            </CardTitle>
            <CardDescription>{t('settings.publicProfileDesc')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-semibold">{t('settings.publicProfileEnabled')}</Label>
                <p className="text-xs text-muted-foreground">{t('settings.publicProfileEnabledDesc')}</p>
              </div>
              <Switch
                checked={formData.publicEnabled || false}
                onCheckedChange={(checked) => setFormData({ ...formData, publicEnabled: checked })}
                data-testid="switch-public-enabled"
              />
            </div>
            {formData.publicEnabled && (
              <div className="space-y-2">
                <Label className="text-sm font-semibold">{t('settings.publicProfileSlug')}</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{window.location.origin}/public/</span>
                  <Input
                    value={formData.publicSlug || ""}
                    onChange={(e) => setFormData({ ...formData, publicSlug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })}
                    placeholder={t('settings.publicProfileSlugPlaceholder')}
                    className="max-w-[200px]"
                    data-testid="input-public-slug"
                  />
                </div>
                <p className="text-xs text-muted-foreground">{t('settings.publicProfileSlugDesc')}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Departments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5" />
                {t('settings.departments')}
              </CardTitle>
              <CardDescription>{t('settings.departmentsDesc')}</CardDescription>
            </div>
            <Button size="sm" onClick={() => setDeptModalOpen(true)} data-testid="button-add-department">
              <Plus className="h-4 w-4 mr-2" />
              {t('common.add')}
            </Button>
          </CardHeader>
          <CardContent>
            {departmentsData && departmentsData.length > 0 ? (
              <div className="space-y-2">
                {departmentsData.map((dept) => (
                  <div key={dept.id} className="flex items-center justify-between p-3 rounded-lg border bg-white">
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`font-medium ${dept.isActive === false ? 'text-muted-foreground line-through' : ''}`}>
                            {dept.name}
                          </span>
                          {dept.code && (
                            <Badge variant="secondary" className="text-xs">{dept.code}</Badge>
                          )}
                          {dept.isActive === false && (
                            <Badge variant="outline" className="text-xs text-muted-foreground">{t('settings.inactive')}</Badge>
                          )}
                        </div>
                        {dept.description && (
                          <p className="text-xs text-muted-foreground mt-0.5">{dept.description}</p>
                        )}
                      </div>
                    </div>
                    {dept.isActive !== false && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deactivateDepartment.mutate(dept.id)}
                        title={t('settings.deactivateDepartment')}
                        data-testid={`button-deactivate-department-${dept.id}`}
                      >
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Layers className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">{t('settings.noDepartments')}</p>
                <p className="text-xs mt-1">{t('settings.noDepartmentsDesc')}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Compliance & Standards */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              {t('settings.complianceStandards')}
            </CardTitle>
            <CardDescription>{t('settings.complianceStandardsDesc')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                <p className="text-sm font-medium text-emerald-900">{t('settings.ghgProtocol')}</p>
                <p className="text-xs text-emerald-700 mt-1">{t('settings.ghgProtocolDesc')}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                <p className="text-sm font-medium text-blue-900">{t('settings.csrd')}</p>
                <p className="text-xs text-blue-700 mt-1">{t('settings.csrdDesc')}</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-50 border border-purple-200">
                <p className="text-sm font-medium text-purple-900">{t('settings.vsme')}</p>
                <p className="text-xs text-purple-700 mt-1">{t('settings.vsmeDesc')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-end gap-3">
        {hasUnsavedChanges && (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            {t('settings.unsavedChanges')}
          </Badge>
        )}
        <Button 
          variant="outline" 
          onClick={() => {
            if (tenant) {
              setFormData(tenant);
              setPreviewLogo(tenant.logoUrl || null);
            }
          }}
          disabled={!hasUnsavedChanges}
          data-testid="button-cancel-settings"
        >
          {t('common.cancel')}
        </Button>
        <Button
          onClick={handleSave}
          disabled={updateTenant.isPending || !hasUnsavedChanges}
          data-testid="button-save-settings"
        >
          {updateTenant.isPending ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              {t('common.saving')}
            </>
          ) : (
            t('common.saveChanges')
          )}
        </Button>
      </div>

      {/* Add Department Dialog */}
      <Dialog open={deptModalOpen} onOpenChange={setDeptModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Layers className="h-5 w-5" />
              {t('settings.addDepartment')}
            </DialogTitle>
            <DialogDescription>{t('settings.addDepartmentDesc')}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-sm font-semibold">{t('settings.departmentName')}</Label>
              <Input
                value={deptForm.name}
                onChange={(e) => setDeptForm({ ...deptForm, name: e.target.value })}
                placeholder={t('settings.departmentNamePlaceholder')}
                data-testid="input-department-name"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold">{t('settings.departmentCode')}</Label>
              <Input
                value={deptForm.code}
                onChange={(e) => setDeptForm({ ...deptForm, code: e.target.value.toUpperCase() })}
                placeholder={t('settings.departmentCodePlaceholder')}
                maxLength={10}
                data-testid="input-department-code"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold">{t('settings.departmentDescriptionLabel')}</Label>
              <Textarea
                value={deptForm.description}
                onChange={(e) => setDeptForm({ ...deptForm, description: e.target.value })}
                placeholder={t('settings.departmentDescriptionPlaceholder')}
                className="min-h-16 resize-none"
                data-testid="textarea-department-description"
              />
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={() => setDeptModalOpen(false)}>{t('common.cancel')}</Button>
            <Button
              onClick={handleCreateDepartment}
              disabled={!deptForm.name.trim() || createDepartment.isPending}
              data-testid="button-confirm-department"
            >
              {createDepartment.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                t('settings.addDepartment')
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
