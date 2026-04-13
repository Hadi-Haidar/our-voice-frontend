import { LazyMotion, domAnimation, m } from "framer-motion";
import { Link } from "react-router-dom";
import heroImage1 from "../../assets/lebanon_hero.png";
import heroImage2 from "../../assets/raouche.jpg";
import heroImage3 from "../../assets/lebanon_community_hero.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
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


          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl text-gray-900 dark:text-white">
            {t("hero.title")}
          </h1>

          <p className="max-w-xl text-base leading-relaxed sm:text-lg text-gray-600 dark:text-gray-400">
            {t("hero.subtitle")}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/report-issue"
              className="inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-red-700 shadow-lg shadow-red-500/20 active:scale-95"
            >
              {t("hero.reportIssue")}
            </Link>
            <Link
              to="/issues"
              className="inline-flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 px-6 py-2.5 text-sm font-bold text-gray-900 dark:text-white transition hover:bg-white dark:hover:bg-gray-900 shadow-sm active:scale-95"
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
          className="relative w-full min-w-0"
        >
          <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-red-100 dark:from-red-900/20 to-transparent blur-2xl" />

          <div className="mx-auto w-full max-w-xl overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm relative group">
            <Swiper
              spaceBetween={0}
              effect={"fade"}
              navigation={{
                nextEl: '.swiper-button-next-custom',
                prevEl: '.swiper-button-prev-custom',
              }}
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              modules={[Autoplay, EffectFade, Navigation, Pagination]}
              className="aspect-[4/3] w-full h-full [&_.swiper-pagination-bullet-active]:bg-red-600"
            >
              <SwiperSlide>
                <img
                  src={heroImage1}
                  alt={t("hero.imageAlt")}
                  className="h-full w-full object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src={heroImage2}
                  alt="Beirut Raouche Rocks"
                  className="h-full w-full object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src={heroImage3}
                  alt="Lebanese Community Work"
                  className="h-full w-full object-cover"
                />
              </SwiperSlide>
            </Swiper>

            {/* Custom Navigation Buttons */}
            <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-md text-white shadow-lg opacity-0 transition-all duration-300 hover:bg-white/40 dark:hover:bg-black/40 group-hover:opacity-100 disabled:opacity-0 focus:outline-none">
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-md text-white shadow-lg opacity-0 transition-all duration-300 hover:bg-white/40 dark:hover:bg-black/40 group-hover:opacity-100 disabled:opacity-0 focus:outline-none">
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </div>
        </m.div>
      </section>
    </LazyMotion>
  );
}
