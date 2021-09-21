<!--
	Usage:
	<WeatherCard
		:weather="{!WeatherModel}"
		:unit-object="{!UnitModel}" />
-->

<template>
	<div v-if="weather.temp" class="weather-card">
		<img :src="'//openweathermap.org/img/wn/' + weather.clouds.icon + '@2x.png'" :alt="weather.clouds.main" class="weather-card-img" width="150" height="150">
		<div class="weather-card-data">{{temperature}} {{unitObject.symbol}}, {{wind}} &#9780;</div>
	</div>
</template>

<script>
export default {
	name: 'WeatherCard',
};
</script>

<script setup>
import { computed, toRefs } from 'vue';
import { TEMPERATURE_UNITS } from '@/constants';

const props = defineProps({
	weather: {
		type: Object,
		required: true,
	},
	unitObject: {
		type: Object,
		required: true,
	},
});

const { weather, unitObject } = toRefs(props);
const wind = computed(() => Math.round(weather.value.wind));
const temperature = computed(() => {
	const value = unitObject.value.key === TEMPERATURE_UNITS[0].key ? weather.value.temp : weather.value.temp * 1.8 + 32;
	return Math.round(value);
});
</script>

<style scoped lang="scss">
.weather-card {
	text-align: center;

	&-img {
		margin-top: -40px;
	}

	&-data {
		font-size: 2.5rem;
		line-height: 2rem;
		font-weight: 400;
	}
}
</style>