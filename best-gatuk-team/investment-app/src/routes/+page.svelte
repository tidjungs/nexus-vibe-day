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

<div class="min-h-screen bg-periwinkle-100">
	<!-- Nav -->
	<nav class="bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-periwinkle-200">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
			<div class="flex items-center gap-3">
				<div class="w-9 h-9 rounded-xl bg-vivid-blue flex items-center justify-center">
					<svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
						<path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
					</svg>
				</div>
				<span class="font-bold text-xl tracking-tight text-navy">NexusVest</span>
			</div>
			<div class="flex items-center gap-4">
				<span class="hidden sm:block text-sm text-navy-light/60">Updated {lastUpdated}</span>
				<div class="w-9 h-9 rounded-full bg-vivid-blue text-white flex items-center justify-center text-sm font-bold shadow-lg shadow-vivid-blue/30">B</div>
			</div>
		</div>
	</nav>

	<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

		<!-- Hero NAV Card -->
		<section class="rounded-3xl bg-vivid-blue p-8 sm:p-10 text-white relative overflow-hidden">
			<div class="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4"></div>
			<div class="absolute bottom-0 left-1/3 w-48 h-48 bg-white/5 rounded-full translate-y-1/2"></div>
			<div class="relative z-1">
				<p class="text-sm font-medium text-white/70 mb-2 uppercase tracking-widest">Total Portfolio NAV</p>
				<div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
					<div>
						<h1 class="text-4xl sm:text-6xl font-extrabold tracking-tight">{fmtCurrency(nav)}</h1>
						<div class="mt-3 flex flex-wrap items-center gap-3">
							<span class="text-sm text-white/60">Cost Basis: {fmtCurrency(cost)}</span>
							<span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold {totalGL >= 0 ? 'bg-neon-green text-navy' : 'bg-red-400 text-white'}">
								{totalGL >= 0 ? '↑' : '↓'} {totalGL >= 0 ? '+' : ''}{fmtCurrency(totalGL)} ({totalGL >= 0 ? '+' : ''}{fmt(totalGLPct)}%)
							</span>
						</div>
					</div>
					<div class="flex gap-5 sm:gap-8">
						{#each allocation as a}
							<div class="text-center">
								<div class="text-xs text-white/50 mb-1">{a.assetClass}</div>
								<div class="text-lg font-bold">{fmt(a.pct, 1)}%</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</section>

		<!-- Summary Cards -->
		<section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
			{#each allocation as a}
				<div class="rounded-2xl bg-white p-5 shadow-sm hover:shadow-md transition-shadow border border-periwinkle-200/60">
					<div class="flex items-center gap-3 mb-3">
						<div class="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold" style="background:{assetClassColors[a.assetClass]}">
							{a.assetClass[0]}
						</div>
						<p class="text-sm font-medium text-navy-light/60">{a.assetClass}</p>
					</div>
					<p class="text-2xl font-bold text-navy">{fmtCurrency(a.value)}</p>
					<div class="mt-2 flex items-center gap-2">
						<div class="flex-1 h-2 bg-periwinkle-100 rounded-full overflow-hidden">
							<div class="h-full rounded-full transition-all" style="width:{a.pct}%; background:{assetClassColors[a.assetClass]}"></div>
						</div>
						<span class="text-xs font-semibold text-navy-light/50">{fmt(a.pct, 1)}%</span>
					</div>
				</div>
			{/each}
		</section>

		<!-- Allocation Donut + Snapshot -->
		<section class="grid grid-cols-1 md:grid-cols-3 gap-6">
			<div class="md:col-span-1 rounded-2xl bg-white border border-periwinkle-200/60 p-6 shadow-sm flex flex-col items-center justify-center">
				<p class="text-sm font-bold text-navy mb-5">Asset Allocation</p>
				<svg viewBox="0 0 160 160" class="w-40 h-40">
					{#each arcs() as arc}
						<circle
							cx="80" cy="80" r={RADIUS}
							fill="none"
							stroke={arc.color}
							stroke-width="24"
							stroke-dasharray="{arc.dash} {CIRCUMFERENCE - arc.dash}"
							stroke-dashoffset={arc.offset}
							transform="rotate(-90 80 80)"
							stroke-linecap="round"
						/>
					{/each}
					<text x="80" y="76" text-anchor="middle" class="fill-navy-light/50 font-medium" font-size="9">NAV</text>
					<text x="80" y="92" text-anchor="middle" class="fill-navy font-extrabold" font-size="11">{fmtCurrency(nav / 1000)}k</text>
				</svg>
				<div class="mt-6 space-y-3 w-full">
					{#each allocation as a}
						<div class="flex items-center justify-between text-sm">
							<div class="flex items-center gap-2.5">
								<div class="w-3 h-3 rounded-full" style="background:{assetClassColors[a.assetClass]}"></div>
								<span class="text-navy-light/70">{a.assetClass}</span>
							</div>
							<span class="font-semibold text-navy">{fmt(a.pct, 1)}%</span>
						</div>
					{/each}
				</div>
			</div>

			<!-- Quick Stats -->
			<div class="md:col-span-2 rounded-2xl bg-white border border-periwinkle-200/60 p-6 shadow-sm">
				<p class="text-sm font-bold text-navy mb-5">Portfolio Snapshot</p>
				<div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
					<div class="bg-periwinkle-50 rounded-xl p-4">
						<p class="text-xs font-medium text-navy-light/50">Holdings</p>
						<p class="text-2xl font-extrabold text-navy mt-1">{holdings.length}</p>
					</div>
					<div class="bg-periwinkle-50 rounded-xl p-4">
						<p class="text-xs font-medium text-navy-light/50">Total Return</p>
						<p class="text-2xl font-extrabold mt-1 {totalGL >= 0 ? 'text-green-600' : 'text-red-500'}">
							{totalGL >= 0 ? '+' : ''}{fmt(totalGLPct)}%
						</p>
					</div>
					<div class="bg-periwinkle-50 rounded-xl p-4">
						<p class="text-xs font-medium text-navy-light/50">Unrealized P&L</p>
						<p class="text-2xl font-extrabold mt-1 {totalGL >= 0 ? 'text-green-600' : 'text-red-500'}">
							{totalGL >= 0 ? '+' : ''}{fmtCurrency(totalGL)}
						</p>
					</div>
					{#each allocation as a}
						<div class="bg-periwinkle-50 rounded-xl p-4">
							<p class="text-xs font-medium text-navy-light/50">{a.assetClass}</p>
							<p class="text-base font-bold text-navy mt-1">{fmtCurrency(a.value)}</p>
							<div class="flex items-center gap-1.5 mt-1">
								<div class="w-2 h-2 rounded-full" style="background:{assetClassColors[a.assetClass]}"></div>
								<span class="text-xs font-semibold" style="color:{assetClassColors[a.assetClass]}">{fmt(a.pct, 1)}%</span>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</section>

		<!-- Portfolio Table -->
		<section class="rounded-2xl bg-white border border-periwinkle-200/60 shadow-sm overflow-hidden">
			<!-- Table Header + Filters -->
			<div class="p-5 sm:p-6 border-b border-periwinkle-100 flex flex-col sm:flex-row sm:items-center gap-3">
				<h2 class="text-lg font-bold text-navy flex-1">Portfolio Holdings</h2>
				<div class="flex flex-col sm:flex-row gap-2 sm:items-center">
					<!-- Search -->
					<div class="relative">
						<svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-light/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
						</svg>
						<input
							bind:value={searchQuery}
							placeholder="Search..."
							class="pl-9 pr-3 py-2 text-sm bg-periwinkle-50 border border-periwinkle-200 rounded-xl text-navy placeholder-navy-light/40 focus:outline-none focus:ring-2 focus:ring-vivid-blue/30 focus:border-vivid-blue w-full sm:w-48"
						/>
					</div>
					<!-- Filter -->
					<select
						bind:value={filterClass}
						class="py-2 px-3 text-sm bg-periwinkle-50 border border-periwinkle-200 rounded-xl text-navy focus:outline-none focus:ring-2 focus:ring-vivid-blue/30 focus:border-vivid-blue"
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
						<tr class="border-b border-periwinkle-100 text-xs text-navy-light/50 uppercase tracking-wider">
							<th class="text-left px-6 py-3.5 cursor-pointer hover:text-vivid-blue select-none transition-colors" onclick={() => toggleSort('name')}>
								Name {sortIcon('name')}
							</th>
							<th class="text-left px-4 py-3.5 cursor-pointer hover:text-vivid-blue select-none transition-colors" onclick={() => toggleSort('assetClass')}>
								Class {sortIcon('assetClass')}
							</th>
							<th class="text-right px-4 py-3.5">Units</th>
							<th class="text-right px-4 py-3.5">Avg Cost</th>
							<th class="text-right px-4 py-3.5">Price</th>
							<th class="text-right px-4 py-3.5 cursor-pointer hover:text-vivid-blue select-none transition-colors" onclick={() => toggleSort('marketValue')}>
								Mkt Value {sortIcon('marketValue')}
							</th>
							<th class="text-right px-4 py-3.5 cursor-pointer hover:text-vivid-blue select-none transition-colors" onclick={() => toggleSort('gainLoss')}>
								Gain/Loss {sortIcon('gainLoss')}
							</th>
							<th class="text-right px-6 py-3.5 cursor-pointer hover:text-vivid-blue select-none transition-colors" onclick={() => toggleSort('dayChange')}>
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
							<tr class="border-b border-periwinkle-50 hover:bg-periwinkle-50/60 transition-colors">
								<td class="px-6 py-4">
									<div class="font-semibold text-navy">{h.name}</div>
									<div class="text-xs text-navy-light/50 mt-0.5">{h.ticker} · {fmt(weight, 1)}% of NAV</div>
								</td>
								<td class="px-4 py-4">
									<span class="inline-block px-2.5 py-1 rounded-lg text-xs font-semibold" style="background:{assetClassColors[h.assetClass]}15; color:{assetClassColors[h.assetClass]}">
										{h.assetClass}
									</span>
								</td>
								<td class="px-4 py-4 text-right text-navy-light/70">{fmt(h.units, 0)}</td>
								<td class="px-4 py-4 text-right text-navy-light/70">{fmtCurrency(h.avgCost)}</td>
								<td class="px-4 py-4 text-right text-navy-light/70">{fmtCurrency(h.currentPrice)}</td>
								<td class="px-4 py-4 text-right font-bold text-navy">{fmtCurrency(mv)}</td>
								<td class="px-4 py-4 text-right">
									<div class="font-semibold {gl >= 0 ? 'text-green-600' : 'text-red-500'}">{gl >= 0 ? '+' : ''}{fmtCurrency(gl)}</div>
									<div class="text-xs {gl >= 0 ? 'text-green-500' : 'text-red-400'}">{gl >= 0 ? '+' : ''}{fmt(glPct)}%</div>
								</td>
								<td class="px-6 py-4 text-right">
									<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold {h.dayChange >= 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}">
										{h.dayChange >= 0 ? '↑' : '↓'} {h.dayChange >= 0 ? '+' : ''}{fmt(h.dayChange)}%
									</span>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
				{#if sorted().length === 0}
					<div class="py-16 text-center text-navy-light/40">No holdings match your filter.</div>
				{/if}
			</div>

			<!-- Mobile Cards -->
			<div class="md:hidden divide-y divide-periwinkle-100">
				{#each sorted() as h (h.id)}
					{@const mv = marketValue(h)}
					{@const gl = h.units * h.currentPrice - h.units * h.avgCost}
					{@const glPct = (gl / (h.units * h.avgCost)) * 100}
					{@const weight = (mv / nav) * 100}
					<div class="p-4 space-y-3">
						<div class="flex items-start justify-between gap-2">
							<div>
								<div class="font-semibold text-navy text-sm">{h.name}</div>
								<div class="text-xs text-navy-light/50 mt-0.5">{h.ticker}</div>
							</div>
							<span class="flex-shrink-0 inline-block px-2.5 py-1 rounded-lg text-xs font-semibold" style="background:{assetClassColors[h.assetClass]}15; color:{assetClassColors[h.assetClass]}">
								{h.assetClass}
							</span>
						</div>
						<div class="grid grid-cols-3 gap-2 text-xs">
							<div>
								<div class="text-navy-light/50">Market Value</div>
								<div class="font-bold text-navy">{fmtCurrency(mv)}</div>
							</div>
							<div>
								<div class="text-navy-light/50">Gain/Loss</div>
								<div class="font-bold {gl >= 0 ? 'text-green-600' : 'text-red-500'}">{gl >= 0 ? '+' : ''}{fmtCurrency(gl)}</div>
								<div class="text-xs {gl >= 0 ? 'text-green-500' : 'text-red-400'}">{gl >= 0 ? '+' : ''}{fmt(glPct)}%</div>
							</div>
							<div>
								<div class="text-navy-light/50">Day Change</div>
								<div class="font-bold {h.dayChange >= 0 ? 'text-green-600' : 'text-red-500'}">{h.dayChange >= 0 ? '+' : ''}{fmt(h.dayChange)}%</div>
							</div>
						</div>
						<div class="flex items-center justify-between text-xs text-navy-light/50">
							<span>{fmt(h.units, 0)} units @ {fmtCurrency(h.currentPrice)}</span>
							<span>{fmt(weight, 1)}% of NAV</span>
						</div>
						<div class="h-1.5 bg-periwinkle-100 rounded-full overflow-hidden">
							<div class="h-full rounded-full" style="width:{weight}%; background:{assetClassColors[h.assetClass]}"></div>
						</div>
					</div>
				{/each}
				{#if sorted().length === 0}
					<div class="py-16 text-center text-navy-light/40">No holdings match your filter.</div>
				{/if}
			</div>

			<!-- Footer -->
			{#if sorted().length > 0}
				<div class="px-6 py-3.5 border-t border-periwinkle-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-navy-light/50">
					<span>{sorted().length} of {holdings.length} holdings</span>
					<span>All values in USD</span>
				</div>
			{/if}
		</section>
	</main>

	<footer class="border-t border-periwinkle-200 mt-8 py-8 text-center text-xs text-navy-light/40">
		NexusVest · Investment Dashboard · Data for demonstration purposes only
	</footer>
</div>
