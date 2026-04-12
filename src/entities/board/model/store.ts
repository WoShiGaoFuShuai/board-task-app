import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { Board } from './types';

export const useBoardStore = defineStore('board', () => {
	const boards = ref<Board[]>([
		{
			id: 'board-1',
			title: 'Frontend Project',
			columnIds: ['col-1', 'col-2', 'col-3'],
		},
		{
			id: 'board-2',
			title: 'Marketing Campaign',
			columnIds: ['col-4', 'col-5'],
		},
	]);

	const currentBoardId = ref<null | string>(null);

	const setCurrentBoardId = (id: string) => {
		const exists = boards.value.some((b) => b.id === id);
		currentBoardId.value = exists ? id : null;
	};

	const resetCurrentBoardId = () => {
		currentBoardId.value = null;
	};

	const currentBoard = computed(() => boards.value.find((board) => board.id === currentBoardId.value));

	return { boards, currentBoard, setCurrentBoardId, resetCurrentBoardId };
});
