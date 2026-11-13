import { getBoardFullInfo } from '@entities/board/api/getBoardFullInfo.ts';
import { getBoardsWithLength } from '@entities/board/api/getBoardsWithLength.ts';
import { useColumnStore } from '@entities/column';
import { useTaskStore } from '@entities/task';
import { defineStore } from 'pinia';
import { shallowRef } from 'vue';
import type { Board, BoardWithLength } from './types';

export const useBoardStore = defineStore('board', () => {
	const columnStore = useColumnStore();
	const taskStore = useTaskStore();

	const boards = shallowRef<BoardWithLength[]>([]);

	const resetCurrentBoard = () => {
		currentBoard.value = null;
	};

	const fetchBoardFullInfo = async (id: string) => {
		// TODO: ADD Loading state use vueuse?

		const res = await getBoardFullInfo(id);

		currentBoard.value = res.board;
		columnStore.setColumns(res.columns);
		taskStore.setTasks(res.tasks);
	};

	const fetchBoardsWithLength = async () => {
		// TODO: ADD Loading state use vueuse?
		const res = await getBoardsWithLength();

		console.log(res);
		boards.value = res.boards;
	};

	const currentBoard = shallowRef<Board | null>(null);

	return { boards, currentBoard, fetchBoardFullInfo, resetCurrentBoard, fetchBoardsWithLength };
});
