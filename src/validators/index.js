import Vue from 'vue';
import { ValidationProvider, extend } from 'vee-validate';
import { length, required } from 'vee-validate/dist/rules';
import { cityValidator } from './custom';

Vue.component('ValidationProvider', ValidationProvider);

extend('city', cityValidator);
extend('length', length);
extend('required', {
	...required,
	message: 'Please type the city',
});