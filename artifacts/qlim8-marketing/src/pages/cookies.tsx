import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Cookie, Shield, BarChart3, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { SeoHead } from "@/components/SeoHead";

export default function CookiePolicy() {
  const handleResetConsent = () => {
    localStorage.removeItem("qlim8_cookie_consent");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <SeoHead
        title="Cookiepolitik | qlim8"
        description="Læs om hvilke cookies qlim8 bruger og hvorfor. Vi bruger kun nødvendige cookies og analytiske cookies til at forbedre din oplevelse."
        canonical="https://qlim8.com/cookies"
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-emerald-600 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Tilbage til forsiden
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cookiepolitik</h1>
          <p className="text-muted-foreground">
            Sidst opdateret: {new Date().toLocaleDateString('da-DK', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="prose prose-emerald max-w-none mb-8">
          <p className="text-lg text-gray-600">
            qlim8 bruger cookies og lignende teknologier for at give dig den bedste oplevelse på vores hjemmeside. 
            Her kan du læse om, hvilke cookies vi bruger og hvorfor.
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-emerald-600" />
                Nødvendige cookies
                <Badge variant="secondary" className="ml-2">Altid aktive</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Disse cookies er nødvendige for at hjemmesiden kan fungere korrekt. De kan ikke deaktiveres.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">Session cookies</p>
                    <p className="text-xs text-muted-foreground">Holder dig logget ind og gemmer dine præferencer</p>
                  </div>
                  <Badge variant="outline">Påkrævet</Badge>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">CSRF-beskyttelse</p>
                    <p className="text-xs text-muted-foreground">Beskytter mod sikkerhedstrusler</p>
                  </div>
                  <Badge variant="outline">Påkrævet</Badge>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">Stripe (betalinger)</p>
                    <p className="text-xs text-muted-foreground">Sikrer sikker betalingsbehandling</p>
                  </div>
                  <Badge variant="outline">Påkrævet</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                Analyse cookies
                <Badge variant="outline" className="ml-2">Valgfri</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Disse cookies hjælper os med at forstå, hvordan besøgende bruger hjemmesiden, så vi kan forbedre den.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">Google Analytics</p>
                    <p className="text-xs text-muted-foreground">Indsamler anonymiseret statistik om brug af hjemmesiden</p>
                  </div>
                  <Badge variant="outline">Valgfri</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cookie className="h-5 w-5 text-amber-600" />
                Administrer dine valg
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Du kan når som helst ændre dine cookie-præferencer ved at klikke på knappen nedenfor.
              </p>
              <Button 
                variant="outline" 
                onClick={handleResetConsent}
                data-testid="button-reset-cookie-consent"
              >
                Nulstil cookie-valg
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kontakt</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Har du spørgsmål til vores brug af cookies? Kontakt os på{" "}
                <a href="mailto:support@viridis-ramosa.com" className="text-emerald-600 hover:underline">
                  support@viridis-ramosa.com
                </a>
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} qlim8 · <a href="https://viridis-ramosa.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Design af viridis ramosa</a></p>
        </div>
      </div>
    </div>
  );
}
