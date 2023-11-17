export default function Button({
  children,
  outline = false,
}: {
  children: React.ReactNode;
  outline?: boolean;
}) {
  if (outline) {
    return (
      <button className="bg-transparent text-primary font-medium rounded-lg px-4 py-2 border border-primary hover:bg-[#1f1f1f] transition-colors">
        {children}
      </button>
    );
  }

  return (
    <button className="bg-primary hover:bg-primary/90 transition-colors text-black font-medium rounded-lg px-4 py-2">
      {children}
    </button>
  );
}
