import { API_BASE_URL } from '@shared/api/config.ts';

export const deleteTask = async (id: string) => {
	const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
		method: 'DELETE',
	});

	if (!response.ok) throw new Error('Failed to delete task');
};
