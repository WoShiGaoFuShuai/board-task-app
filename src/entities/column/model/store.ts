import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Column } from './types';

export const useColumnStore = defineStore('column', () => {
	const columns = ref<Column[]>([
		{
			id: 'col-1',
			title: 'To Do',
		},
		{
			id: 'col-2',
			title: 'In Progress',
		},
		{
			id: 'col-3',
			title: 'Done',
		},
		{
			id: 'col-4',
			title: 'Backlog',
		},
		{
			id: 'col-5',
			title: 'In Review',
		},
	]);

	const getColumnsByIds = (ids: string[] | undefined): Column[] => {
		if (!ids) return [];

		return ids
			.map((colId: string) => columns.value.find((c: Column) => c.id === colId))
			.filter((c: Column | undefined) => c !== undefined);
	};

	return { getColumnsByIds, columns };
});
