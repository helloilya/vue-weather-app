import flushPromises from 'flush-promises';
import { expect } from 'chai';
import { ValidationProvider, extend } from 'vee-validate';
import { mount, createLocalVue } from '@vue/test-utils';
import { required } from 'vee-validate/dist/rules';
import LocationSelect from './index';
import { cityValidator } from '@/validators/custom';

const localVue = createLocalVue();
localVue.component('ValidationProvider', ValidationProvider);
extend('city', cityValidator);
extend('required', required);

const fakeLocation = 'location';

describe(LocationSelect.name, () => {
	let comp;
	let elButton;
	let elInput;

	beforeEach(() => {
		comp = mount(LocationSelect, {
			localVue,
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

		expect(comp.emitted().callback[0]).to.deep.equal([fakeLocation]);
	});

	it('should show validation error message', async () => {
		elInput.setValue('Saint Petersburg');

		elButton.trigger('click');
		await flushPromises();

		expect(comp.find('span').text()).to.equal(cityValidator.message);
	});

	it('should disable input if location is not valid', async () => {
		elInput.setValue('Saint Petersburg');

		elButton.trigger('click');
		await flushPromises();

		expect(elButton.attributes().disabled).to.not.be.undefined;
	});
});