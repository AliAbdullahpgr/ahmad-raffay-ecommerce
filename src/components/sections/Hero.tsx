import Link from "next/link";
import { ChevronRight, MessageCircle } from "lucide-react";
import { Button } from "~/components/ui/Button";
import { WhatsAppButton } from "~/components/ui/WhatsAppButton";
import { SITE } from "~/lib/constants";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-pattern bg-cream overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-bl from-emerald/5 to-transparent rounded-full" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-gold/5 to-transparent rounded-full" />
      </div>

      {/* Embroidery Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="embroidery" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M30 5 L35 15 L45 15 L37 22 L40 32 L30 26 L20 32 L23 22 L15 15 L25 15 Z" fill="#1B4D3E" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#embroidery)" />
        </svg>
      </div>

      <div className="container-custom relative z-10 text-center px-4 py-20 md:py-32">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald/10 px-4 py-2 mb-6 animate-fade-in">
          <span className="h-2 w-2 rounded-full bg-emerald animate-pulse" />
          <span className="text-sm font-medium text-emerald">Handcrafted with Love</span>
        </div>

        {/* Main Heading */}
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-charcoal mb-4 animate-fade-in-up">
          <span className="text-emerald">{SITE.name.split(" ")[0]}</span>{" "}
          <span className="text-emerald">{SITE.name.split(" ")[1]}</span>{" "}
          <span className="text-gold">{SITE.name.split(" ")[2]}</span>
        </h1>

        {/* Tagline */}
        <p className="font-serif text-xl md:text-2xl text-charcoal-600 mb-4 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          {SITE.tagline}
        </p>

        {/* Description */}
        <p className="text-charcoal-500 max-w-2xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          Traditional hand-embroidered shirts & trousers from Rajanpur. 
          Every piece is crafted with dedication by skilled artisans, 
          bringing you authentic Pakistani craftsmanship at honest prices.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <Link href="/gallery?category=shirts">
            <Button variant="primary" size="lg">
              Shop Shirts
              <ChevronRight className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/gallery?category=trousers">
            <Button variant="outline" size="lg">
              Shop Trousers
              <ChevronRight className="h-5 w-5" />
            </Button>
          </Link>
          <WhatsAppButton className="sm:ml-2" />
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 md:gap-12 text-charcoal-500 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-emerald">100%</span>
            <span className="text-sm">Handmade</span>
          </div>
          <div className="h-8 w-px bg-charcoal-200 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-emerald">500+</span>
            <span className="text-sm">Happy Customers</span>
          </div>
          <div className="h-8 w-px bg-charcoal-200 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-emerald">COD</span>
            <span className="text-sm">Available</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-emerald/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-emerald rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
