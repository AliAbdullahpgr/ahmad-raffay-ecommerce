import { Search, MessageCircle, Package } from "lucide-react";
import { ORDER_STEPS, CONTACT } from "~/lib/constants";
import { getWhatsAppLink } from "~/lib/utils";

const iconMap: Record<string, React.ReactNode> = {
  Search: <Search className="h-6 w-6" />,
  MessageCircle: <MessageCircle className="h-6 w-6" />,
  Package: <Package className="h-6 w-6" />,
};

export function HowToOrder() {
  return (
    <section id="contact" className="section bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-medium uppercase tracking-wider text-gold mb-2">
            Simple Process
          </span>
          <h2 className="section-title">How to Order</h2>
          <p className="section-subtitle">
            Getting your beautiful handcrafted pieces is easy – just follow these simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-emerald/20 hidden md:block" style={{ transform: 'translateY(-50%)' }} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {ORDER_STEPS.map((step, index) => (
              <div key={index} className="relative text-center">
                {/* Step Number */}
                <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald text-white mb-4 shadow-lg z-10">
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gold text-charcoal text-sm font-bold flex items-center justify-center">
                    {step.step}
                  </span>
                  {iconMap[step.icon]}
                </div>

                {/* Content */}
                <h3 className="font-serif text-xl font-semibold text-charcoal mb-2">
                  {step.title}
                </h3>
                <p className="text-charcoal-500">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={getWhatsAppLink(CONTACT.whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-[#128C7E] shadow-lg hover:shadow-xl"
          >
            <MessageCircle className="h-5 w-5" fill="currentColor" />
            Message on WhatsApp
          </a>
          <a
            href={CONTACT.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 px-6 py-3 font-medium text-white transition-all duration-200 hover:from-purple-700 hover:to-pink-600 shadow-lg hover:shadow-xl"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Follow on Instagram
          </a>
          <a
            href={CONTACT.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1877F2] px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-[#166FE5] shadow-lg hover:shadow-xl"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Like on Facebook
          </a>
        </div>
      </div>
    </section>
  );
}
