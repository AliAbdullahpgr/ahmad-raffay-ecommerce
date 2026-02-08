import { Footer } from "~/components/layout/Footer";
import { Navbar } from "~/components/layout/Navbar";
import { CONTACT, SITE } from "~/lib/constants";

export const metadata = {
  title: "Shipping Policy",
  description:
    "Shipping timelines, delivery coverage, and courier details for Ahmad Rafay Handwork.",
};

export default function ShippingPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream pt-16 md:pt-20">
        <section className="border-b border-cream-300 bg-white">
          <div className="container-custom py-10">
            <h1 className="font-serif text-3xl font-bold text-charcoal md:text-4xl">
              Shipping Policy
            </h1>
            <p className="mt-3 max-w-3xl text-charcoal-600">
              This policy explains how orders are processed and delivered across
              Pakistan for {SITE.name}.
            </p>
          </div>
        </section>

        <section className="container-custom py-10">
          <div className="space-y-8 rounded-2xl border border-cream-300 bg-white p-6 md:p-8">
            <div>
              <h2 className="text-xl font-semibold text-charcoal">
                Order Processing
              </h2>
              <p className="mt-2 text-charcoal-600">
                Orders are confirmed on WhatsApp and typically processed within 1
                to 2 business days.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-charcoal">
                Delivery Coverage & Time
              </h2>
              <p className="mt-2 text-charcoal-600">
                We deliver nationwide in Pakistan. Standard delivery usually takes
                2 to 5 business days after dispatch.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-charcoal">
                Shipping Charges
              </h2>
              <p className="mt-2 text-charcoal-600">
                Shipping charges are shared before order confirmation. If you use
                Google Merchant feed shipping attributes, keep this page and your
                feed/account shipping settings consistent.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-charcoal">
                Tracking and Support
              </h2>
              <p className="mt-2 text-charcoal-600">
                For delivery updates, message us on WhatsApp at {CONTACT.whatsapp}
                .
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
