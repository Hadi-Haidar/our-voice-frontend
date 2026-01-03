export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <p className="text-sm text-gray-500 text-center sm:text-left whitespace-normal break-words">
          © {new Date().getFullYear()} Our Voice 🇱🇧 — Built for the community.
        </p>
      </div>
    </footer>
  );
}
