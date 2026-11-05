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

	const moveTask = async (payload: MoveTaskPayload) => {
		const { itemId, columnIdTo, prevSiblingId, nextSiblingId } = payload;

		let newOrder = '';

		try {
			if (prevSiblingId) {
				const realPrev = getTaskById(prevSiblingId);
				if (!realPrev) throw new Error('Can not find the previous task');

				const realNextOrder = findSiblingOrder(realPrev, columnIdTo, SIBLINGS.NEXT);
				newOrder = generateKeyBetween(realPrev.order, realNextOrder);
			} else if (nextSiblingId) {
				const realNext = getTaskById(nextSiblingId);
				if (!realNext) throw new Error('Can not find the next task');

				const realPrevOrder = findSiblingOrder(realNext, columnIdTo, SIBLINGS.PREV);
				newOrder = generateKeyBetween(realPrevOrder, realNext.order);
			} else {
				newOrder = generateKeyBetween(null, null);
			}

			await changeTaskOrderAndColumn(itemId, newOrder, columnIdTo);
		} catch (error) {
			// TODO: ADD TOAST FOR ERROR and explain that task was put back
			console.error('UI', error);
			return;
		}
	};

	return { moveTask };
});
