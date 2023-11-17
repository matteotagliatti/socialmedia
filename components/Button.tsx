export default function Button({
  children,
  outline = false,
}: {
  children: React.ReactNode;
  outline?: boolean;
}) {
  if (outline) {
    return (
      <button className="bg-transparent text-primary font-medium rounded-lg px-4 py-2 border border-primary">
        {children}
      </button>
    );
  }

  return (
    <button className="bg-primary text-black font-medium rounded-lg px-4 py-2">
      {children}
    </button>
  );
}
