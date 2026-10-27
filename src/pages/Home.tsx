import { faqItems, guides, quickProfile, telegramUrl } from "../data/guides";
import { Icon } from "../components/Icons";
import {
  Accordion,
  ActionLink,
  Container,
  CopyButton,
  Eyebrow,
  GuideCard,
  SectionHeading,
  Tag,
} from "../components/ui";

interface HomeProps {
  onOpenGuide: (slug: string) => void;
}

const quickProfileText = `СТАРТОВЫЙ ПРОФИЛЬ BLUEZONE — PUBG (PC)
Мышь: 800 DPI · общая 42 · ADS 42
Камера: FOV 96 · удержание ADS
Графика: FPS-пресет · AA ультра · VSync выкл · масштаб рендера 100
Звук: общая 60 · эффекты 100 · музыка 0 · HRTF вкл
Бинды: F — взаимодействие, C — присесть, Z — лечь, Q/E — наклоны

Источник: BLUEZONE · Telegram @maksimus_huperty`;

const tickerItems = ["Бинды", "Чувствительность", "Настройки камеры", "Настройки графики", "Настройки звука"];

const steps = [
  {
    index: "01",
    icon: "target" as const,
    title: "Зафиксируйте базу",
    text: "Возьмите стартовый профиль и не меняйте больше одного параметра за раз. База нужна, чтобы было с чем сравнивать.",
  },
  {
    index: "02",
    icon: "refresh" as const,
    title: "Проверьте в тренировке",
    text: "15 минут на контроль отдачи, прицелы и наклоны. Настройки должны работать в стрессовой ситуации, а не только в меню.",
  },
  {
    index: "03",
    icon: "shield" as const,
    title: "Закрепите результат",
    text: "Нашли рабочую комбинацию — не трогайте её неделю. Мышечная память важнее идеальных цифр из чужого гайда.",
  },
];

export function Home({ onOpenGuide }: HomeProps) {
  return (
    <main>
      {/* ---------------------------------- HERO ---------------------------------- */}
      <section className="relative isolate overflow-hidden border-b border-line">
        <div className="absolute inset-0 -z-10">
          <img
            src="/images/hero.jpg"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover object-[68%_center] opacity-80"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />
          <div className="absolute inset-0 grid-lines opacity-[0.18]" />
        </div>

        <Container className="relative">
          <div className="grid min-h-[590px] items-stretch gap-8 py-12 sm:min-h-[650px] sm:py-16 lg:grid-cols-[1.15fr_0.55fr]">
            <div className="flex max-w-[760px] flex-col justify-center">
              <div className="reveal">
                <Eyebrow>ПК · Настройки · практика</Eyebrow>
              </div>
              <h1 className="reveal reveal-delay-1 mt-6 font-display text-[clamp(3.35rem,7.6vw,6.5rem)] font-bold uppercase leading-[0.88] tracking-[-0.015em] text-bone">
                Настрой
                <br />
                под себя
                <br />
                <span className="inline-flex items-end gap-3 sm:gap-4">
                  Побеждай
                  <span
                    aria-hidden="true"
                    className="mb-[0.12em] inline-block h-[0.17em] w-[0.17em] shrink-0 bg-gold shadow-[0_0_24px_rgba(242,184,37,0.45)]"
                  />
                </span>
              </h1>
              <p className="reveal reveal-delay-2 mt-6 max-w-[540px] text-[14px] leading-relaxed text-smoke sm:text-[15px]">
                Пять направлений настроек PUBG, собранных в одну систему. Без магических цифр и копирования вслепую — только
                проверенная база, профили и понятные объяснения.
              </p>

              <div className="reveal reveal-delay-3 mt-8 flex flex-col gap-2.5 sm:flex-row">
                <ActionLink href="#categories" variant="primary" className="justify-between sm:min-w-[210px]">
                  Выбрать гайд
                  <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </ActionLink>
                <ActionLink
                  href={telegramUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  variant="outline"
                  className="justify-between sm:min-w-[235px]"
                >
                  <Icon name="telegram" className="h-4 w-4" />
                  Написать в Telegram
                </ActionLink>
              </div>

              <div className="reveal reveal-delay-3 mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-line/80 pt-5">
                {[
                  ["05", "направлений"],
                  ["70+", "параметров"],
                  ["03", "профиля"],
                ].map(([value, label]) => (
                  <div key={label} className="flex items-baseline gap-2">
                    <span className="font-display text-2xl font-semibold leading-none text-gold">{value}</span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-smoke">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative hidden items-end justify-end pb-2 lg:flex">
              <div className="absolute right-0 top-8 hidden xl:block">
                <span className="hud-label [writing-mode:vertical-rl]">Scroll to deploy · 001</span>
              </div>
              <div className="relative w-full max-w-[280px] border border-line-bright bg-ink/75 backdrop-blur-md">
                <span className="absolute -left-px -top-px h-4 w-4 border-l-2 border-t-2 border-gold" aria-hidden="true" />
                <span className="absolute -bottom-px -right-px h-4 w-4 border-b-2 border-r-2 border-gold" aria-hidden="true" />
                <div className="flex items-center justify-between border-b border-line px-4 py-3">
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-smoke">Operative setup</span>
                  <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-signal">
                    <span className="h-1.5 w-1.5 rounded-full bg-signal pulse-dot" aria-hidden="true" />
                    live
                  </span>
                </div>
                <div className="relative overflow-hidden px-4 py-4">
                  <Icon name="crosshair" className="absolute -right-5 -top-4 h-24 w-24 text-gold/[0.08]" />
                  <div className="relative space-y-3">
                    {[
                      ["Профиль", "Универсальный"],
                      ["Поле зрения", "96°"],
                      ["Звук", "HRTF ON"],
                      ["Графика", "FPS"],
                    ].map(([label, value]) => (
                      <div key={label} className="flex items-center justify-between gap-3 border-b border-line/60 pb-2.5 last:border-0 last:pb-0">
                        <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-smoke">{label}</span>
                        <span className="font-display text-[13px] uppercase tracking-wide text-bone">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-t border-line px-4 py-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-smoke">Готовность</span>
                    <span className="font-mono text-[9px] text-gold">98%</span>
                  </div>
                  <div className="mt-2 flex gap-[3px]" aria-hidden="true">
                    {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0].map((item, index) => (
                      <span key={index} className={item ? "h-1 flex-1 bg-gold" : "h-1 flex-1 bg-line"} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* --------------------------------- TICKER --------------------------------- */}
      <div className="relative overflow-hidden border-y border-gold bg-gold py-2.5" aria-hidden="true">
        <div className="marquee-track flex w-max items-center">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex w-max items-center">
              {[...tickerItems, ...tickerItems, ...tickerItems].map((item, index) => (
                <span key={`${copy}-${item}-${index}`} className="flex items-center">
                  <span className="px-5 font-display text-[12px] font-semibold uppercase tracking-[0.18em] text-ink sm:text-[13px]">{item}</span>
                  <Icon name="crosshair" className="h-3 w-3 text-ink/60" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* -------------------------------- CATEGORIES ------------------------------- */}
      <section id="categories" className="relative scroll-mt-20 py-14 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="05 направлений"
            title="Разделы настроек"
            description="Соберите свой профиль по частям. Каждый раздел — самостоятельный гайд с рекомендованными значениями, практикой и чек-листом."
            aside={
              <div className="flex items-center gap-3 border border-line bg-panel px-4 py-3">
                <span className="h-1.5 w-1.5 rounded-full bg-signal pulse-dot" aria-hidden="true" />
                <span className="font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-smoke">
                  Настройки ПК
                  <br />
                  <span className="text-bone">Steam · актуальная база</span>
                </span>
              </div>
            }
          />

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {guides.map((guide, index) => (
              <div key={guide.slug} className={index < 2 ? "sm:col-span-1 lg:col-span-3" : "sm:col-span-1 lg:col-span-2"}>
                <GuideCard guide={guide} featured={index < 2} onOpen={onOpenGuide} />
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-col items-start justify-between gap-3 border border-line bg-panel/60 px-5 py-4 sm:flex-row sm:items-center">
            <p className="flex items-start gap-3 text-[12px] leading-relaxed text-smoke">
              <Icon name="crosshair" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              Не знаете, с чего начать? Откройте базовый профиль ниже — он собирает основные значения за одну минуту.
            </p>
            <a href="#quickstart" className="inline-flex shrink-0 items-center gap-2 font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-gold hover:text-gold-bright">
              К быстрому старту
              <Icon name="arrowRight" className="h-4 w-4" />
            </a>
          </div>
        </Container>
      </section>

      {/* -------------------------------- QUICKSTART ------------------------------- */}
      <section id="quickstart" className="relative scroll-mt-20 overflow-hidden border-y border-line bg-ink-soft py-14 sm:py-20">
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-[0.1]" aria-hidden="true" />
        <div className="pointer-events-none absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-gold/[0.055] blur-3xl" aria-hidden="true" />
        <Container className="relative">
          <div className="grid items-center gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
            <div>
              <Eyebrow>Быстрый старт</Eyebrow>
              <h2 className="mt-4 font-display text-[2.2rem] font-semibold uppercase leading-[0.95] text-bone sm:text-[3rem]">
                Базовый профиль
                <br />
                <span className="text-gold">за 60 секунд</span>
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-smoke">
                Не финальная истина, а рабочая отправная точка для первых матчей. Скопируйте значения и подстраивайте по одному
                параметру под свою мышь и манеру игры.
              </p>
              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                <CopyButton
                  text={quickProfileText}
                  label="Скопировать профиль"
                  copiedLabel="Профиль скопирован"
                  variant="primary"
                  className="justify-between"
                />
                <ActionLink
                  href={telegramUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  variant="outline"
                  className="justify-between"
                >
                  <Icon name="telegram" className="h-4 w-4" />
                  Задать вопрос
                </ActionLink>
              </div>
              <p className="mt-4 flex items-start gap-2 text-[11px] leading-relaxed text-smoke/70">
                <Icon name="clock" className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                После правок дайте профилю 5–7 дней, прежде чем снова менять значения.
              </p>
            </div>

            <div className="clip-corner border border-line bg-panel">
              <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3.5">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-6 w-6 items-center justify-center border border-gold/40 bg-gold/10 text-gold">
                    <Icon name="spark" className="h-3.5 w-3.5" />
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-bone">Стартовая конфигурация</span>
                </div>
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-smoke">v.1.0</span>
              </div>
              <div className="grid grid-cols-1 divide-y divide-line sm:grid-cols-2 sm:divide-y-0">
                {quickProfile.map((item, index) => (
                  <div
                    key={item.label}
                    className={`group relative border-line px-5 py-4 transition-colors hover:bg-panel-2 ${
                      index < 4 ? "sm:border-b" : ""
                    } ${index % 2 === 0 ? "sm:border-r" : ""} ${index === 4 ? "sm:col-span-2" : ""}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-smoke">{item.label}</span>
                      <span className="font-mono text-[8px] text-smoke/40">{String(index + 1).padStart(2, "0")}</span>
                    </div>
                    <div className="mt-2 flex flex-wrap items-end justify-between gap-2">
                      <span className="font-display text-[21px] font-semibold uppercase leading-none tracking-wide text-bone transition-colors group-hover:text-gold">
                        {item.value}
                      </span>
                      <span className="text-right text-[10px] leading-tight text-smoke/80">{item.sub}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-3">
                <div className="flex flex-wrap gap-1.5">
                  <Tag>PC · Steam</Tag>
                  <Tag>безопасно</Tag>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenGuide("sensitivity")}
                  className="inline-flex items-center gap-1.5 font-display text-[10px] font-semibold uppercase tracking-[0.13em] text-gold hover:text-gold-bright"
                >
                  Как проверить
                  <Icon name="arrowUpRight" className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* --------------------------------- METHOD --------------------------------- */}
      <section className="relative py-14 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Методика"
            title="Не просто цифры — система"
            description="Настройки работают только вместе с привычкой. Три шага, которые отделяют случайный набор клавиш от собственного профиля."
            aside={
              <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-smoke">
                <Icon name="shield" className="h-4 w-4 text-gold" />
                Проверено практикой
              </div>
            }
          />
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.index}
                className="group relative overflow-hidden border border-line bg-panel p-6 transition-colors hover:border-line-bright hover:bg-panel-2 sm:p-7"
              >
                <span className="absolute right-5 top-4 font-display text-[4rem] font-semibold leading-none text-bone/[0.045] sm:text-[4.5rem]">
                  {step.index}
                </span>
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center border border-gold/35 bg-gold/[0.07] text-gold">
                      <Icon name={step.icon} className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold">Step {step.index}</span>
                  </div>
                  <h3 className="mt-5 font-display text-[21px] font-semibold uppercase tracking-wide text-bone">{step.title}</h3>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-smoke">{step.text}</p>
                </div>
                <span className="absolute inset-x-0 bottom-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" aria-hidden="true" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ----------------------------------- FAQ ---------------------------------- */}
      <section id="faq" className="scroll-mt-20 border-y border-line bg-ink-soft py-14 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <div>
              <Eyebrow>FAQ</Eyebrow>
              <h2 className="mt-4 font-display text-[2.1rem] font-semibold uppercase leading-[0.95] text-bone sm:text-[2.8rem]">
                Частые вопросы
                <br />
                <span className="text-smoke/50">до первого матча</span>
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-smoke">
                Если ответа нет ниже — напишите в Telegram. Разберём ваш сетап и текущие значения.
              </p>
              <div className="mt-6 border border-line bg-panel p-5">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-signal pulse-dot" aria-hidden="true" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-signal">Единственный контакт</span>
                </div>
                <a
                  href={telegramUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-3 flex items-center justify-between gap-3 border border-line-bright bg-ink px-4 py-3 transition-colors hover:border-gold/60 hover:text-gold"
                >
                  <span className="flex items-center gap-2.5">
                    <Icon name="telegram" className="h-4 w-4 text-gold" />
                    <span className="font-mono text-[12px] text-bone">@maksimus_huperty</span>
                  </span>
                  <Icon name="arrowUpRight" className="h-4 w-4 text-smoke" />
                </a>
              </div>
            </div>
            <Accordion items={faqItems} />
          </div>
        </Container>
      </section>

      {/* --------------------------------- CONTACT -------------------------------- */}
      <section id="contact" className="relative isolate overflow-hidden border-b border-line">
        <div className="absolute inset-0 -z-10">
          <img src="/images/airdrop.jpg" alt="" aria-hidden="true" className="h-full w-full object-cover object-[70%_center] opacity-55" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/92 to-ink/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-ink/50" />
        </div>
        <Container className="relative py-16 sm:py-24">
          <div className="max-w-[660px]">
            <Eyebrow>Связь · Telegram</Eyebrow>
            <h2 className="mt-5 font-display text-[2.4rem] font-bold uppercase leading-[0.9] text-bone sm:text-[3.6rem] lg:text-[4.2rem]">
              Не нашли
              <br />
              свою базу<span className="text-gold">?</span>
            </h2>
            <p className="mt-3 font-display text-xl uppercase tracking-wide text-gold sm:text-2xl">Соберём профиль под тебя.</p>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-smoke">
              Расскажите про мышь, коврик, железо и стиль игры — подскажу, какие значения взять за основу и что проверять первым.
              Контакт один, без форм и лишних каналов.
            </p>
            <ActionLink
              href={telegramUrl}
              target="_blank"
              rel="noreferrer noopener"
              variant="primary"
              icon={<Icon name="arrowUpRight" className="h-4 w-4" />}
              className="mt-7 px-6 py-4 text-[14px]"
            >
              <Icon name="telegram" className="h-5 w-5" />
              @maksimus_huperty
            </ActionLink>
            <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.14em] text-smoke/60">
              Telegram — единственный канал связи на сайте
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}
