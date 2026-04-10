import { LazyMotion, domAnimation, m } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckIcon, SymbolIcon, Share1Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useLanguage } from "../../hooks/useLanguage";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <LazyMotion features={domAnimation}>
      <section className="grid items-center gap-10 md:grid-cols-2">
        {/* Text */}
        <m.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-6"
        >
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-1 text-xs text-gray-600 dark:text-gray-400">
            {t("hero.badge")}
          </p>

          <h1 className="text-4xl font-bold leading-tight sm:text-5xl text-gray-900 dark:text-white">
            {t("hero.title")}
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t("hero.subtitle")}
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/issues"
              className="rounded-xl bg-red-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-red-700 shadow-sm"
            >
              {t("hero.browseIssues")}
            </Link>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex items-center gap-2">
              <CheckIcon className="h-4 w-4 text-green-600 dark:text-green-500" />
              <span>{t("hero.transparentVotes")}</span>
            </div>

            <div className="flex items-center gap-2">
              <CheckIcon className="h-4 w-4 text-green-600 dark:text-green-500" />
              <span>{t("hero.communityDriven")}</span>
            </div>
          </div>

        </m.div>

        {/* Minimalist Illustration */}
        <m.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
          className="relative h-full min-h-[400px] flex items-center justify-center"
        >
          {/* Abstract glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-10 rounded-full bg-gradient-to-tr from-red-100/50 dark:from-red-900/10 to-slate-100 dark:to-slate-800/10 blur-3xl opacity-70" />

          {/* Minimalist icon grid composite */}
          <div className="relative w-full max-w-sm aspect-square">
            {/* Center Main Card */}
            <m.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute inset-0 m-auto w-48 h-48 bg-white dark:bg-slate-800 rounded-[2rem] shadow-xl border border-gray-100 dark:border-slate-700 flex flex-col items-center justify-center gap-4 z-20"
            >
              <div className="w-16 h-16 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                <CheckIcon className="w-8 h-8 text-red-600 dark:text-red-500" />
              </div>
              <div className="h-2 w-24 bg-gray-100 dark:bg-slate-700 rounded-full" />
              <div className="h-2 w-16 bg-gray-100 dark:bg-slate-700 rounded-full" />
            </m.div>

            {/* Orbiting Element 1 */}
            <m.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
              className="absolute top-4 right-8 w-20 h-20 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 flex items-center justify-center z-10"
            >
              <Share1Icon className="w-6 h-6 text-gray-400" />
            </m.div>

            {/* Orbiting Element 2 */}
            <m.div 
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-12 left-4 w-24 h-24 bg-red-600 rounded-[1.5rem] shadow-lg shadow-red-600/20 flex flex-col items-center justify-center gap-2 z-30"
            >
              <SymbolIcon className="w-8 h-8 text-white opacity-90" />
              <div className="h-1.5 w-10 bg-white/30 rounded-full" />
            </m.div>

            {/* Orbiting Element 3 */}
            <m.div 
              animate={{ x: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 2 }}
              className="absolute top-1/2 -right-4 -translate-y-1/2 w-16 h-16 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-gray-100 dark:border-slate-700 flex items-center justify-center z-10"
            >
              <MagnifyingGlassIcon className="w-6 h-6 text-slate-600 dark:text-slate-400" />
            </m.div>
            
            {/* Aesthetic Dots */}
            <svg className="absolute -left-8 top-8 w-24 h-24 text-gray-200 dark:text-slate-800 z-0" fill="currentColor" viewBox="0 0 100 100">
              <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="2" />
              </pattern>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#dots)" />
            </svg>
          </div>
        </m.div>
      </section>
    </LazyMotion>
  );
}
