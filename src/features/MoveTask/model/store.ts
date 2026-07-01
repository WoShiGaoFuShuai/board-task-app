import { type MoveTaskPayload, useColumnStore } from '@entities/column';
import { defineStore } from 'pinia';

export const useMoveTaskStore = defineStore('moveTask', () => {
	const { moveTaskInColumn, moveTaskBetweenColumns } = useColumnStore();

	const moveTask = (payload: MoveTaskPayload) => {
		const { columnIdFrom, columnIdTo, oldIndex, newIndex } = payload;

		if (columnIdFrom === columnIdTo) {
			if (oldIndex === newIndex) return;
			moveTaskInColumn(payload);
		} else {
			moveTaskBetweenColumns(payload);
		}
	};

	return { moveTask };
});
