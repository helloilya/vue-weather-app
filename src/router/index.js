import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home';
import Error from '@/views/Error';
import { ROUTE_STATES } from '@/constants';

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	linkExactActiveClass: 'is-active',
	routes: [
		{
			path: '/',
			name: ROUTE_STATES.HOME,
			component: Home,
		},
		{
			path: '/about',
			name: ROUTE_STATES.ABOUT,
			component: () => import(/* webpackChunkName: 'about' */ '@/views/About'),
		},
		{
			path: '*',
			name: ROUTE_STATES.ERROR,
			component: Error,
		},
	],
});

export default router;