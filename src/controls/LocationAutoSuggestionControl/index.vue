<!--
	Usage:
	<LocationAutoSuggestionControl
		v-model="{string}"
		:placeholder="{string}"
		:disabled="{boolean}"
		:required="{boolean}"
		@key-enter="{function}" />
-->

<template>
	<div class="bg-light location-suggestion-control" :data-suggestion="suggestion">
		<input
			class="location-suggestion-control-input"
			:value="modelValue"
			:placeholder="placeholder"
			:disabled="disabled"
			:required="required"
			@input="loadCities($event)"
			@keyup.enter="onInputKeyEnter($event)">
	</div>
</template>

<script>
export default {
	name: 'LocationAutoSuggestionControl',
};
</script>

<script setup>
import api from '@/api';
import { ref } from 'vue';

const emit = defineEmits([
	'update:modelValue',
	'key-enter',
]);
const props = defineProps({
	modelValue: {
		type: String,
		required: true,
	},
	placeholder: {
		type: String,
		default: '',
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	required: {
		type: Boolean,
		default: false,
	},
});

const timer = ref(null);
const suggestion = ref('');

/**
 * Loads the list of cities.
 */
const loadCities = ($event) => {
	const query = $event.target.value;
	emit('update:modelValue', query);

	suggestion.value = '';
	clearTimeout(timer.value);
	timer.value = setTimeout(async () => {
		if (query && query.length > 2) {
			/** @type {!CityModel[]} */
			const response = await api.geo.getCities(query);
			if (response.length) {
				suggestion.value = response[0].name.toLowerCase();
			}
		}
	}, 250);
};

/**
 * Emits input keyEnter event.
 */
const onInputKeyEnter = ($event) => {
	emit('key-enter', $event.target.value);
};
</script>

<style scoped lang="scss">
.location-suggestion-control {
	position: relative;

	&::after {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 0;
		padding: 7px 10px;
		text-align: left;
		text-indent: 1px;
		content: attr(data-suggestion);
		opacity: 0.4;
	}

	&-input {
		position: relative;
		z-index: 1;
		padding-right: 80px;
		background-color: transparent;
	}
}
</style>