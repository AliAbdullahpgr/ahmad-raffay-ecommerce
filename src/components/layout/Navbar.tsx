"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "~/lib/constants";
import { cn } from "~/lib/utils";
import { WhatsAppButton } from "~/components/ui/WhatsAppButton";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-cream/95 backdrop-blur-sm border-b border-cream-300">
      <nav className="container-custom">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-xl font-bold text-emerald md:text-2xl"
          >
            Ahmad Rafay
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-charcoal-600 font-medium transition-colors hover:text-emerald"
              >
                {link.label}
              </Link>
            ))}
            <WhatsAppButton variant="icon" size="sm" />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-charcoal"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300",
            isOpen ? "max-h-96 pb-4" : "max-h-0"
          )}
        >
          <div className="flex flex-col gap-4 pt-4 border-t border-cream-300">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-charcoal-600 font-medium transition-colors hover:text-emerald py-2"
              >
                {link.label}
              </Link>
            ))}
            <WhatsAppButton className="w-full justify-center" />
          </div>
        </div>
      </nav>
    </header>
  );
}
