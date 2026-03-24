<script lang="ts">
	import {
		holdings,
		totalNAV,
		totalCost,
		gainLoss,
		gainLossPct,
		marketValue,
		allocationByClass,
		assetClassColors,
		fmtCurrency,
		fmt,
		type AssetClass,
		type Holding
	} from '$lib/data';

	const nav = totalNAV(holdings);
	const cost = totalCost(holdings);
	const totalGL = nav - cost;
	const totalGLPct = (totalGL / cost) * 100;
	const allocation = allocationByClass(holdings);

	type SortKey = 'name' | 'assetClass' | 'marketValue' | 'gainLoss' | 'dayChange';
	let sortKey = $state<SortKey>('marketValue');
	let sortAsc = $state(false);
	let filterClass = $state<AssetClass | 'All'>('All');
	let searchQuery = $state('');

	const assetClasses: (AssetClass | 'All')[] = ['All', 'Equity', 'Fixed Income', 'Alternatives', 'Cash'];

	const sorted = $derived(() => {
		let list = holdings.filter((h) => {
			const matchClass = filterClass === 'All' || h.assetClass === filterClass;
			const matchSearch =
				searchQuery === '' ||
				h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				h.ticker.toLowerCase().includes(searchQuery.toLowerCase());
			return matchClass && matchSearch;
		});

		list = [...list].sort((a, b) => {
			let av: number | string, bv: number | string;
			switch (sortKey) {
				case 'name':
					av = a.name;
					bv = b.name;
					break;
				case 'assetClass':
					av = a.assetClass;
					bv = b.assetClass;
					break;
				case 'marketValue':
					av = marketValue(a);
					bv = marketValue(b);
					break;
				case 'gainLoss':
					av = gainLoss(a);
					bv = gainLoss(b);
					break;
				case 'dayChange':
					av = a.dayChange;
					bv = b.dayChange;
					break;
				default:
					return 0;
			}
			if (av < bv) return sortAsc ? -1 : 1;
			if (av > bv) return sortAsc ? 1 : -1;
			return 0;
		});
		return list;
	});

	function toggleSort(key: SortKey) {
		if (sortKey === key) {
			sortAsc = !sortAsc;
		} else {
			sortKey = key;
			sortAsc = false;
		}
	}

	function sortIcon(key: SortKey) {
		if (sortKey !== key) return '↕';
		return sortAsc ? '↑' : '↓';
	}

	// Donut chart SVG
	const RADIUS = 60;
	const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

	interface Arc {
		assetClass: AssetClass;
		color: string;
		offset: number;
		dash: number;
	}

	const arcs = $derived(() => {
		let offset = 0;
		return allocation.map((a) => {
			const dash = (a.pct / 100) * CIRCUMFERENCE;
			const arc: Arc = {
				assetClass: a.assetClass,
				color: assetClassColors[a.assetClass],
				offset: CIRCUMFERENCE - offset,
				dash
			};
			offset += dash;
			return arc;
		});
	});

	let lastUpdated = new Date().toLocaleString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	});
</script>

<div class="min-h-screen bg-slate-950 text-slate-100">
	<!-- Nav -->
	<nav class="border-b border-slate-800 bg-slate-900 sticky top-0 z-10">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
			<div class="flex items-center gap-2">
				<svg class="w-7 h-7 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
				</svg>
				<span class="font-bold text-lg tracking-tight text-white">NexusVest</span>
			</div>
			<div class="flex items-center gap-3">
				<span class="hidden sm:block text-xs text-slate-400">Updated {lastUpdated}</span>
				<div class="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-semibold">B</div>
			</div>
		</div>
	</nav>

	<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

		<!-- Hero NAV Card -->
		<section class="rounded-2xl bg-gradient-to-br from-indigo-900/60 to-slate-900 border border-indigo-800/40 p-6 sm:p-8">
			<p class="text-sm font-medium text-indigo-300 mb-1 uppercase tracking-widest">Total Portfolio NAV</p>
			<div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
				<div>
					<h1 class="text-4xl sm:text-5xl font-bold text-white tracking-tight">{fmtCurrency(nav)}</h1>
					<div class="mt-2 flex items-center gap-2">
						<span class="text-sm text-slate-400">Total Cost: {fmtCurrency(cost)}</span>
						<span class="text-sm {totalGL >= 0 ? 'text-emerald-400' : 'text-red-400'} font-semibold">
							{totalGL >= 0 ? '+' : ''}{fmtCurrency(totalGL)} ({totalGL >= 0 ? '+' : ''}{fmt(totalGLPct)}%)
						</span>
					</div>
				</div>
				<div class="flex gap-4 sm:gap-6">
					{#each allocation as a}
						<div class="text-center">
							<div class="text-xs text-slate-400 mb-1">{a.assetClass}</div>
							<div class="text-sm font-semibold" style="color:{assetClassColors[a.assetClass]}">{fmt(a.pct, 1)}%</div>
						</div>
					{/each}
				</div>
			</div>
		</section>

		<!-- Summary Cards + Donut -->
		<section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
			{#each allocation as a}
				<div class="rounded-xl bg-slate-900 border border-slate-800 p-4 flex items-center gap-4">
					<div class="w-3 h-10 rounded-full flex-shrink-0" style="background:{assetClassColors[a.assetClass]}"></div>
					<div class="min-w-0">
						<p class="text-xs text-slate-400 truncate">{a.assetClass}</p>
						<p class="text-lg font-bold text-white">{fmtCurrency(a.value)}</p>
						<p class="text-xs text-slate-400">{fmt(a.pct, 1)}% of NAV</p>
					</div>
				</div>
			{/each}
		</section>

		<!-- Allocation Donut + Legend -->
		<section class="grid grid-cols-1 md:grid-cols-3 gap-6">
			<div class="md:col-span-1 rounded-xl bg-slate-900 border border-slate-800 p-6 flex flex-col items-center justify-center">
				<p class="text-sm font-semibold text-slate-300 mb-4">Asset Allocation</p>
				<svg viewBox="0 0 160 160" class="w-36 h-36">
					{#each arcs() as arc}
						<circle
							cx="80" cy="80" r={RADIUS}
							fill="none"
							stroke={arc.color}
							stroke-width="28"
							stroke-dasharray="{arc.dash} {CIRCUMFERENCE - arc.dash}"
							stroke-dashoffset={arc.offset}
							transform="rotate(-90 80 80)"
						/>
					{/each}
					<text x="80" y="76" text-anchor="middle" class="text-xs fill-slate-300 font-semibold" font-size="9">NAV</text>
					<text x="80" y="90" text-anchor="middle" class="text-xs fill-white font-bold" font-size="10">{fmtCurrency(nav / 1000)}k</text>
				</svg>
				<div class="mt-4 space-y-2 w-full">
					{#each allocation as a}
						<div class="flex items-center justify-between text-xs">
							<div class="flex items-center gap-2">
								<div class="w-2.5 h-2.5 rounded-full" style="background:{assetClassColors[a.assetClass]}"></div>
								<span class="text-slate-300">{a.assetClass}</span>
							</div>
							<span class="text-slate-400">{fmt(a.pct, 1)}%</span>
						</div>
					{/each}
				</div>
			</div>

			<!-- Quick Stats -->
			<div class="md:col-span-2 rounded-xl bg-slate-900 border border-slate-800 p-6">
				<p class="text-sm font-semibold text-slate-300 mb-4">Portfolio Snapshot</p>
				<div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
					<div class="bg-slate-800 rounded-lg p-3">
						<p class="text-xs text-slate-400">Holdings</p>
						<p class="text-xl font-bold text-white mt-1">{holdings.length}</p>
					</div>
					<div class="bg-slate-800 rounded-lg p-3">
						<p class="text-xs text-slate-400">Total Return</p>
						<p class="text-xl font-bold {totalGL >= 0 ? 'text-emerald-400' : 'text-red-400'} mt-1">
							{totalGL >= 0 ? '+' : ''}{fmt(totalGLPct)}%
						</p>
					</div>
					<div class="bg-slate-800 rounded-lg p-3">
						<p class="text-xs text-slate-400">Unrealized P&L</p>
						<p class="text-xl font-bold {totalGL >= 0 ? 'text-emerald-400' : 'text-red-400'} mt-1">
							{totalGL >= 0 ? '+' : ''}{fmtCurrency(totalGL)}
						</p>
					</div>
					{#each allocation as a}
						<div class="bg-slate-800 rounded-lg p-3">
							<p class="text-xs text-slate-400">{a.assetClass}</p>
							<p class="text-sm font-semibold text-white mt-1">{fmtCurrency(a.value)}</p>
							<p class="text-xs mt-0.5" style="color:{assetClassColors[a.assetClass]}">{fmt(a.pct, 1)}%</p>
						</div>
					{/each}
				</div>
			</div>
		</section>

		<!-- Portfolio Table -->
		<section class="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden">
			<!-- Table Header + Filters -->
			<div class="p-4 sm:p-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center gap-3">
				<h2 class="text-base font-semibold text-white flex-1">Portfolio Holdings</h2>
				<div class="flex flex-col sm:flex-row gap-2 sm:items-center">
					<!-- Search -->
					<div class="relative">
						<svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
						</svg>
						<input
							bind:value={searchQuery}
							placeholder="Search..."
							class="pl-9 pr-3 py-1.5 text-sm bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 w-full sm:w-44"
						/>
					</div>
					<!-- Filter -->
					<select
						bind:value={filterClass}
						class="py-1.5 px-3 text-sm bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
					>
						{#each assetClasses as cls}
							<option value={cls}>{cls}</option>
						{/each}
					</select>
				</div>
			</div>

			<!-- Desktop Table -->
			<div class="hidden md:block overflow-x-auto">
				<table class="w-full text-sm">
					<thead>
						<tr class="border-b border-slate-800 text-xs text-slate-400 uppercase tracking-wider">
							<th class="text-left px-6 py-3 cursor-pointer hover:text-slate-200 select-none" onclick={() => toggleSort('name')}>
								Name {sortIcon('name')}
							</th>
							<th class="text-left px-4 py-3 cursor-pointer hover:text-slate-200 select-none" onclick={() => toggleSort('assetClass')}>
								Class {sortIcon('assetClass')}
							</th>
							<th class="text-right px-4 py-3">Units</th>
							<th class="text-right px-4 py-3">Avg Cost</th>
							<th class="text-right px-4 py-3">Price</th>
							<th class="text-right px-4 py-3 cursor-pointer hover:text-slate-200 select-none" onclick={() => toggleSort('marketValue')}>
								Mkt Value {sortIcon('marketValue')}
							</th>
							<th class="text-right px-4 py-3 cursor-pointer hover:text-slate-200 select-none" onclick={() => toggleSort('gainLoss')}>
								Gain/Loss {sortIcon('gainLoss')}
							</th>
							<th class="text-right px-6 py-3 cursor-pointer hover:text-slate-200 select-none" onclick={() => toggleSort('dayChange')}>
								Day {sortIcon('dayChange')}
							</th>
						</tr>
					</thead>
					<tbody>
						{#each sorted() as h (h.id)}
							{@const mv = marketValue(h)}
							{@const gl = h.units * h.currentPrice - h.units * h.avgCost}
							{@const glPct = (gl / (h.units * h.avgCost)) * 100}
							{@const weight = (mv / nav) * 100}
							<tr class="border-b border-slate-800/60 hover:bg-slate-800/40 transition-colors">
								<td class="px-6 py-4">
									<div class="font-medium text-white">{h.name}</div>
									<div class="text-xs text-slate-400">{h.ticker} · {fmt(weight, 1)}% of NAV</div>
								</td>
								<td class="px-4 py-4">
									<span class="inline-block px-2 py-0.5 rounded text-xs font-medium" style="background:{assetClassColors[h.assetClass]}22; color:{assetClassColors[h.assetClass]}">
										{h.assetClass}
									</span>
								</td>
								<td class="px-4 py-4 text-right text-slate-300">{fmt(h.units, 0)}</td>
								<td class="px-4 py-4 text-right text-slate-300">{fmtCurrency(h.avgCost)}</td>
								<td class="px-4 py-4 text-right text-slate-300">{fmtCurrency(h.currentPrice)}</td>
								<td class="px-4 py-4 text-right font-semibold text-white">{fmtCurrency(mv)}</td>
								<td class="px-4 py-4 text-right">
									<div class="{gl >= 0 ? 'text-emerald-400' : 'text-red-400'} font-medium">{gl >= 0 ? '+' : ''}{fmtCurrency(gl)}</div>
									<div class="text-xs {gl >= 0 ? 'text-emerald-500' : 'text-red-500'}">{gl >= 0 ? '+' : ''}{fmt(glPct)}%</div>
								</td>
								<td class="px-6 py-4 text-right">
									<span class="text-sm font-medium {h.dayChange >= 0 ? 'text-emerald-400' : 'text-red-400'}">
										{h.dayChange >= 0 ? '+' : ''}{fmt(h.dayChange)}%
									</span>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
				{#if sorted().length === 0}
					<div class="py-12 text-center text-slate-400">No holdings match your filter.</div>
				{/if}
			</div>

			<!-- Mobile Cards -->
			<div class="md:hidden divide-y divide-slate-800">
				{#each sorted() as h (h.id)}
					{@const mv = marketValue(h)}
					{@const gl = h.units * h.currentPrice - h.units * h.avgCost}
					{@const glPct = (gl / (h.units * h.avgCost)) * 100}
					{@const weight = (mv / nav) * 100}
					<div class="p-4 space-y-3">
						<div class="flex items-start justify-between gap-2">
							<div>
								<div class="font-medium text-white text-sm">{h.name}</div>
								<div class="text-xs text-slate-400 mt-0.5">{h.ticker}</div>
							</div>
							<span class="flex-shrink-0 inline-block px-2 py-0.5 rounded text-xs font-medium" style="background:{assetClassColors[h.assetClass]}22; color:{assetClassColors[h.assetClass]}">
								{h.assetClass}
							</span>
						</div>
						<div class="grid grid-cols-3 gap-2 text-xs">
							<div>
								<div class="text-slate-400">Market Value</div>
								<div class="font-semibold text-white">{fmtCurrency(mv)}</div>
							</div>
							<div>
								<div class="text-slate-400">Gain/Loss</div>
								<div class="font-semibold {gl >= 0 ? 'text-emerald-400' : 'text-red-400'}">{gl >= 0 ? '+' : ''}{fmtCurrency(gl)}</div>
								<div class="text-xs {gl >= 0 ? 'text-emerald-500' : 'text-red-500'}">{gl >= 0 ? '+' : ''}{fmt(glPct)}%</div>
							</div>
							<div>
								<div class="text-slate-400">Day Change</div>
								<div class="font-semibold {h.dayChange >= 0 ? 'text-emerald-400' : 'text-red-400'}">{h.dayChange >= 0 ? '+' : ''}{fmt(h.dayChange)}%</div>
							</div>
						</div>
						<div class="flex items-center justify-between text-xs text-slate-400">
							<span>{fmt(h.units, 0)} units @ {fmtCurrency(h.currentPrice)}</span>
							<span>{fmt(weight, 1)}% of NAV</span>
						</div>
						<!-- Weight bar -->
						<div class="h-1 bg-slate-800 rounded-full overflow-hidden">
							<div class="h-full rounded-full" style="width:{weight}%; background:{assetClassColors[h.assetClass]}"></div>
						</div>
					</div>
				{/each}
				{#if sorted().length === 0}
					<div class="py-12 text-center text-slate-400">No holdings match your filter.</div>
				{/if}
			</div>

			<!-- Footer -->
			{#if sorted().length > 0}
				<div class="px-6 py-3 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-400">
					<span>{sorted().length} of {holdings.length} holdings</span>
					<span>All values in USD</span>
				</div>
			{/if}
		</section>
	</main>

	<footer class="border-t border-slate-800 mt-8 py-6 text-center text-xs text-slate-500">
		NexusVest · Investment Dashboard · Data for demonstration purposes only
	</footer>
</div>
