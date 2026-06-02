import type { FilterGroup } from './types';

export const priority = {
	id: 'priority',
	title: 'Priority',
	items: [{ value: 'low' }, { value: 'medium' }, { value: 'high' }],
} satisfies FilterGroup;

export const status = {
	id: 'status',
	title: 'Status',
	items: [{ value: 'todo' }, { value: 'inProgress' }, { value: 'done' }],
} satisfies FilterGroup;
