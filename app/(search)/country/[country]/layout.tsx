import Link from "next/link";

export default async function companyLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ country: string }>;
}) {
  const { country } = await params;
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <div className="p-4 max-w-full sm:max-w-[70vw] 3xl:max-w-[80vw] mx-auto">
        <div className="flex gap-6 mb-8 border-b border-gray-700">
          <Link
            href={`/country/${country}/movie`}
            className="pb-2 text-lg font-medium hover:text-red-600 transition-colors duration-300 border-b-2 border-transparent hover:border-red-600"
          >
            Films
          </Link>
          <Link
            href={`/country/${country}/tv`}
            className="pb-2 text-lg font-medium hover:text-red-600 transition-colors duration-300 border-b-2 border-transparent hover:border-red-600"
          >
            Séries
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
