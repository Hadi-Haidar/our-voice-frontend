import { LazyMotion, domAnimation, m } from "framer-motion";
import { Link } from "react-router-dom";
import heroImage from "../../assets/hero.webp";
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

        {/* Image */}
        <m.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-red-100 dark:from-red-900/20 to-transparent blur-2xl" />

          <m.img
            src={heroImage}
            alt={t("hero.imageAlt")}
            width={900}
            height={700}
            fetchpriority="high"
            loading="eager"
            className="mx-auto w-full max-w-lg rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 object-contain shadow-sm"
          />
        </m.div>
      </section>
    </LazyMotion>
  );
}
