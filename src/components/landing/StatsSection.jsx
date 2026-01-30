import { LazyMotion, domAnimation, m, useInView, animate, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { useStats } from "../../hooks/useStats";
import { useLanguage } from "../../hooks/useLanguage";

function CountUp({ value }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      const animation = animate(count, value, { duration: 2, ease: "easeOut" });
      return animation.stop;
    }
  }, [inView, count, value]);

  return (
    <span ref={ref} className="text-3xl font-bold sm:text-4xl inline-flex items-center justify-center">
      <m.span>{rounded}</m.span>
      <span className="text-red-600 leading-none ms-1">+</span>
    </span>
  );
}

export default function StatsSection() {
  const { stats, loading } = useStats();
  const { t } = useLanguage();


  if (loading) return null; // no layout shift


  return (
    <LazyMotion features={domAnimation}>
      <section className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 p-8 sm:p-12 transition-colors duration-200">
        <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <m.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="space-y-2"
            >
              <div className="text-gray-900 dark:text-gray-100">
                <CountUp value={stat.value} />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t(stat.label)}</p>
            </m.div>
          ))}
        </div>
      </section>
    </LazyMotion>
  );
}
