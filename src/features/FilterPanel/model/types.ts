import type { TaskPriority } from '@entities/task';

export type ActiveFilters = { priority: TaskPriority[]; columnId: string[] };

export type ToggleFilterPayload =
	| { key: 'priority'; filter: ActiveFilters['priority'][number] }
	| { key: 'columnId'; filter: ActiveFilters['columnId'][number] };
