"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "~/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  className,
  size = "md",
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizes = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-charcoal/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className={cn(
          "relative z-10 w-full mx-4 bg-white rounded-xl shadow-xl animate-fade-in",
          sizes[size],
          className
        )}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between border-b border-cream-300 px-6 py-4">
            <h2 className="font-serif text-xl font-semibold text-charcoal">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-charcoal-500 transition-colors hover:bg-cream-200 hover:text-charcoal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Close button when no title */}
        {!title && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-lg p-2 text-charcoal-500 transition-colors hover:bg-cream-200 hover:text-charcoal"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
