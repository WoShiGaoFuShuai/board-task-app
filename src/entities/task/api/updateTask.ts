import type { EditTaskInput } from '@entities/task';
import { API_BASE_URL } from '@shared/api/config.ts';

export interface UpdateTaskPayload extends EditTaskInput {
	order: string;
}

export const updateTask = async (task: UpdateTaskPayload) => {
	const response = await fetch(`${API_BASE_URL}/api/tasks/${task.id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(task),
	});

	if (!response.ok) throw new Error('Failed to update a task');
};
