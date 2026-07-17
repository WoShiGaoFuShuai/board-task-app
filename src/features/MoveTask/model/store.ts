import { generateKeyBetween } from 'fractional-indexing';
import { defineStore } from 'pinia';
import { useTaskStore } from '@/entities/task';
import type { MoveTaskPayload } from '../model/types.ts';

export const useMoveTaskStore = defineStore('moveTask', () => {
	const { getTaskById, changeTaskOrderAndColumn } = useTaskStore();

	const moveTask = (payload: MoveTaskPayload) => {
		const { itemId, columnIdTo, prevSiblingId, nextSiblingId } = payload;

		const prevTask = getTaskById(prevSiblingId);
		const nextTask = getTaskById(nextSiblingId);

		const newOrder = generateKeyBetween(prevTask?.order, nextTask?.order);

		changeTaskOrderAndColumn(itemId, newOrder, columnIdTo);
		//TODO: додати пізніше toast error
	};

	return { moveTask };
});
