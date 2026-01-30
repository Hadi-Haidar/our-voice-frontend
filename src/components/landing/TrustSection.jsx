import { LazyMotion, domAnimation, m } from "framer-motion";
import {
  PersonIcon,
  EyeOpenIcon,
  LockClosedIcon,
  GlobeIcon,
} from "@radix-ui/react-icons";
import { useLanguage } from "../../hooks/useLanguage";

export default function TrustSection() {
  const { t } = useLanguage();

  const trustPoints = [
    {
      key: "community",
      title: t("trust.points.community.title"),
      desc: t("trust.points.community.desc"),
      icon: PersonIcon,
    },
    {
      key: "transparent",
      title: t("trust.points.transparent.title"),
      desc: t("trust.points.transparent.desc"),
      icon: EyeOpenIcon,
    },
    {
      key: "independent",
      title: t("trust.points.independent.title"),
      desc: t("trust.points.independent.desc"),
      icon: LockClosedIcon,
    },
    {
      key: "local",
      title: t("trust.points.local.title"),
      desc: t("trust.points.local.desc"),
      icon: GlobeIcon,
    },
  ];

  return (
    <LazyMotion features={domAnimation}>
      <section className="space-y-10">
        <div className="max-w-2xl space-y-2">
          <h2 className="text-2xl font-bold sm:text-3xl text-gray-900 dark:text-white">
            {t("trust.title")}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {t("trust.subtitle")}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map((item, i) => (
            <m.div
              key={item.key}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm transition-colors duration-200"
            >
              <item.icon className="mb-4 h-6 w-6 text-gray-500 dark:text-gray-400" />
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">{item.title}</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
            </m.div>
          ))}
        </div>
      </section>
    </LazyMotion>
  );
}
