import { useCallback, useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { GuidePage } from "./pages/GuidePage";
import { guides, type GuideSlug } from "./data/guides";

export default function App() {
  const [activeGuide, setActiveGuide] = useState<GuideSlug | null>(null);
  const [pendingAnchor, setPendingAnchor] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const handleHome = useCallback((anchor = "top") => {
    setActiveGuide(null);
    setPendingAnchor(anchor);
  }, []);

  const handleOpenGuide = useCallback((slug: string) => {
    const guide = guides.find((item) => item.slug === slug);
    if (!guide) return;
    setPendingAnchor(null);
    setActiveGuide(guide.slug);
  }, []);

  useEffect(() => {
    if (pendingAnchor === null) return;
    const anchor = pendingAnchor;
    setPendingAnchor(null);

    const timeout = window.setTimeout(() => {
      if (anchor === "top") {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      } else {
        const element = document.getElementById(anchor);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        }
      }
      setPendingAnchor(null);
    }, 30);

    return () => window.clearTimeout(timeout);
  }, [pendingAnchor, activeGuide]);

  useEffect(() => {
    if (activeGuide) {
      setProgress(0);
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [activeGuide]);

  useEffect(() => {
    let frame = 0;

    const updateProgress = () => {
      const root = document.documentElement;
      const max = root.scrollHeight - root.clientHeight;
      setProgress(max > 0 ? Math.min(100, Math.max(0, (root.scrollTop / max) * 100)) : 0);
    };

    const onScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [activeGuide]);

  return (
    <div className="relative flex min-h-screen flex-col bg-ink">
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[65] h-[2px] bg-transparent" aria-hidden="true">
        <div className="h-full bg-gold transition-[width] duration-150 ease-out" style={{ width: `${progress}%` }} />
      </div>

      <Header overGuide={Boolean(activeGuide)} onHome={handleHome} onOpenGuide={handleOpenGuide} />

      <div className="flex-1">
        {activeGuide ? (
          <GuidePage key={activeGuide} slug={activeGuide} onOpenGuide={handleOpenGuide} onHome={handleHome} />
        ) : (
          <Home onOpenGuide={handleOpenGuide} />
        )}
      </div>

      <Footer onHome={handleHome} onOpenGuide={handleOpenGuide} />
    </div>
  );
}
