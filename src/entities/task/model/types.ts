export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'todo' | 'inProgress' | 'done';

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
	status: TaskStatus;
	createdAt: string;
	assigneesId: string[];
	dueDate: string | null;
}
