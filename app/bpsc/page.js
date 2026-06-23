import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";
import CTASection from "../components/CTASection";
import BpscResourceLibrary from "../components/BpscResourceLibrary";

export default function BPSCPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-[#FBF9F4]">
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-1 space-y-12 px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <Breadcrumbs items={[{ label: "BPSC", href: "/bpsc" }]} />
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">BPSC Study Resources</h1>
            <p className="max-w-2xl text-sm leading-relaxed text-slate-500">Browse the notes and answer copies currently uploaded to the BPSC resource library.</p>
          </div>

          <aside className="flex w-full shrink-0 items-center  gap-4 lg:w-auto lg:max-w-md">
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-slate-100 sm:h-20 sm:w-20">
              <img
                src="/hero.webp"
                alt="Md Ishteyaque Rahman"
                className="h-full w-full origin-top scale-[1.9] object-cover object-top"
              />
            </div>
            <p className="min-w-0 text-sm leading-relaxed text-slate-600 sm:text-base">
              Browse the notes and answer copies of{" "}
              <span className="font-bold text-slate-900">Md Ishteyaque Rahman</span>, who has secured{" "}
              <span className="font-semibold text-amber-700">Rank 11 in 70th BPSC</span> and{" "}
              <span className="font-semibold text-emerald-700">Rank 354 in UPSC CSE 2025</span>.
            </p>
          </aside>
        </div>
        <BpscResourceLibrary />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
