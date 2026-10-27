import type { SVGProps } from "react";

export type IconName =
  | "binds"
  | "sensitivity"
  | "camera"
  | "graphics"
  | "sound"
  | "telegram"
  | "arrowRight"
  | "arrowUpRight"
  | "copy"
  | "check"
  | "chevronDown"
  | "menu"
  | "close"
  | "clock"
  | "target"
  | "monitor"
  | "refresh"
  | "shield"
  | "spark"
  | "crosshair";

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  className?: string;
}

export function Icon({ name, className, ...props }: IconProps) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "binds":
      return (
        <svg {...common} {...props}>
          <rect x="2.5" y="5.5" width="19" height="13" rx="1.5" />
          <path d="M6 9h1M9.5 9h1M13 9h1M16.5 9h1M6 12.2h1M9.5 12.2h1M13 12.2h1M16.5 12.2h1M8 15.4h8" />
        </svg>
      );
    case "sensitivity":
    case "crosshair":
    case "target":
      return (
        <svg {...common} {...props}>
          <circle cx="12" cy="12" r={name === "target" ? 7.5 : 6} />
          <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
          <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
          {name === "sensitivity" && (
            <>
              <path d="M18.5 5.5l2-2M5.5 18.5l-2 2" opacity="0.6" />
              <circle cx="12" cy="12" r="9.2" opacity="0.3" />
            </>
          )}
        </svg>
      );
    case "camera":
      return (
        <svg {...common} {...props}>
          <path d="M3 8V5.5A1.5 1.5 0 0 1 4.5 4H7M17 4h2.5A1.5 1.5 0 0 1 21 5.5V8M21 16v2.5a1.5 1.5 0 0 1-1.5 1.5H17M7 20H4.5A1.5 1.5 0 0 1 3 18.5V16" />
          <circle cx="12" cy="12" r="3.6" />
          <path d="M12 6.5V8M12 16v1.5M6.5 12H8M16 12h1.5" opacity="0.55" />
        </svg>
      );
    case "graphics":
      return (
        <svg {...common} {...props}>
          <rect x="2.5" y="4" width="19" height="13" rx="1.5" />
          <path d="M9 21h6M12 17v4" />
          <path d="M6 13.5l3-3 2.5 2 4-5.5" />
        </svg>
      );
    case "sound":
      return (
        <svg {...common} {...props}>
          <path d="M4 13v-2M7.5 16V8M11 18.5V5.5M14.5 16V8M18 13.5v-3M21 12.5v-1" />
        </svg>
      );
    case "telegram":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
          <path d="M21.94 4.65a1.2 1.2 0 0 0-1.28-.18L2.6 11.32c-.84.33-.84 1.5.02 1.8l4.6 1.63 1.76 5.6c.22.7 1.1.9 1.6.37l2.54-2.68 4.6 3.4c.6.44 1.45.12 1.62-.6l3.1-15.05a1.2 1.2 0 0 0-.5-1.14ZM9.2 13.9l8.72-6.44-7.02 7.53-.2 3.1-1.5-4.19Z" />
        </svg>
      );
    case "arrowRight":
      return (
        <svg {...common} {...props}>
          <path d="M4 12h16M14 6l6 6-6 6" />
        </svg>
      );
    case "arrowUpRight":
      return (
        <svg {...common} {...props}>
          <path d="M7 17 17 7M8 7h9v9" />
        </svg>
      );
    case "copy":
      return (
        <svg {...common} {...props}>
          <rect x="9" y="9" width="11.5" height="11.5" rx="1.5" />
          <path d="M15 9V4.5A1.5 1.5 0 0 0 13.5 3H4.5A1.5 1.5 0 0 0 3 4.5v9A1.5 1.5 0 0 0 4.5 15H9" />
        </svg>
      );
    case "check":
      return (
        <svg {...common} {...props}>
          <path d="m4.5 12.5 5 5 10-11" />
        </svg>
      );
    case "chevronDown":
      return (
        <svg {...common} {...props}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      );
    case "menu":
      return (
        <svg {...common} {...props}>
          <path d="M3.5 7h17M3.5 12h17M3.5 17h11" />
        </svg>
      );
    case "close":
      return (
        <svg {...common} {...props}>
          <path d="M5 5l14 14M19 5 5 19" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common} {...props}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7.5V12l3 2" />
        </svg>
      );
    case "monitor":
      return (
        <svg {...common} {...props}>
          <rect x="2.5" y="4" width="19" height="13" rx="1.5" />
          <path d="M9 21h6M12 17v4" />
        </svg>
      );
    case "refresh":
      return (
        <svg {...common} {...props}>
          <path d="M20 11a8 8 0 1 0-2.34 5.66M20 4v7h-7" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common} {...props}>
          <path d="M12 3 4.5 6v5.5c0 4.6 3.1 7.8 7.5 9.5 4.4-1.7 7.5-4.9 7.5-9.5V6L12 3Z" />
          <path d="m8.5 12 2.5 2.5 4.5-5" />
        </svg>
      );
    case "spark":
      return (
        <svg {...common} {...props}>
          <path d="M12 2.5 13.8 9l6.2 1.8-6.2 1.9L12 19l-1.8-6.3L4 10.8 10.2 9 12 2.5Z" />
        </svg>
      );
    default:
      return null;
  }
}

const gold = "#f2b825";
const muted = "#7c8a5c";
const dim = "#edefe7";

export function GuideArt({ slug, className }: { slug: string; className?: string }) {
  const base = { viewBox: "0 0 220 170", fill: "none", "aria-hidden": true as const, className };

  switch (slug) {
    case "binds":
      return (
        <svg {...base}>
          <g opacity="0.5" stroke={muted} strokeWidth="1">
            <path d="M0 42h220M0 128h220M42 0v170M178 0v170" strokeDasharray="2 7" />
          </g>
          <g transform="translate(24 40) rotate(-8)">
            {[0, 1, 2].map((row) =>
              [0, 1, 2, 3, 4].map((col) => {
                const active = (row === 1 && col === 1) || (row === 0 && col === 3);
                return (
                  <rect
                    key={`${row}-${col}`}
                    x={col * 34}
                    y={row * 34}
                    width={28}
                    height={28}
                    rx="2"
                    fill={active ? gold : "none"}
                    fillOpacity={active ? 0.16 : 0}
                    stroke={active ? gold : muted}
                    strokeOpacity={active ? 0.9 : 0.5}
                  />
                );
              }),
            )}
          </g>
          <path d="M178 30h20v20" stroke={gold} strokeWidth="1.5" opacity="0.7" />
          <path d="M48 146h-22v-18" stroke={muted} strokeWidth="1" opacity="0.6" />
          <circle cx="186" cy="138" r="3" fill={gold} />
        </svg>
      );
    case "sensitivity":
      return (
        <svg {...base}>
          <circle cx="116" cy="85" r="62" stroke={muted} strokeOpacity="0.5" strokeDasharray="3 8" />
          <circle cx="116" cy="85" r="42" stroke={gold} strokeOpacity="0.3" />
          <circle cx="116" cy="85" r="25" stroke={gold} strokeOpacity="0.7" />
          <circle cx="116" cy="85" r="5" fill={gold} />
          <path d="M116 8v22M116 140v22M39 85h22M171 85h22" stroke={dim} strokeOpacity="0.5" />
          <path d="m152 49 16-16M80 121l-14 14" stroke={gold} strokeOpacity="0.6" />
          <path d="M178 20h14v14M36 150h-14v-14" stroke={muted} strokeOpacity="0.6" />
          <circle cx="147" cy="54" r="2.5" fill={gold} />
          <circle cx="68" cy="129" r="2.5" fill={gold} />
          <path d="M160 122h30M175 107v30" stroke={gold} strokeOpacity="0.4" />
        </svg>
      );
    case "camera":
      return (
        <svg {...base}>
          <path d="M34 132 90 48h56l56 84" stroke={muted} strokeOpacity="0.35" strokeDasharray="4 7" />
          <path d="M70 132 106 68h26l42 64" stroke={gold} strokeOpacity="0.25" />
          <circle cx="118" cy="88" r="27" stroke={gold} strokeOpacity="0.8" />
          <circle cx="118" cy="88" r="12" stroke={muted} strokeOpacity="0.8" />
          <circle cx="118" cy="88" r="4" fill={gold} />
          <path d="M64 40h-22v22M172 40h22v22M64 136h-22v-22M172 136h22v-22" stroke={gold} strokeOpacity="0.55" />
          <path d="M118 53V34M118 142v-19" stroke={muted} strokeOpacity="0.6" />
        </svg>
      );
    case "graphics":
      return (
        <svg {...base}>
          <rect x="32" y="30" width="156" height="100" rx="2" stroke={muted} strokeOpacity="0.55" />
          <rect x="45" y="43" width="130" height="74" stroke={gold} strokeOpacity="0.18" fill={gold} fillOpacity="0.03" />
          <path d="M56 102h19v13H56zM82 86h19v29H82zM108 92h19v23h-19zM134 66h19v49h-19z" fill={gold} fillOpacity="0.3" stroke={gold} strokeOpacity="0.6" />
          <path d="M56 92l26-16 27 8 25-24 22-10" stroke={dim} strokeOpacity="0.45" strokeDasharray="3 4" />
          <path d="M96 145h34M113 130v15" stroke={muted} />
          <path d="M180 20h20v20M40 150H20v-20" stroke={gold} strokeOpacity="0.6" />
        </svg>
      );
    case "sound":
      return (
        <svg {...base}>
          <g stroke={gold} strokeLinecap="round">
            <path d="M46 88v-4" strokeWidth="3" strokeOpacity="0.5" />
            <path d="M62 98V72" strokeWidth="3" strokeOpacity="0.65" />
            <path d="M78 112V58" strokeWidth="4" />
            <path d="M94 124V44" strokeWidth="4" strokeOpacity="0.9" />
            <path d="M110 106V64" strokeWidth="4" />
            <path d="M126 132V38" strokeWidth="4" strokeOpacity="0.85" />
            <path d="M142 96V74" strokeWidth="3" />
            <path d="M158 116V54" strokeWidth="4" strokeOpacity="0.7" />
            <path d="M174 90v-10" strokeWidth="3" strokeOpacity="0.5" />
          </g>
          <path d="M28 27h22M28 27v22M192 143h-22M192 143v-22" stroke={muted} strokeOpacity="0.65" />
          <circle cx="187" cy="30" r="3" fill={gold} />
          <path d="M36 140h54" stroke={muted} strokeOpacity="0.35" />
        </svg>
      );
    default:
      return null;
  }
}
