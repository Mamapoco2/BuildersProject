import { cn } from "../../lib/utils";

export default function SectionHeader({
  eyebrow,
  title,
  accent,
  subtitle,
  center = true,
  className,
}) {
  return (
    <div className={cn("space-y-4", center && "text-center", className)}>
      {eyebrow && (
        <div
          className={cn(
            "inline-flex items-center gap-2 text-red-500",
            center && "justify-center",
          )}
        >
          <div className="h-px w-8 bg-red-500" />
          <span className="font-heading font-semibold text-sm tracking-widest uppercase">
            {eyebrow}
          </span>
          {center && <div className="h-px w-8 bg-red-500" />}
        </div>
      )}
      <h2 className="font-heading font-bold text-5xl lg:text-6xl text-white leading-tight">
        {title} {accent && <span className="text-stroke">{accent}</span>}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-stone-400 text-lg leading-relaxed",
            center && "max-w-2xl mx-auto",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
