<!--
	Usage:
	<WeatherCard
		:weather="{!WeatherModel}"
		:unit-object="{!UnitModel}" />
-->

<template>
	<div v-if="weather.temp" class="weather-card">
		<img :src="'//openweathermap.org/img/wn/' + weather.clouds.icon + '@2x.png'" :alt="weather.clouds.main" class="weather-card-img" width="150" height="150">
		<div class="weather-card-data">{{weather.temp | round | temperature(unitObject)}}, {{weather.wind | round}} &#9780;</div>
	</div>
</template>

<script>
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