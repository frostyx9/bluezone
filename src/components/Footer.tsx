import { guides } from "../data/guides";
import { Icon } from "./Icons";
import { Container } from "./ui";

interface FooterProps {
  onHome: (anchor?: string) => void;
  onOpenGuide: (slug: string) => void;
}

export function Footer({ onHome, onOpenGuide }: FooterProps) {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink-soft">
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-[0.12]" aria-hidden="true" />
      <Container className="relative py-12 sm:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <button type="button" onClick={() => onHome("top")} className="group flex items-center gap-3 text-left">
              <span className="flex h-9 w-9 items-center justify-center border border-gold/50 bg-gold/10 text-gold">
                <Icon name="crosshair" className="h-5 w-5" />
              </span>
              <span className="leading-none">
                <span className="block font-display text-[21px] font-semibold uppercase tracking-[0.08em] text-bone">Bluezone</span>
                <span className="mt-1 block font-mono text-[8px] uppercase tracking-[0.28em] text-smoke">PUBG setup guide</span>
              </span>
            </button>
            <p className="mt-5 max-w-sm text-[13px] leading-relaxed text-smoke">
              Тактические гайды по настройкам PUBG для ПК. Собираем настройки в понятную систему, чтобы решения в матче были быстрее.
            </p>
            <div className="mt-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-smoke/80">
              <span className="h-1.5 w-1.5 rounded-full bg-signal pulse-dot" aria-hidden="true" />
              На связи в Telegram
            </div>
          </div>

          <div className="md:col-span-4 md:col-start-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">Разделы</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
              {guides.map((guide) => (
                <li key={guide.slug}>
                  <button
                    type="button"
                    onClick={() => onOpenGuide(guide.slug)}
                    className="group flex items-center gap-2 text-left text-[13px] text-smoke transition-colors hover:text-gold"
                  >
                    <span className="font-mono text-[9px] text-smoke/50">{guide.index}</span>
                    {guide.title}
                  </button>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => onHome("faq")}
                  className="flex items-center gap-2 text-left text-[13px] text-smoke transition-colors hover:text-gold"
                >
                  <span className="font-mono text-[9px] text-smoke/50">06</span>
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">Контакт</p>
            <a
              href="https://t.me/maksimus_huperty"
              target="_blank"
              rel="noreferrer noopener"
              className="mt-4 inline-flex items-center gap-2 border-b border-gold/40 pb-1 font-mono text-[11px] text-bone transition-colors hover:border-gold hover:text-gold"
            >
              <Icon name="telegram" className="h-4 w-4 text-gold" />
              @maksimus_huperty
            </a>
            <p className="mt-4 text-[11px] leading-relaxed text-smoke/70">Единственный канал связи. Пишите по делу — отвечу.</p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-smoke/60">© {new Date().getFullYear()} BLUEZONE · Fan-made project</p>
          <p className="max-w-2xl font-mono text-[9px] leading-relaxed tracking-[0.04em] text-smoke/45">
            Независимый фан-проект. Не связан с Krafton, Inc., PUBG Corporation или Tencent. PUBG и связанные обозначения принадлежат их правообладателям.
          </p>
        </div>
      </Container>

      <div className="pointer-events-none select-none overflow-hidden border-t border-line/40" aria-hidden="true">
        <p className="-mb-3 mt-4 whitespace-nowrap text-center font-display text-[clamp(4rem,15vw,13rem)] font-bold uppercase leading-[0.8] tracking-tight text-bone/[0.035] sm:-mb-6">
          BLUEZONE · TACTICAL
        </p>
      </div>
    </footer>
  );
}
