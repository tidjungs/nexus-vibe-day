import { useState } from 'react'
import { Search } from 'lucide-react'
import type { Fund } from '@/types/fund'
import { FundCard } from '@/components/funds/FundCard'
import { FundDetailModal } from '@/components/funds/FundDetailModal'
import { funds } from '@/data/funds'

type Category = 'all' | Fund['category']

const categories: { value: Category; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'money', label: 'Jitta Money' },
  { value: 'omni', label: 'Omni Fund' },
  { value: 'global-etf', label: 'Global ETF' },
  { value: 'thematic', label: 'Thematic' },
  { value: 'ranking', label: 'Jitta Ranking' },
]

export function FundsPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<Category>('all')
  const [selected, setSelected] = useState<Fund | null>(null)

  const filtered = funds.filter(f => {
    const matchCat = category === 'all' || f.category === category
    const matchQ = !query || f.name.toLowerCase().includes(query.toLowerCase()) || f.shortName.toLowerCase().includes(query.toLowerCase())
    return matchCat && matchQ
  })

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-brand-text hidden lg:block mb-1">Funds</h1>
        <p className="text-brand-muted text-sm">Explore all Jitta WOW! investment funds</p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted" />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search funds..."
          className="w-full bg-brand-surface border border-brand-border rounded-xl pl-9 pr-4 py-2.5 text-sm text-brand-text placeholder:text-brand-muted focus:outline-none focus:border-brand-green transition-colors shadow-sm"
        />
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        {categories.map(c => (
          <button
            key={c.value}
            onClick={() => setCategory(c.value)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              category === c.value
                ? 'bg-brand-green text-white shadow-sm'
                : 'bg-brand-surface border border-brand-border text-brand-muted hover:text-brand-text hover:border-brand-green'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(f => (
          <FundCard key={f.id} fund={f} onClick={setSelected} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-20 text-brand-muted">
            No funds match your search.
          </div>
        )}
      </div>

      <FundDetailModal fund={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
