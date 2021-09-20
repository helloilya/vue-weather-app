import Home from '@/views/Home';
import Error from '@/views/Error';
import { createRouter, createWebHistory } from 'vue-router';
import { ROUTE_STATES } from '@/constants';

const routes = [
	{
		path: '/',
		name: ROUTE_STATES.HOME,
		component: Home,
		meta: {
			title: 'Vue Weather App',
		},
	},
	{
		path: '/about',
		name: ROUTE_STATES.ABOUT,
		component: () => import(/* webpackChunkName: 'about' */ '@/views/About'),
		meta: {
			title: 'About / Vue Weather App',
		},
	},
	{
		path: '/:pathMatch(.*)*',
		name: ROUTE_STATES.ERROR,
		component: Error,
		meta: {
			title: 'Page Not Found',
		},
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	linkExactActiveClass: 'is-active',
	routes,
});

export default router;