import { getBoardFullInfo } from '@entities/board/api/getBoardFullInfo.ts';
import { getBoardsWithLength } from '@entities/board/api/getBoardsWithLength.ts';
import { useColumnStore } from '@entities/column';
import { defineStore } from 'pinia';
import { shallowRef } from 'vue';
import type { Board, BoardWithLength } from './types';

export const useBoardStore = defineStore('board', () => {
	const columnStore = useColumnStore();

	const boards = shallowRef<BoardWithLength[]>([]);

	const resetCurrentBoard = () => {
		currentBoard.value = null;
	};

	const fetchBoardFullInfo = async (id: string) => {
		// TODO: ADD Loading state use vueuse?
		try {
			const res = await getBoardFullInfo(id);
			console.log(res);

			currentBoard.value = res.board;
			columnStore.setColumns(res.columns);
		} catch (error) {
			throw error;
		}
	};

	const fetchBoardsWithLength = async () => {
		// TODO: ADD Loading state use vueuse?
		try {
			const res = await getBoardsWithLength();
			console.log(res);

			boards.value = res.boards;
		} catch (error) {
			throw error;
		}
	};

	const currentBoard = shallowRef<Board | null>(null);

	return { boards, currentBoard, fetchBoardFullInfo, resetCurrentBoard, fetchBoardsWithLength };
});
