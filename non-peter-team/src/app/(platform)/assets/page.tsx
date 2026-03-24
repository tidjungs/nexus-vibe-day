export default function AssetsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Assets</h1>
        <p className="mt-2 text-slate-600">Browse available assets to add to your portfolio</p>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search assets..."
          className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none"
        />
        <select className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:border-blue-500 focus:outline-none">
          <option value="">All Types</option>
          <option value="stock">Stock</option>
          <option value="bond">Bond</option>
          <option value="fund">Fund</option>
          <option value="crypto">Crypto</option>
        </select>
      </div>

      {/* Assets Table Placeholder */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                Symbol
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                Name
              </th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-slate-900">
                Price
              </th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-slate-900">
                Change
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-200 hover:bg-slate-50">
              <td colSpan={4} className="px-6 py-8 text-center text-slate-600">
                No assets found. Load assets from the API.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
