import { LazyMotion, domAnimation, m } from "framer-motion";
import { Link } from "react-router-dom";
import heroImage from "../../assets/hero.webp";
import { CheckIcon } from "@radix-ui/react-icons";

export default function HeroSection() {
  return (
    <LazyMotion features={domAnimation}>
      <section className="grid items-center gap-10 md:grid-cols-2">
        {/* Text */}
        <m.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-6"
        >
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-600">
            Community-driven • 🇱🇧
          </p>

          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
            Your Voice Matters in Lebanon
          </h1>

          <p className="text-lg text-gray-600">
            Report local issues, support each other with votes and comments, and
            track progress transparently.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/issues"
              className="rounded-xl bg-red-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-red-700"
            >
              Browse Issues
            </Link>

            <Link
              to="/submit"
              className="rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-800 transition hover:bg-gray-100"
            >
              Submit an Issue
            </Link>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-700">
  <div className="flex items-center gap-2">
    <CheckIcon className="h-4 w-4 text-green-600" />
    <span>Fast to submit</span>
  </div>

  <div className="flex items-center gap-2">
    <CheckIcon className="h-4 w-4 text-green-600" />
    <span>Transparent votes</span>
  </div>

  <div className="flex items-center gap-2">
    <CheckIcon className="h-4 w-4 text-green-600" />
    <span>Community-driven</span>
  </div>
</div>

        </m.div>

        {/* Image */}
        <m.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-red-100 to-transparent blur-2xl" />

          <m.img
            src={heroImage}
            alt="Lebanon community illustration"
            width={900}
            height={700}
            fetchpriority="high"
            loading="eager"
            className="mx-auto w-full max-w-lg rounded-3xl border border-gray-200 bg-white object-contain shadow-sm"
          />
        </m.div>
      </section>
    </LazyMotion>
  );
}
