import { Link } from "react-router-dom";
import bgImage from "../../assets/lebanon-bg.webp";

export default function CTASection() {
  return (
    <section className="relative mt-24 overflow-hidden rounded-3xl">
      {/* Background image */}
      <img
        src={bgImage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover grayscale"
        width={1600}
        height={900}
        loading="lazy"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative mx-auto max-w-4xl px-6 py-20 text-white">
        <h2 className="text-2xl font-semibold sm:text-3xl">
          Start with one issue in your area.
        </h2>

        <div className="mt-6 max-w-2xl space-y-3 text-gray-200">
          <p>
            Our Voice is a public platform where citizens document local problems
            and keep them visible over time.
          </p>
          <p>
            No trends. No algorithms. No noise.
            <br />
            Just issues that affect daily life.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/submit"
            className="rounded-lg bg-white px-6 py-3 text-sm font-medium text-gray-900 transition hover:bg-gray-100"
          >
            Report an issue
          </Link>

          <Link
            to="/issues"
            className="rounded-lg border border-white/30 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Browse issues
          </Link>
        </div>
      </div>
    </section>
  );
}
