import Link from "next/link";
import { Facebook, Heart, Instagram, MessageCircle } from "lucide-react";
import { CONTACT, NAV_LINKS, SITE } from "~/lib/constants";
import { getWhatsAppLink } from "~/lib/utils";

const POLICY_LINKS = [
  { href: "/contact", label: "Contact" },
  { href: "/shipping-policy", label: "Shipping Policy" },
  { href: "/return-policy", label: "Return & Refund Policy" },
] as const;

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-emerald text-white">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="font-serif text-2xl font-bold text-gold">
              Ahmad Rafay
            </Link>
            <p className="mt-2 text-emerald-200">{SITE.tagline}</p>
            <p className="mt-4 max-w-md text-sm text-emerald-300">
              Traditional hand-embroidered shirts & trousers from Rajanpur.
              Every piece is crafted with love and dedication by skilled
              artisans.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-lg font-semibold text-gold">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-emerald-200 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="mt-5 text-sm font-semibold uppercase tracking-wide text-gold">
              Policies
            </h4>
            <ul className="mt-2 space-y-2">
              {POLICY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-emerald-200 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-lg font-semibold text-gold">
              Connect With Us
            </h3>
            <div className="flex gap-3">
              <a
                href={getWhatsAppLink(CONTACT.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:scale-110 hover:bg-[#25D366]"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-5 w-5" fill="currentColor" />
              </a>
              <a
                href={CONTACT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:scale-110 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={CONTACT.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:scale-110 hover:bg-[#1877F2]"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
            <p className="mt-4 text-sm text-emerald-300">
              WhatsApp: {CONTACT.whatsapp}
            </p>
            <p className="text-sm text-emerald-300">
              Instagram: {CONTACT.instagram}
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-emerald-700 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-emerald-300">
              (c) {currentYear} {SITE.name}. All rights reserved.
            </p>
            <p className="flex items-center gap-1 text-sm text-emerald-300">
              Made with{" "}
              <Heart className="h-4 w-4 fill-terracotta text-terracotta" /> in
              Rajanpur, Pakistan
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
