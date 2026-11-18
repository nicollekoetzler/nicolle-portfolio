import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export function Panel({
  title,
  eyebrow,
  action,
  children,
  className,
  bodyClassName,
  ai,
}: {
  title?: ReactNode;
  eyebrow?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  ai?: boolean;
}) {
  return (
    <section
      className={cn(
        "relative rounded-lg border border-line bg-surface",
        ai && "before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-accent/40 before:to-transparent",
        className,
      )}
    >
      {(title || eyebrow || action) && (
        <header className="flex items-start justify-between gap-4 border-b border-line px-5 py-4">
          <div className="min-w-0">
            {eyebrow && <div className="mb-1.5">{eyebrow}</div>}
            {title && <h2 className="text-[14px] font-medium tracking-[-0.01em] text-fg">{title}</h2>}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </header>
      )}
      <div className={cn("p-5", bodyClassName)}>{children}</div>
    </section>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {eyebrow && <div className="label mb-3">{eyebrow}</div>}
        <h1 className="text-[26px] font-semibold leading-[1.15] tracking-[-0.025em] text-fg md:text-[30px]">{title}</h1>
        {description && <p className="mt-2.5 text-[14px] leading-relaxed text-fg-2">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
    </div>
  );
}
