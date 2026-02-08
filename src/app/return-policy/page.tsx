import { Footer } from "~/components/layout/Footer";
import { Navbar } from "~/components/layout/Navbar";
import { CONTACT, SITE } from "~/lib/constants";

export const metadata = {
  title: "Return & Refund Policy",
  description:
    "Return window, eligibility rules, and refund timeline for Ahmad Rafay Handwork orders.",
};

export default function ReturnPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream pt-16 md:pt-20">
        <section className="border-b border-cream-300 bg-white">
          <div className="container-custom py-10">
            <h1 className="font-serif text-3xl font-bold text-charcoal md:text-4xl">
              Return & Refund Policy
            </h1>
            <p className="mt-3 max-w-3xl text-charcoal-600">
              This policy describes how returns and refunds are handled for{" "}
              {SITE.name}.
            </p>
          </div>
        </section>

        <section className="container-custom py-10">
          <div className="space-y-8 rounded-2xl border border-cream-300 bg-white p-6 md:p-8">
            <div>
              <h2 className="text-xl font-semibold text-charcoal">
                Return Window
              </h2>
              <p className="mt-2 text-charcoal-600">
                Returns are accepted within 7 calendar days of delivery.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-charcoal">
                Return Eligibility
              </h2>
              <p className="mt-2 text-charcoal-600">
                Items must be unused, unwashed, and in original condition.
                Customized orders may not be eligible unless the item arrives
                damaged or incorrect.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-charcoal">
                Return Method
              </h2>
              <p className="mt-2 text-charcoal-600">
                Contact us on WhatsApp at {CONTACT.whatsapp} to start a return.
                We will share the return address and courier instructions.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-charcoal">
                Refund Timeline
              </h2>
              <p className="mt-2 text-charcoal-600">
                After the returned item is received and approved, refunds are
                processed within 5 business days.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
