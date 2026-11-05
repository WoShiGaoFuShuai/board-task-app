import { createTask } from '@entities/task/api/createTask.ts';
import { deleteTask } from '@entities/task/api/deleteTask.ts';
import { updateTask as updateTaskApi } from '@entities/task/api/updateTask.ts';
import { generateKeyBetween } from 'fractional-indexing';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { CreateTaskInput, EditTaskInput, Task } from './types';

export const useTaskStore = defineStore('task', () => {
	const tasks = ref<Task[]>([]);

	const setTasks = (payload: Task[]) => {
		tasks.value = payload;
	};

	const generateOrder = (tasks: Task[]) => {
		return tasks.length ? generateKeyBetween(tasks.at(-1)?.order, null) : generateKeyBetween(null, null);
	};

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

	// TODO: подумати, order варто перенести на бек?
	const changeTaskOrderAndColumn = async (id: string, order: string, colId: string) => {
		const task = getTaskById(id);
		if (!task) return;

		const oldOrder = task.order;
		const oldColumnId = task.columnId;

		task.order = order;
		task.columnId = colId;

		//TODO: подумати потім про гонку запитів при кількох швидких перетягуваннях.
		try {
			await updateTaskApi({ id, order, columnId: colId });
		} catch (error) {
			task.order = oldOrder;
			task.columnId = oldColumnId;
			throw error;
		}
	};

	const addTask = async (taskInput: CreateTaskInput) => {
		const sameColumnTasks = getTasksByColumnId(taskInput.columnId);

		const order = generateOrder(sameColumnTasks);

		try {
			const createdTask = await createTask({
				...taskInput,
				order,
			});

			tasks.value.push(createdTask);
		} catch (error) {
			throw error;
		}
		//TODO: add toast
	};

	const removeTask = async (id: string) => {
		// TODO: потім реалізувати undo
		await deleteTask(id);
		tasks.value = tasks.value.filter((t) => t.id !== id);
	};

	const updateTask = async (taskInput: EditTaskInput) => {
		const task = tasks.value.find((task) => task.id === taskInput.id);
		if (!task) throw new Error('Task was not found');

		const order =
			task.columnId === taskInput.columnId ? task.order : generateOrder(getTasksByColumnId(taskInput.columnId));

		const payload = { ...taskInput, order };

		await updateTaskApi(payload);

		const current = getTaskById(taskInput.id);
		if (!current) throw new Error('Task was not found');
		Object.assign(current, payload);
	};

	return {
		getTaskById,
		getTasksByColumnId,
		changeTaskOrderAndColumn,
		addTask,
		removeTask,
		updateTask,
		setTasks,
		tasks,
	};
});
