import Link from "next/link";
import { Home, Search } from "lucide-react";
import { Navbar } from "~/components/layout/Navbar";
import { Footer } from "~/components/layout/Footer";
import { Button } from "~/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="pt-16 md:pt-20 min-h-screen bg-cream flex items-center justify-center">
        <div className="container-custom py-20 text-center">
          {/* 404 Number */}
          <div className="relative inline-block mb-8">
            <span className="text-[150px] md:text-[200px] font-serif font-bold text-emerald/10 leading-none">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <Search className="h-20 w-20 md:h-28 md:w-28 text-emerald" />
            </div>
          </div>

          {/* Message */}
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-charcoal mb-4">
            Page Not Found
          </h1>
          <p className="text-charcoal-500 max-w-md mx-auto mb-8">
            Oops! The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/">
              <Button variant="primary" size="lg">
                <Home className="h-5 w-5" />
                Back to Home
              </Button>
            </Link>
            <Link href="/gallery">
              <Button variant="outline" size="lg">
                Browse Collection
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
