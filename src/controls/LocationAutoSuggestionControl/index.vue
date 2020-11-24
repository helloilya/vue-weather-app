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
			:value="value"
			:placeholder="placeholder"
			:disabled="disabled"
			:required="required"
			@input="loadCities($event.target.value)"
			@keyup.enter="onEnterHandler($event.target.value)">
	</div>
</template>

<script>
import api from '@/api';

export default {
	name: 'LocationAutoSuggestionControl',
	model: {
		prop: 'value',
		event: 'input',
	},
	props: {
		value: {
			type: String,
			default: '',
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
	data: () => ({
		timer: null,
		suggestion: '',
	}),
	methods: {
		loadCities(value) {
			this.suggestion = '';
			this.$emit('input', value);

			clearTimeout(this.timer);
			this.timer = setTimeout(async () => {
				if (value.length > 2) {
					const isLowerCase = value[0] === value[0].toLowerCase();
					/** @type {!CityModel[]} */
					const response = await api.geo.getCities(value);
					if (response.length) {
						const name = response[0].name;
						this.suggestion = isLowerCase ? name.toLowerCase() : name;
					}
				}
			}, 150);
		},
		onEnterHandler(value) {
			this.$emit('key-enter', value);
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