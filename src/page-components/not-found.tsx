import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-band">
      <div className="w-full max-w-md mx-4 bg-card rounded-lg border border-border shadow-soft p-6">
        <div className="flex mb-4 gap-2">
          <AlertCircle className="h-8 w-8 text-destructive" />
          <h1 className="text-h3">404: Siden ikke fundet</h1>
        </div>
        <p className="mt-4 text-body-sm text-muted-foreground">
          Den side du leder efter eksisterer ikke.{" "}
          <a href="/" className="text-primary hover:underline">
            Gå til forsiden
          </a>
        </p>
      </div>
    </div>
  );
}
