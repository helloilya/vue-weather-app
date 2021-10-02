<!--
	Usage:
	<TemperatureControl v-model="{number}" />
-->

<template>
	<select :value="modelValue" class="temperature-control" @input="onSelectChange($event)">
		<option v-for="item in TEMPERATURE_UNITS" :key="item.id" :value="item.id">{{item.name}}</option>
	</select>
</template>

<script>
export default {
	name: 'TemperatureControl',
};
</script>

<script setup>
import { TEMPERATURE_UNITS } from '@/constants';

const emit = defineEmits({
	'update:modelValue': null,
});
const props = defineProps({
	modelValue: {
		type: Number,
		required: true,
	},
});

/**
 * Emits select update event.
 */
const onSelectChange = ($event) => {
	emit('update:modelValue', Number($event.target.value));
};
</script>

<style scoped lang="scss">
.temperature-control {
	padding: 8px 10px 8px 30px;
	border: 0;
	border-radius: 5px;
	line-height: 1em;
	font-weight: 300;
	background: url('/images/icon-temperature.svg') 5px 50% / 21px 21px no-repeat;
	cursor: pointer;
	outline: none;
	appearance: none;
	transition: background .4s;

	&:hover,
	&:focus {
		background-color: var(--field-bg-color);
	}

	.dark & {
		background-image: url('/images/icon-temperature-dark.svg');
	}
}
</style>