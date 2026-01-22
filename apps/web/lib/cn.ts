import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind className merge helper (shadcn-compatible).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
