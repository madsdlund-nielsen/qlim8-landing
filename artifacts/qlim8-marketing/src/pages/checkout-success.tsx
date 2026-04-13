import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ExternalLink, LogIn } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { useAuth } from "@/hooks/useAuth";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function CheckoutSuccess() {
  const { user, isAuthenticated } = useAuth();
  usePageTitle({ customTitle: "Velkommen", isAuthenticated, isLoading: false });

  const firstName = user?.firstName || user?.email?.split("@")[0] || "dig";

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-6">
      <Card className="max-w-lg w-full shadow-xl border-0 bg-white/80 backdrop-blur">
        <CardContent className="pt-8 pb-10 px-8 text-center space-y-6">
          <div className="flex justify-center mb-2">
            <Logo type="icon" size="lg" />
          </div>

          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-2xl font-bold text-gray-900">
              Tak for din tilmelding, {firstName}!
            </h1>
            <p className="text-gray-600 leading-relaxed">
              Vi er glade for at byde dig velkommen til qlim8. Fra nu af har du 
              adgang til automatiseret klimaregnskab, som gør det nemt at spore 
              dine emissioner og rapportere efter VSME og CSRD-standarderne.
            </p>
          </div>

          <div className="bg-emerald-50 rounded-lg p-4 text-left space-y-2">
            <p className="text-sm text-emerald-900 font-medium">
              Din aftale omfatter:
            </p>
            <ul className="text-sm text-emerald-800 space-y-1">
              <li>• Fuld adgang til klimaregnskabsplatformen</li>
              <li>• AI-assisteret faktura- og dataindsamling</li>
              <li>• Scope 1, 2 og 3 emissionsberegninger</li>
              <li>• PDF- og Excel-rapporteksport</li>
              <li>• Reduktionsmål og fremskridtssporing</li>
            </ul>
          </div>

          <p className="text-sm text-gray-500">
            Dit abonnement er nu aktivt, og du kan logge ind med det samme. 
            Har du spørgsmål, er vi altid klar til at hjælpe.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button asChild className="flex-1 gap-2" data-testid="button-go-to-app">
              <a href="/">
                <LogIn className="w-4 h-4" />
                Gå til kontrolcenter
              </a>
            </Button>
            <Button asChild variant="outline" className="flex-1 gap-2" data-testid="link-docs">
              <a 
                href="https://viridis-ramosa.com/docs" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-4 h-4" />
                Læs dokumentation
              </a>
            </Button>
          </div>

          <p className="text-xs text-gray-400 pt-4">
            Med venlig hilsen,<br />
            Holdet bag qlim8 @ Viridis Ramosa
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
