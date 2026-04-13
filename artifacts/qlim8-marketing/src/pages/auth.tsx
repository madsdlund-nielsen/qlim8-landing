import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Eye, EyeOff, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

interface AuthPageProps {
  isModal?: boolean;
}

export default function AuthPage({ isModal = false }: AuthPageProps) {
  const [, setLocation] = useLocation();
  const { user, loginMutation, registerMutation, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const { language } = useI18n();

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });
  const [registerError, setRegisterError] = useState("");

  if (isLoading) {
    return (
      <div className={cn(
        "flex items-center justify-center bg-gray-50",
        isModal ? "h-[400px]" : "min-h-screen"
      )}>
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (user && !isModal) {
    setLocation("/");
    return null;
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(loginData, {
      onSuccess: () => {
        if (!isModal) setLocation("/");
      },
    });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError("");

    if (registerData.password !== registerData.confirmPassword) {
      setRegisterError("Passwords do not match");
      return;
    }

    if (registerData.password.length < 8) {
      setRegisterError("Password must be at least 8 characters");
      return;
    }

    registerMutation.mutate(
      {
        email: registerData.email,
        password: registerData.password,
        firstName: registerData.firstName || undefined,
        lastName: registerData.lastName || undefined,
      },
      {
        onSuccess: () => {
          if (!isModal) setLocation("/");
        },
      }
    );
  };

  return (
    <div className={cn(
      "bg-gradient-to-br from-gray-50 to-emerald-50/30 flex",
      isModal ? "w-full" : "min-h-screen"
    )}>
      <div className={cn(
        "flex-1 flex items-center justify-center",
        isModal ? "p-0" : "p-8"
      )}>
        <Card className={cn(
          "w-full shadow-xl border-0",
          isModal ? "max-w-none rounded-none" : "max-w-md"
        )}>
          <CardHeader className="text-center pb-2">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="font-semibold text-2xl tracking-tight text-gray-900">qlim8</span>
            </div>
            <CardTitle className="text-xl">{isModal ? (language === "da" ? "Velkommen" : "Welcome") : "Welcome"}</CardTitle>
            <CardDescription>
              {isModal 
                ? (language === "da" ? "Log ind for at fortsætte" : "Sign in to continue")
                : (language === "da" 
                  ? "Log ind eller opret en konto for at fortsætte" 
                  : "Sign in or create an account to continue")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              {!isModal && (
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login" data-testid="tab-login">
                    {language === "da" ? "Log ind" : "Sign In"}
                  </TabsTrigger>
                  <TabsTrigger value="register" data-testid="tab-register">
                    {language === "da" ? "Opret konto" : "Create Account"}
                  </TabsTrigger>
                </TabsList>
              )}

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="navn@virksomhed.dk"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                      data-testid="input-login-email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">
                      {language === "da" ? "Adgangskode" : "Password"}
                    </Label>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        required
                        data-testid="input-login-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                    disabled={loginMutation.isPending}
                    data-testid="button-login"
                  >
                    {loginMutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        {language === "da" ? "Logger ind..." : "Signing in..."}
                      </>
                    ) : (
                      language === "da" ? "Log ind" : "Sign In"
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-firstName">
                        {language === "da" ? "Fornavn" : "First Name"}
                      </Label>
                      <Input
                        id="register-firstName"
                        type="text"
                        placeholder="Anders"
                        value={registerData.firstName}
                        onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })}
                        data-testid="input-register-firstname"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-lastName">
                        {language === "da" ? "Efternavn" : "Last Name"}
                      </Label>
                      <Input
                        id="register-lastName"
                        type="text"
                        placeholder="Jensen"
                        value={registerData.lastName}
                        onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
                        data-testid="input-register-lastname"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="navn@virksomhed.dk"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      required
                      data-testid="input-register-email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">
                      {language === "da" ? "Adgangskode" : "Password"}
                    </Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder={language === "da" ? "Mindst 8 tegn" : "At least 8 characters"}
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      required
                      data-testid="input-register-password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-confirm">
                      {language === "da" ? "Bekræft adgangskode" : "Confirm Password"}
                    </Label>
                    <Input
                      id="register-confirm"
                      type="password"
                      placeholder={language === "da" ? "Gentag adgangskode" : "Re-enter password"}
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                      required
                      data-testid="input-register-confirm"
                    />
                  </div>
                  {registerError && (
                    <p className="text-sm text-red-600" data-testid="text-register-error">
                      {registerError === "Passwords do not match" && language === "da" ? "Adgangskoderne er ikke ens" : 
                       registerError === "Password must be at least 8 characters" && language === "da" ? "Adgangskoden skal være på mindst 8 tegn" : 
                       registerError}
                    </p>
                  )}
                  <Button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                    disabled={registerMutation.isPending}
                    data-testid="button-register"
                  >
                    {registerMutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        {language === "da" ? "Opretter konto..." : "Creating account..."}
                      </>
                    ) : (
                      language === "da" ? "Opret konto" : "Create Account"
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {!isModal && (
        <div className="hidden lg:flex flex-1 bg-gradient-to-br from-emerald-600 to-teal-700 items-center justify-center p-12">
          <div className="max-w-lg text-white">
            <div className="flex items-center gap-3 mb-8">
              <Leaf className="h-10 w-10" />
              <span className="text-3xl font-bold">qlim8</span>
            </div>
            <h2 className="text-4xl font-bold mb-6">
              Your climate operating system for Danish SME
            </h2>
            <p className="text-lg text-emerald-100 mb-8">
              Track, calculate, and report your carbon footprint with AI-powered insights. 
              Meet CSRD compliance effortlessly with Danish-specific emission factors.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-sm">1</span>
                </div>
                <span>AI-powered invoice scanning for automatic data collection</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-sm">2</span>
                </div>
                <span>Danish emission factors from Energinet and DST</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-sm">3</span>
                </div>
                <span>Professional PDF and Excel reports for stakeholders</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
