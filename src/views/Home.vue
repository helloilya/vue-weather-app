<template>
	<div class="container">
		<WeatherCard :weather="weather" :unit-object="unitObject" class="container-weather-card" />
		<LocationSelect :location="weather.name" @callback="updateWeather" />
	</div>
</template>

<script>
export default {
	name: 'Home',
};
</script>

<script setup>
import { computed, defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';
import { constants as settingStore } from '@/store/modules/setting';
import { constants as weatherStore } from '@/store/modules/weather';

const LocationSelect = defineAsyncComponent(() => import(/* webpackChunkName: 'LocationSelect' */ '@/components/LocationSelect'));
const WeatherCard = defineAsyncComponent(() => import(/* webpackChunkName: 'WeatherCard' */ '@/components/WeatherCard'));

const store = useStore();

const weather = computed(() => store.getters[weatherStore.getters.weather]);
const unitObject = computed(() => store.getters[settingStore.getters.unit]);

/**
 * Dispatches update weather action.
 * @param {string} location
 */
const updateWeather = (location) => store.dispatch(weatherStore.actions.update, location);
</script>

<style scoped lang="scss">
.weather-card {
	margin-bottom: 30px;
}
</style>