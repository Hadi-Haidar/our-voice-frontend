export default function PageHeader({ title, description }) {
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold">{title}</h1>
      {description && (
        <p className="text-gray-600">{description}</p>
      )}
    </div>
  );
}
