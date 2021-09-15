import Home from '@/views/Home';
import Error from '@/views/Error';
import { createRouter, createWebHistory } from 'vue-router';
import { ROUTE_STATES } from '@/constants';

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
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
			path: '/:pathMatch(.*)*',
			name: ROUTE_STATES.ERROR,
			component: Error,
		},
	],
});

export default router;