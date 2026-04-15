import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nProvider } from "@/lib/i18n";
import { useFavicon } from "@/hooks/useFavicon";
import Landing from "@/pages/landing";
import Pricing from "@/pages/pricing";
import About from "@/pages/about";
import Produkt from "@/pages/produkt";
import Viden from "@/pages/viden";
import Kontakt from "@/pages/kontakt";
import Karriere from "@/pages/karriere";
import Cookies from "@/pages/cookies";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: false,
    },
  },
});

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/about" component={About} />
      <Route path="/produkt" component={Produkt} />
      <Route path="/viden" component={Viden} />
      <Route path="/kontakt" component={Kontakt} />
      <Route path="/karriere" component={Karriere} />
      <Route path="/cookies" component={Cookies} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useFavicon();
  return (
    <I18nProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </I18nProvider>
  );
}

export default App;
