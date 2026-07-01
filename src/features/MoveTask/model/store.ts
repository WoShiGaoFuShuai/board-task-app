import { type MoveTaskBetweenColumnsPayload, useColumnStore } from '@entities/column';
import { defineStore } from 'pinia';

export const useMoveTaskStore = defineStore('moveTask', () => {
	const { moveTaskInColumn, moveTaskBetweenColumns } = useColumnStore();

	const moveTask = (payload: MoveTaskBetweenColumnsPayload) => {
		const { columnIdFrom, columnIdTo, oldIndex, newIndex } = payload;

		if (columnIdFrom === columnIdTo) {
			if (oldIndex === newIndex) return;
			moveTaskInColumn({ columnId: columnIdFrom, oldIndex, newIndex });
		} else {
			moveTaskBetweenColumns(payload);
		}
	};

	return { moveTask };
});
