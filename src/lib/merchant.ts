import { CONTACT, SITE } from "~/lib/constants";

const DEFAULT_CURRENCY = "PKR";
const DEFAULT_COUNTRY = "PK";
const DEFAULT_RETURN_WINDOW_DAYS = 7;
const DEFAULT_HANDLING_MIN_DAYS = 1;
const DEFAULT_HANDLING_MAX_DAYS = 2;
const DEFAULT_TRANSIT_MIN_DAYS = 2;
const DEFAULT_TRANSIT_MAX_DAYS = 5;
const DEFAULT_COLOR = "Multi";
const DEFAULT_SIZE = "One Size";
const DEFAULT_AGE_GROUP = "adult";
const DEFAULT_GENDER = "female";
const PAKISTAN_COUNTRY_CODE = "92";

function parseNonNegativeNumber(value: string | undefined): number | null {
  if (!value) return null;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) return null;
  return parsed;
}

function parsePositiveInteger(value: string | undefined): number | null {
  if (!value) return null;
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) return null;
  return parsed;
}

function normalizeCode(value: string | undefined, fallback: string): string {
  const normalized = value?.trim().toUpperCase();
  if (!normalized) return fallback;
  return normalized;
}

export interface MerchantConfig {
  brand: string;
  currency: string;
  targetCountry: string;
  defaultColor: string;
  defaultSize: string;
  ageGroup: string;
  gender: string;
  returnWindowDays: number;
  shippingPrice: number | null;
  handlingMinDays: number;
  handlingMaxDays: number;
  transitMinDays: number;
  transitMaxDays: number;
  supportPhone: string | null;
}

export function getBaseUrl(): string {
  const rawBaseUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ??
    process.env.NEXTAUTH_URL?.trim() ??
    SITE.url;

  try {
    const parsed = new URL(rawBaseUrl);
    return parsed.toString().replace(/\/$/, "");
  } catch {
    return SITE.url.replace(/\/$/, "");
  }
}

export function getMerchantConfig(): MerchantConfig {
  const returnWindowDays =
    parsePositiveInteger(process.env.GOOGLE_MERCHANT_RETURN_DAYS) ??
    DEFAULT_RETURN_WINDOW_DAYS;

  const handlingMinDays =
    parsePositiveInteger(process.env.GOOGLE_MERCHANT_HANDLING_MIN_DAYS) ??
    DEFAULT_HANDLING_MIN_DAYS;
  const handlingMaxDays =
    parsePositiveInteger(process.env.GOOGLE_MERCHANT_HANDLING_MAX_DAYS) ??
    DEFAULT_HANDLING_MAX_DAYS;

  const transitMinDays =
    parsePositiveInteger(process.env.GOOGLE_MERCHANT_TRANSIT_MIN_DAYS) ??
    DEFAULT_TRANSIT_MIN_DAYS;
  const transitMaxDays =
    parsePositiveInteger(process.env.GOOGLE_MERCHANT_TRANSIT_MAX_DAYS) ??
    DEFAULT_TRANSIT_MAX_DAYS;

  return {
    brand: process.env.GOOGLE_MERCHANT_BRAND?.trim() || SITE.name,
    currency: normalizeCode(process.env.GOOGLE_MERCHANT_CURRENCY, DEFAULT_CURRENCY),
    targetCountry: normalizeCode(
      process.env.GOOGLE_MERCHANT_TARGET_COUNTRY,
      DEFAULT_COUNTRY
    ),
    defaultColor: process.env.GOOGLE_MERCHANT_DEFAULT_COLOR?.trim() || DEFAULT_COLOR,
    defaultSize: process.env.GOOGLE_MERCHANT_DEFAULT_SIZE?.trim() || DEFAULT_SIZE,
    ageGroup: process.env.GOOGLE_MERCHANT_AGE_GROUP?.trim() || DEFAULT_AGE_GROUP,
    gender: process.env.GOOGLE_MERCHANT_GENDER?.trim() || DEFAULT_GENDER,
    returnWindowDays,
    shippingPrice: parseNonNegativeNumber(process.env.GOOGLE_MERCHANT_SHIPPING_PRICE),
    handlingMinDays: Math.min(handlingMinDays, handlingMaxDays),
    handlingMaxDays: Math.max(handlingMinDays, handlingMaxDays),
    transitMinDays: Math.min(transitMinDays, transitMaxDays),
    transitMaxDays: Math.max(transitMinDays, transitMaxDays),
    supportPhone: toE164Phone(CONTACT.whatsapp),
  };
}

export function toE164Phone(phone: string): string | null {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return null;

  if (digits.startsWith(PAKISTAN_COUNTRY_CODE)) {
    return `+${digits}`;
  }

  if (digits.startsWith("0")) {
    return `+${PAKISTAN_COUNTRY_CODE}${digits.slice(1)}`;
  }

  return `+${PAKISTAN_COUNTRY_CODE}${digits}`;
}

export function toAbsoluteUrl(value: string, baseUrl = getBaseUrl()): string {
  try {
    return new URL(value).toString();
  } catch {
    const normalizedPath = value.startsWith("/") ? value : `/${value}`;
    return new URL(normalizedPath, `${baseUrl}/`).toString();
  }
}

export function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function buildProductDescription(
  description: string | null | undefined,
  productName: string,
  maxLength = 5000
): string {
  const cleanDescription = stripHtml(description ?? "");
  const fallback = `${productName} by ${SITE.name}.`;
  const output = cleanDescription || fallback;
  return output.slice(0, maxLength);
}

export function formatMerchantPrice(amount: number, currency: string): string {
  return `${amount.toFixed(2)} ${currency}`;
}

export function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
