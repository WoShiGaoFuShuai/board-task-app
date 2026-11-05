import { API_BASE_URL } from '@shared/api/config.ts';
import type { Task } from '../model/types.ts';

export const createTask = async (input: Omit<Task, 'id' | 'createdAt'>): Promise<Task> => {
	const response = await fetch(`${API_BASE_URL}/api/tasks`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(input),
	});

	if (!response.ok) throw new Error('Failed to create a task');

	const data = await response.json();
	return data.task;
};
