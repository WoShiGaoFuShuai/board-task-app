export type TaskPriority = 'low' | 'medium' | 'high';

export interface CreateTaskInput {
	title: string;
	description: string | null;
	columnId: string;
	priority: TaskPriority;
	dueDate: string | null;
	assigneesId: string[];
}

export interface Task {
	columnId: string;
	order: string;
	id: string;
	title: string;
	description: string | null;
	priority: TaskPriority | null;
	createdAt: string;
	assigneesId: string[];
	dueDate: string | null;
}
