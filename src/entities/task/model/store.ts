import { createTask } from '@entities/task/api/createTask.ts';
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

	// TODO: тут додати api
	const changeTaskOrderAndColumn = (id: string, order: string, colId: string) => {
		const task = getTaskById(id);
		if (!task) return;

		task.order = order;
		task.columnId = colId;
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

	// TODO: тут додати api
	const deleteTask = (id: string) => {
		const task = tasks.value.find((task) => task.id === id);

		// TODO: потім дивитись в parent і створити toast для success / failure
		// TODO: потім реалізувати undo
		if (!task) return false;

		tasks.value = tasks.value.filter((t) => t.id !== task.id);
		return true;
	};

	// TODO: тут додати api
	const updateTask = ({ title, id, priority, columnId, description, dueDate }: EditTaskInput) => {
		const task = tasks.value.find((task) => task.id === id);
		if (!task) return false;

		if (task.columnId !== columnId) {
			const tasksNewCol = getTasksByColumnId(columnId);

			task.order = generateOrder(tasksNewCol);
		}

		task.title = title;
		task.priority = priority;
		task.columnId = columnId;
		task.description = description;
		task.dueDate = dueDate;

		return true;
	};

	return {
		getTaskById,
		getTasksByColumnId,
		changeTaskOrderAndColumn,
		addTask,
		deleteTask,
		updateTask,
		setTasks,
		tasks,
	};
});
