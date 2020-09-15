<!--
	Usage:
	<LocationSelect
		:location="{string}"
		@callback="{function}" />
-->

<template>
	<ValidationProvider v-slot="{errors, invalid}" ref="city" tag="div" rules="city|required" class="location-select">
		<LocationControl ref="input" v-model="selectedLocation" class="location-select-field" placeholder="City name" @key-enter="updateLocation" />
		<button type="button" class="location-select-button" :disabled="invalid" @click="updateLocation">Search</button>
		<span class="location-select-message">{{errors[0]}}</span>
	</ValidationProvider>
</template>

<script>
import LocationControl from '@/controls/LocationControl';

export default {
	name: 'LocationSelect',
	components: {
		LocationControl,
	},
	props: {
		location: {
			type: String,
			required: true,
		},
	},
	data: () => ({
		selectedLocation: '',
	}),
	created() {
		this.selectedLocation = this.location;
	},
	methods: {
		async updateLocation() {
			const {valid} = await this.$refs.city.validate();
			if (valid) {
				this.$emit('callback', this.selectedLocation);
			}
		},
	},
};
</script>

<style scoped lang="scss">
.location-select {
	position: relative;

	&-field {
		padding-right: 80px;
	}

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
	}
}
</style>