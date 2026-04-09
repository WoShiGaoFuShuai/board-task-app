import { BoardPage } from '@pages/board-page';
import { MainPage } from '@pages/main-page';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
	{ path: '/', component: MainPage, name: 'main' },
	{ path: '/board/:id', component: BoardPage, name: 'board' },
];

export const router = createRouter({
	history: createWebHistory(),
	routes,
});
