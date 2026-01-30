import { LazyMotion, domAnimation, m } from "framer-motion";
import { useLanguage } from "../../hooks/useLanguage";

export default function ProblemsSection() {
  const { t } = useLanguage();

  const problems = [
    { key: "electricity", title: t("problems.electricity.title"), desc: t("problems.electricity.desc") },
    { key: "water", title: t("problems.water.title"), desc: t("problems.water.desc") },
    { key: "roads", title: t("problems.roads.title"), desc: t("problems.roads.desc") },
    { key: "internet", title: t("problems.internet.title"), desc: t("problems.internet.desc") },
  ];

  return (
    <LazyMotion features={domAnimation}>
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold sm:text-3xl text-gray-900 dark:text-white">{t("problems.title")}</h2>
          <p className="text-gray-600 dark:text-gray-400">
            {t("problems.subtitle")}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((p, i) => (
            <m.div
              key={p.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: "easeOut" }}
              className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm transition-colors duration-200"
            >
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">{p.title}</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{p.desc}</p>
            </m.div>
          ))}
        </div>
      </section>
    </LazyMotion>
  );
}
