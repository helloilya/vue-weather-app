import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home';
import Error from '@/views/Error';

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	linkExactActiveClass: 'is-active',
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
		},
		{
			path: '*',
			name: 'error',
			component: Error,
		},
	],
});

export default router;