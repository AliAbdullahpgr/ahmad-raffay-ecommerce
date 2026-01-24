import { type TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "~/lib/utils";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="mb-1.5 block text-sm font-medium text-charcoal"
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          className={cn(
            "w-full rounded-lg border border-charcoal-200 bg-white px-4 py-2.5 text-charcoal placeholder:text-charcoal-400 focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/20 transition-all duration-200 resize-y min-h-[100px]",
            error && "border-terracotta focus:border-terracotta focus:ring-terracotta/20",
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-terracotta">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-charcoal-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
