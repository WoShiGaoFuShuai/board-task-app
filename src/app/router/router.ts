import { createMemoryHistory, createRouter } from 'vue-router';

import BoardPage from '../../pages/board-page.vue';

const routes = [{ path: '/', component: BoardPage }];

export const router = createRouter({
	history: createMemoryHistory(),
	routes,
});
