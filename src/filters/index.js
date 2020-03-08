import Vue from 'vue';
import { roundFilter, temperatureFilter } from './custom';

Vue.filter('round', roundFilter);
Vue.filter('temperature', temperatureFilter);