import { LazyMotion, domAnimation, m } from "framer-motion";
import {
  PersonIcon,
  EyeOpenIcon,
  LockClosedIcon,
  GlobeIcon,
} from "@radix-ui/react-icons";

const trustPoints = [
  {
    title: "Community-Driven",
    desc: "Built around citizen participation, not popularity.",
    icon: PersonIcon,
  },
  {
    title: "Transparent",
    desc: "Votes, comments, and updates remain publicly visible.",
    icon: EyeOpenIcon,
  },
  {
    title: "Independent",
    desc: "No hidden agendas or algorithmic promotion.",
    icon: LockClosedIcon,
  },
  {
    title: "Local Focus",
    desc: "Designed with Lebanon’s daily realities in mind.",
    icon: GlobeIcon,
  },
];

export default function TrustSection() {
  return (
    <LazyMotion features={domAnimation}>
      <section className="space-y-10">
        <div className="max-w-2xl space-y-2">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Built on trust and transparency
          </h2>
          <p className="text-gray-600">
            The platform prioritizes clarity, fairness, and public visibility.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map((item, i) => (
            <m.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-2xl border border-gray-200 bg-white p-6"
            >
              <item.icon className="mb-4 h-6 w-6 text-gray-500" />
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{item.desc}</p>
            </m.div>
          ))}
        </div>
      </section>
    </LazyMotion>
  );
}
