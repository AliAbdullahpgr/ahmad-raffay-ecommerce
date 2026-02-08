import "~/styles/globals.css";

import { Inter, Playfair_Display } from "next/font/google";
import { type Metadata } from "next";
import { Toaster } from "react-hot-toast";

import { TRPCReactProvider } from "~/trpc/react";
import { CONTACT, SITE } from "~/lib/constants";
import { getBaseUrl, getMerchantConfig } from "~/lib/merchant";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  preload: true,
  fallback: ["Georgia", "serif"],
});

const baseUrl = getBaseUrl();
const merchant = getMerchantConfig();

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${SITE.name} | ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "embroidery",
    "handwork",
    "traditional wear",
    "Pakistani fashion",
    "women clothing",
    "Rajanpur",
    "shirts",
    "trousers",
    "kurta",
    "embroidered clothes",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: baseUrl,
    siteName: SITE.name,
    title: SITE.name,
    description: SITE.description,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: SITE.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.description,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "1j5bBWwKUQPTnwkJ9FWVv4KH6bQzRyhc9koWpKY7TRE",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const storeJsonLd = {
    "@context": "https://schema.org",
    "@type": "OnlineStore",
    "@id": `${baseUrl}/#store`,
    name: SITE.name,
    url: baseUrl,
    description: SITE.description,
    currenciesAccepted: merchant.currency,
    paymentAccepted: "Cash on Delivery",
    sameAs: [CONTACT.instagramUrl, CONTACT.facebookUrl],
    contactPoint: merchant.supportPhone
      ? [
          {
            "@type": "ContactPoint",
            contactType: "customer support",
            telephone: merchant.supportPhone,
            availableLanguage: ["en", "ur"],
          },
        ]
      : undefined,
    hasMerchantReturnPolicy: {
      "@type": "MerchantReturnPolicy",
      applicableCountry: merchant.targetCountry,
      returnPolicyCategory:
        "https://schema.org/MerchantReturnFiniteReturnWindow",
      merchantReturnDays: merchant.returnWindowDays,
      returnMethod: "https://schema.org/ReturnByMail",
      returnFees: "https://schema.org/ReturnFeesCustomerResponsibility",
      merchantReturnLink: `${baseUrl}/return-policy`,
    },
  };

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(storeJsonLd) }}
        />
        <TRPCReactProvider>
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#2D2D2D",
                color: "#FDF8F3",
              },
              success: {
                iconTheme: {
                  primary: "#1B4D3E",
                  secondary: "#FDF8F3",
                },
              },
              error: {
                iconTheme: {
                  primary: "#C75B39",
                  secondary: "#FDF8F3",
                },
              },
            }}
          />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
