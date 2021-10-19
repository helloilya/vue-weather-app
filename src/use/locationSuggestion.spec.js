import api from '@/api';
import flushPromises from 'flush-promises';
import sinon from 'sinon';
import useLocationSuggestion from './locationSuggestion';
import { expect } from 'chai';
import { nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';

const fakeQuery = 'saint';

/** {!CityModel} */
const fakeCityItem = {
	id: 3453095,
	name: 'Saint Petersburg',
	country: 'Russia',
};

describe('useLocationSuggestion', () => {
	let timerStab;
	let getCitiesStab;

	beforeEach(() => {
		timerStab = sinon.useFakeTimers();
		getCitiesStab = sinon.stub(api.geo, 'getCities').resolves([fakeCityItem]);
	});

	afterEach(() => {
		timerStab.restore();
		getCitiesStab.restore();
	});

	it('returns not cached suggestion', async () => {
		const query = ref('');

		const result = useLocationSuggestion(query);

		query.value = fakeQuery;
		await nextTick();
		timerStab.tick(300);
		await flushPromises();
		expect(result.value).to.equal(fakeCityItem.name.toLowerCase());
	});

	it('returns empty suggestion', async () => {
		const query = ref('');

		const result = useLocationSuggestion(query);

		query.value = 'fake';
		await nextTick();
		timerStab.tick(300);
		await flushPromises();
		expect(result.value).to.equal('');
	});
});