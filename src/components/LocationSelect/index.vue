<!--
	Usage:
	<LocationSelect
		:location="{string}"
		@callback="{function}" />
-->

<template>
	<div class="location-select">
		<LocationAutoSuggestionControl v-model="selectedLocation" placeholder="Please type city" @key-enter="updateLocation" />
		<button type="button" class="location-select-button" title="Search" :disabled="!selectedLocation" @click="updateLocation(selectedLocation)">Search</button>
	</div>
</template>

<script>
export default {
	name: 'LocationSelect',
};
</script>

<script setup>
import LocationAutoSuggestionControl from '@/controls/LocationAutoSuggestionControl';
import { computed, ref } from 'vue';

const emit = defineEmits(['callback']);
const props = defineProps({
	location: {
		type: String,
		required: true,
	},
});

const selectedLocation = ref(props.location);

/**
 * Updates location callback.
 * @param {string} location
 */
const updateLocation = (location) => {
	emit('callback', location);
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
		height: 32px;
		position: absolute;
		top: 3px;
		right: 3px;
		padding: 0 15px;
		line-height: 34px;
		color: #fff;
		background-color: var(--field-button-bg-color);
		border-radius: 3px;
		z-index: 1;
		transition: all .4s;

		&:hover,
		&:focus {
			background-image: linear-gradient(transparent, rgba(0,0,0,.05) 40%, rgba(0,0,0,.1));
		}

		&:active {
			box-shadow: 0 0 0 1px rgba(0,0,0,.15) inset,
						0 0 6px rgba(0,0,0,.2) inset;
		}

		&[disabled],
		&[disabled]:hover,
		&[disabled]:focus {
			opacity: 0.5;
		}
	}
}
</style>