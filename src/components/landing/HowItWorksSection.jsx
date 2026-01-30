import { LazyMotion, domAnimation, m } from "framer-motion";
import {
  Pencil1Icon,
  PersonIcon,
  BarChartIcon,
  CheckIcon,
} from "@radix-ui/react-icons";
import { useLanguage } from "../../hooks/useLanguage";

export default function HowItWorksSection() {
  const { t } = useLanguage();

  const steps = [
    {
      key: "submit",
      title: t("howItWorks.steps.submit.title"),
      desc: t("howItWorks.steps.submit.desc"),
      icon: Pencil1Icon,
    },
    {
      key: "support",
      title: t("howItWorks.steps.support.title"),
      desc: t("howItWorks.steps.support.desc"),
      icon: PersonIcon,
    },
    {
      key: "visibility",
      title: t("howItWorks.steps.visibility.title"),
      desc: t("howItWorks.steps.visibility.desc"),
      icon: BarChartIcon,
    },
    {
      key: "track",
      title: t("howItWorks.steps.track.title"),
      desc: t("howItWorks.steps.track.desc"),
      icon: CheckIcon,
    },
  ];

  return (
    <LazyMotion features={domAnimation}>
      <section className="space-y-10">
        <div className="max-w-2xl space-y-2">
          <h2 className="text-2xl font-bold sm:text-3xl text-gray-900 dark:text-white">
            {t("howItWorks.title")}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {t("howItWorks.subtitle")}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <m.div
              key={step.key}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm transition-colors duration-200"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
                <step.icon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </div>

              <h3 className="font-semibold text-gray-900 dark:text-gray-100">{step.title}</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{step.desc}</p>
            </m.div>
          ))}
        </div>
      </section>
    </LazyMotion>
  );
}
