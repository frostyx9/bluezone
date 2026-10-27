import { useEffect, useMemo, useState } from "react";
import {
  bindGroups,
  buildSensRows,
  cameraGroups,
  checklistByGuide,
  graphicsPresets,
  graphicsRows,
  guideBySlug,
  guides,
  sensitivityProfiles,
  soundMixControls,
  soundOutputRows,
  telegramUrl,
  tipsByGuide,
  type GraphicsPresetId,
  type GuideSlug,
  type SettingGroup,
  type SoundKey,
} from "../data/guides";
import { GuideArt, Icon } from "../components/Icons";
import {
  ActionButton,
  ActionLink,
  Checklist,
  Container,
  ContactCard,
  CopyButton,
  Eyebrow,
  KeyCap,
  Tag,
} from "../components/ui";
import { cn } from "../utils/cn";

interface GuidePageProps {
  slug: GuideSlug;
  onOpenGuide: (slug: string) => void;
  onHome: (anchor?: string) => void;
}

const recommendedVolumes = Object.fromEntries(
  soundMixControls.map((control) => [control.id, control.recommended]),
) as Record<SoundKey, number>;

const sections = [
  { id: "intro", label: "Коротко" },
  { id: "settings", label: "Настройки" },
  { id: "practice", label: "Практика" },
  { id: "checklist", label: "Чек-лист" },
];

function SettingsTable({
  groups,
  keycaps = false,
  className,
}: {
  groups: SettingGroup[];
  keycaps?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("border border-line bg-panel", className)}>
      {groups.map((group, groupIndex) => (
        <div key={group.id} className={cn(groupIndex > 0 && "border-t border-line")}>
          <div className="flex items-center justify-between gap-4 border-b border-line bg-ink-soft/70 px-4 py-3 sm:px-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">{group.title}</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-smoke/60">{group.rows.length} параметров</span>
          </div>
          <div>
            {group.rows.map((row) => (
              <div
                key={`${group.id}-${row.label}`}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 border-b border-line/60 px-4 py-3.5 transition-colors last:border-0 hover:bg-panel-2 sm:px-5"
              >
                <div>
                  <p className="text-[13px] leading-snug text-bone/90">{row.label}</p>
                  {row.note ? <p className="mt-1 max-w-md text-[11px] leading-relaxed text-smoke/70">{row.note}</p> : null}
                </div>
                {keycaps ? (
                  <KeyCap>{row.value}</KeyCap>
                ) : (
                  <span className="max-w-[190px] text-right font-display text-[16px] font-medium uppercase leading-tight tracking-wide text-gold sm:text-[17px]">
                    {row.value}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function GuidePage({ slug, onOpenGuide, onHome }: GuidePageProps) {
  const guide = guideBySlug(slug) ?? guides[0];
  const [profileId, setProfileId] = useState(sensitivityProfiles[1].id);
  const [presetId, setPresetId] = useState<GraphicsPresetId>("fps");
  const [bindFilter, setBindFilter] = useState("all");
  const [fov, setFov] = useState(96);
  const [volumes, setVolumes] = useState<Record<SoundKey, number>>(() => ({ ...recommendedVolumes }));
  const [activeSection, setActiveSection] = useState("settings");

  const profile = sensitivityProfiles.find((item) => item.id === profileId) ?? sensitivityProfiles[1];
  const presetIndex = Math.max(0, graphicsPresets.findIndex((item) => item.id === presetId));

  useEffect(() => {
    document.title = `${guide.title} — BLUEZONE`;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    return () => {
      document.title = "BLUEZONE — настройки и гайды PUBG";
    };
  }, [guide.title]);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => Boolean(element));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [guide.slug]);

  const settingGroups = useMemo<SettingGroup[]>(() => {
    if (slug === "binds") {
      return bindFilter === "all" ? bindGroups : bindGroups.filter((group) => group.id === bindFilter);
    }
    if (slug === "sensitivity") {
      return [{ id: "sensitivity", title: `Профиль «${profile.name}»`, rows: buildSensRows(profile) }];
    }
    if (slug === "camera") {
      return cameraGroups.map((group) => ({
        ...group,
        rows: group.rows.map((row) =>
          row.label === "Поле зрения (FOV)" ? { ...row, value: `${fov}°` } : row,
        ),
      }));
    }
    if (slug === "graphics") {
      return [
        {
          id: "graphics",
          title: `Пресет «${graphicsPresets[presetIndex].name}»`,
          rows: graphicsRows.map((row) => ({ label: row.label, value: row.values[presetIndex], note: row.note })),
        },
      ];
    }
    return [
      {
        id: "mix",
        title: "Микшер",
        rows: soundMixControls.map((control) => ({
          label: control.label,
          value: `${volumes[control.id]}%`,
          note: control.description,
        })),
      },
      ...soundOutputRows,
    ];
  }, [slug, bindFilter, profile, fov, presetIndex, volumes]);

  const copyText = useMemo(() => {
    const body = settingGroups
      .map((group) => {
        const rows = group.rows.map((row) => `${row.label}: ${row.value}`).join("\n");
        return `${group.title.toUpperCase()}\n${rows}`;
      })
      .join("\n\n");

    return `BLUEZONE · PUBG (PC) · ${guide.title.toUpperCase()}\n\n${body}\n\nTelegram: @maksimus_huperty`;
  }, [guide.title, settingGroups]);

  const currentIndex = guides.findIndex((item) => item.slug === slug);
  const previous = guides[(currentIndex - 1 + guides.length) % guides.length];
  const next = guides[(currentIndex + 1) % guides.length];
  const halfFov = fov / 2;
  const spread = Math.tan((halfFov * Math.PI) / 180) * 86;
  const fovTone = fov < 95 ? "text-alert" : fov > 100 ? "text-gold" : "text-signal";
  const fovStatus = fov < 95 ? "Узкий обзор" : fov > 100 ? "Широкий обзор" : "Рекомендуемый диапазон";

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main>
      {/* ---------------------------------- HERO ---------------------------------- */}
      <section className="relative isolate overflow-hidden border-b border-line bg-ink-soft">
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-[0.16]" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink via-ink-soft/90 to-ink/40" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-10 top-8 hidden w-[540px] max-w-[55vw] text-gold opacity-[0.32] sm:block lg:top-4 lg:w-[600px]" aria-hidden="true">
          <GuideArt slug={slug} className="h-auto w-full" />
        </div>

        <Container className="relative">
          <div className="flex items-center gap-2 py-5 font-mono text-[9px] uppercase tracking-[0.14em] text-smoke">
            <button type="button" onClick={() => onHome("top")} className="transition-colors hover:text-gold">
              Главная
            </button>
            <span className="text-line-bright">/</span>
            <button type="button" onClick={() => onHome("categories")} className="transition-colors hover:text-gold">
              Гайды
            </button>
            <span className="text-line-bright">/</span>
            <span className="text-gold">{guide.title}</span>
          </div>

          <div className="grid items-end gap-8 pb-8 pt-3 lg:grid-cols-[1fr_auto]">
            <div className="max-w-[780px]">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center border border-gold/45 bg-gold/10 text-gold">
                  <Icon name={slug} className="h-5 w-5" />
                </span>
                <div>
                  <span className="hud-label block text-gold">
                    Раздел {guide.index} · {guide.kicker}
                  </span>
                  <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.14em] text-smoke/70">Настройки PUBG для ПК</span>
                </div>
              </div>
              <h1 className="mt-5 font-display text-[clamp(2.8rem,6.5vw,5.2rem)] font-bold uppercase leading-[0.9] tracking-[-0.01em] text-bone">
                {guide.title}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-smoke sm:text-[15px]">{guide.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {guide.chips.map((chip) => (
                  <Tag key={chip} className="border-line-bright/80 bg-ink">
                    {chip}
                  </Tag>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2.5 sm:flex-row lg:flex-col">
              <CopyButton
                text={copyText}
                label="Скопировать настройки"
                copiedLabel="Скопировано"
                variant="primary"
                className="justify-between sm:w-[230px]"
              />
              <ActionLink
                href={telegramUrl}
                target="_blank"
                rel="noreferrer noopener"
                variant="outline"
                className="justify-between sm:w-[230px]"
              >
                <Icon name="telegram" className="h-4 w-4" />
                Спросить в Telegram
              </ActionLink>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-px border-t border-line bg-line/60 sm:grid-cols-4">
            {[
              { icon: "clock" as const, label: "Чтение", value: guide.readTime },
              { icon: "refresh" as const, label: "Обновлено", value: guide.updated },
              { icon: "monitor" as const, label: "Платформа", value: "PC · Steam" },
              { icon: "target" as const, label: "Уровень", value: guide.level },
            ].map((meta) => (
              <div key={meta.label} className="flex items-center gap-3 bg-ink-soft/90 px-4 py-3">
                <Icon name={meta.icon} className="h-4 w-4 shrink-0 text-gold" />
                <div>
                  <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-smoke/70">{meta.label}</p>
                  <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.05em] text-bone">{meta.value}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Container className="py-10 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_286px] lg:gap-12">
          <div className="min-w-0 space-y-12">
            {/* --------------------------------- ИНТРО --------------------------------- */}
            <section id="intro" className="scroll-mt-24">
              <div className="border-l-2 border-gold bg-panel px-5 py-5 sm:px-6">
                <div className="flex items-center gap-2">
                  <Icon name="crosshair" className="h-3.5 w-3.5 text-gold" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold">Суть</span>
                </div>
                <div className="mt-3 space-y-3">
                  {guide.intro.map((paragraph) => (
                    <p key={paragraph} className="text-[13px] leading-relaxed text-smoke sm:text-sm">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div className="mt-4 flex items-start gap-2.5 border-t border-line/70 pt-3.5">
                  <Icon name="shield" className="mt-0.5 h-4 w-4 shrink-0 text-gold/80" />
                  <p className="text-[12px] leading-relaxed text-bone/80">{guide.note}</p>
                </div>
              </div>
            </section>

            {/* -------------------------------- НАСТРОЙКИ -------------------------------- */}
            <section id="settings" className="scroll-mt-24">
              <div className="flex items-end justify-between gap-4 border-b border-line pb-4">
                <div>
                  <Eyebrow>Значения</Eyebrow>
                  <h2 className="mt-2 font-display text-[1.9rem] font-semibold uppercase leading-none text-bone sm:text-[2.3rem]">Настройки</h2>
                </div>
                <span className="font-display text-[2.6rem] font-semibold leading-none text-line-bright/60">01</span>
              </div>

              {slug === "binds" ? (
                <div className="mt-5">
                  <div className="flex flex-wrap gap-1.5" aria-label="Категории биндов">
                    {[{ id: "all", title: "Все бинды" }, ...bindGroups.map((group) => ({ id: group.id, title: group.title }))].map((filter) => (
                      <button
                        key={filter.id}
                        type="button"
                        aria-pressed={bindFilter === filter.id}
                        onClick={() => setBindFilter(filter.id)}
                        className={cn(
                          "border px-3.5 py-2 font-display text-[11px] font-medium uppercase tracking-[0.12em] transition-colors",
                          bindFilter === filter.id
                            ? "border-gold bg-gold text-ink"
                            : "border-line bg-panel text-smoke hover:border-line-bright hover:text-bone",
                        )}
                      >
                        {filter.title}
                      </button>
                    ))}
                  </div>
                  <p className="mt-3 flex items-start gap-2 text-[11px] leading-relaxed text-smoke/75">
                    Клавиши указаны для стандартной раскладки. Если у мыши есть боковые кнопки, попробуйте перенести наклоны на них.
                  </p>
                </div>
              ) : null}

              {slug === "sensitivity" ? (
                <div className="mt-5">
                  <div className="border border-line bg-panel">
                    <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-5">
                      <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-gold">Профиль чувствительности</span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-smoke">DPI 800</span>
                    </div>
                    <div className="grid gap-px bg-line sm:grid-cols-3">
                      {sensitivityProfiles.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setProfileId(item.id)}
                          aria-pressed={profileId === item.id}
                          className={cn(
                            "group flex flex-col items-start bg-panel p-4 text-left transition-colors",
                            profileId === item.id ? "bg-gold/[0.07]" : "hover:bg-panel-2",
                          )}
                        >
                          <div className="flex w-full items-center justify-between gap-2">
                            <span className={cn("font-display text-lg uppercase tracking-wide", profileId === item.id ? "text-gold" : "text-bone")}>
                              {item.name}
                            </span>
                            <span className={cn("h-2 w-2 border", profileId === item.id ? "border-gold bg-gold" : "border-line-bright")} aria-hidden="true" />
                          </div>
                          <span className="mt-1 font-mono text-[8px] uppercase tracking-[0.14em] text-smoke">{item.badge}</span>
                          <span className="mt-2 text-[11px] leading-relaxed text-smoke/80">{item.description}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-px border border-line border-t-0 bg-line sm:grid-cols-5">
                    {[
                      ["DPI", profile.dpi],
                      ["Общая", profile.values.general],
                      ["ADS", profile.values.ads],
                      ["Прицел 6×", profile.values.scope6],
                      ["Вертикаль", profile.vertical],
                    ].map(([label, value]) => (
                      <div key={label} className="bg-ink-soft px-3 py-3">
                        <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-smoke">{label}</p>
                        <p className="mt-1 font-display text-xl font-semibold text-bone">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {slug === "camera" ? (
                <div className="mt-5 border border-line bg-panel">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-5">
                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-gold">Визуализация поля зрения</span>
                    <div className="flex items-center gap-2">
                      <span className={cn("font-mono text-[9px] uppercase tracking-[0.1em]", fovTone)}>{fovStatus}</span>
                      <button
                        type="button"
                        onClick={() => setFov(96)}
                        aria-label="Сбросить FOV до 96"
                        className="text-smoke transition-colors hover:text-gold"
                      >
                        <Icon name="refresh" className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="grid gap-5 p-4 sm:grid-cols-[180px_1fr] sm:items-center sm:p-5">
                    <div className="flex items-end gap-3 sm:block">
                      <p className="font-display text-[3.4rem] font-semibold leading-none text-gold">
                        {fov}
                        <span className="text-xl text-smoke">°</span>
                      </p>
                      <p className="font-mono text-[9px] uppercase leading-relaxed tracking-[0.1em] text-smoke sm:mt-2">
                        Поле зрения
                        <br />
                        в третьем лице
                      </p>
                    </div>
                    <div className="relative border border-line/70 bg-ink">
                      <svg viewBox="0 0 400 150" className="h-[130px] w-full" role="img" aria-label={`Визуализация FOV ${fov} градусов`}>
                        <defs>
                          <pattern id="fov-grid" width="40" height="30" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 30" fill="none" stroke="#3d4638" strokeWidth="0.6" opacity="0.55" />
                          </pattern>
                        </defs>
                        <rect width="400" height="150" fill="url(#fov-grid)" />
                        <path d="M0 104h400" stroke="#7c8a5c" strokeWidth="1" strokeDasharray="4 6" opacity="0.7" />
                        <path
                          d={`M200 128 L${200 - spread} 24 L${200 + spread} 24 Z`}
                          fill="#f2b825"
                          fillOpacity="0.09"
                          stroke="#f2b825"
                          strokeOpacity="0.65"
                          strokeWidth="1.2"
                        />
                        <path d="M200 128V24" stroke="#f2b825" strokeOpacity="0.35" strokeDasharray="3 4" />
                        <circle cx="200" cy="128" r="3" fill="#f2b825" />
                        <rect x="187" y="62" width="26" height="42" fill="#edefe7" fillOpacity="0.14" stroke="#9aa093" strokeWidth="0.8" />
                        <circle cx="200" cy="54" r="7" fill="#edefe7" fillOpacity="0.18" stroke="#9aa093" strokeWidth="0.8" />
                        <path d={`M${200 - spread} 24v-6M${200 + spread} 24v-6`} stroke="#f2b825" strokeOpacity="0.6" />
                        <text x="14" y="141" fill="#9aa093" opacity="0.6" fontFamily="monospace" fontSize="7">
                          BLUEZONE / FOV SIM
                        </text>
                        <text x="354" y="141" fill="#f2b825" opacity="0.8" fontFamily="monospace" fontSize="8">
                          {fov}°
                        </text>
                      </svg>
                    </div>
                  </div>
                  <div className="border-t border-line px-4 py-4 sm:px-5">
                    <input
                      type="range"
                      min={80}
                      max={103}
                      step={1}
                      value={fov}
                      onChange={(event) => setFov(Number(event.target.value))}
                      className="range-tactical"
                      style={{
                        background: `linear-gradient(to right, #f2b825 ${((fov - 80) / 23) * 100}%, #3d4638 ${((fov - 80) / 23) * 100}%)`,
                      }}
                      aria-label="Поле зрения"
                      aria-valuetext={`${fov} градусов`}
                    />
                    <div className="mt-3 flex justify-between font-mono text-[8px] uppercase tracking-[0.12em] text-smoke/60">
                      <span>80 · узко</span>
                      <span className="text-signal">95–100 · оптимум</span>
                      <span>103 · широко</span>
                    </div>
                  </div>
                </div>
              ) : null}

              {slug === "graphics" ? (
                <div className="mt-5">
                  <div className="grid gap-px border border-line bg-line sm:grid-cols-3">
                    {graphicsPresets.map((preset, index) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => setPresetId(preset.id)}
                        aria-pressed={presetId === preset.id}
                        className={cn(
                          "flex flex-col items-start bg-panel p-4 text-left transition-colors",
                          presetId === preset.id ? "bg-gold/[0.07]" : "hover:bg-panel-2",
                        )}
                      >
                        <div className="flex w-full items-center justify-between gap-2">
                          <span className={cn("font-display text-lg uppercase tracking-wide", presetId === preset.id ? "text-gold" : "text-bone")}>
                            {preset.name}
                          </span>
                          <span className={cn("font-mono text-[9px]", presetId === preset.id ? "text-gold" : "text-smoke/50")}>
                            0{index + 1}
                          </span>
                        </div>
                        <span className="mt-1 font-mono text-[8px] uppercase tracking-[0.14em] text-smoke">{preset.badge}</span>
                        <span className="mt-2 text-[11px] leading-relaxed text-smoke/80">{preset.description}</span>
                      </button>
                    ))}
                  </div>

                  <div className="mt-3 overflow-x-auto border border-line bg-panel">
                    <table className="w-full min-w-[620px] border-collapse text-left">
                      <thead>
                        <tr className="border-b border-line bg-ink-soft/70">
                          <th className="px-4 py-3 font-mono text-[9px] font-normal uppercase tracking-[0.16em] text-smoke sm:px-5">Параметр</th>
                          {graphicsPresets.map((preset, index) => (
                            <th
                              key={preset.id}
                              className={cn(
                                "px-3 py-3 text-center font-display text-[11px] font-medium uppercase tracking-[0.1em] transition-colors",
                                presetId === preset.id ? "bg-gold/[0.08] text-gold" : "text-smoke",
                              )}
                            >
                              <button type="button" onClick={() => setPresetId(preset.id)} className="transition-colors hover:text-gold">
                                {preset.name}
                                <span className="ml-1 font-mono text-[8px] text-smoke/50">{index + 1}</span>
                              </button>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {graphicsRows.map((row) => (
                          <tr key={row.label} className="border-b border-line/60 last:border-0 hover:bg-panel-2/60">
                            <td className="px-4 py-3 sm:px-5">
                              <span className="text-[12px] leading-snug text-bone/90">{row.label}</span>
                              {row.note ? <span className="mt-0.5 block text-[10px] leading-relaxed text-smoke/60">{row.note}</span> : null}
                            </td>
                            {row.values.map((value, index) => (
                              <td
                                key={`${row.label}-${index}`}
                                className={cn(
                                  "whitespace-nowrap px-3 py-3 text-center font-mono text-[10px] transition-colors",
                                  presetId === graphicsPresets[index].id ? "bg-gold/[0.06] font-medium text-bone" : "text-smoke",
                                )}
                              >
                                {value}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : null}

              {slug === "sound" ? (
                <div className="mt-5">
                  <div className="border border-line bg-panel">
                    <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-5">
                      <div className="flex items-center gap-2.5">
                        <Icon name="sound" className="h-4 w-4 text-gold" />
                        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-gold">Микшер</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setVolumes({ ...recommendedVolumes })}
                        className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-smoke transition-colors hover:text-gold"
                      >
                        <Icon name="refresh" className="h-3 w-3" />
                        Сбросить микс
                      </button>
                    </div>
                    <div className="flex h-10 items-end gap-[3px] border-b border-line px-4 py-2 sm:px-5" aria-hidden="true">
                      {Array.from({ length: 48 }).map((_, index) => (
                        <span
                          key={index}
                          className={cn("flex-1 transition-colors", index % 7 === 0 ? "bg-gold" : "bg-line-bright")}
                          style={{ height: `${20 + ((index * 13) % 80)}%` }}
                        />
                      ))}
                    </div>
                    <div>
                      {soundMixControls.map((control) => (
                        <div key={control.id} className="border-b border-line/60 px-4 py-4 last:border-0 sm:px-5">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <label htmlFor={`sound-${control.id}`} className="text-[13px] text-bone/90">
                                {control.label}
                              </label>
                              <p className="mt-0.5 text-[10px] leading-relaxed text-smoke/70">{control.description}</p>
                            </div>
                            <div className="shrink-0 text-right">
                              <span className="font-display text-xl font-medium leading-none text-gold">{volumes[control.id]}%</span>
                              <span className="mt-1 block font-mono text-[8px] uppercase tracking-[0.08em] text-smoke/50">реком. {control.recommended}</span>
                            </div>
                          </div>
                          <input
                            id={`sound-${control.id}`}
                            type="range"
                            min={0}
                            max={100}
                            step={1}
                            value={volumes[control.id]}
                            onChange={(event) => setVolumes((current) => ({ ...current, [control.id]: Number(event.target.value) }))}
                            className="range-tactical mt-3"
                            style={{
                              background: `linear-gradient(to right, #f2b825 ${volumes[control.id]}%, #3d4638 ${volumes[control.id]}%)`,
                            }}
                            aria-valuetext={`${volumes[control.id]} процентов, рекомендуется ${control.recommended}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <p className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.1em] text-smoke/60">
                  <Icon name="shield" className="h-3.5 w-3.5 text-gold/70" />
                  Значения — рекомендации, а не догма
                </p>
                <CopyButton text={copyText} label="Скопировать выбранное" copiedLabel="Скопировано" variant="dark" className="px-4 py-2 text-[10px]" />
              </div>

              {slug === "graphics" ? (
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {[
                    ["Читаемость", "Сглаживание ультра сохраняет ровные края силуэтов."],
                    ["Стабильность", "Ограничение FPS снижает скачки кадров и нагрев."],
                    ["Задержка", "VSync выключен, Reflex включён для быстрого отклика."],
                  ].map(([title, text]) => (
                    <div key={title} className="border border-line bg-panel px-4 py-3">
                      <p className="font-display text-[12px] uppercase tracking-wide text-gold">{title}</p>
                      <p className="mt-1.5 text-[11px] leading-relaxed text-smoke">{text}</p>
                    </div>
                  ))}
                </div>
              ) : null}

              {slug !== "graphics" ? (
                <SettingsTable
                  groups={slug === "sound" ? soundOutputRows : settingGroups}
                  keycaps={slug === "binds"}
                  className="mt-5"
                />
              ) : null}
            </section>

            {/* --------------------------------- ПРАКТИКА -------------------------------- */}
            <section id="practice" className="scroll-mt-24">
              <div className="flex items-end justify-between gap-4 border-b border-line pb-4">
                <div>
                  <Eyebrow>Практика</Eyebrow>
                  <h2 className="mt-2 font-display text-[1.9rem] font-semibold uppercase leading-none text-bone sm:text-[2.3rem]">Как проверить</h2>
                </div>
                <span className="font-display text-[2.6rem] font-semibold leading-none text-line-bright/60">02</span>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {tipsByGuide[slug].map((tip, index) => (
                  <div key={tip.title} className="group border border-line bg-panel p-4 transition-colors hover:border-line-bright hover:bg-panel-2 sm:p-5">
                    <div className="flex items-center justify-between">
                      <span className="flex h-8 w-8 items-center justify-center border border-gold/30 bg-gold/[0.07] font-mono text-[10px] text-gold">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <Icon name="spark" className="h-4 w-4 text-smoke/30 transition-colors group-hover:text-gold/60" />
                    </div>
                    <h3 className="mt-3.5 font-display text-[17px] font-medium uppercase tracking-wide text-bone">{tip.title}</h3>
                    <p className="mt-2 text-[12px] leading-relaxed text-smoke">{tip.text}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* -------------------------------- ЧЕК-ЛИСТ -------------------------------- */}
            <section id="checklist" className="scroll-mt-24">
              <div className="flex items-end justify-between gap-4 border-b border-line pb-4">
                <div>
                  <Eyebrow>Финал</Eyebrow>
                  <h2 className="mt-2 font-display text-[1.9rem] font-semibold uppercase leading-none text-bone sm:text-[2.3rem]">Чек-лист</h2>
                </div>
                <span className="font-display text-[2.6rem] font-semibold leading-none text-line-bright/60">03</span>
              </div>
              <p className="mt-4 max-w-2xl text-[12px] leading-relaxed text-smoke">
                Отмечайте пункты по мере проверки — прогресс сохранится в браузере. Чек-лист не заменяет тренировку, но помогает не забыть
                важное перед первым матчем.
              </p>
              <div className="mt-4">
                <Checklist items={checklistByGuide[slug]} storageKey={slug} />
              </div>
            </section>

            {/* -------------------------------- КОНТАКТ -------------------------------- */}
            <section className="relative overflow-hidden border border-gold/25 bg-panel p-5 sm:p-7">
              <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-gold/[0.06] blur-2xl" aria-hidden="true" />
              <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-signal pulse-dot" aria-hidden="true" />
                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-signal">Разбор в Telegram</span>
                  </div>
                  <h3 className="mt-2 font-display text-2xl uppercase leading-tight text-bone sm:text-[1.7rem]">
                    Настройки собраны.
                    <br />
                    Остались вопросы?
                  </h3>
                  <p className="mt-2 max-w-md text-[12px] leading-relaxed text-smoke">
                    Напишите про ваше железо и текущие значения — подскажу, что изменить первым. Контакт один: @maksimus_huperty.
                  </p>
                </div>
                <ActionLink
                  href={telegramUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  variant="primary"
                  icon={<Icon name="arrowUpRight" className="h-4 w-4" />}
                  className="shrink-0 justify-between"
                >
                  <Icon name="telegram" className="h-4 w-4" />
                  Написать
                </ActionLink>
              </div>
            </section>
          </div>

          {/* --------------------------------- SIDEBAR -------------------------------- */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-4">
              <div className="border border-line bg-panel">
                <div className="border-b border-line px-4 py-3">
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-smoke">Содержание</span>
                </div>
                <nav className="p-2" aria-label="Содержание гайда">
                  {sections.map((section, index) => (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => scrollToSection(section.id)}
                      className={cn(
                        "flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors",
                        activeSection === section.id ? "bg-gold/[0.07] text-gold" : "text-smoke hover:bg-panel-2 hover:text-bone",
                      )}
                    >
                      <span className={cn("h-4 w-0.5 transition-colors", activeSection === section.id ? "bg-gold" : "bg-line")} aria-hidden="true" />
                      <span className="font-mono text-[9px] tracking-[0.1em] text-smoke/50">0{index + 1}</span>
                      <span className="font-display text-[12px] uppercase tracking-[0.1em]">{section.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              <CopyButton
                text={copyText}
                label="Скопировать профиль"
                copiedLabel="Профиль скопирован"
                variant="primary"
                className="w-full justify-between"
              />

              <ContactCard compact />

              <p className="px-1 font-mono text-[8px] leading-relaxed tracking-[0.04em] text-smoke/45">
                BLUEZONE — независимый фан-проект. Значения являются рекомендациями и могут отличаться от оптимальных для вашего сетапа.
              </p>
            </div>
          </aside>
        </div>
      </Container>

      {/* ------------------------------- NEXT / PREV ------------------------------ */}
      <Container className="pb-14 sm:pb-20">
        <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
          <button
            type="button"
            onClick={() => onOpenGuide(previous.slug)}
            className="group flex items-center gap-4 bg-panel p-5 text-left transition-colors hover:bg-panel-2"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-line-bright text-smoke transition-colors group-hover:border-gold/50 group-hover:text-gold">
              <Icon name="arrowRight" className="h-4 w-4 rotate-180" />
            </span>
            <span className="min-w-0">
              <span className="block font-mono text-[8px] uppercase tracking-[0.16em] text-smoke/60">Предыдущий раздел</span>
              <span className="mt-1 block truncate font-display text-lg uppercase tracking-wide text-bone transition-colors group-hover:text-gold">
                {previous.title}
              </span>
            </span>
          </button>
          <button
            type="button"
            onClick={() => onOpenGuide(next.slug)}
            className="group flex items-center justify-end gap-4 bg-panel p-5 text-right transition-colors hover:bg-panel-2"
          >
            <span className="min-w-0">
              <span className="block font-mono text-[8px] uppercase tracking-[0.16em] text-smoke/60">Следующий раздел</span>
              <span className="mt-1 block truncate font-display text-lg uppercase tracking-wide text-bone transition-colors group-hover:text-gold">
                {next.title}
              </span>
            </span>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-line-bright text-smoke transition-colors group-hover:border-gold/50 group-hover:text-gold">
              <Icon name="arrowRight" className="h-4 w-4" />
            </span>
          </button>
        </div>
        <div className="mt-4 flex flex-col items-start justify-between gap-3 border border-line bg-ink-soft px-4 py-3 sm:flex-row sm:items-center">
          <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-smoke/70">Вернуться к списку всех разделов</span>
          <ActionButton variant="dark" onClick={() => onHome("categories")} className="px-4 py-2 text-[10px]">
            Все гайды
            <Icon name="arrowRight" className="h-3.5 w-3.5" />
          </ActionButton>
        </div>
      </Container>
    </main>
  );
}
