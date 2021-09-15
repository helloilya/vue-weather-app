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
			@keyup.enter="onEnterHandler($event)">
	</div>
</template>

<script>
import api from '@/api';

export default {
	name: 'LocationAutoSuggestionControl',
	props: {
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
	},
	emits: [
		'update:modelValue',
		'key-enter',
	],
	data: () => ({
		timer: null,
		suggestion: '',
	}),
	methods: {
		loadCities($event) {
			const value = $event.target.value;
			this.$emit('update:modelValue', value);

			this.suggestion = '';
			clearTimeout(this.timer);
			this.timer = setTimeout(async () => {
				/** @type {!CityModel[]} */
				const response = await api.geo.getCities(value);
				if (value && response.length) {
					this.suggestion = response[0].name.toLowerCase();
				}
			}, 250);
		},
		onEnterHandler($event) {
			this.$emit('key-enter', $event.target.value);
		},
	},
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