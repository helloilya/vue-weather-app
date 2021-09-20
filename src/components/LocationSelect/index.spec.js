import flushPromises from 'flush-promises';
import { expect } from 'chai';
import { mount } from '@vue/test-utils';
import LocationSelect from './index';

const fakeLocation = 'location';

describe(LocationSelect.name, () => {
	let comp;
	let elButton;
	let elInput;

	beforeEach(() => {
		comp = mount(LocationSelect, {
			propsData: {
				location: fakeLocation,
			},
			sync: false,
		});

		elButton = comp.find('button');
		elInput = comp.find('input');
	});

	it('should set location when component is created', () => {
		expect(comp.vm.selectedLocation).to.equal(fakeLocation);
	});

	it('should call callback emit', async () => {
		elButton.trigger('click');
		await flushPromises();

		const event = comp.emitted('callback');

		expect(event[0]).to.deep.equal([fakeLocation]);
	});

	it('should disable input if location is not provided', async () => {
		elInput.setValue('');

		elButton.trigger('click');
		await flushPromises();

		expect(elButton.attributes().disabled).to.not.be.undefined;
	});
});