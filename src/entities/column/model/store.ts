import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Column, MoveTaskPayload } from './types';

export const useColumnStore = defineStore('column', () => {
	const columns = ref<Column[]>([
		{
			id: 'col-1',
			title: 'To Do',
			taskIds: ['1', '4', '5'],
		},
		{
			id: 'col-2',
			title: 'In Progress',
			taskIds: ['2', '3'],
		},
		{
			id: 'col-3',
			title: 'Done',
			taskIds: [],
		},
		{
			id: 'col-4',
			title: 'Backlog',
			taskIds: [],
		},
		{
			id: 'col-5',
			title: 'In Review',
			taskIds: [],
		},
	]);

	const getColumnById = (columnId: string): Column | undefined => {
		return columns.value.find((c) => c.id === columnId);
	};

	const insertTask = (col: Column, index: number, item: string) => {
		col.taskIds.splice(index, 0, item);
	};

	const extractTask = (col: Column, index: number): string | undefined => {
		return col.taskIds.splice(index, 1)[0];
	};

	const getColumnsByIds = (ids: string[] | undefined): Column[] => {
		if (!ids) return [];

		return ids
			.map((colId: string) => columns.value.find((c: Column) => c.id === colId))
			.filter((c: Column | undefined) => c !== undefined);
	};

	const moveTaskInColumn = (payload: MoveTaskPayload) => {
		const { columnIdFrom: columnId, newIndex, oldIndex } = payload;

		const column = getColumnById(columnId);
		if (!column) return;

		const draggableItem = extractTask(column, oldIndex);
		if (!draggableItem) return;

		insertTask(column, newIndex, draggableItem);
	};

	const moveTaskBetweenColumns = (payload: MoveTaskPayload) => {
		const { columnIdFrom, columnIdTo, newIndex, oldIndex } = payload;

		const columnFrom = getColumnById(columnIdFrom);
		const columnTo = getColumnById(columnIdTo);
		if (!columnFrom || !columnTo) return;

		const draggableItem = extractTask(columnFrom, oldIndex);
		if (!draggableItem) return;

		insertTask(columnTo, newIndex, draggableItem);
	};

	return { getColumnsByIds, moveTaskInColumn, moveTaskBetweenColumns };
});
