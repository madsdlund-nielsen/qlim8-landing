import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Leaf, ArrowRight, Check, ChevronDown, Play, 
  FileSpreadsheet, Sparkles, Clock, ShieldCheck,
} from "lucide-react";
import { useI18n, languages } from "@/lib/i18n";
import { motion } from "framer-motion";
import { MobileScreenshotCarousel } from "@/components/ui/mobile-screenshot-carousel";
import { MobileStickyCTA } from "@/components/ui/mobile-sticky-cta";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";

import commandCenterImg from "@assets/Command_center_screenshot_1765487990875.png";
import carbonLedgerImg from "@assets/carbon_ledger_screenshot_1765487990874.png";
import reductionHubImg from "@assets/reduction_hub_screenshot_1765487990877.png";
import reportingStudioImg from "@assets/reporting_studio_screenshot_1765487990878.png";

export default function Landing() {
  const { t, language, setLanguage } = useI18n();
  const [employees, setEmployees] = useState([50]);
  const [revenue, setRevenue] = useState([50]);

  const handleLogin = () => {
    window.location.href = "/auth";
  };

  const handleGetAccess = () => {
    window.location.href = "/pricing";
  };

  const hourlyRate = 995;
  const hoursSavedPerEmployee = 20;
  const hoursPerMillionRevenue = 0.5;
  const totalHoursSaved = Math.round(employees[0] * hoursSavedPerEmployee + revenue[0] * hoursPerMillionRevenue);
  const estimatedSavings = Math.round(totalHoursSaved * hourlyRate);
  const timeSaved = totalHoursSaved;
  const currentLang = languages.find(l => l.code === language);

  const screenshotImages = [
    { src: commandCenterImg, alt: "Command Center Dashboard", title: "Command Center" },
    { src: carbonLedgerImg, alt: "Carbon Ledger", title: "CO2-Hovedbog" },
    { src: reductionHubImg, alt: "Reduction Hub", title: "Reduktionsmål" },
    { src: reportingStudioImg, alt: "Reporting Studio", title: "Rapportering" },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navbar - Mobile Optimized */}
      <PublicHeader 
        showBackButton={false}
        showMobileMenu={true}
        mobileMenuItems={[
          { label: t('nav.signIn'), onClick: handleLogin },
          { label: "Priser", href: "/pricing" },
          { label: "Viden", href: "/viden" },
          { label: "Om os", href: "/about" },
          { label: "Kontakt", href: "/kontakt" },
        ]}
        ctaButton={{ text: t('nav.getAccess'), href: "/pricing" }}
      />
      {/* Hero Section - Mobile Optimized */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8 text-center lg:text-left min-w-0">
                {/* Headline - Mobile Typography */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-semibold tracking-tight text-foreground leading-[1.15] break-words" data-testid="text-hero-title">
                  {t('hero.title.main')}<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">{t('hero.title.highlight')}</span>
                </h1>
              
              {/* Subheadline */}
              <p className="text-base sm:text-lg text-gray-600 max-w-lg mx-auto lg:mx-0" data-testid="text-hero-subtitle">
                {t('hero.subtitle')}
              </p>
              
              {/* CTAs - Touch Friendly */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg"
                  onClick={handleGetAccess}
                  className="bg-gray-900 hover:bg-gray-800 text-white gap-2 w-full sm:w-auto py-6 sm:py-4 text-base"
                  data-testid="button-hero-access"
                >
                  {t('hero.cta.access')}
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-6 pt-2 sm:pt-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500" />
                  <span>{t('hero.trust.economic')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500" />
                  <span>{t('hero.trust.audit')}</span>
                </div>
              </div>
            </div>
            
            {/* Hero Image - Mobile: Carousel, Desktop: Static */}
            <div className="relative w-full">
              {/* Mobile Carousel */}
              <div className="lg:hidden">
                <MobileScreenshotCarousel images={screenshotImages} />
              </div>
              
              {/* Desktop Static Image */}
              <div className="hidden lg:block relative z-10">
                <img 
                  src={commandCenterImg} 
                  alt="Command Center Dashboard" 
                  className="rounded-xl shadow-2xl border border-gray-200"
                  data-testid="img-hero-screenshot"
                />
                <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg border border-gray-100 p-4">
                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">{t('hero.floatingCard.label')}</div>
                  <div className="text-2xl font-bold text-gray-900">3.9 <span className="text-sm font-normal text-gray-500">{t('hero.floatingCard.unit')}</span></div>
                </div>
              </div>
              <div className="hidden lg:block absolute -top-10 -right-10 w-72 h-72 bg-emerald-100/50 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>
      {/* Trust Bar - Mobile Optimized */}
      <section className="py-8 sm:py-12 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-center text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8" data-testid="text-trust-headline">
            {t('trust.headline')}
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-6 sm:gap-12 md:gap-16">
            <div className="flex items-center gap-3 grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300">
              <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-md bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
              </div>
              <span className="text-base sm:text-lg font-semibold text-gray-700">Dansk AI model</span>
            </div>
            <div className="flex items-center gap-3 grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300">
              <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-md bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                <Leaf className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
              </div>
              <span className="text-base sm:text-lg font-semibold text-gray-700">Danske emissionsfaktorer</span>
            </div>
            <div className="flex items-center gap-3 grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300">
              <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-md bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center">
                <span className="text-white text-[10px] sm:text-xs font-bold">DK</span>
              </div>
              <span className="text-base sm:text-lg font-semibold text-gray-700">Dansk server-hosting</span>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section - Mobile Viewport-Height Sections */}
      <section id="features" className="py-12 sm:py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16 sm:space-y-24 lg:space-y-32">
          
          {/* Feature 1: Carbon Ledger */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[auto] lg:min-h-0">
            <motion.div 
              className="space-y-4 sm:space-y-6 text-center lg:text-left"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900" data-testid="text-feature1-title">
                {t('feature1.title')}
              </h2>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
                {t('feature1.body')}
              </p>
              <ul className="space-y-3 text-left max-w-lg mx-auto lg:mx-0">
                {['feature1.bullet1', 'feature1.bullet2', 'feature1.bullet3'].map((key) => (
                  <li key={key} className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Check className="h-3 w-3 text-emerald-600" />
                    </div>
                    <span className="text-sm sm:text-base text-gray-700">{t(key)}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            >
              {/* Mobile: Scrollable Carousel */}
              <div className="lg:hidden -mx-4 sm:mx-0">
                <MobileScreenshotCarousel 
                  images={[{ src: carbonLedgerImg, alt: "Carbon Ledger" }]} 
                />
              </div>
              {/* Desktop */}
              <div className="hidden lg:block">
                <img 
                  src={carbonLedgerImg} 
                  alt="Carbon Ledger" 
                  className="rounded-xl shadow-xl border border-gray-200"
                  data-testid="img-feature1-screenshot"
                />
                <div className="absolute -z-10 -bottom-8 -right-8 w-full h-full bg-emerald-100/30 rounded-xl" />
              </div>
            </motion.div>
          </div>

          {/* Feature 2: Reduction Hub */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div 
              className="relative order-2 lg:order-1"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            >
              {/* Mobile */}
              <div className="lg:hidden -mx-4 sm:mx-0">
                <MobileScreenshotCarousel 
                  images={[{ src: reductionHubImg, alt: "Reduction Hub" }]} 
                />
              </div>
              {/* Desktop */}
              <div className="hidden lg:block">
                <img 
                  src={reductionHubImg} 
                  alt="Reduction Hub" 
                  className="rounded-xl shadow-xl border border-gray-200"
                  data-testid="img-feature2-screenshot"
                />
                <div className="absolute -z-10 -bottom-8 -left-8 w-full h-full bg-teal-100/30 rounded-xl" />
              </div>
            </motion.div>
            <motion.div 
              className="space-y-4 sm:space-y-6 order-1 lg:order-2 text-center lg:text-left"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900" data-testid="text-feature2-title">
                {t('feature2.title')}
              </h2>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
                {t('feature2.body')}
              </p>
              <ul className="space-y-3 text-left max-w-lg mx-auto lg:mx-0">
                {['feature2.bullet1', 'feature2.bullet2', 'feature2.bullet3'].map((key) => (
                  <li key={key} className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-5 h-5 bg-teal-100 rounded-full flex items-center justify-center">
                      <Check className="h-3 w-3 text-teal-600" />
                    </div>
                    <span className="text-sm sm:text-base text-gray-700">{t(key)}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Feature 3: Reporting */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div 
              className="space-y-4 sm:space-y-6 text-center lg:text-left"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900" data-testid="text-feature3-title">
                {t('feature3.title')}
              </h2>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
                {t('feature3.body')}
              </p>
              <ul className="space-y-3 text-left max-w-lg mx-auto lg:mx-0">
                {['feature3.bullet1', 'feature3.bullet2', 'feature3.bullet3'].map((key) => (
                  <li key={key} className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                      <Check className="h-3 w-3 text-blue-600" />
                    </div>
                    <span className="text-sm sm:text-base text-gray-700">{t(key)}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            >
              {/* Mobile */}
              <div className="lg:hidden -mx-4 sm:mx-0">
                <MobileScreenshotCarousel 
                  images={[{ src: reportingStudioImg, alt: "Reporting Studio" }]} 
                />
              </div>
              {/* Desktop */}
              <div className="hidden lg:block">
                <img 
                  src={reportingStudioImg} 
                  alt="Reporting Studio" 
                  className="rounded-xl shadow-xl border border-gray-200"
                  data-testid="img-feature3-screenshot"
                />
                <div className="absolute -z-10 -bottom-8 -right-8 w-full h-full bg-blue-100/30 rounded-xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Savings Calculator - Mobile Optimized */}
      <section id="calculator" className="py-12 sm:py-20 lg:py-32 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4" data-testid="text-calc-title">
              {t('calc.title')}
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-400">
              {t('calc.subtitle')}
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Sliders */}
            <div className="space-y-8 sm:space-y-10">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-white font-medium text-sm sm:text-base">{t('calc.employees')}</label>
                  <span className="text-emerald-400 font-bold">{employees[0]}</span>
                </div>
                <Slider
                  value={employees}
                  onValueChange={setEmployees}
                  max={100}
                  min={1}
                  step={1}
                  className="[&_[role=slider]]:bg-emerald-500 [&_[role=slider]]:border-emerald-500 [&_[role=slider]]:w-6 [&_[role=slider]]:h-6"
                  data-testid="slider-employees"
                />
                <p className="text-xs sm:text-sm text-gray-500">{t('calc.employeesDesc')}</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-white font-medium text-sm sm:text-base">{t('calc.revenue')}</label>
                  <span className="text-emerald-400 font-bold">{revenue[0]}M</span>
                </div>
                <Slider
                  value={revenue}
                  onValueChange={setRevenue}
                  max={200}
                  min={1}
                  step={1}
                  className="[&_[role=slider]]:bg-emerald-500 [&_[role=slider]]:border-emerald-500 [&_[role=slider]]:w-6 [&_[role=slider]]:h-6"
                  data-testid="slider-revenue"
                />
                <p className="text-xs sm:text-sm text-gray-500">{t('calc.revenueDesc')}</p>
              </div>
            </div>
            
            {/* Results Card */}
            <div className="bg-gray-800 rounded-2xl p-6 sm:p-8 border border-gray-700">
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">{t('calc.savings')}</div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2" data-testid="text-savings-amount">
                {estimatedSavings.toLocaleString('da-DK')} <span className="text-lg sm:text-xl text-gray-400">kr</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8">{t('calc.compared')}</p>
              
              <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-lg sm:text-2xl font-bold text-white" data-testid="text-time-saved">{timeSaved} timer/år</div>
                    <div className="text-[10px] sm:text-xs text-gray-500">{t('calc.timeSaved')}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-lg sm:text-2xl font-bold text-white" data-testid="text-audit-ready">100%</div>
                    <div className="text-[10px] sm:text-xs text-gray-500">{t('calc.auditReady')}</div>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={handleGetAccess}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white gap-2 py-3 sm:py-4 text-base"
                data-testid="button-calculator-cta"
              >
                Klar til at spare?
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Blog Preview - Mobile Optimized */}
      <section className="py-12 sm:py-20 lg:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 sm:mb-12">
            <div className="text-center sm:text-left w-full sm:w-auto">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900" data-testid="text-blog-title">
                {t('blog.title')}
              </h2>
            </div>
            <a href="/viden" className="w-full sm:w-auto">
              <Button variant="outline" className="gap-2 w-full sm:w-auto min-h-[44px]" data-testid="button-blog-view-all">
                {t('blog.viewAll')}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
          </div>
          
          {/* Mobile: Horizontal Scroll, Desktop: Grid */}
          <div className="md:hidden -mx-4 px-4 overflow-x-auto pb-4">
            <div className="flex gap-4" style={{ width: 'max-content' }}>
              {/* Article 1 */}
              <article className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow w-[280px] flex-shrink-0" data-testid="card-article-1">
                <div className="h-32 bg-gradient-to-br from-emerald-100 to-teal-50" />
                <div className="p-4 space-y-3">
                  <div className="inline-block px-2 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-semibold uppercase tracking-wide rounded">
                    {t('blog.cat.compliance')}
                  </div>
                  <h3 className="font-bold text-gray-900 line-clamp-2 text-sm">{t('blog.article1.title')}</h3>
                  <a href="#" className="inline-flex items-center gap-1 text-sm text-emerald-600 font-medium hover:text-emerald-700 min-h-[44px]">
                    {t('blog.readMore')}
                    <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              </article>
              
              {/* Article 2 */}
              <article className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow w-[280px] flex-shrink-0" data-testid="card-article-2">
                <div className="h-32 bg-gradient-to-br from-blue-100 to-indigo-50" />
                <div className="p-4 space-y-3">
                  <div className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-[10px] font-semibold uppercase tracking-wide rounded">
                    {t('blog.cat.regulation')}
                  </div>
                  <h3 className="font-bold text-gray-900 line-clamp-2 text-sm">{t('blog.article2.title')}</h3>
                  <a href="#" className="inline-flex items-center gap-1 text-sm text-blue-600 font-medium hover:text-blue-700 min-h-[44px]">
                    {t('blog.readMore')}
                    <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              </article>
              
              {/* Article 3 */}
              <article className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow w-[280px] flex-shrink-0" data-testid="card-article-3">
                <div className="h-32 bg-gradient-to-br from-orange-100 to-amber-50" />
                <div className="p-4 space-y-3">
                  <div className="inline-block px-2 py-1 bg-orange-50 text-orange-700 text-[10px] font-semibold uppercase tracking-wide rounded">
                    {t('blog.cat.supplyChain')}
                  </div>
                  <h3 className="font-bold text-gray-900 line-clamp-2 text-sm">{t('blog.article3.title')}</h3>
                  <a href="#" className="inline-flex items-center gap-1 text-sm text-orange-600 font-medium hover:text-orange-700 min-h-[44px]">
                    {t('blog.readMore')}
                    <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              </article>
            </div>
          </div>
          
          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            <article className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow" data-testid="card-article-1-desktop">
              <div className="h-40 bg-gradient-to-br from-emerald-100 to-teal-50" />
              <div className="p-6 space-y-4">
                <div className="inline-block px-2 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-semibold uppercase tracking-wide rounded">
                  {t('blog.cat.compliance')}
                </div>
                <h3 className="font-bold text-gray-900 line-clamp-2">{t('blog.article1.title')}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{t('blog.article1.desc')}</p>
                <a href="#" className="inline-flex items-center gap-1 text-sm text-emerald-600 font-medium hover:text-emerald-700">
                  {t('blog.readMore')}
                  <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </article>
            
            <article className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow" data-testid="card-article-2-desktop">
              <div className="h-40 bg-gradient-to-br from-blue-100 to-indigo-50" />
              <div className="p-6 space-y-4">
                <div className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-[10px] font-semibold uppercase tracking-wide rounded">
                  {t('blog.cat.regulation')}
                </div>
                <h3 className="font-bold text-gray-900 line-clamp-2">{t('blog.article2.title')}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{t('blog.article2.desc')}</p>
                <a href="#" className="inline-flex items-center gap-1 text-sm text-blue-600 font-medium hover:text-blue-700">
                  {t('blog.readMore')}
                  <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </article>
            
            <article className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow" data-testid="card-article-3-desktop">
              <div className="h-40 bg-gradient-to-br from-orange-100 to-amber-50" />
              <div className="p-6 space-y-4">
                <div className="inline-block px-2 py-1 bg-orange-50 text-orange-700 text-[10px] font-semibold uppercase tracking-wide rounded">
                  {t('blog.cat.supplyChain')}
                </div>
                <h3 className="font-bold text-gray-900 line-clamp-2">{t('blog.article3.title')}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{t('blog.article3.desc')}</p>
                <a href="#" className="inline-flex items-center gap-1 text-sm text-orange-600 font-medium hover:text-orange-700">
                  {t('blog.readMore')}
                  <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>
      {/* Final CTA - Mobile Optimized */}
      <section className="py-12 sm:py-20 lg:py-32 bg-white pb-24 md:pb-12 lg:pb-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4" data-testid="text-cta-title">
            {t('cta.title')}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-6 sm:mb-8">
            Tilslut dig de danske virksomheder, der allerede forbereder sig på fremtidens forretning.  En grøn bundlinje er hverken besværligt eller dyrt.
          </p>
          <Button 
            size="lg"
            onClick={handleGetAccess}
            className="bg-gray-900 hover:bg-gray-800 text-white gap-2 w-full sm:w-auto py-6 sm:py-4 text-base"
            data-testid="button-cta-access"
          >
            Se dine fordele her
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </section>
      {/* Footer - Mobile Optimized */}
      <PublicFooter variant="full" />
      {/* Mobile Sticky CTA */}
      <MobileStickyCTA 
        text={t('hero.cta.access')} 
        onClick={handleGetAccess} 
        showAfterScroll={400}
      />
    </div>
  );
}
