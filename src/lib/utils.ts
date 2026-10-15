import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// tailwind-merge must know the design system's type scale (text-h1 ... text-button,
// src/index.css), or it reads `text-body-sm` as a text colour and drops the
// colour class that came before it, which turned a primary button's white text dark.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["h1", "h2", "h3", "lead", "body", "body-sm", "trust", "button"] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
