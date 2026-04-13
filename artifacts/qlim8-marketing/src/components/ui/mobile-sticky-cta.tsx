import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

interface MobileStickyCTAProps {
  text: string;
  onClick: () => void;
  showAfterScroll?: number;
}

export function MobileStickyCTA({ text, onClick, showAfterScroll = 300 }: MobileStickyCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const handleScroll = () => {
      setIsVisible(window.scrollY > showAfterScroll);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showAfterScroll]);

  if (!isMounted || !isVisible) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg">
      <Button
        onClick={onClick}
        className="w-full bg-gray-900 hover:bg-gray-800 text-white py-6 text-base font-semibold gap-2"
        data-testid="button-sticky-cta"
      >
        {text}
        <ArrowRight className="h-5 w-5" />
      </Button>
    </div>
  );
}
