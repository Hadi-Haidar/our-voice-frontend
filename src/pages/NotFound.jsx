import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="text-gray-600">
        The page you are looking for does not exist.
      </p>

      <Link
        to="/"
        className="inline-block rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition"
      >
        Go back home
      </Link>
    </section>
  );
}
