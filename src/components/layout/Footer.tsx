import Link from "next/link";
import { Heart, Instagram, Facebook, MessageCircle } from "lucide-react";
import { SITE, CONTACT, NAV_LINKS } from "~/lib/constants";
import { getWhatsAppLink } from "~/lib/utils";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-emerald text-white">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="font-serif text-2xl font-bold text-gold">
              Ahmad Rafay
            </Link>
            <p className="mt-2 text-emerald-200">{SITE.tagline}</p>
            <p className="mt-4 text-sm text-emerald-300 max-w-md">
              Traditional hand-embroidered shirts & trousers from Rajanpur.
              Every piece is crafted with love and dedication by skilled artisans.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-gold mb-4">
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
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-gold mb-4">
              Connect With Us
            </h3>
            <div className="flex gap-3">
              <a
                href={getWhatsAppLink(CONTACT.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-[#25D366] hover:scale-110"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-5 w-5" fill="currentColor" />
              </a>
              <a
                href={CONTACT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={CONTACT.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-[#1877F2] hover:scale-110"
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

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-emerald-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-emerald-300">
              © {currentYear} {SITE.name}. All rights reserved.
            </p>
            <p className="flex items-center gap-1 text-sm text-emerald-300">
              Made with <Heart className="h-4 w-4 text-terracotta fill-terracotta" /> in Rajanpur, Pakistan
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
