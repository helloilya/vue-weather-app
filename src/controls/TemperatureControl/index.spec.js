import { expect } from 'chai';
import { mount } from '@vue/test-utils';
import TemperatureControl from './index';

const fakeModelValue = 1;

describe(TemperatureControl.name, () => {
	let comp;
	let elSelect;

	beforeEach(() => {
		comp = mount(TemperatureControl, {
			props: {
				modelValue: fakeModelValue,
			},
			sync: false,
		});

		elSelect = comp.find('select');
	});

	it('should call callback emit', async () => {
		elSelect.trigger('input');

		const event = comp.emitted('update:modelValue');

		expect(event[0]).to.deep.equal([fakeModelValue]);
	});
});