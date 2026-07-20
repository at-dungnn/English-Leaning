import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
      <Link href="/" className="mb-6 text-xl font-bold tracking-tight">
        English<span className="text-primary">Leaning</span>
      </Link>
      {children}
    </div>
  );
}
