import { expect } from 'chai';
import { mount, createLocalVue } from '@vue/test-utils';
import TemperatureControl from './index';

const localVue = createLocalVue();
const fakeModelValue = 1;

describe(TemperatureControl.name, () => {
	let comp;
	let elSelect;

	beforeEach(() => {
		comp = mount(TemperatureControl, {
			localVue,
			propsData: {
				value: fakeModelValue,
			},
			sync: false,
		});

		elSelect = comp.find('select');
	});

	it('should call callback emit', async () => {
		elSelect.trigger('change');

		expect(comp.emitted().change[0]).to.deep.equal([fakeModelValue]);
	});
});