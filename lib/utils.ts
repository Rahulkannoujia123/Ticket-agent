import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatWhatsAppLink(mobile: string, message: string) {
  // Assuming Indian numbers if not starting with country code
  let cleanMobile = mobile.replace(/\D/g, "")
  if (cleanMobile.length === 10) {
    cleanMobile = "91" + cleanMobile
  }
  return `https://wa.me/${cleanMobile}?text=${encodeURIComponent(message)}`
}
