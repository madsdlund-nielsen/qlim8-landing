import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { queryClient } from "@/lib/queryClient";

export default function OnboardingPage() {
  const [, navigate] = useLocation();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [industries, setIndustries] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    companyName: "",
    cvr: "",
    address: "",
    employeeCount: "",
    industry: "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phone: "",
  });

  useEffect(() => {
    fetch("/api/onboarding/industries")
      .then(r => r.json())
      .then(setIndustries)
      .catch(() => {});
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: formData.companyName,
          cvr: formData.cvr,
          address: formData.address,
          employeeCount: formData.employeeCount ? parseInt(formData.employeeCount) : undefined,
          industry: formData.industry || undefined,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Onboarding failed");
      }

      // Invalidate user and tenant queries
      await queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      await queryClient.invalidateQueries({ queryKey: ["/api/tenant"] });
      await queryClient.invalidateQueries({ queryKey: ["/api/sandbox/status"] });

      // Navigate to dashboard — the tour will auto-start via OnboardingContext
      // which checks for active flows on the backend (the seeder fires async)
      navigate("/?startTour=1");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl">Velkommen til qlim8</CardTitle>
          <CardDescription>
            Lad os oprette din organisation. Vi starter dig i Sandbox Mode — et sikkert miljø med demo-data, 
            så du kan udforske platformen uden at forpligte dig med rigtige data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Company Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Virksomhedsoplysninger</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="companyName">Virksomhedsnavn *</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Dit firmanavn"
                    required
                    data-testid="input-company-name"
                  />
                </div>

                <div>
                  <Label htmlFor="cvr">CVR-nummer *</Label>
                  <Input
                    id="cvr"
                    name="cvr"
                    value={formData.cvr}
                    onChange={handleChange}
                    placeholder="12345678"
                    required
                    data-testid="input-cvr"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="address">Adresse</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Gadenavn 1, 2100 København"
                    data-testid="input-address"
                  />
                </div>

                <div>
                  <Label htmlFor="employeeCount">Antal ansatte</Label>
                  <Input
                    id="employeeCount"
                    name="employeeCount"
                    type="number"
                    value={formData.employeeCount}
                    onChange={handleChange}
                    placeholder="fx 25"
                    data-testid="input-employee-count"
                  />
                </div>

                <div>
                  <Label htmlFor="industry">Branche</Label>
                  <Select
                    value={formData.industry}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, industry: value }))}
                  >
                    <SelectTrigger data-testid="select-industry">
                      <SelectValue placeholder="Vælg branche..." />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map(ind => (
                        <SelectItem key={ind} value={ind} data-testid={`option-industry-${ind}`}>
                          {ind}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    Vi tilpasser dine demo-data til din branche
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Dine kontaktoplysninger</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName">Fornavn *</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Fornavn"
                    required
                    data-testid="input-first-name"
                  />
                </div>

                <div>
                  <Label htmlFor="lastName">Efternavn *</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Efternavn"
                    required
                    data-testid="input-last-name"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="phone">Telefonnummer</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+45 12 34 56 78"
                    data-testid="input-phone"
                  />
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full h-11 text-base"
              data-testid="button-submit-onboarding"
            >
              {isLoading ? "Opretter din konto..." : "Kom i gang med Sandbox →"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
