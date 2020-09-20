import Vue from 'vue';
import VueMeta from 'vue-meta';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import '@/filters';
import '@/validators';

Vue.config.productionTip = process.env.NODE_ENV !== 'production';
Vue.config.performance = process.env.NODE_ENV !== 'production';

Vue.use(VueMeta);

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');