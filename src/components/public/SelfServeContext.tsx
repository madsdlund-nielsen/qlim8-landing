"use client";
// Whether the app's catalog sells anything by itself (src/lib/packageView.ts:
// isSelfServe). The root layout reads the packages API once on the server and
// provides the answer, so the header (a client component used on every page)
// can show "Kom gratis i gang" without a fetch of its own, in the server HTML.
import { createContext, useContext, type ReactNode } from "react";

const SelfServeContext = createContext(false);

export function SelfServeProvider({ value, children }: { value: boolean; children: ReactNode }) {
  return <SelfServeContext.Provider value={value}>{children}</SelfServeContext.Provider>;
}

export function useSelfServe(): boolean {
  return useContext(SelfServeContext);
}
