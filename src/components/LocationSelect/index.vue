<!--
	Usage:
	<LocationSelect
		:location="{string}"
		@callback="{function}" />
-->

<template>
	<div class="location-select">
		<LocationAutoSuggestionControl ref="input" v-model="selectedLocation" placeholder="City name" @key-enter="updateLocation" />
		<button type="button" class="location-select-button" :disabled="!!selectedLocation" @click="updateLocation">Search</button>
	</div>
</template>

<script>
import LocationAutoSuggestionControl from '@/controls/LocationAutoSuggestionControl';

export default {
	name: 'LocationSelect',
	components: {
		LocationAutoSuggestionControl,
	},
	props: {
		location: {
			type: String,
			required: true,
		},
	},
	emits: [
		'callback',
	],
	data: () => ({
		selectedLocation: '',
	}),
	created() {
		this.selectedLocation = this.location;
	},
	methods: {
		updateLocation() {
			this.$emit('callback', this.selectedLocation);
		},
	},
};
</script>

<style scoped lang="scss">
.location-select {
	position: relative;

	&-message {
		position: absolute;
		bottom: -1.5em;
		left: 0;
		padding: 0 10px;
		font-size: 0.8em;
		line-height: 1em;
	}

	&-button {
		position: absolute;
		top: 3px;
		right: 3px;
		z-index: 1;
	}
}
</style>