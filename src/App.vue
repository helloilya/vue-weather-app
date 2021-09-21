<template>
	<div id="app">
		<div v-if="!isLoaded">Loading ...</div>
		<div v-if="isLoaded">
			<router-view />
			<TemperatureControl v-model="unit" class="app-temperature-control" @change="changeUnit" />
			<div class="app-menu">
				<router-link v-if="route.name !== ROUTE_STATES.HOME"
							 :to="{
							 	name: ROUTE_STATES.HOME, query: { [QUERY_PARAMS.LOCATION]: savedLocation.toLowerCase(), }
							 }">
					Home
				</router-link>
				<router-link v-else to="/about">About</router-link>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'App',
};
</script>

<script setup>
import { computed, defineAsyncComponent, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { useTitle } from '@vueuse/core';
import { constants as settingStore } from '@/store/modules/setting';
import { constants as weatherStore } from '@/store/modules/weather';
import { QUERY_PARAMS, ROUTE_STATES } from '@/constants';

const TemperatureControl = defineAsyncComponent(() => import(/* webpackChunkName: 'TemperatureControl' */ '@/controls/TemperatureControl'));

const store = useStore();
const route = useRoute();
const title = useTitle();

const isLoaded = computed(() => store.getters[weatherStore.getters.isLoaded]);
const unitObject = computed(() => store.getters[settingStore.getters.unit]);
const savedLocation = computed(() => store.getters[settingStore.getters.lastSavedCityName]);
const unit = ref(unitObject.value.id);

/**
 * Dispatches update weather action.
 * @param {number} unit
 */
const changeUnit = () => store.dispatch(settingStore.actions.updateUnit, unit.value);

// Inits

store.dispatch(weatherStore.actions.initWeather);
watch(route, (route) => {
	title.value = route.meta.title;
});
</script>

<style scoped lang="scss">
.app {
	&-temperature-control {
		position: absolute;
		top: 20px;
		left: 20px;
		z-index: 1;
	}

	&-menu {
		display: flex;
		align-items: center;
		position: absolute;
		top: 20px;
		right: 25px;
		gap: 20px;
		z-index: 1;
		line-height: 2.1em;

		.is-active {
			display: none;
		}
	}
}
</style>