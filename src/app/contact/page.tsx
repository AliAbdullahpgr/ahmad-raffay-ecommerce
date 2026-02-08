import Link from "next/link";
import { Footer } from "~/components/layout/Footer";
import { Navbar } from "~/components/layout/Navbar";
import { CONTACT, SITE } from "~/lib/constants";
import { getWhatsAppLink } from "~/lib/utils";

export const metadata = {
  title: "Contact",
  description:
    "Customer support and contact information for Ahmad Rafay Handwork.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream pt-16 md:pt-20">
        <section className="border-b border-cream-300 bg-white">
          <div className="container-custom py-10">
            <h1 className="font-serif text-3xl font-bold text-charcoal md:text-4xl">
              Contact Us
            </h1>
            <p className="mt-3 max-w-3xl text-charcoal-600">
              Reach {SITE.name} for product support, order questions, and return
              requests.
            </p>
          </div>
        </section>

        <section className="container-custom py-10">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-cream-300 bg-white p-6">
              <h2 className="text-xl font-semibold text-charcoal">WhatsApp</h2>
              <p className="mt-2 text-charcoal-600">{CONTACT.whatsapp}</p>
              <a
                href={getWhatsAppLink(CONTACT.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-emerald hover:underline"
              >
                Message on WhatsApp
              </a>
            </div>

            <div className="rounded-2xl border border-cream-300 bg-white p-6">
              <h2 className="text-xl font-semibold text-charcoal">
                Social Channels
              </h2>
              <p className="mt-2 text-charcoal-600">
                Instagram:{" "}
                <a
                  href={CONTACT.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald hover:underline"
                >
                  {CONTACT.instagram}
                </a>
              </p>
              <p className="mt-2 text-charcoal-600">
                Facebook:{" "}
                <a
                  href={CONTACT.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald hover:underline"
                >
                  {CONTACT.facebook}
                </a>
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-cream-300 bg-white p-6">
            <h2 className="text-xl font-semibold text-charcoal">
              Helpful Links
            </h2>
            <ul className="mt-3 space-y-2 text-charcoal-600">
              <li>
                <Link href="/shipping-policy" className="text-emerald hover:underline">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/return-policy" className="text-emerald hover:underline">
                  Return & Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
