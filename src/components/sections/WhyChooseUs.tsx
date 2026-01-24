import { Hand, Banknote, Heart, Truck } from "lucide-react";
import { WHY_CHOOSE_US } from "~/lib/constants";

const iconMap: Record<string, React.ReactNode> = {
  Hand: <Hand className="h-8 w-8" />,
  Banknote: <Banknote className="h-8 w-8" />,
  Heart: <Heart className="h-8 w-8" />,
  Truck: <Truck className="h-8 w-8" />,
};

export function WhyChooseUs() {
  return (
    <section className="section bg-emerald text-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-medium uppercase tracking-wider text-gold mb-2">
            Our Promise
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Why Choose Us
          </h2>
          <p className="text-emerald-200 max-w-2xl mx-auto">
            We're committed to bringing you the finest handcrafted embroidery with 
            exceptional service
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
          {WHY_CHOOSE_US.map((item, index) => (
            <div
              key={index}
              className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center transition-all duration-300 hover:bg-white/20 hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/20 text-gold mb-4 transition-transform duration-300 group-hover:scale-110">
                {iconMap[item.icon]}
              </div>

              {/* Content */}
              <h3 className="font-serif text-xl font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-emerald-200 text-sm">
                {item.description}
              </p>

              {/* Decorative Corner */}
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-gold/30 rounded-tr-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
