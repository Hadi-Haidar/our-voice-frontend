import { useLanguage } from "../hooks/useLanguage";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="mt-16 border-t border-gray-200 dark:border-gray-800 transition-colors duration-200">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <p className="text-sm text-gray-400 dark:text-gray-500 text-center whitespace-normal break-words">
          © {new Date().getFullYear()} {t("footer.copyright")}
        </p>
      </div>
    </footer>
  );
}
