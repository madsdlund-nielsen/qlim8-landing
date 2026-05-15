"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";

import tour1Img from "@assets/qlim8-tour_1_(2)_1775843644383.jpg";
import dashboardImg from "@assets/qlim8-Dashboard_(2)_1775843644408.jpg";
import datakilderImg from "@assets/qlim8-Datakilder_(2)_1775843644396.jpg";
import udledningerImg from "@assets/qlim8-Udledninger_(2)_1775843644434.jpg";
import vsmeImg from "@assets/qlim8-VSME_wizard_(2)_1775843644402.jpg";
import profileImg from "@assets/qlim8-Public_profile_(2)_1775843644378.jpg";
import tour9Img from "@assets/qlim8-tour_9_(2)_1775843644362.jpg";

const SCENE_DURATION = 5000;
const PROGRESS_TICK = 50;

import type { StaticImageData } from "next/image";

interface Scene {
  id: number;
  image: StaticImageData;
  alt: string;
  label: string;
  sublabel: string;
}

const SCENES: Scene[] = [
  {
    id: 1,
    image: tour1Img,
    alt: "Velkommen til qlim8 — onboarding tour start",
    label: "Velkommen til qlim8",
    sublabel: "Kom i gang på få minutter med en trin-for-trin guide",
  },
  {
    id: 2,
    image: dashboardImg,
    alt: "Dashboard — overblik over udledninger",
    label: "Overblik over udledninger",
    sublabel: "Scope 1, 2 og 3 samlet på ét sted, altid opdateret",
  },
  {
    id: 3,
    image: datakilderImg,
    alt: "Datakilder — forbind Dinero eller upload fakturaer",
    label: "Automatisk dataindsamling",
    sublabel: "Forbind Dinero eller upload fakturaer med AI-klassificering",
  },
  {
    id: 4,
    image: udledningerImg,
    alt: "Klimahovedbog — revisionssikre beregninger",
    label: "Revisionssikre beregninger",
    sublabel: "Hvert tal er sporbart til originaldokumentet",
  },
  {
    id: 5,
    image: vsmeImg,
    alt: "VSME Wizard — generer klimarapporter",
    label: "Rapportering på få minutter",
    sublabel: "Generer VSME- og CSRD-kompatible rapporter klar til banken",
  },
  {
    id: 6,
    image: profileImg,
    alt: "Offentlig klimaprofil — del dit ESG-arbejde",
    label: "Del dit ESG-arbejde",
    sublabel: "En offentlig klimaprofil du kan dele med kunder og banker",
  },
  {
    id: 7,
    image: tour9Img,
    alt: "Du er klar — næste skridt i qlim8",
    label: "Du er klar til at starte",
    sublabel: "Upload fakturaer, se dit Carbon Ledger og generer din første rapport",
  },
];

export function PromoVideoPlayer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timerKey, setTimerKey] = useState(0);

  const isPlaying = !userPaused && !hoverPaused;

  useEffect(() => {
    if (!isPlaying) return;

    setProgress(0);

    const progressInterval = setInterval(() => {
      setProgress((p) => {
        const next = p + (100 / (SCENE_DURATION / PROGRESS_TICK));
        return next >= 100 ? 100 : next;
      });
    }, PROGRESS_TICK);

    const sceneInterval = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % SCENES.length);
      setTimerKey((k) => k + 1);
    }, SCENE_DURATION);

    return () => {
      clearInterval(progressInterval);
      clearInterval(sceneInterval);
    };
  }, [isPlaying, timerKey]);

  const goTo = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
    setTimerKey((k) => k + 1);
  };

  const prev = () => goTo((currentIndex - 1 + SCENES.length) % SCENES.length);
  const next = () => goTo((currentIndex + 1) % SCENES.length);

  const scene = SCENES[currentIndex];

  return (
    <div className="relative z-20 bg-[#F5F5F0]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Se det i aktion
          </h2>
          <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto">
            En kort gennemgang af platformen — fra onboarding til færdig rapport
          </p>
        </div>

        <div
          onMouseEnter={() => setHoverPaused(true)}
          onMouseLeave={() => setHoverPaused(false)}
        >
          {/* Browser chrome frame */}
          <div className="rounded-xl overflow-hidden border border-gray-200 shadow-xl bg-white">
            {/* Browser top bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 bg-white">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-gray-200" />
                <span className="w-3 h-3 rounded-full bg-gray-200" />
                <span className="w-3 h-3 rounded-full bg-gray-200" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-gray-50 border border-gray-200 rounded-md px-3 py-1 text-xs text-gray-400 text-center select-none">
                  app.qlim8.com
                </div>
              </div>
            </div>

            {/* Screenshot area */}
            <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={scene.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <motion.img
                    src={scene.image.src}
                    alt={scene.alt}
                    className="w-full h-full object-cover object-top"
                    initial={{ scale: 1.0 }}
                    animate={{ scale: 1.06 }}
                    transition={{ duration: SCENE_DURATION / 1000, ease: "linear" }}
                    draggable={false}
                  />

                  {/* Text overlay — solid dark box, no gradient */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 p-4 sm:p-6"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.4 }}
                  >
                    <div className="inline-block bg-gray-900/85 rounded-lg px-4 py-3 max-w-lg">
                      <p className="text-white font-semibold text-sm sm:text-base leading-tight">
                        {scene.label}
                      </p>
                      <p className="text-gray-300 text-xs sm:text-sm mt-0.5 leading-snug">
                        {scene.sublabel}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              {/* Prev / Next arrow buttons */}
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-white transition-colors shadow-sm"
                aria-label="Forrige scene"
                data-testid="promo-prev"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-white transition-colors shadow-sm"
                aria-label="Næste scene"
                data-testid="promo-next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Controls below the frame */}
          <div className="mt-5 flex items-center gap-4">
            {/* Play / Pause */}
            <button
              onClick={() => setUserPaused((p) => !p)}
              className="flex-shrink-0 w-9 h-9 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-700 hover:border-primary hover:text-primary transition-colors"
              aria-label={userPaused ? "Afspil" : "Pause"}
              data-testid="promo-play-pause"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            {/* Progress + dots column */}
            <div className="flex-1 flex flex-col gap-2">
              {/* Thin progress bar */}
              <div className="h-0.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-none"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Scene dots */}
              <div className="flex items-center gap-1.5">
                {SCENES.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => goTo(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === currentIndex
                        ? "bg-primary w-6"
                        : "bg-gray-300 hover:bg-gray-400 w-1.5"
                    }`}
                    aria-label={`Scene ${i + 1}`}
                    data-testid={`promo-dot-${i}`}
                  />
                ))}
                <span className="ml-auto text-xs text-gray-400 tabular-nums select-none">
                  {currentIndex + 1}&thinsp;/&thinsp;{SCENES.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
