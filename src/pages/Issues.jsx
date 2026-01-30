import { m, LazyMotion, domAnimation } from "framer-motion";
import { useLanguage } from "../hooks/useLanguage";

export default function Issues() {
  const { t, isRTL } = useLanguage();

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4"
      >
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          {t("nav.issues")}
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-md transition-colors">
          {isRTL
            ? "لم يتم الإبلاغ عن أي مشاكل حتى الآن. كن أول من يوثق مشكلة!"
            : "No issues reported yet. Be the first to document one!"
          }
        </p>
      </m.div>
    </LazyMotion>
  );
}
