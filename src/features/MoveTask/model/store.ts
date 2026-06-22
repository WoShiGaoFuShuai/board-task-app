import { type ChangeTaskOrderPayload, useColumnStore } from '@entities/column';

import { defineStore } from 'pinia';

export const useMoveTaskStore = defineStore('moveTask', () => {
	const { changeTaskOrder } = useColumnStore();

	const moveTask = ({ columnId, oldIndex, newIndex }: ChangeTaskOrderPayload) => {
		changeTaskOrder({ columnId, oldIndex, newIndex });
	};

	return { moveTask };
});
