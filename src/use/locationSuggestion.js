import api from '@/api';
import { debouncedWatch } from '@vueuse/core';
import { isRef, ref, unref, watch } from 'vue';

/**
 * Returns city name suggestion based on query.
 * @param {!Ref<string>} query
 */
export default function useLocationSuggestion(query) {
	const suggestion = ref('');
	const cache = new Map();

	const load = async () => {
		const value = unref(query).toLowerCase();
		if (!value && value.length < 2) {
			suggestion.value = '';
			return;
		}

		if (cache.has(value)) {
			suggestion.value = cache.get(value);
			return;
		}

		const response = /** {!CityModel[]} */ await api.geo.getCities(value);
		const entry = response.find((item) => item.name.toLowerCase().indexOf(value) === 0);
		suggestion.value = entry ? entry.name.toLowerCase() : '';
		cache.set(value, suggestion.value);
	};

	if (isRef(query)) {
		debouncedWatch(query, load, {
			debounce: 350,
		});
	}

	return suggestion;
};