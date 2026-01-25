import { LazyMotion, domAnimation, m, useInView } from "framer-motion";
import { useRef } from "react";
import { useStats } from "../../hooks/useStats";

function CountUp({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <span ref={ref} className="text-3xl font-bold sm:text-4xl">
      {inView ? value : 0}
      <span className="text-red-600">+</span>
    </span>
  );
}

export default function StatsSection() {
  const { stats, loading } = useStats();


  if (loading) return null; // no layout shift
console.log("StatsSection:", { stats, loading });


  return (
    <LazyMotion features={domAnimation}>
      <section className="rounded-3xl border border-gray-200 bg-gray-50 p-8 sm:p-12">
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
              <CountUp value={stat.value} />
              <p className="text-sm text-gray-600">{stat.label}</p>
            </m.div>
          ))}
        </div>
      </section>
    </LazyMotion>
  );
  
}
