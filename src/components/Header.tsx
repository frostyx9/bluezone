import { useEffect, useState } from "react";
import { guides } from "../data/guides";
import { cn } from "../utils/cn";
import { Icon } from "./Icons";
import { ActionLink, Container } from "./ui";

interface HeaderProps {
  overGuide?: boolean;
  onHome: (anchor?: string) => void;
  onOpenGuide: (slug: string) => void;
}

const navItems = [
  { label: "Главная", anchor: "top" },
  { label: "Гайды", anchor: "categories" },
  { label: "Быстрый старт", anchor: "quickstart" },
  { label: "FAQ", anchor: "faq" },
];

export function Header({ overGuide, onHome, onOpenGuide }: HeaderProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 1024) setOpen(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const go = (anchor: string) => {
    setOpen(false);
    onHome(anchor);
  };

  return (
    <>
      <div className="hidden border-b border-line/70 bg-ink-soft md:block">
        <Container className="flex h-8 items-center justify-between">
          <div className="flex items-center gap-5">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-smoke">ПК-настройки · актуальная база</span>
            <span className="h-3 w-px bg-line-bright" aria-hidden="true" />
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-smoke">5 направлений · 3 профиля</span>
          </div>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-smoke/70">Fan-made tactical guide</span>
        </Container>
      </div>

      <header className="sticky top-0 z-50 border-b border-line/80 bg-ink/95 backdrop-blur-md">
        <Container className="flex h-[66px] items-center justify-between gap-5">
          <button type="button" onClick={() => go("top")} className="group flex items-center gap-3 text-left" aria-label="BLUEZONE — на главную">
            <span className="relative flex h-9 w-9 items-center justify-center border border-gold/50 bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-ink">
              <Icon name="crosshair" className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 h-1.5 w-1.5 bg-gold transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </span>
            <span className="leading-none">
              <span className="block font-display text-[21px] font-semibold uppercase tracking-[0.08em] text-bone">Bluezone</span>
              <span className="mt-1 block font-mono text-[8px] uppercase tracking-[0.28em] text-smoke">PUBG setup guide</span>
            </span>
          </button>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Основная навигация">
            {navItems.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => go(item.anchor)}
                className={cn(
                  "relative px-4 py-2.5 font-display text-[12px] font-medium uppercase tracking-[0.13em] transition-colors",
                  overGuide ? "text-smoke hover:text-gold" : "text-bone/85 hover:text-gold",
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <ActionLink
              href="https://t.me/maksimus_huperty"
              target="_blank"
              rel="noreferrer noopener"
              variant="primary"
              className="hidden py-2.5 sm:inline-flex"
              icon={<Icon name="arrowUpRight" className="h-3.5 w-3.5" />}
            >
              <Icon name="telegram" className="mr-0.5 h-4 w-4" />
              Telegram
            </ActionLink>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-label={open ? "Закрыть меню" : "Открыть меню"}
              className="flex h-10 w-10 items-center justify-center border border-line-bright text-bone transition-colors hover:border-gold hover:text-gold lg:hidden"
            >
              <Icon name={open ? "close" : "menu"} className="h-5 w-5" />
            </button>
          </div>
        </Container>

        {open ? (
          <div className="border-t border-line bg-ink lg:hidden">
            <Container className="py-5">
              <div className="grid gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => go(item.anchor)}
                    className="flex items-center justify-between border-b border-line/70 py-3 text-left font-display text-lg uppercase tracking-wide text-bone transition-colors hover:text-gold"
                  >
                    {item.label}
                    <Icon name="arrowRight" className="h-4 w-4 text-smoke" />
                  </button>
                ))}
              </div>
              <p className="mb-2 mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">Разделы настроек</p>
              <div className="grid grid-cols-2 gap-1.5">
                {guides.map((guide) => (
                  <button
                    key={guide.slug}
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      onOpenGuide(guide.slug);
                    }}
                    className="flex items-center gap-2 border border-line bg-panel px-3 py-2.5 text-left text-[12px] text-bone transition-colors hover:border-gold/50 hover:text-gold"
                  >
                    <Icon name={guide.slug} className="h-4 w-4 shrink-0 text-gold" />
                    <span className="truncate">{guide.title}</span>
                  </button>
                ))}
              </div>
              <ActionLink
                href="https://t.me/maksimus_huperty"
                target="_blank"
                rel="noreferrer noopener"
                variant="primary"
                icon={<Icon name="arrowUpRight" className="h-4 w-4" />}
                className="mt-5 w-full"
              >
                <Icon name="telegram" className="h-4 w-4" />
                @maksimus_huperty
              </ActionLink>
            </Container>
          </div>
        ) : null}
      </header>
    </>
  );
}
