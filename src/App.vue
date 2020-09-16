<template>
	<div id="app">
		<div v-if="!isLoaded">Loading ...</div>
		<div v-if="isLoaded">
			<router-view />
			<TemperatureControl ref="select" v-model="unit" class="app-temperature-control" @change="onChangeUnit()" />
			<div class="app-menu">
				<router-link to="/">Home</router-link>
				<router-link v-if="routeName !== 'error'" to="/about">About</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import TemperatureControl from '@/controls/TemperatureControl';
import { constants as settingStore } from '@/store/modules/setting';
import { constants as weatherStore } from '@/store/modules/weather';

export default {
	name: 'App',
	components: {
		TemperatureControl,
	},
	data: () => ({
		unit: 0,
		routeName: '',
	}),
	computed: {
		...mapGetters({
			isLoaded: weatherStore.getters.isLoaded,
			unitObject: settingStore.getters.unit,
		}),
	},
	watch: {
		'$route.name': function(name) {
			this.routeName = name;
		},
	},
	created() {
		this.unit = this.unitObject.id;
		this.routeName = this.$route.name;
		this.init();
	},
	methods: {
		...mapActions({
			init: weatherStore.actions.getDefault,
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