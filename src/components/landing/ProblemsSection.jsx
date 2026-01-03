import { LazyMotion, domAnimation, m } from "framer-motion";

const problems = [
  { title: "Electricity Cuts", desc: "Track outages and highlight urgent areas." },
  { title: "Water Interruptions", desc: "Report disruptions and share updates." },
  { title: "Road Damage", desc: "Flag potholes and unsafe streets quickly." },
  { title: "Internet Issues", desc: "Document connectivity problems by region." },
];

export default function ProblemsSection() {
  return (
    <LazyMotion features={domAnimation}>
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold sm:text-3xl">Everyday issues go unheard</h2>
          <p className="text-gray-600">
            Our Voice makes it easy for citizens to report problems, support them
            with votes, and keep everything visible.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((p, i) => (
            <m.div
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: "easeOut" }}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <h3 className="font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{p.desc}</p>
            </m.div>
          ))}
        </div>
      </section>
    </LazyMotion>
  );
}
