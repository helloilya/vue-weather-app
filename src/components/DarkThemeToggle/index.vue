<!--
	Usage:
	<DarkThemeToggle />
-->

<template>
	<button type="button"
			class="dark-theme-toggle"
			:title="isDark ? hints.dark : hints.light"
			@click="toggleDark">
		{{isDark ? 'Dark' : 'Light'}}
	</button>
</template>

<script>
export default {
	name: 'DarkThemeToggle',
};
</script>

<script setup>
import { useDark, useToggle } from '@vueuse/core';

const hints = {
	light: 'Show me the dark side of the moon',
	dark: 'It\'s hard to breathe, turn it on',
};

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<style scoped lang="scss">
.dark-theme-toggle {
	all: unset;
	width: 18px;
	height: 18px;
	padding: 0;
	background: url('/images/icon-sun.svg') 50% 50% / cover no-repeat;
	text-indent: -9999px;
	cursor: pointer;

	.dark & {
		background-image: url('/images/icon-moon.svg');
	}
}
</style>