import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format price in PKR
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Generate WhatsApp link with pre-filled message
 */
export function getWhatsAppLink(
  phoneNumber: string,
  productName?: string
): string {
  // Remove any non-digit characters and ensure it starts with country code
  const cleanNumber = phoneNumber.replace(/\D/g, "");
  const formattedNumber = cleanNumber.startsWith("92")
    ? cleanNumber
    : cleanNumber.startsWith("0")
      ? `92${cleanNumber.slice(1)}`
      : `92${cleanNumber}`;

  const message = productName
    ? `Hi! I'm interested in "${productName}" from Ahmad Rafay Handwork. Please share more details.`
    : `Hi! I'm interested in your products at Ahmad Rafay Handwork. Please share more details.`;

  return `https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Generate slug from string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

/**
 * Truncate text to a certain length
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + "...";
}
