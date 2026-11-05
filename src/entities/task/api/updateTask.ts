import type { Task } from '@entities/task';
import { API_BASE_URL } from '@shared/api/config.ts';

type UpdateTaskPayload = Omit<Partial<Task>, 'id'> & Pick<Task, 'id'>;

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
