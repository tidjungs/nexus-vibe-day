<script lang="ts">
	import { goto } from '$app/navigation';
	import { getTheme, toggleTheme } from '$lib/stores/theme.svelte';
	import {
		holdingById,
		getFilteredHistory,
		getTransactionsForHolding,
		assetClassColors,
		riskColors,
		transactionTypeColors,
		fmtCurrency,
		fmt,
		type Duration,
		type TransactionType
	} from '$lib/data';

	let { data }: { data: { id: string } } = $props();

	const holding        = $derived(holdingById(data.id)!);
	const totalValue     = $derived(holding.units * holding.currentPrice);
	const totalInvested  = $derived(holding.units * holding.avgCost);
	const overallGain    = $derived(totalValue - totalInvested);
	const overallGainPct = $derived((overallGain / totalInvested) * 100);

	// ── Chart constants ────────────────────────────────────────────
	const CW = 800, CH = 220;
	const PAD_L = 58, PAD_R = 16, PAD_T = 16, PAD_B = 34;
	const PW = CW - PAD_L - PAD_R;   // 726
	const PH = CH - PAD_T - PAD_B;   // 170
	const Y_BOTTOM = PAD_T + PH;      // 186

	const durations: Duration[] = ['1D', '1W', '1M', '3M', '6M', 'YTD', 'All'];
	const txFilters: (TransactionType | 'All')[] = ['All', 'deposit', 'buy', 'sell', 'withdraw'];

	let selectedDuration  = $state<Duration>('3M');
	let selectedTxFilter  = $state<TransactionType | 'All'>('All');

	let lastUpdated = new Date().toLocaleString('en-US', {
		month: 'short', day: 'numeric', year: 'numeric',
		hour: '2-digit', minute: '2-digit'
	});

	// ── Chart derivation ──────────────────────────────────────────
	const chartData = $derived(() => {
		const pts = getFilteredHistory(data.id, selectedDuration);
		if (pts.length < 2) return null;

		const navs    = pts.map(p => p.nav);
		const rawMin  = Math.min(...navs);
		const rawMax  = Math.max(...navs);
		const range   = rawMax - rawMin || rawMin * 0.01;
		const lo      = rawMin - range * 0.05;
		const hi      = rawMax + range * 0.05;

		const toX = (i: number) => PAD_L + (i / (pts.length - 1)) * PW;
		const toY = (nav: number) => PAD_T + (1 - (nav - lo) / (hi - lo)) * PH;

		const plotPts = pts.map((p, i) => ({ x: toX(i), y: toY(p.nav), nav: p.nav, date: p.date }));

		const linePath = plotPts
			.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
			.join(' ');

		const last = plotPts[plotPts.length - 1];
		const first = plotPts[0];
		const areaPath =
			linePath +
			` L${last.x.toFixed(1)},${Y_BOTTOM} L${first.x.toFixed(1)},${Y_BOTTOM} Z`;

		// Y ticks: 4 evenly spaced, top→bottom
		const yTicks = [0, 1, 2, 3].map(i => {
			const nav = hi - ((hi - lo) / 3) * i;
			return { nav: parseFloat(nav.toFixed(2)), y: toY(nav) };
		});

		// X ticks: 5 evenly spaced
		const tickCount = Math.min(5, pts.length);
		const xTicks = Array.from({ length: tickCount }, (_, i) => {
			const idx = Math.round((pts.length - 1) * i / (tickCount - 1));
			const [y, m, d] = pts[idx].date.split('-').map(Number);
			const date = new Date(y, m - 1, d);
			const label = (selectedDuration === 'All' || selectedDuration === 'YTD')
				? date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
				: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
			return { x: toX(idx), label };
		});

		const periodChange    = last.nav - first.nav;
		const periodChangePct = (periodChange / first.nav) * 100;
		const isPositive      = periodChange >= 0;
		const color           = isPositive ? '#3b5bff' : '#ef4444';

		return { plotPts, linePath, areaPath, yTicks, xTicks, periodChange, periodChangePct, isPositive, color, last };
	});

	// ── Transaction derivation ────────────────────────────────────
	const filteredTxs = $derived(() => {
		const all = getTransactionsForHolding(data.id);
		return selectedTxFilter === 'All' ? all : all.filter(t => t.type === selectedTxFilter);
	});

	// ── Helpers ───────────────────────────────────────────────────
	function txIcon(type: TransactionType): string {
		return { deposit: '↓', buy: '+', sell: '−', withdraw: '↑' }[type];
	}

	function fmtDate(dateStr: string): string {
		const [y, m, d] = dateStr.split('-').map(Number);
		return new Date(y, m - 1, d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
	}
</script>

<div class="min-h-screen bg-periwinkle-100 dark:bg-dark-bg transition-colors">

	<!-- Nav -->
	<nav class="bg-white/80 dark:bg-dark-card/80 backdrop-blur-md sticky top-0 z-10 border-b border-periwinkle-200 dark:border-dark-border transition-colors">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
			<div class="flex items-center gap-3">
				<div class="w-9 h-9 rounded-xl bg-vivid-blue flex items-center justify-center">
					<svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
						<path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
					</svg>
				</div>
				<span class="font-bold text-xl tracking-tight text-navy dark:text-white">NexusVest</span>
			</div>
			<div class="flex items-center gap-4">
				<span class="hidden sm:block text-sm text-navy-light/60 dark:text-slate-400">Updated {lastUpdated}</span>
				<button
					onclick={toggleTheme}
					class="w-9 h-9 rounded-xl flex items-center justify-center border border-periwinkle-200 dark:border-dark-border bg-periwinkle-50 dark:bg-dark-card-alt hover:bg-periwinkle-200 dark:hover:bg-dark-border transition-colors cursor-pointer"
					aria-label="Toggle dark mode"
				>
					{#if getTheme() === 'light'}
						<svg class="w-5 h-5 text-navy-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
						</svg>
					{:else}
						<svg class="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
						</svg>
					{/if}
				</button>
				<div class="w-9 h-9 rounded-full bg-vivid-blue text-white flex items-center justify-center text-sm font-bold shadow-lg shadow-vivid-blue/30">B</div>
			</div>
		</div>
	</nav>

	<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

		<!-- Back + Fund identity -->
		<div>
			<button
				onclick={() => goto('/')}
				class="inline-flex items-center gap-1.5 text-sm text-navy-light/60 dark:text-slate-400 hover:text-vivid-blue dark:hover:text-vivid-blue-light transition-colors mb-5 cursor-pointer"
			>
				<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
				</svg>
				My Jitta Wealth Holdings
			</button>

			<div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
				<div>
					<h1 class="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white tracking-tight">
						{holding.name}
					</h1>
					<div class="flex flex-wrap items-center gap-2 mt-2">
						<span class="text-sm font-mono font-semibold text-navy-light/50 dark:text-slate-500">{holding.ticker}</span>
						<span
							class="px-2.5 py-1 rounded-lg text-xs font-semibold"
							style="background:{assetClassColors[holding.assetClass]}18; color:{assetClassColors[holding.assetClass]}"
						>{holding.assetClass}</span>
						<span
							class="px-2 py-0.5 rounded-md text-xs font-semibold"
							style="background:{riskColors[holding.riskLevel]}18; color:{riskColors[holding.riskLevel]}"
						>{holding.riskLevel} Risk</span>
					</div>
					<p class="text-sm text-navy-light/50 dark:text-slate-500 mt-1.5">
						Expected return · {holding.expectedReturn}
					</p>
				</div>
				<div class="rounded-2xl bg-white dark:bg-dark-card border border-periwinkle-200/60 dark:border-dark-border px-5 py-4 text-center shadow-sm flex-shrink-0">
					<p class="text-xs font-medium text-navy-light/50 dark:text-slate-500">Today's Change</p>
					<p class="text-xl font-extrabold mt-0.5 {holding.dayChange >= 0 ? 'text-green-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}">
						{holding.dayChange >= 0 ? '+' : ''}{fmt(holding.dayChange)}%
					</p>
				</div>
			</div>
		</div>

		<!-- Hero value card -->
		<section class="rounded-3xl bg-vivid-blue dark:bg-vivid-blue-dark p-6 sm:p-8 text-white relative overflow-hidden">
			<div class="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4"></div>
			<div class="absolute bottom-0 left-1/4 w-44 h-44 bg-white/5 rounded-full translate-y-1/2"></div>
			<div class="relative">
				<p class="text-sm font-medium text-white/70 uppercase tracking-widest mb-2">Total Value</p>
				<h2 class="text-4xl sm:text-5xl font-extrabold tracking-tight">{fmtCurrency(totalValue)}</h2>
				<div class="mt-3 flex flex-wrap items-center gap-3">
					<span class="text-sm text-white/60">Invested: {fmtCurrency(totalInvested)}</span>
					<span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold {overallGain >= 0 ? 'bg-neon-green text-navy' : 'bg-red-400 text-white'}">
						{overallGain >= 0 ? '↑' : '↓'}
						{overallGain >= 0 ? '+' : ''}{fmtCurrency(overallGain)}
						({overallGain >= 0 ? '+' : ''}{fmt(overallGainPct)}%)
					</span>
				</div>
			</div>
		</section>

		<!-- Chart card -->
		<section class="rounded-2xl bg-white dark:bg-dark-card border border-periwinkle-200/60 dark:border-dark-border shadow-sm overflow-hidden">
			<div class="p-5 sm:p-6">

				<!-- Header row -->
				<div class="flex items-center justify-between mb-4">
					<p class="text-sm font-bold text-navy dark:text-white">NAV per Unit</p>
					{#if chartData() !== null}
						<span class="text-sm font-semibold {chartData()!.isPositive ? 'text-green-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}">
							{chartData()!.isPositive ? '+' : ''}{fmt(chartData()!.periodChangePct)}% this period
						</span>
					{/if}
				</div>

				<!-- Duration selector -->
				<div class="flex gap-1 mb-5 overflow-x-auto pb-1">
					{#each durations as dur}
						<button
							onclick={() => (selectedDuration = dur)}
							class="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors
								{selectedDuration === dur
									? 'bg-vivid-blue text-white'
									: 'text-navy-light/60 dark:text-slate-400 hover:bg-periwinkle-100 dark:hover:bg-dark-card-alt'}"
						>{dur}</button>
					{/each}
				</div>

				<!-- Chart SVG -->
				{#if chartData() !== null}
					{#each [chartData()!] as cd}
						<svg viewBox="0 0 {CW} {CH}" class="w-full">
							<defs>
								<linearGradient id="area-grad" x1="0" y1="0" x2="0" y2="1">
									<stop offset="0%"   stop-color={cd.color} stop-opacity="0.22" />
									<stop offset="100%" stop-color={cd.color} stop-opacity="0.02" />
								</linearGradient>
							</defs>

							<!-- Horizontal grid lines -->
							{#each cd.yTicks as tick}
								<line
									x1={PAD_L} y1={tick.y.toFixed(1)}
									x2={CW - PAD_R} y2={tick.y.toFixed(1)}
									stroke="rgba(148,163,184,0.22)" stroke-width="1"
								/>
							{/each}

							<!-- Area fill -->
							<path d={cd.areaPath} fill="url(#area-grad)" />

							<!-- Price line -->
							<path d={cd.linePath} fill="none" stroke={cd.color} stroke-width="1.8" stroke-linejoin="round" />

							<!-- Last-point marker -->
							<circle cx={cd.last.x.toFixed(1)} cy={cd.last.y.toFixed(1)} r="5" fill={cd.color} />
							<circle cx={cd.last.x.toFixed(1)} cy={cd.last.y.toFixed(1)} r="9" fill={cd.color} opacity="0.18" />

							<!-- Y-axis labels -->
							{#each cd.yTicks as tick}
								<text
									x={PAD_L - 6} y={(tick.y + 4).toFixed(1)}
									text-anchor="end" font-size="10"
									class="fill-navy-light/50 dark:fill-slate-500"
								>฿{fmt(tick.nav, 2)}</text>
							{/each}

							<!-- X-axis labels -->
							{#each cd.xTicks as tick}
								<text
									x={tick.x.toFixed(1)} y={CH - 5}
									text-anchor="middle" font-size="10"
									class="fill-navy-light/50 dark:fill-slate-500"
								>{tick.label}</text>
							{/each}
						</svg>

						<!-- Period stats bar -->
						<div class="mt-3 pt-3 border-t border-periwinkle-100 dark:border-dark-border flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-navy-light/50 dark:text-slate-500">
							<span>Period change:</span>
							<span class="font-semibold {cd.isPositive ? 'text-green-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}">
								{cd.isPositive ? '+' : ''}{fmt(cd.periodChange, 4)} / unit
							</span>
							<span class="text-periwinkle-300 dark:text-dark-border">·</span>
							<span class="font-semibold {cd.isPositive ? 'text-green-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}">
								{cd.isPositive ? '+' : ''}{fmtCurrency(cd.periodChange * holding.units)} total
							</span>
						</div>
					{/each}
				{:else}
					<div class="flex items-center justify-center h-40 text-sm text-navy-light/40 dark:text-slate-600">
						Not enough data for this period
					</div>
				{/if}

			</div>
		</section>

		<!-- Fund stats row -->
		<section class="grid grid-cols-2 sm:grid-cols-4 gap-4">
			{#each [
				{ label: 'Units Held',     value: fmt(holding.units, 0)              },
				{ label: 'Avg NAV Paid',   value: fmtCurrency(holding.avgCost)       },
				{ label: 'Current NAV',    value: fmtCurrency(holding.currentPrice)  },
				{ label: 'Total Invested', value: fmtCurrency(totalInvested)         },
			] as stat}
				<div class="rounded-2xl bg-white dark:bg-dark-card border border-periwinkle-200/60 dark:border-dark-border p-4 shadow-sm">
					<p class="text-xs font-medium text-navy-light/50 dark:text-slate-500">{stat.label}</p>
					<p class="text-lg font-bold text-navy dark:text-white mt-1">{stat.value}</p>
				</div>
			{/each}
		</section>

		<!-- Transactions -->
		<section class="rounded-2xl bg-white dark:bg-dark-card border border-periwinkle-200/60 dark:border-dark-border shadow-sm overflow-hidden">

			<div class="p-5 sm:p-6 border-b border-periwinkle-100 dark:border-dark-border flex flex-col sm:flex-row sm:items-center gap-3">
				<h3 class="text-lg font-bold text-navy dark:text-white flex-1">Transactions</h3>
				<div class="flex gap-1 overflow-x-auto pb-0.5">
					{#each txFilters as f}
						<button
							onclick={() => (selectedTxFilter = f)}
							class="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors
								{selectedTxFilter === f
									? 'bg-vivid-blue text-white'
									: 'text-navy-light/60 dark:text-slate-400 hover:bg-periwinkle-100 dark:hover:bg-dark-card-alt'}"
						>{f}</button>
					{/each}
				</div>
			</div>

			<div class="divide-y divide-periwinkle-50 dark:divide-dark-border/50">
				{#each filteredTxs() as tx (tx.id)}
					<div class="flex items-center px-5 sm:px-6 py-4 gap-4 hover:bg-periwinkle-50/60 dark:hover:bg-dark-card-alt/40 transition-colors">

						<!-- Type icon -->
						<div
							class="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
							style="background:{transactionTypeColors[tx.type]}"
						>{txIcon(tx.type)}</div>

						<!-- Info -->
						<div class="flex-1 min-w-0">
							<div class="flex items-center gap-2 flex-wrap">
								<span class="font-semibold text-navy dark:text-white text-sm capitalize">{tx.type}</span>
								<span class="text-xs text-navy-light/40 dark:text-slate-500">{fmtDate(tx.date)}</span>
							</div>
							{#if tx.units > 0}
								<p class="text-xs text-navy-light/50 dark:text-slate-500 mt-0.5">
									{fmt(tx.units, 0)} units @ {fmtCurrency(tx.navPerUnit)}
								</p>
							{/if}
						</div>

						<!-- Amount -->
						<div class="text-right flex-shrink-0">
							<p class="font-semibold text-navy dark:text-white text-sm">{fmtCurrency(tx.amount)}</p>
						</div>

					</div>
				{/each}
				{#if filteredTxs().length === 0}
					<div class="py-12 text-center text-sm text-navy-light/40 dark:text-slate-600">
						No transactions match this filter.
					</div>
				{/if}
			</div>

			{#if filteredTxs().length > 0}
				<div class="px-6 py-3 border-t border-periwinkle-100 dark:border-dark-border text-xs text-navy-light/50 dark:text-slate-500">
					{filteredTxs().length} transaction{filteredTxs().length !== 1 ? 's' : ''}
				</div>
			{/if}

		</section>

	</main>

	<footer class="border-t border-periwinkle-200 dark:border-dark-border mt-8 py-8 text-center text-xs text-navy-light/40 dark:text-slate-600">
		NexusVest · Investment Dashboard · Data for demonstration purposes only
	</footer>

</div>
