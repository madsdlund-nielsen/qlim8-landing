"use client";
// The 5x5 materiality matrix on /events/dma: financial score on x, impact on y,
// one round badge per answered topic, the zones above the threshold tinted
// (sage for impact, warm for financial, both for double). Topics that land in
// the same cell share it in rows, shrinking the badges until they fit. Used
// twice: beside the questions, and beside the topic list in the profile.
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { DMA_THRESHOLD as T, DMA_TOPICS, DMA_ZONE_LABEL, type DmaZone } from "@/content/copy/events-dma";

export type DmaAnswers = Record<string, { i: number | null; f: number | null }>;

export function zoneOf(a: { i: number | null; f: number | null }): DmaZone | null {
  if (a.i == null || a.f == null) return null;
  const hi = a.i >= T;
  const hf = a.f >= T;
  return hi && hf ? "both" : hi ? "imp" : hf ? "fin" : "none";
}

const BADGE: Record<DmaZone, string> = {
  both: "bg-primary text-primary-foreground ring-[3px] ring-warm ring-offset-2 ring-offset-card",
  imp: "bg-primary text-primary-foreground ring-2 ring-card",
  fin: "bg-warm text-primary-hover ring-2 ring-card",
  none: "border-[1.5px] border-border-strong bg-card text-muted-foreground ring-2 ring-card",
};

const GAP = 3;

export function DmaMatrix({
  answers,
  current,
  highlight,
  onSelect,
}: {
  answers: DmaAnswers;
  /** The topic being answered: outlined. */
  current?: string | null;
  /** The topic picked in the list: outlined, the others dimmed. */
  highlight?: string | null;
  onSelect?: (code: string) => void;
}) {
  const layerRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [animate, setAnimate] = useState(false);
  const [tip, setTip] = useState<{ text: string; left: number; top: number } | null>(null);

  useEffect(() => {
    const el = layerRef.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      setSize({ w: r.width, h: r.height });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    // Badges jump into place on the first paint and glide from then on.
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setAnimate(true));
    });
    return () => {
      ro.disconnect();
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, []);

  // Position every answered badge: group by cell, then lay each group out in rows.
  const pos: Record<string, { x: number; y: number; s: number }> = {};
  if (size.w) {
    const cw = size.w / 5;
    const ch = size.h / 5;
    const cells: Record<string, string[]> = {};
    for (const t of DMA_TOPICS) {
      const a = answers[t.code];
      if (zoneOf(a)) (cells[`${a.f}-${a.i}`] ??= []).push(t.code);
    }
    for (const [key, list] of Object.entries(cells)) {
      const [f, i] = key.split("-").map(Number);
      const n = list.length;
      let s = Math.min(36, Math.floor(cw * 0.44));
      let per = 1;
      let rows = 1;
      for (let tries = 0; tries < 14; tries++) {
        per = Math.max(1, Math.floor((cw - 6 + GAP) / (s + GAP)));
        rows = Math.ceil(n / per);
        if (rows * s + (rows - 1) * GAP <= ch - 6 || s <= 16) break;
        s -= 2;
      }
      list.forEach((code, idx) => {
        const rw = Math.floor(idx / per);
        const cl = idx % per;
        const m = Math.min(per, n - rw * per);
        pos[code] = {
          x: (f - 1) * cw + (cw - (m * s + (m - 1) * GAP)) / 2 + cl * (s + GAP),
          y: (5 - i) * ch + (ch - (rows * s + (rows - 1) * GAP)) / 2 + rw * (s + GAP),
          s,
        };
      });
    }
  }

  const showTip = (el: HTMLElement, code: string) => {
    const t = DMA_TOPICS.find((x) => x.code === code);
    const a = answers[code];
    const wrap = wrapRef.current;
    if (!t || !wrap || !zoneOf(a)) return;
    const wr = wrap.getBoundingClientRect();
    const br = el.getBoundingClientRect();
    setTip({
      text: `${code} ${t.name}: påvirkning ${a.i}, økonomi ${a.f}`,
      left: Math.min(Math.max(br.left - wr.left + br.width / 2, 120), wr.width - 120),
      top: br.top - wr.top - 8,
    });
  };

  const cellZones: string[] = [];
  for (let row = 5; row >= 1; row--) {
    for (let col = 1; col <= 5; col++) {
      const hf = col >= T;
      const hi = row >= T;
      cellZones.push(
        hf && hi ? "bg-linear-to-br from-sage/15 to-warm/20" : hi ? "bg-sage/10" : hf ? "bg-warm/15" : "",
      );
    }
  }

  return (
    <div ref={wrapRef} className="relative mx-auto max-w-[520px]">
      <div className="grid grid-cols-[18px_16px_minmax(0,1fr)] grid-rows-[auto_16px_20px] gap-x-1">
        <div className="col-start-1 row-start-1 rotate-180 text-center text-[13px] leading-[18px] whitespace-nowrap text-muted-foreground [writing-mode:vertical-rl]">
          Påvirkning på mennesker og miljø
        </div>
        <div className="col-start-2 row-start-1 flex flex-col" aria-hidden="true">
          {[5, 4, 3, 2, 1].map((n) => (
            <span key={n} className="flex flex-1 items-center justify-center text-xs text-muted-foreground tabular-nums">
              {n}
            </span>
          ))}
        </div>
        <div className="relative col-start-3 row-start-1 aspect-square overflow-hidden rounded-lg border border-border bg-card">
          <div className="absolute inset-0 grid grid-cols-5 grid-rows-5" aria-hidden="true">
            {cellZones.map((z, k) => (
              <div
                key={k}
                className={cn("border-border", k % 5 !== 4 && "border-r", k < 20 && "border-b", z)}
              />
            ))}
          </div>
          <div className="pointer-events-none absolute top-0 bottom-0 left-[40%] border-l-[1.5px] border-dashed border-foreground/50" aria-hidden="true" />
          <div className="pointer-events-none absolute top-[60%] right-0 left-0 border-t-[1.5px] border-dashed border-foreground/50" aria-hidden="true" />
          <div ref={layerRef} className="absolute inset-0">
            {DMA_TOPICS.map((t) => {
              const a = answers[t.code];
              const z = zoneOf(a);
              const p = pos[t.code];
              const marked = current === t.code || highlight === t.code;
              const dim = !!highlight && highlight !== t.code && !!z;
              return (
                <button
                  key={t.code}
                  type="button"
                  tabIndex={z ? 0 : -1}
                  aria-hidden={z ? undefined : true}
                  aria-label={
                    z
                      ? `${t.code} ${t.name}, ${DMA_ZONE_LABEL[z]}. Påvirkning ${a.i}, økonomi ${a.f}`
                      : `${t.code} ${t.name}, ikke besvaret`
                  }
                  onClick={() => onSelect?.(t.code)}
                  onMouseEnter={(e) => showTip(e.currentTarget, t.code)}
                  onMouseLeave={() => setTip(null)}
                  onFocus={(e) => showTip(e.currentTarget, t.code)}
                  onBlur={() => setTip(null)}
                  className={cn(
                    "absolute top-0 left-0 z-[1] grid place-items-center rounded-full p-0 font-semibold hover:z-[3]",
                    animate &&
                      "transition-[transform,opacity,width,height,font-size] duration-500 ease-[cubic-bezier(.3,.9,.3,1)] motion-reduce:transition-none",
                    z ? BADGE[z] : "pointer-events-none opacity-0",
                    marked && "z-[2] outline-2 outline-offset-4 outline-ring",
                    dim && "opacity-30",
                  )}
                  style={
                    p
                      ? {
                          width: p.s,
                          height: p.s,
                          fontSize: Math.max(9, Math.round(p.s * 0.36)),
                          transform: `translate(${p.x.toFixed(1)}px,${p.y.toFixed(1)}px)`,
                        }
                      : { width: 28, height: 28 }
                  }
                >
                  {t.code}
                </button>
              );
            })}
          </div>
        </div>
        <div className="col-start-3 row-start-2 flex" aria-hidden="true">
          {[1, 2, 3, 4, 5].map((n) => (
            <span key={n} className="flex flex-1 items-center justify-center text-xs text-muted-foreground tabular-nums">
              {n}
            </span>
          ))}
        </div>
        <div className="col-start-3 row-start-3 pt-0.5 text-center text-[13px] leading-[18px] text-muted-foreground">
          Betydning for din økonomi
        </div>
      </div>
      <div
        role="tooltip"
        className={cn(
          "pointer-events-none absolute z-[5] -translate-x-1/2 -translate-y-full rounded-md bg-primary px-2.5 py-1.5 text-body-sm whitespace-nowrap text-primary-foreground transition-opacity duration-100",
          tip ? "opacity-100" : "opacity-0",
        )}
        style={tip ? { left: tip.left, top: tip.top } : undefined}
      >
        {tip?.text}
      </div>
    </div>
  );
}

/** The key under a matrix: the four badge kinds, and the threshold line. */
export function DmaLegend({ withThreshold }: { withThreshold?: boolean }) {
  const item = "flex items-center gap-2";
  const dot = "grid size-[22px] flex-none place-items-center rounded-full text-[10px] font-semibold";
  return (
    <ul className="mt-6 grid list-none grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-x-4 gap-y-2 p-0 text-body-sm text-muted-foreground">
      <li className={item}>
        <span className={cn(dot, "mx-0.5 bg-primary text-primary-foreground ring-2 ring-warm ring-offset-2 ring-offset-card")}>E1</span>
        {DMA_ZONE_LABEL.both}
      </li>
      <li className={item}>
        <span className={cn(dot, "bg-primary text-primary-foreground")}>E1</span>
        {DMA_ZONE_LABEL.imp}
      </li>
      <li className={item}>
        <span className={cn(dot, "bg-warm text-primary-hover")}>E1</span>
        {DMA_ZONE_LABEL.fin}
      </li>
      <li className={item}>
        <span className={cn(dot, "border-[1.5px] border-border-strong bg-card text-muted-foreground")}>E1</span>
        {DMA_ZONE_LABEL.none}
      </li>
      {withThreshold && (
        <li className={item}>
          <span className="w-[22px] flex-none border-t-[1.5px] border-dashed border-foreground/50" />
          Væsentlighedsgrænsen
        </li>
      )}
    </ul>
  );
}
