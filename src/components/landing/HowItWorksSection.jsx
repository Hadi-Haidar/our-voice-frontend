import { LazyMotion, domAnimation, m } from "framer-motion";
import {
  Pencil1Icon,
  PersonIcon,
  BarChartIcon,
  CheckIcon,
} from "@radix-ui/react-icons";

const steps = [
  {
    title: "Submit an Issue",
    desc: "Document a local problem with clear details.",
    icon: Pencil1Icon,
  },
  {
    title: "Community Support",
    desc: "Other citizens vote and comment to confirm impact.",
    icon: PersonIcon,
  },
  {
    title: "Public Visibility",
    desc: "Issues gain visibility through collective attention.",
    icon: BarChartIcon,
  },
  {
    title: "Track Progress",
    desc: "Follow updates and status changes transparently.",
    icon: CheckIcon,
  },
];

export default function HowItWorksSection() {
  return (
    <LazyMotion features={domAnimation}>
      <section className="space-y-10">
        <div className="max-w-2xl space-y-2">
          <h2 className="text-2xl font-bold sm:text-3xl">
            How the platform works
          </h2>
          <p className="text-gray-600">
            A simple process designed to keep issues visible and accountable.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <m.div
              key={step.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-2xl border border-gray-200 bg-white p-6"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                <step.icon className="h-5 w-5 text-gray-700" />
              </div>

              <h3 className="font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{step.desc}</p>
            </m.div>
          ))}
        </div>
      </section>
    </LazyMotion>
  );
}
