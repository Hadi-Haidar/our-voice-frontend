import { Link } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">{t("notFound.title")}</h1>
      <p className="text-gray-600">
        {t("notFound.description")}
      </p>

      <Link
        to="/"
        className="inline-block rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition"
      >
        {t("notFound.goHome")}
      </Link>
    </section>
  );
}
