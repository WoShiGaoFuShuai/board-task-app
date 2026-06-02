import type { Task, TaskPriority, TaskStatus } from '@entities/task';

export const matchesPriority = (task: Task, activeFilters: TaskPriority[]) => {
	if (!activeFilters.length) return true;
	if (task.priority === null) return false;

	return activeFilters.includes(task.priority);
};

export const matchesQuery = (task: Task, q: string) => {
	const normalized = q.trim().toLowerCase();
	if (normalized === '') return true;

	return task.title.toLowerCase().includes(normalized) || (task.description ?? '').toLowerCase().includes(normalized);
};

export const matchesStatus = (task: Task, activeFilters: TaskStatus[]) => {
	if (!activeFilters.length) return true;

	return activeFilters.includes(task.status);
};
