import { browser } from '$app/environment';

function getInitial(): 'light' | 'dark' {
	if (!browser) return 'light';
	const stored = localStorage.getItem('theme');
	if (stored === 'dark' || stored === 'light') return stored;
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

const themeState = $state<{ value: 'light' | 'dark' }>({ value: getInitial() });

export function getTheme() {
	return themeState.value;
}

export function toggleTheme() {
	themeState.value = themeState.value === 'light' ? 'dark' : 'light';
	if (browser) {
		localStorage.setItem('theme', themeState.value);
		document.documentElement.classList.toggle('dark', themeState.value === 'dark');
	}
}

export function initTheme() {
	if (browser) {
		document.documentElement.classList.toggle('dark', themeState.value === 'dark');
	}
}
