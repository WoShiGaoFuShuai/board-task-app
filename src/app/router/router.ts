import BoardPage from '@pages/board-page.vue';
import { createMemoryHistory, createRouter } from 'vue-router';

const routes = [{ path: '/', component: BoardPage }];

export const router = createRouter({
	history: createMemoryHistory(),
	routes,
});
