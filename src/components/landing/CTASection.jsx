import { Link } from "react-router-dom";
import { useLanguage } from "../../hooks/useLanguage";

export default function CTASection() {
  const { t } = useLanguage();

  return (
    <section className="relative mt-24 overflow-hidden rounded-3xl bg-slate-900">
      {/* Abstract dark aesthetic shape */}
      <div className="absolute -inset-10 -z-10 rounded-[100px] bg-gradient-to-br from-slate-800 to-slate-900 opacity-60 blur-3xl transform rotate-12" />
      <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-slate-800 to-transparent opacity-50 block" />

      {/* Content */}
      <div className="relative mx-auto max-w-4xl px-6 py-20 text-white">
        <h2 className="text-2xl font-semibold sm:text-3xl">
          {t("cta.title")}
        </h2>

        <div className="mt-6 max-w-2xl space-y-3 text-gray-200">
          <p>
            {t("cta.p1")}
          </p>
          <p>
            {t("cta.p2")}
            <br />
            {t("cta.p3")}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/issues"
            className="rounded-xl bg-white px-6 py-3 text-sm font-medium text-gray-900 transition hover:bg-gray-100"
          >
            {t("cta.browseIssues")}
          </Link>
        </div>
      </div>
    </section>
  );
}
