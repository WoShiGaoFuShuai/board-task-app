import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Task } from './types';

export const useTaskStore = defineStore('task', () => {
	const tasks = ref<Task[]>([
		{
			id: '1',
			title: 'Design login page',
			description: 'Create wireframes and final design for the login screen',
			priority: null,
			status: 'todo',
			createdAt: '2026-04-01T09:00:00Z',
			assigneesId: ['user-1', 'user-2'],
			dueDate: null,
		},
		{
			id: '2',
			title: 'Set up Pinia stores',
			description: 'Initialize stores for tasks, projects, and users',
			priority: 'high',
			status: 'inProgress',
			createdAt: '2026-04-02T10:30:00Z',
			assigneesId: ['user-1'],
			dueDate: null,
		},
		{
			id: '3',
			title: 'Implement drag and drop',
			description: 'Allow tasks to be moved between columns via drag and drop',
			priority: 'medium',
			status: 'inProgress',
			createdAt: '2026-04-03T11:00:00Z',
			assigneesId: ['user-3'],
			dueDate: null,
		},

		{
			id: '4',
			title: 'Write unit tests for store',
			description: null,
			priority: 'low',
			status: 'todo',
			createdAt: '2026-04-04T08:00:00Z',
			assigneesId: [],
			dueDate: null,
		},
		{
			id: '5',
			title: 'Deploy to production',
			description: 'Configure CI/CD pipeline and deploy the app',
			priority: 'medium',
			status: 'todo',
			createdAt: '2026-04-05T14:00:00Z',
			assigneesId: ['user-2'],
			dueDate: null,
		},
	]);

	const getTasksByIds = (ids: string[]): Task[] => {
		return ids
			.map((id: string) => tasks.value.find((task: Task) => task.id === id))
			.filter((mappedItem: Task | undefined) => mappedItem !== undefined);
	};

	return { getTasksByIds };
});
