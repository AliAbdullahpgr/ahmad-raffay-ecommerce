"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { SITE } from "~/lib/constants";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-bold text-emerald">
            {SITE.name}
          </h1>
          <p className="text-charcoal-500 mt-2">Admin Panel</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-cream-300 p-8">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-emerald/10 text-emerald mx-auto mb-6">
            <Lock className="h-8 w-8" />
          </div>

          <h2 className="text-xl font-semibold text-charcoal text-center mb-6">
            Sign in to your account
          </h2>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-terracotta/10 text-terracotta text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-charcoal-400 hover:text-charcoal"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-6"
              isLoading={isLoading}
            >
              Sign In
            </Button>
          </form>
        </div>

        {/* Back Link */}
        <p className="text-center mt-6 text-charcoal-500">
          <a href="/" className="text-emerald hover:underline">
            ← Back to website
          </a>
        </p>
      </div>
    </div>
  );
}
