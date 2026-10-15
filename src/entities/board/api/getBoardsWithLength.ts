import { API_BASE_URL } from '@shared/api/config.ts';
import type { BoardWithLength } from '../model/types.ts';

interface BoardWithLengthResponse {
	boards: BoardWithLength[];
}

export const getBoardsWithLength = async (): Promise<BoardWithLengthResponse> => {
	const response = await fetch(`${API_BASE_URL}/api/boards`);

	if (!response.ok) throw new Error('Failed to fetch boards data');

	return await response.json();
};
