"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";
import CTASection from "../components/CTASection";
import { Lightbulb, ShieldWarning, Target } from "@phosphor-icons/react";
import { motion } from "framer-motion";

export default function About() {
  const breadcrumbItems = [{ label: "About", href: "/about" }];
  const springTransition = { type: "spring", stiffness: 100, damping: 20 };

  return (
    <div className="flex min-h-[100dvh] flex-col bg-[#FBF9F4]">
      <Header />

      <main className="mx-auto w-full max-w-4xl flex-1 space-y-10 px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <Breadcrumbs items={breadcrumbItems} />

        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springTransition}
          className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] sm:p-12"
        >
          <div className="space-y-6">
            <h1 className="font-serif text-3xl font-bold tracking-tighter text-slate-800 sm:text-4xl lg:text-5xl">
              About the Platform
            </h1>

            <p className="border-l-2 border-amber-500 py-1 pl-4 font-serif text-base leading-relaxed text-slate-700 italic sm:text-lg">
              Welcome to{" "}
              <a
                href="https://ishteyaquerahman.in"
                className="font-semibold text-amber-700 not-italic hover:text-amber-800"
              >
                ishteyaquerahman.in
              </a>
              , a premier, open-access digital sanctuary built for serious civil
              services and competitive exam aspirants.
            </p>

            <div className="space-y-4 font-sans text-sm leading-relaxed font-light text-slate-600 sm:text-base">
              <p>
                Conceived, developed, and managed entirely by Triple Hash, this
                platform bridges the gap between raw ambition and proven execution.
                Our mission is simple: to democratize high-quality exam preparation
                by providing direct, unrestricted access to the exact blueprint,
                notes, and strategies used to conquer India&apos;s toughest examinations.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay: 0.1 }}
          className="space-y-6 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] sm:p-8"
        >
          <h2 className="flex items-center gap-3 font-serif text-2xl font-bold text-slate-800">
            <span className="shrink-0 rounded-xl bg-amber-500/10 p-2 text-amber-700">
              <Target className="h-5 w-5" weight="bold" />
            </span>
            <span>The Visionary Behind the Blueprint: Md Ishteyaque Rahman</span>
          </h2>

          <div className="space-y-4 font-sans text-sm leading-relaxed font-light text-slate-600 sm:text-base">
            <p>
              This platform operates under the direct guidance and intellectual
              mentorship of Md Ishteyaque Rahman, an extraordinary achiever who has
              redefined what it means to navigate competitive exams successfully.
              Ishteyaque&apos;s journey is not just a story of a single triumph; it is a
              masterclass in versatility, resilience, and strategic mastery across
              both national and state-level landscapes.
            </p>
            <p>His stellar credentials speak for themselves:</p>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-amber-500" />
                <span>
                  <strong className="font-semibold text-slate-800">
                    UPSC Civil Services Examination (CSE) 2025:
                  </strong>{" "}
                  Secured Rank 354 in his third attempt, backed by the rare experience
                  of facing back-to-back UPSC interviews in 2024 and 2025.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-amber-500" />
                <span>
                  <strong className="font-semibold text-slate-800">
                    70th BPSC Combined Competitive Examination:
                  </strong>{" "}
                  Achieved a phenomenal Rank 11 in his very first attempt.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-amber-500" />
                <span>
                  <strong className="font-semibold text-slate-800">
                    A Proven Track Record of Success:
                  </strong>{" "}
                  Beyond UPSC and BPSC, he has consistently cleared an array of highly
                  competitive examinations, including the CDS, AFCAT, CAPF, CSIR (SO),
                  and IB ACIO.
                </span>
              </li>
            </ul>

            <p>
              Ishteyaque knows the exact pulse of competitive exams—he understands
              what it takes to bounce back, how to fine-tune an interview strategy,
              and how to crack multiple distinct formats simultaneously.
            </p>
          </div>
        </motion.section>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springTransition, delay: 0.15 }}
            className="space-y-4 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] sm:p-8"
          >
            <h2 className="flex items-center gap-2 font-serif text-xl font-bold text-slate-800">
              <span className="shrink-0 rounded-xl bg-emerald-50 p-2 text-emerald-700">
                <Lightbulb className="h-4 w-4" weight="bold" />
              </span>
              <span>Driven by Purpose, Free for Aspirants</span>
            </h2>
            <div className="space-y-4 font-sans text-sm leading-relaxed font-light text-slate-600">
              <p>
                True leaders lift others as they climb. In entering the civil services,
                Md Ishteyaque Rahman&apos;s singular focus is public service. To honor this
                spirit, he has completely separated himself from any commercial aspect
                of this initiative. He has handed over the complete rights to own,
                manage, use, and produce his academic resources to Triple Hash, ensuring
                that he has zero financial association with the platform.
              </p>
              <p>
                Because of this selfless contribution, Triple Hash has committed to
                keeping the core repository of Ishteyaque&apos;s preparation material
                entirely free and accessible for aspirants worldwide. This website is
                not a commercial coaching venture; it is a collaborative repository
                designed to act as your digital mentor.
              </p>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springTransition, delay: 0.2 }}
            className="space-y-4 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] sm:p-8"
          >
            <h2 className="flex items-center gap-2 font-serif text-xl font-bold text-slate-800">
              <span className="shrink-0 rounded-xl bg-amber-500/10 p-2 text-amber-700">
                <Target className="h-4 w-4" weight="bold" />
              </span>
              <span>What You Will Find Here</span>
            </h2>
            <p className="font-sans text-sm leading-relaxed font-light text-slate-600">
              We believe in clutter-free, high-yield preparation. The website features
              a meticulously organized ecosystem of resources:
            </p>
            <ul className="space-y-3 font-sans text-sm leading-relaxed font-light text-slate-600">
              <li>
                <strong className="font-semibold text-slate-800">The Master Notes:</strong>{" "}
                Dive into the comprehensive, handwritten, and curated notes that
                Ishteyaque used to clear UPSC and state PCS exams.
              </li>
              <li>
                <strong className="font-semibold text-slate-800">Evaluated Answer Copies:</strong>{" "}
                Learn the art of presentation. Study his actual mains answer sheets to
                understand how to structure high-scoring answers under pressure.
              </li>
              <li>
                <strong className="font-semibold text-slate-800">Micro-Strategies:</strong>{" "}
                Tailored articles breaking down everything from cracking the BPSC in a
                single shot to sustaining momentum across consecutive UPSC interview cycles.
              </li>
              <li>
                <strong className="font-semibold text-slate-800">Live Strategy Blogs:</strong>{" "}
                Education is dynamic. Ishteyaque will be regularly contributing exclusive
                blog posts to keep you aligned with the evolving demands of competitive
                exams, changing patterns, and current affairs.
              </li>
            </ul>
          </motion.section>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay: 0.25 }}
          className="space-y-4 rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] p-6 shadow-xs sm:p-8"
        >
          <h2 className="flex items-center gap-2 font-serif text-xl font-bold text-amber-900">
            <ShieldWarning className="h-5 w-5 shrink-0 text-amber-700" weight="regular" />
            <span>A Note from Triple Hash</span>
          </h2>
          <div className="space-y-4 font-sans text-sm leading-relaxed font-light text-slate-600 sm:text-base">
            <p>
              At Triple Hash, we are incredibly proud to build and maintain this digital
              bridge between a brilliant topper and millions of hopeful aspirants. We have
              designed this platform to be seamless, intuitive, and lightning-fast, ensuring
              that nothing stands between you and your study material.
            </p>
            <p>
              Success leaves clues. Here, those clues are laid bare, organized, and handed
              to you for free. Dive into the resources, study the strategy, stay consistent,
              and let Ishteyaque&apos;s blueprint guide you to your own laurel.
            </p>
            <p className="font-serif text-lg font-semibold text-amber-900">
              Your journey from aspirant to achiever starts right here.
            </p>
          </div>
        </motion.section>

        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
