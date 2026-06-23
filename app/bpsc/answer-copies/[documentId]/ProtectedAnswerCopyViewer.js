"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Minus, Plus } from "@phosphor-icons/react";
import { useAuth } from "@/app/context/AuthContext";
import GoogleAuthModal from "@/app/components/GoogleAuthModal";
import Header from "@/app/components/Header";

function WatermarkOverlay({ text }) {
  return (
    <div className="pointer-events-none absolute inset-0 grid grid-cols-2 place-items-center gap-28 overflow-hidden opacity-[0.12]">
      {Array.from({ length: 4 }).map((_, i) => (
        <span key={i} className="-rotate-30 whitespace-nowrap text-xs font-bold uppercase tracking-widest text-slate-900">
          {text}
        </span>
      ))}
    </div>
  );
}

export default function ProtectedAnswerCopyViewer({ documentId, title }) {
  const { user, loading: authLoading } = useAuth();
  const canvasRefs = useRef([]);
  const pageWrapperRefs = useRef([]);
  const [pdf, setPdf] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(1.15);
  const [scrolling, setScrolling] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [watermark, setWatermark] = useState("");

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    let loadingTask;

    async function loadDocument() {
      setLoading(true);
      setError("");
      try {
        const token = await user.getIdToken();
        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();
        setWatermark(`${user.email || "authenticated-user"} • ${user.uid.slice(0, 8)}`);
        loadingTask = pdfjs.getDocument({
          url: `/api/bpsc/documents/${documentId}`,
          httpHeaders: { Authorization: `Bearer ${token}` },
          withCredentials: false,
        });
        const loadedPdf = await loadingTask.promise;
        if (!cancelled) {
          canvasRefs.current = [];
          pageWrapperRefs.current = [];
          setCurrentPage(1);
          setPdf(loadedPdf);
        }
      } catch (loadError) {
        if (!cancelled) setError(loadError.message || "Unable to render PDF.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadDocument();
    return () => {
      cancelled = true;
      loadingTask?.destroy();
    };
  }, [documentId, user]);

  // Render every page stacked vertically; re-render all pages when zoom changes.
  useEffect(() => {
    if (!pdf) return;
    let cancelled = false;
    const renderTasks = [];

    async function renderAllPages() {
      for (let number = 1; number <= pdf.numPages; number += 1) {
        if (cancelled) return;
        const canvas = canvasRefs.current[number - 1];
        if (!canvas) continue;
        const page = await pdf.getPage(number);
        if (cancelled) return;
        const viewport = page.getViewport({ scale: zoom });
        const context = canvas.getContext("2d", { alpha: false });
        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.floor(viewport.width * ratio);
        canvas.height = Math.floor(viewport.height * ratio);
        canvas.style.width = `${viewport.width}px`;
        canvas.style.height = `${viewport.height}px`;
        const task = page.render({ canvasContext: context, viewport, transform: ratio === 1 ? null : [ratio, 0, 0, ratio, 0, 0] });
        renderTasks.push(task);
        try {
          await task.promise;
        } catch (renderError) {
          if (renderError?.name !== "RenderingCancelledException") throw renderError;
        }
      }
    }

    renderAllPages().catch(() => {
      if (!cancelled) setError("Unable to render this PDF page.");
    });

    return () => {
      cancelled = true;
      renderTasks.forEach((task) => task.cancel());
    };
  }, [pdf, zoom]);

  // Track which page is centered in the viewport for the live indicator.
  useEffect(() => {
    if (!pdf) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const number = Number(entry.target.dataset.page);
            if (number) setCurrentPage(number);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    pageWrapperRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [pdf, zoom]);

  // Mobile screens are narrow — start zoomed out so the full page fits.
  useEffect(() => {
    if (window.innerWidth < 640) setZoom(0.6);
  }, []);

  // Show the page indicator only while scrolling, then fade it out.
  useEffect(() => {
    if (!pdf) return;
    let timeout;
    function handleScroll() {
      setScrolling(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setScrolling(false), 1200);
    }
    window.addEventListener("scroll", handleScroll, { passive: true, capture: true });
    return () => {
      window.removeEventListener("scroll", handleScroll, { capture: true });
      clearTimeout(timeout);
    };
  }, [pdf]);

  useEffect(() => {
    function blockShortcuts(event) {
      if ((event.ctrlKey || event.metaKey) && ["p", "s", "u"].includes(event.key.toLowerCase())) event.preventDefault();
    }
    window.addEventListener("keydown", blockShortcuts);
    return () => window.removeEventListener("keydown", blockShortcuts);
  }, []);

  if (!authLoading && !user) {
    return <GoogleAuthModal open onClose={() => window.location.assign("/bpsc")} message="Your BPSC answer copy, ready." />;
  }

  return (
    <div className="min-h-[100dvh] bg-slate-900">
      <Header />
      <div className="sticky top-16 z-40 border-b border-white/10 bg-slate-950/95 px-4 py-3 backdrop-blur sm:top-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="min-w-0"><Link href="/bpsc" className="text-xs font-semibold text-amber-400 hover:text-amber-300">Back to BPSC</Link><h1 className="truncate text-sm font-bold text-white sm:text-base">{title}</h1></div>
          <div className="flex shrink-0 items-center gap-1 rounded-xl border border-white/10 bg-slate-900 p-1">
            <button type="button" onClick={() => setZoom((value) => Math.max(0.6, value - 0.15))} className="cursor-pointer rounded-lg p-2 text-slate-300 hover:bg-white/10" aria-label="Zoom out"><Minus className="h-4 w-4" weight="bold" /></button>
            <span className="w-12 text-center text-xs text-slate-300">{Math.round(zoom * 100)}%</span>
            <button type="button" onClick={() => setZoom((value) => Math.min(1.8, value + 0.15))} className="cursor-pointer rounded-lg p-2 text-slate-300 hover:bg-white/10" aria-label="Zoom in"><Plus className="h-4 w-4" weight="bold" /></button>
          </div>
        </div>
      </div>

      <main className="relative min-h-[80vh] overflow-auto p-4 sm:p-8" onContextMenu={(event) => event.preventDefault()}>
        {loading && <p className="text-center text-sm text-slate-300">Preparing secure viewer…</p>}
        {error && <p className="mx-auto max-w-xl rounded-xl bg-red-50 p-4 text-center text-sm text-red-700">{error}</p>}
        {pdf && (
          <div className="mx-auto flex w-max min-w-full flex-col items-center gap-6 pb-16">
            {Array.from({ length: pdf.numPages }).map((_, index) => (
              <div
                key={index}
                data-page={index + 1}
                ref={(el) => {
                  pageWrapperRefs.current[index] = el;
                }}
                className="relative overflow-hidden bg-white shadow-2xl"
              >
                <canvas
                  ref={(el) => {
                    canvasRefs.current[index] = el;
                  }}
                  className="block max-w-none"
                />
                <WatermarkOverlay text={watermark} />
              </div>
            ))}
          </div>
        )}

        {pdf && (
          <div
            className={`pointer-events-none fixed bottom-6 right-4 z-50 flex w-max items-center rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 shadow-xl backdrop-blur transition-opacity duration-300 sm:right-6 ${
              scrolling ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="tabular-nums">{currentPage} / {pdf.numPages}</span>
          </div>
        )}
      </main>
    </div>
  );
}
