import { m, LazyMotion, domAnimation } from "framer-motion";
import { useLanguage } from "../hooks/useLanguage";

export default function Donate() {
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
                    {t("nav.donate")}
                </h1>
                <p className="text-lg text-gray-500 dark:text-gray-400 max-w-md">
                    {isRTL
                        ? "خيار التبرع سيكون متاحاً قريباً لدعم استمرارية المنصة."
                        : "Donation option will be available soon to support the platform's sustainability."
                    }
                </p>
            </m.div>
        </LazyMotion>
    );
}
