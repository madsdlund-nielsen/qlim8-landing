"use client";
import { Button } from "@/components/ds/Button";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

// A link, not a callback: the pages that render this are server components
// (a function prop cannot cross that boundary), and a CTA that navigates is
// an <a> anyway.
interface MobileStickyCTAProps {
  text: string;
  href: string;
  showAfterScroll?: number;
}

export function MobileStickyCTA({ text, href, showAfterScroll = 300 }: MobileStickyCTAProps) {
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
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-card/95 backdrop-blur-sm border-t border-border shadow-soft">
      <Button href={href} full data-testid="button-sticky-cta">
        {text}
        <ArrowRight aria-hidden="true" />
      </Button>
    </div>
  );
}
