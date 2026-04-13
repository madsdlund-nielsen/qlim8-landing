import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { User, Mail, Calendar, Building2, LogOut, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { useI18n } from "@/lib/i18n";

interface TenantData {
  id: string;
  name: string;
  logoUrl?: string;
}

export default function Account() {
  const { user } = useAuth() as any;
  const [logoutModal, setLogoutModal] = useState(false);
  const { t } = useI18n();

  const { data: tenant } = useQuery<TenantData>({
    queryKey: ["/api/tenant"],
    queryFn: async () => {
      const res = await fetch("/api/tenant", { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch tenant");
      return res.json();
    },
  });

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  const createdDate = user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-DK') : t('common.na');

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{t('account.title')}</h1>
          <p className="text-muted-foreground mt-1">{t('account.subtitle')}</p>
        </div>
      </div>

      {/* Profile Card */}
      <Card className="border-0 ring-1 ring-black/5 shadow-sm">
        <CardHeader>
          <CardTitle>{t('account.profileInfo')}</CardTitle>
          <CardDescription>{t('account.profileInfoDesc')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0 overflow-hidden">
              {tenant?.logoUrl ? (
                <img src={tenant.logoUrl} alt={t('account.companyLogo')} className="h-full w-full object-cover" />
              ) : (
                <User className="h-8 w-8 text-white" />
              )}
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{t('account.name')}</p>
                <p className="text-sm font-medium text-foreground">
                  {user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : t('account.user')}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{t('account.admin')}</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="border-0 ring-1 ring-black/5 shadow-sm">
        <CardHeader>
          <CardTitle>{t('account.contactInfo')}</CardTitle>
          <CardDescription>{t('account.contactInfoDesc')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-2">
              <Mail className="h-4 w-4" />
              {t('account.email')}
            </p>
            <p className="text-sm font-medium text-foreground">{user?.email || t('common.na')}</p>
            <Badge variant="outline" className="mt-2">{t('account.emailVerified')}</Badge>
          </div>

          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              {t('account.organization')}
            </p>
            <p className="text-sm font-medium text-foreground">{tenant?.name || t('account.notSet')}</p>
          </div>
        </CardContent>
      </Card>

      {/* Account Information */}
      <Card className="border-0 ring-1 ring-black/5 shadow-sm">
        <CardHeader>
          <CardTitle>{t('account.accountInfo')}</CardTitle>
          <CardDescription>{t('account.accountInfoDesc')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {t('account.memberSince')}
            </p>
            <p className="text-sm font-medium text-foreground">{createdDate}</p>
          </div>

          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">{t('account.status')}</p>
            <Badge className="bg-emerald-100 text-emerald-700">{t('account.active')}</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Sign Out Section */}
      <Card className="border-0 ring-1 ring-black/5 shadow-sm bg-gradient-to-br from-destructive/5 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            {t('account.signOut')}
          </CardTitle>
          <CardDescription>{t('account.signOutDesc')}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            {t('account.signOutMessage')}
          </p>
          <Button 
            variant="destructive"
            onClick={() => setLogoutModal(true)}
            data-testid="button-sign-out"
          >
            <LogOut className="mr-2 h-4 w-4" />
            {t('account.signOut')}
          </Button>
        </CardContent>
      </Card>

      {/* Logout Confirmation Modal */}
      <Dialog open={logoutModal} onOpenChange={setLogoutModal}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <LogOut className="h-5 w-5 text-destructive" />
              {t('account.signOut')}
            </DialogTitle>
            <DialogDescription>
              {t('account.signOutConfirmation')}
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 justify-end mt-6">
            <Button 
              variant="outline" 
              onClick={() => setLogoutModal(false)}
              data-testid="button-stay-logged-in"
            >
              {t('account.stayLoggedIn')}
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleLogout}
              data-testid="button-confirm-logout"
            >
              {t('account.signOut')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
