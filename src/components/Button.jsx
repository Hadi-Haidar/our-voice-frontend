export default function Button({
  children,
  variant = "primary",
  type = "button",
  onClick,
}) {
  const base =
    "rounded-xl px-5 py-2.5 text-sm font-medium transition focus:outline-none";

  const variants = {
    primary: "bg-red-600 text-white hover:bg-red-700",
    secondary:
      "border border-gray-300 text-gray-700 hover:bg-gray-100",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]}`}
    >
      {children}
    </button>
  );
}
