import { cn } from "~/lib/utils";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  description?: string;
  className?: string;
  trend?: "up" | "down" | "neutral";
}

export function StatsCard({
  title,
  value,
  icon,
  description,
  className,
}: StatsCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-cream-300 p-6 shadow-sm",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-charcoal-500">{title}</p>
          <p className="mt-2 text-3xl font-bold text-charcoal">{value}</p>
          {description && (
            <p className="mt-1 text-sm text-charcoal-400">{description}</p>
          )}
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald/10 text-emerald">
          {icon}
        </div>
      </div>
    </div>
  );
}
