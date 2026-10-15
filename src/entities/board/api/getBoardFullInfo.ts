import type { Column } from '@entities/column';
import type { Task } from '@entities/task';
import { API_BASE_URL } from '@shared/api/config.ts';
import type { Board } from '../model/types.ts';

interface BoardFullInfoResponse {
	board: Board;
	columns: Column[];
	tasks: Task[];
}

export const getBoardFullInfo = async (boardId: string): Promise<BoardFullInfoResponse> => {
	const response = await fetch(`${API_BASE_URL}/api/board/${boardId}`);

	if (!response.ok) throw new Error('Failed to fetch board data');

	return await response.json();
};
