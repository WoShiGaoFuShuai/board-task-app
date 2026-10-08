import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Column } from './types';

export const useColumnStore = defineStore('column', () => {
	const columns = ref<Column[]>([
		{
			id: 'col-1',
			title: 'To Do',
			boardId: 'board-1',
		},
		{
			id: 'col-2',
			title: 'In Progress',
			boardId: 'board-1',
		},
		{
			id: 'col-3',
			title: 'Done',
			boardId: 'board-1',
		},
		{
			id: 'col-4',
			title: 'Backlog',
			boardId: 'board-2',
		},
		{
			id: 'col-5',
			title: 'In Review',
			boardId: 'board-2',
		},
	]);

	const getColumnsByBoardId = (id: string | undefined): Column[] => {
		if (!id) return [];

		return columns.value.filter((c: Column) => c.boardId === id);
	};

	return { getColumnsByBoardId, columns };
});
