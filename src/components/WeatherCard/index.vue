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
import { TEMPERATURE_UNITS } from '@/constants';

export default {
	name: 'WeatherCard',
	props: {
		weather: {
			type: Object,
			required: true,
		},
		unitObject: {
			type: Object,
			required: true,
		},
	},
	computed: {
		wind() {
			return Math.round(this.weather.wind);
		},
		temperature() {
			const value = this.unitObject.key === TEMPERATURE_UNITS[0].key ? this.weather.temp : this.weather.temp * 1.8 + 32;
			return Math.round(value);
		},
	},
};
</script>

<style scoped lang="scss">
.weather-card {
	margin-bottom: 30px;
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