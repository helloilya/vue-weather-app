<template>
	<div id="app">
		<div v-if="!isLoaded">Loading ...</div>
		<div v-if="isLoaded">
			<router-view />
			<TemperatureControl ref="select" v-model="unit" class="app-temperature-control" @change="onChangeUnit()" />
			<div class="app-menu">
				<router-link v-if="currentState !== homeState"
							 :to="{ name: homeState, query: { location: lastSavedCityName.toLowerCase() }}">
					Home
				</router-link>
				<router-link v-else to="/about">About</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { constants as settingStore } from '@/store/modules/setting';
import { constants as weatherStore } from '@/store/modules/weather';
import { ROUTE_STATES } from '@/constants';

const TemperatureControl = () => import(/* webpackChunkName: 'TemperatureControl' */ '@/controls/TemperatureControl');

export default {
	name: 'App',
	components: {
		TemperatureControl,
	},
	data: () => ({
		unit: 0,
		currentState: '',
		homeState: ROUTE_STATES.HOME,
	}),
	computed: {
		...mapGetters({
			isLoaded: weatherStore.getters.isLoaded,
			unitObject: settingStore.getters.unit,
			lastSavedCityName: settingStore.getters.lastSavedCityName,
		}),
	},
	watch: {
		'$route.name': function(name) {
			this.currentState = name;
		},
	},
	created() {
		this.unit = this.unitObject.id;
		this.currentState = this.$route.name;
		this.initWeather();
	},
	methods: {
		...mapActions({
			initWeather: weatherStore.actions.initWeather,
			updateUnit: settingStore.actions.updateUnit,
		}),
		onChangeUnit() {
			this.updateUnit(this.unit);
		},
	},
};
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
		position: absolute;
		top: 20px;
		right: 25px;
		z-index: 1;
		line-height: 2.1em;

		.is-active {
			display: none;
		}
	}
}
</style>