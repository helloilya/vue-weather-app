<template>
	<div class="container">
		<WeatherCard :weather="weather" :unit-object="unitObject" />
		<LocationSelect :location="location" @callback="updateWeather" />
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import LocationSelect from '@/components/LocationSelect';
import WeatherCard from '@/components/WeatherCard';
import { constants as settingStore } from '@/store/modules/setting';
import { constants as weatherStore } from '@/store/modules/weather';

export default {
	name: 'Home',
	metaInfo: {
		title: 'Vue Weather App',
	},
	components: {
		LocationSelect,
		WeatherCard,
	},
	data: () => ({
		location: '',
	}),
	computed: {
		...mapGetters({
			weather: weatherStore.getters.weather,
			unitObject: settingStore.getters.unit,
		}),
	},
	created() {
		this.location = this.weather.name;
	},
	methods: {
		...mapActions({
			updateWeather: weatherStore.actions.update,
		}),
	},
};
</script>