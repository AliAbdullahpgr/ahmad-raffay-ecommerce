"use client";

import { MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "~/lib/utils";
import { CONTACT } from "~/lib/constants";
import { cn } from "~/lib/utils";

interface WhatsAppButtonProps {
  productName?: string;
  className?: string;
  variant?: "fixed" | "inline" | "icon";
  size?: "sm" | "md" | "lg";
}

export function WhatsAppButton({
  productName,
  className,
  variant = "inline",
  size = "md",
}: WhatsAppButtonProps) {
  const link = getWhatsAppLink(CONTACT.whatsapp, productName);

  const sizes = {
    sm: "p-2",
    md: "p-3",
    lg: "p-4",
  };

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  if (variant === "fixed") {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-[#128C7E] hover:shadow-xl",
          sizes.lg,
          className
        )}
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className={iconSizes.lg} fill="currentColor" />
      </a>
    );
  }

  if (variant === "icon") {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "inline-flex items-center justify-center rounded-full bg-[#25D366] text-white transition-all duration-200 hover:bg-[#128C7E]",
          sizes[size],
          className
        )}
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className={iconSizes[size]} fill="currentColor" />
      </a>
    );
  }

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-2.5 font-medium text-white transition-all duration-200 hover:bg-[#128C7E]",
        className
      )}
    >
      <MessageCircle className="h-5 w-5" fill="currentColor" />
      <span>WhatsApp</span>
    </a>
  );
}
