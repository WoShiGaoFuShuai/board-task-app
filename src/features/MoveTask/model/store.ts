import { generateKeyBetween } from 'fractional-indexing';
import { defineStore } from 'pinia';
import { type Task, useTaskStore } from '@/entities/task';
import type { MoveTaskPayload } from '../model/types.ts';

const SIBLINGS = {
	PREV: 'previous',
	NEXT: 'next',
};

export const useMoveTaskStore = defineStore('moveTask', () => {
	const { getTaskById, getTasksByColumnId, changeTaskOrderAndColumn } = useTaskStore();

	const findSiblingOrder = (task: Task, columnId: string, sibling: (typeof SIBLINGS)[keyof typeof SIBLINGS]) => {
		const tasks = getTasksByColumnId(columnId);

		const index = tasks.indexOf(task);
		if (index === -1) return null;

		const adjacent = sibling === SIBLINGS.NEXT ? tasks[index + 1] : tasks[index - 1];
		return adjacent?.order ?? null;
	};

	const moveTask = (payload: MoveTaskPayload) => {
		const { itemId, columnIdTo, prevSiblingId, nextSiblingId } = payload;

		if (prevSiblingId) {
			const realPrev = getTaskById(prevSiblingId);
			if (!realPrev) throw new Error('Can not find the previous task');

			const realNextOrder = findSiblingOrder(realPrev, columnIdTo, SIBLINGS.NEXT);
			const newOrder = generateKeyBetween(realPrev.order, realNextOrder);
			changeTaskOrderAndColumn(itemId, newOrder, columnIdTo);
		} else if (nextSiblingId) {
			const realNext = getTaskById(nextSiblingId);
			if (!realNext) throw new Error('Can not find the next task');

			const realPrevOrder = findSiblingOrder(realNext, columnIdTo, SIBLINGS.PREV);
			const newOrder = generateKeyBetween(realPrevOrder, realNext.order);
			changeTaskOrderAndColumn(itemId, newOrder, columnIdTo);
		} else {
			const newOrder = generateKeyBetween(null, null);
			changeTaskOrderAndColumn(itemId, newOrder, columnIdTo);
		}
		//TODO: додати пізніше toast error
	};

	return { moveTask };
});
