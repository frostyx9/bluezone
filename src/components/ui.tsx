import {
  useEffect,
  useRef,
  useState,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../utils/cn";
import { copyToClipboard } from "../utils/clipboard";
import { GuideArt, Icon } from "./Icons";
import type { Guide } from "../data/guides";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[1320px] px-5 sm:px-8", className)}>{children}</div>;
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="h-px w-7 shrink-0 bg-gold sm:w-9" aria-hidden="true" />
      <span className="hud-label text-gold">{children}</span>
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  aside,
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("border-b border-line pb-7", className)}>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-[2rem] font-semibold uppercase leading-[0.98] tracking-[0.005em] text-bone sm:text-[2.6rem] lg:text-[3rem]">
            {title}
          </h2>
          {description ? <p className="mt-4 max-w-2xl text-sm leading-relaxed text-smoke sm:text-[15px]">{description}</p> : null}
        </div>
        {aside ? <div className="shrink-0">{aside}</div> : null}
      </div>
    </div>
  );
}

type Variant = "primary" | "outline" | "dark";

const buttonBase =
  "clip-button group inline-flex items-center justify-center gap-2.5 px-5 py-3 font-display text-[13px] font-semibold uppercase tracking-[0.13em] transition-colors duration-200 select-none";

const variants: Record<Variant, string> = {
  primary: "bg-gold text-ink hover:bg-gold-bright",
  outline: "border border-line-bright bg-transparent text-bone hover:border-gold hover:bg-gold hover:text-ink",
  dark: "border border-line bg-panel text-bone hover:border-line-bright hover:bg-panel-3",
};

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  icon?: ReactNode;
}

export function ActionButton({ variant = "primary", icon, className, children, ...props }: ActionButtonProps) {
  return (
    <button className={cn(buttonBase, variants[variant], className)} {...props}>
      {children}
      {icon}
    </button>
  );
}

export function ActionLink({
  variant = "outline",
  icon,
  className,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant; icon?: ReactNode }) {
  return (
    <a className={cn(buttonBase, variants[variant], className)} {...props}>
      {children}
      {icon}
    </a>
  );
}

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "clip-tag inline-flex items-center border border-line bg-panel px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-smoke",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function CopyButton({
  text,
  label = "Скопировать",
  copiedLabel = "Скопировано",
  variant = "outline",
  className,
}: {
  text: string;
  label?: string;
  copiedLabel?: string;
  variant?: Variant;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  async function handleCopy() {
    const success = await copyToClipboard(text);
    if (!success) return;
    setCopied(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2200);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-live="polite"
      className={cn(
        buttonBase,
        copied ? "border border-signal/60 bg-signal/10 text-signal" : variants[variant],
        className,
      )}
    >
      <Icon name={copied ? "check" : "copy"} className="h-4 w-4" />
      {copied ? copiedLabel : label}
    </button>
  );
}

export function KeyCap({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex min-h-7 items-center justify-center border border-line-bright bg-ink px-2 py-1 font-mono text-[11px] font-medium uppercase tracking-wide text-bone shadow-[0_2px_0_#000]">
      {children}
    </span>
  );
}

export function GuideCard({ guide, featured, onOpen }: { guide: Guide; featured?: boolean; onOpen: (slug: string) => void }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(guide.slug)}
      aria-label={`Открыть гайд: ${guide.title}`}
      className={cn(
        "clip-corner group relative flex h-full w-full flex-col overflow-hidden border border-line bg-panel p-5 text-left transition-all duration-300 hover:border-gold/45 hover:bg-panel-2 sm:p-6",
        featured ? "min-h-[300px] sm:min-h-[330px]" : "min-h-[280px]",
      )}
    >
      <span className="absolute inset-x-0 top-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-3 top-3 w-[190px] text-gold opacity-[0.5] transition-opacity duration-300 group-hover:opacity-80 sm:right-0 sm:top-6">
        <GuideArt slug={guide.slug} className="h-auto w-full" />
      </div>

      <div className="relative z-10 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center border border-line-bright bg-ink-soft text-gold transition-colors group-hover:border-gold/50">
            <Icon name={guide.slug} className="h-5 w-5" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">/{guide.index}</span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-smoke/80">{guide.kicker}</span>
      </div>

      <div className="relative z-10 mt-auto pt-14">
        <h3 className={cn("font-display font-semibold uppercase leading-none tracking-tight text-bone", featured ? "text-[2rem] sm:text-[2.4rem]" : "text-[1.75rem]")}>
          {guide.title}
        </h3>
        <p className="mt-3 max-w-[330px] text-[13px] leading-relaxed text-smoke">{guide.short}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {guide.chips.slice(0, featured ? 4 : 3).map((chip) => (
            <Tag key={chip}>{chip}</Tag>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-line/70 pt-3.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-smoke">{guide.readTime}</span>
          <span className="inline-flex items-center gap-2 font-display text-[11px] font-semibold uppercase tracking-[0.15em] text-gold">
            Открыть гайд
            <Icon name="arrowRight" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </button>
  );
}

export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="group flex w-full items-center justify-between gap-5 py-5 text-left"
            >
              <span className="flex items-start gap-4">
                <span className="mt-1 font-mono text-[10px] tracking-[0.16em] text-gold">{String(index + 1).padStart(2, "0")}</span>
                <span className={cn("font-display text-[17px] uppercase leading-snug tracking-wide transition-colors sm:text-[19px]", isOpen ? "text-gold" : "text-bone group-hover:text-gold")}>
                  {item.q}
                </span>
              </span>
              <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center border transition-all duration-300", isOpen ? "rotate-180 border-gold bg-gold text-ink" : "border-line-bright text-smoke group-hover:border-gold group-hover:text-gold")}>
                <Icon name="chevronDown" className="h-4 w-4" />
              </span>
            </button>
            <div className={cn("grid transition-all duration-300 ease-out", isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
              <div className="overflow-hidden">
                <p className="max-w-3xl pb-6 pl-8 pr-4 text-sm leading-relaxed text-smoke">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function Checklist({ items, storageKey }: { items: string[]; storageKey: string }) {
  const [checked, setChecked] = useState<boolean[]>(() => items.map(() => false));

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(`bz-check-${storageKey}`);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length === items.length) {
        setChecked(parsed.map(Boolean));
      }
    } catch {
      // ignore unavailable storage
    }
  }, [items.length, storageKey]);

  function toggle(index: number) {
    setChecked((previous) => {
      const next = previous.map((value, i) => (i === index ? !value : value));
      try {
        window.localStorage.setItem(`bz-check-${storageKey}`, JSON.stringify(next));
      } catch {
        // ignore unavailable storage
      }
      return next;
    });
  }

  function reset() {
    const next = items.map(() => false);
    setChecked(next);
    try {
      window.localStorage.removeItem(`bz-check-${storageKey}`);
    } catch {
      // ignore unavailable storage
    }
  }

  const done = checked.filter(Boolean).length;
  const percent = Math.round((done / items.length) * 100);

  return (
    <div className="border border-line bg-panel">
      <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center border border-gold/40 bg-gold/10 text-gold">
            <Icon name="shield" className="h-4 w-4" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-smoke">Чек-лист</span>
        </div>
        <span className="font-mono text-[11px] text-gold">
          {done} / {items.length}
        </span>
      </div>
      <div className="flex gap-[3px] px-5 pt-3" aria-hidden="true">
        {items.map((item, index) => (
          <span key={item} className={cn("h-1 flex-1 transition-colors", checked[index] ? "bg-gold" : "bg-line")} />
        ))}
      </div>
      <ul className="space-y-0 px-2 py-2 sm:px-3">
        {items.map((item, index) => (
          <li key={item}>
            <button
              type="button"
              role="checkbox"
              aria-checked={checked[index]}
              onClick={() => toggle(index)}
              className="group flex w-full items-start gap-3 px-2 py-3 text-left"
            >
              <span
                className={cn(
                  "mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center border transition-colors",
                  checked[index] ? "border-gold bg-gold text-ink" : "border-line-bright bg-ink text-transparent group-hover:border-gold/60",
                )}
              >
                <Icon name="check" className="h-3 w-3" />
              </span>
              <span className={cn("text-[13px] leading-relaxed transition-colors", checked[index] ? "text-smoke line-through decoration-line-bright" : "text-bone/90 group-hover:text-bone")}>
                {item}
              </span>
            </button>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between gap-4 border-t border-line px-5 py-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-smoke">Готовность профиля: {percent}%</span>
        <button type="button" onClick={reset} className="font-mono text-[10px] uppercase tracking-[0.12em] text-smoke underline-offset-4 transition-colors hover:text-gold hover:underline">
          Сбросить
        </button>
      </div>
    </div>
  );
}

export function ContactCard({ compact = false }: { compact?: boolean }) {
  return (
    <div className={cn("clip-corner border border-gold/30 bg-gold/[0.045] p-5", compact && "p-4")}>
      <div className="flex items-center gap-2.5">
        <span className="h-1.5 w-1.5 rounded-full bg-signal pulse-dot" aria-hidden="true" />
        <span className="hud-label text-signal">Канал связи</span>
      </div>
      <p className={cn("mt-3 font-display uppercase leading-tight text-bone", compact ? "text-lg" : "text-xl")}>
        Нужен разбор под свой сетап?
      </p>
      <p className="mt-2 text-xs leading-relaxed text-smoke">
        Напишите в Telegram — обсудим чувствительность, железо и ваш стиль игры.
      </p>
      <ActionLink
        href="https://t.me/maksimus_huperty"
        target="_blank"
        rel="noreferrer noopener"
        variant="primary"
        icon={<Icon name="arrowUpRight" className="h-4 w-4" />}
        className="mt-4 w-full justify-between px-4 py-2.5 text-[11px]"
      >
        <span className="flex items-center gap-2">
          <Icon name="telegram" className="h-4 w-4" />
          @maksimus_huperty
        </span>
      </ActionLink>
    </div>
  );
}
