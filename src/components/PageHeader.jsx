export default function PageHeader({ title, description }) {
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h1>
      {description && (
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
      )}
    </div>
  );
}
