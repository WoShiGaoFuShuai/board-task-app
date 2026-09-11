import type { TaskPriority } from '@entities/task';

export const priority = {
	id: 'priority' as const,
	title: 'Priority',
	items: [{ value: 'low' }, { value: 'medium' }, { value: 'high' }] as { value: TaskPriority }[],
};