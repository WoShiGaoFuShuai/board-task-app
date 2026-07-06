export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'todo' | 'inProgress' | 'done';

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
