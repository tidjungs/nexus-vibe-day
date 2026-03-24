<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { initTheme } from '$lib/stores/theme.svelte';

	let { children } = $props();

	$effect(() => {
		initTheme();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
