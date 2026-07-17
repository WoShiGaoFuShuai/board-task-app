import { generateNKeysBetween } from 'fractional-indexing';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Task } from './types';

export const useTaskStore = defineStore('task', () => {
	const c1Orders = generateNKeysBetween(null, null, 7);
	const c2Orders = generateNKeysBetween(null, null, 7);
	const c3Orders = generateNKeysBetween(null, null, 7);

	const tasks = ref<Task[]>([
		{
			id: 'c1-1',
			columnId: 'col-1',
			order: c1Orders[0],
			title: '1. Design onboarding flow',
			description: 'Create wireframes for the onboarding screens',
			priority: 'high',
			status: 'todo',
			createdAt: '2026-04-01T09:00:00Z',
			assigneesId: ['user-1'],
			dueDate: null,
		},
		{
			id: 'c1-2',
			columnId: 'col-1',
			order: c1Orders[1],
			title: '2. Write API documentation',
			description: 'Document all REST endpoints with examples',
			priority: 'medium',
			status: 'todo',
			createdAt: '2026-04-01T10:00:00Z',
			assigneesId: ['user-2'],
			dueDate: null,
		},
		{
			id: 'c1-3',
			columnId: 'col-1',
			order: c1Orders[2],
			title: '3. Refactor auth module',
			description: 'Split auth logic into composables',
			priority: 'medium',
			status: 'todo',
			createdAt: '2026-04-01T11:00:00Z',
			assigneesId: [],
			dueDate: null,
		},
		{
			id: 'c1-4',
			columnId: 'col-1',
			order: c1Orders[3],
			title: '4. Create landing page',
			description: null,
			priority: 'low',
			status: 'todo',
			createdAt: '2026-04-01T12:00:00Z',
			assigneesId: ['user-3'],
			dueDate: null,
		},
		{
			id: 'c1-5',
			columnId: 'col-1',
			order: c1Orders[4],
			title: '5. Set up analytics',
			description: 'Integrate product analytics SDK',
			priority: 'low',
			status: 'todo',
			createdAt: '2026-04-01T13:00:00Z',
			assigneesId: ['user-1'],
			dueDate: null,
		},
		{
			id: 'c1-6',
			columnId: 'col-1',
			order: c1Orders[5],
			title: '6. Add dark mode toggle',
			description: 'Persist preference in localStorage',
			priority: null,
			status: 'todo',
			createdAt: '2026-04-01T14:00:00Z',
			assigneesId: [],
			dueDate: null,
		},
		{
			id: 'c1-7',
			columnId: 'col-1',
			order: c1Orders[6],
			title: '7. Optimize image loading',
			description: 'Add lazy loading and responsive srcset',
			priority: 'medium',
			status: 'todo',
			createdAt: '2026-04-01T15:00:00Z',
			assigneesId: ['user-2'],
			dueDate: null,
		},
		{
			id: 'c2-1',
			columnId: 'col-2',
			order: c2Orders[0],
			title: '1. Build user profile page',
			description: 'Layout with avatar, bio and stats',
			priority: 'high',
			status: 'inProgress',
			createdAt: '2026-04-02T09:00:00Z',
			assigneesId: ['user-1'],
			dueDate: null,
		},
		{
			id: 'c2-2',
			columnId: 'col-2',
			order: c2Orders[1],
			title: '2. Integrate payment gateway',
			description: 'Stripe checkout for pro plan',
			priority: 'high',
			status: 'inProgress',
			createdAt: '2026-04-02T10:00:00Z',
			assigneesId: ['user-2', 'user-3'],
			dueDate: null,
		},
		{
			id: 'c2-3',
			columnId: 'col-2',
			order: c2Orders[2],
			title: '3. Add search functionality',
			description: 'Client-side fuzzy search over tasks',
			priority: 'medium',
			status: 'inProgress',
			createdAt: '2026-04-02T11:00:00Z',
			assigneesId: ['user-1'],
			dueDate: null,
		},
		{
			id: 'c2-4',
			columnId: 'col-2',
			order: c2Orders[3],
			title: '4. Create notification system',
			description: null,
			priority: 'medium',
			status: 'inProgress',
			createdAt: '2026-04-02T12:00:00Z',
			assigneesId: [],
			dueDate: null,
		},
		{
			id: 'c2-5',
			columnId: 'col-2',
			order: c2Orders[4],
			title: '5. Implement file upload',
			description: 'Drag and drop attachments to tasks',
			priority: 'low',
			status: 'inProgress',
			createdAt: '2026-04-02T13:00:00Z',
			assigneesId: ['user-3'],
			dueDate: null,
		},
		{
			id: 'c2-6',
			columnId: 'col-2',
			order: c2Orders[5],
			title: '6. Add multi-language support',
			description: 'i18n setup with EN and UK locales',
			priority: null,
			status: 'inProgress',
			createdAt: '2026-04-02T14:00:00Z',
			assigneesId: ['user-2'],
			dueDate: null,
		},
		{
			id: 'c2-7',
			columnId: 'col-2',
			order: c2Orders[6],
			title: '7. Improve form validation',
			description: 'Unified error display across inputs',
			priority: 'low',
			status: 'inProgress',
			createdAt: '2026-04-02T15:00:00Z',
			assigneesId: [],
			dueDate: null,
		},
		{
			id: 'c3-1',
			columnId: 'col-3',
			order: c3Orders[0],
			title: '1. Setup project structure',
			description: 'Feature-Sliced Design layers',
			priority: 'high',
			status: 'done',
			createdAt: '2026-03-25T09:00:00Z',
			assigneesId: ['user-1'],
			dueDate: null,
		},
		{
			id: 'c3-2',
			columnId: 'col-3',
			order: c3Orders[1],
			title: '2. Configure Biome',
			description: 'Formatter and linter rules',
			priority: 'medium',
			status: 'done',
			createdAt: '2026-03-25T10:00:00Z',
			assigneesId: ['user-2'],
			dueDate: null,
		},
		{
			id: 'c3-3',
			columnId: 'col-3',
			order: c3Orders[2],
			title: '3. Install dependencies',
			description: null,
			priority: 'low',
			status: 'done',
			createdAt: '2026-03-25T11:00:00Z',
			assigneesId: [],
			dueDate: null,
		},
		{
			id: 'c3-4',
			columnId: 'col-3',
			order: c3Orders[3],
			title: '4. Create initial README',
			description: 'Getting started section',
			priority: 'low',
			status: 'done',
			createdAt: '2026-03-25T12:00:00Z',
			assigneesId: ['user-3'],
			dueDate: null,
		},
		{
			id: 'c3-5',
			columnId: 'col-3',
			order: c3Orders[4],
			title: '5. Set up Git repository',
			description: 'Push to GitHub, add branch protection',
			priority: null,
			status: 'done',
			createdAt: '2026-03-25T13:00:00Z',
			assigneesId: ['user-1'],
			dueDate: null,
		},
		{
			id: 'c3-6',
			columnId: 'col-3',
			order: c3Orders[5],
			title: '6. Configure Vite build',
			description: 'Path aliases and env handling',
			priority: 'medium',
			status: 'done',
			createdAt: '2026-03-25T14:00:00Z',
			assigneesId: ['user-2'],
			dueDate: null,
		},
		{
			id: 'c3-7',
			columnId: 'col-3',
			order: c3Orders[6],
			title: '7. Add basic routing',
			description: 'Main and Board pages wired up',
			priority: 'medium',
			status: 'done',
			createdAt: '2026-03-25T15:00:00Z',
			assigneesId: ['user-3'],
			dueDate: null,
		},
	]);

	const getTaskById = (id: string | null): Task | null => {
		if (!id) return null;

		return tasks.value.find((task) => task.id === id) ?? null;
	};

	const getTasksByColumnId = (columnId: string | undefined): Task[] => {
		if (!columnId) return [];

		return tasks.value
			.filter((task) => task.columnId === columnId)
			.sort((a: Task, b: Task) => (a.order < b.order ? -1 : a.order > b.order ? 1 : 0));
	};

	const changeTaskOrderAndColumn = (id: string, order: string, colId: string) => {
		const task = getTaskById(id);
		if (!task) return;
		task.order = order;
		task.columnId = colId;
	};

	return { getTaskById, getTasksByColumnId, changeTaskOrderAndColumn };
});
