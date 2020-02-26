<!--
	Usage:
	<LocationControl
		v-model="{string}"
		:placeholder="{string}"
		:disabled="{boolean}"
		:required="{boolean}"
		@key-enter="{function}" />
-->

<!-- @todo: Support custom v-model.lazy [github.com/vuejs/vue/issues/6914] -->

<template>
	<div class="location-control">
		<input
			:value="value"
			:placeholder="placeholder"
			:disabled="disabled"
			:required="required"
			@input="$emit('input', $event.target.value)"
			@keyup.enter="$emit('key-enter', $event.target.value)">
	</div>
</template>

<script>
export default {
	name: 'LocationControl',
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
};
</script>