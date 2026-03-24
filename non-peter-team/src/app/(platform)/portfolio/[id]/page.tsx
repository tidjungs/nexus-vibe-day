export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Portfolio {id}</h1>
        <p className="mt-2 text-slate-600">Portfolio details and holdings</p>
      </div>

      {/* Placeholder content */}
      <div className="rounded-xl border border-slate-200 bg-white p-8">
        <p className="text-slate-600">Portfolio details coming soon</p>
      </div>
    </div>
  );
}
