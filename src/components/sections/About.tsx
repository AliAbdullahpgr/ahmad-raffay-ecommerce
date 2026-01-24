import Image from "next/image";

export function About() {
  return (
    <section id="about" className="section bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/rajanpur.jpg"
                alt="Artisan creating hand embroidery in Rajanpur"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gold/20 rounded-2xl -z-10" />
            <div className="absolute -top-6 -left-6 w-32 h-32 border-4 border-emerald/20 rounded-2xl -z-10" />

            {/* Experience Badge */}
            <div className="absolute bottom-8 -right-4 lg:right-8 bg-white rounded-xl shadow-lg p-4 text-center">
              <span className="block text-3xl font-bold text-emerald">5+</span>
              <span className="text-sm text-charcoal-500">Years of<br />Craftsmanship</span>
            </div>
          </div>

          {/* Content Side */}
          <div>
            <span className="inline-block text-sm font-medium uppercase tracking-wider text-gold mb-2">
              Our Story
            </span>
            <h2 className="section-title mb-6">
              From Rajanpur<br />
              <span className="text-emerald">With Love</span>
            </h2>

            <div className="space-y-4 text-charcoal-600">
              <p>
                Deep in the heart of Rajanpur lies a tradition of embroidery that has been 
                passed down through generations. At Ahmad Rafay Handwork, we carry forward 
                this beautiful legacy, bringing you authentic hand-embroidered pieces that 
                tell a story of dedication and artistry.
              </p>
              <p>
                Every stitch in our collection is made by skilled artisans who have 
                mastered their craft over decades. We believe that every woman deserves 
                beautiful traditional wear without breaking the bank – that's why we offer 
                quality embroidery at honest, fair prices.
              </p>
              <p>
                From classic motifs to contemporary designs, each piece reflects the rich 
                cultural heritage of our region while meeting modern-day elegance. When you 
                wear our creations, you wear a piece of history, handcrafted just for you.
              </p>
            </div>

            {/* Values */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-cream rounded-xl">
                <span className="block text-2xl font-bold text-emerald">100%</span>
                <span className="text-sm text-charcoal-500">Handmade</span>
              </div>
              <div className="text-center p-4 bg-cream rounded-xl">
                <span className="block text-2xl font-bold text-emerald">Fair</span>
                <span className="text-sm text-charcoal-500">Prices</span>
              </div>
              <div className="text-center p-4 bg-cream rounded-xl">
                <span className="block text-2xl font-bold text-emerald">PK</span>
                <span className="text-sm text-charcoal-500">Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
