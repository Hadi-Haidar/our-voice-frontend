import PageHeader from "../components/PageHeader";
import { useLanguage } from "../hooks/useLanguage";

export default function About() {
  const { t } = useLanguage();

  return (
    <section className="max-w-3xl space-y-6">
      <PageHeader
        title={t("about.title")}
        description={t("about.description")}
      />

      <p className="text-gray-600 dark:text-gray-400">
        {t("about.p1")}
      </p>

      <p className="text-gray-600 dark:text-gray-400">
        {t("about.p2")}
      </p>
    </section>
  );
}
