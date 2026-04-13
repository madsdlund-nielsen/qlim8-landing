import { Lock } from "lucide-react";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { Button } from "@/components/ui/button";

export default function ReductionPublic() {
  return (
    <div className="min-h-screen bg-[#F5F5F0] flex flex-col">
      <PublicHeader />
      <main className="flex-1 flex items-center justify-center px-4 py-24">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="h-8 w-8 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Reduktionsplan</h1>
          <p className="text-gray-600 mb-8">
            Reduktionsplaner er en del af qlim8-platformen. Log ind eller opret en konto for at sætte klimamål, tracke fremskridt og bygge din CO2-reduktionsstrategi.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => window.location.href = "https://app.qlim8.com"}>
              Log ind
            </Button>
            <Button variant="outline" onClick={() => window.location.href = "/priser"}>
              Se priser
            </Button>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
