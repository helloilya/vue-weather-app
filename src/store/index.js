import Vue from 'vue';
import Vuex from 'vuex';
import setting from './modules/setting';

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		setting,
	},
	strict: true,
});

export default store;