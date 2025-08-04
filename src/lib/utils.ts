import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number | Date): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL || ""}${path}`
}

// Animation utilities
export const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export const slideIn = {
  initial: { x: -20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.3 }
}

export const scaleIn = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.3 }
}

// Gradient utilities
export const gradients = {
  primary: "bg-gradient-to-r from-blue-600 to-purple-600",
  secondary: "bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900",
  accent: "bg-gradient-to-r from-emerald-500 to-teal-500",
  warm: "bg-gradient-to-r from-orange-500 to-red-500",
  cool: "bg-gradient-to-r from-cyan-500 to-blue-500",
  rainbow: "bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
}

// Glassmorphism utilities
export const glass = {
  light: "bg-white/10 backdrop-blur-md border border-white/20",
  dark: "bg-black/10 backdrop-blur-md border border-black/20",
  colored: "bg-blue-500/10 backdrop-blur-md border border-blue-500/20"
}

// Shadow utilities
export const shadows = {
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
  "2xl": "shadow-2xl",
  inner: "shadow-inner",
  glow: "shadow-lg shadow-blue-500/25",
  glowPurple: "shadow-lg shadow-purple-500/25"
} 