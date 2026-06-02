import type { TaskPriority, TaskStatus } from '@entities/task';

export type FilterGroup =
	| { id: 'priority'; title: 'Priority'; items: { value: TaskPriority }[] }
	| { id: 'status'; title: 'Status'; items: { value: TaskStatus }[] };

export type ActiveFilters = { priority: TaskPriority[]; status: TaskStatus[] };

export type ToggleFilterPayload =
    | {key: 'priority', filter: ActiveFilters['priority'][number]}
    | {key: 'status', filter: ActiveFilters['status'][number]};
