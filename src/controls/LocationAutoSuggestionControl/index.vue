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
	<div class="location-suggestion-control" :data-suggestion="suggestion">
		<input
			class="location-suggestion-control-input"
			:value="modelValue"
			:placeholder="placeholder"
			:disabled="disabled"
			:required="required"
			@input="onInputUpdate($event)"
			@keyup.enter="onInputKeyEnter($event)">
	</div>
</template>

<script>
export default {
	name: 'LocationAutoSuggestionControl',
};
</script>

<script setup>
import { ref } from 'vue';
import useLocationSuggestion from '@/use/locationSuggestion';

const emit = defineEmits({
	'update:modelValue': null,
	'key-enter': null,
});
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

const query = ref(props.modelValue);
const suggestion = useLocationSuggestion(query);

/**
 * Updates input query and emits onUpdate event.
 */
const onInputUpdate = ($event) => {
	query.value = $event.target.value;
	emit('update:modelValue', $event.target.value);
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
	background: var(--field-bg-color);
	border-radius: 4px;
	transition: background .4s;

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
		overflow: hidden;
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