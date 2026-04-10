import { LazyMotion, domAnimation, m } from "framer-motion";
import { Link } from "react-router-dom";
import heroImage from "../../assets/lebanon_hero.png";
import { CheckIcon } from "@radix-ui/react-icons";
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
          className="space-y-6 md:space-y-7"
        >
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-gray-200/70 dark:border-gray-800 bg-white/80 dark:bg-gray-900/70 px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 backdrop-blur">
            {t("hero.badge")}
          </p>

          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl text-gray-900 dark:text-white">
            {t("hero.title")}
          </h1>

          <p className="max-w-xl text-base leading-relaxed sm:text-lg text-gray-600 dark:text-gray-400">
            {t("hero.subtitle")}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/report-issue"
              className="inline-flex items-center justify-center rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950"
            >
              {t("hero.reportIssue")}
            </Link>
            <Link
              to="/issues"
              className="inline-flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 px-4 py-2.5 text-sm font-semibold text-gray-900 dark:text-white transition hover:bg-white dark:hover:bg-gray-900 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/20 dark:focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950"
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

        {/* Image */}
        <m.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-red-100 dark:from-red-900/20 to-transparent blur-2xl" />

          <div className="mx-auto w-full max-w-xl overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
            <m.img
              src={heroImage}
              alt={t("hero.imageAlt")}
              width={1200}
              height={900}
              fetchpriority="high"
              loading="eager"
              className="h-full w-full aspect-[4/3] object-cover"
            />
          </div>
        </m.div>
      </section>
    </LazyMotion>
  );
}
