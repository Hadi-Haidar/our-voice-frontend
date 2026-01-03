import PageHeader from "../components/PageHeader";

export default function About() {
  return (
    <section className="max-w-3xl space-y-6">
      <PageHeader
  title="About Our Voice 🇱🇧"
  description="Why this platform exists and who it is for."
/>


      <p className="text-gray-600">
        Our Voice is a community-driven platform that allows people in Lebanon
        to raise local issues, share ideas, and follow their progress.
      </p>

      <p className="text-gray-600">
        The goal is to create transparency, encourage participation, and give
        citizens a simple way to make their voices heard.
      </p>
    </section>
  );
}
