import setting from './modules/setting';
import weather from './modules/weather';
import { createStore } from 'vuex';

const store = createStore({
	modules: {
		setting,
		weather,
	},
	strict: process.env.NODE_ENV !== 'production',
});

export default store;