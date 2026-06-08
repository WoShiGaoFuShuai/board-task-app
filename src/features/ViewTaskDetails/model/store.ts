import { useTaskStore } from '@entities/task';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useViewTaskDetailsStore = defineStore('viewTaskDetails', () => {
	const { getTaskById } = useTaskStore();

	const isOpen = ref(false);
	const taskId = ref<null | string>(null);
	const taskDetails = computed(() => (taskId.value ? getTaskById(taskId.value) : null));

	const open = (id: string) => {
		isOpen.value = true;
		taskId.value = id;
	};

	const closeModal = () => {
		isOpen.value = false;
		taskId.value = null;
	};

	return { isOpen, open, taskDetails, closeModal };
});
