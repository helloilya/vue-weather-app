<!--
	Usage:
	<TemperatureControl
		v-model="{number}" />
-->

<template>
	<select :value="value" class="temperature-control" @change="updateValue($event)">
		<option v-for="item in list" :key="item.id" :value="item.id">{{item.name}}</option>
	</select>
</template>

<script>
import { TEMPERATURE_UNITS } from '@/constants';

export default {
	name: 'TemperatureControl',
	model: {
		prop: 'value',
		event: 'change',
	},
	props: {
		value: {
			type: Number,
			required: true,
		},
	},
	data: () => ({
		list: TEMPERATURE_UNITS,
	}),
	methods: {
		updateValue($event) {
			this.$emit('change', Number($event.target.value));
		},
	},
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
		background-color: #fff;
	}
}
</style>