<template>
	<BaseModal
		v-if="isOpen && taskDetails"
		@close="viewTaskDetailsStore.closeModal"
	>
		<TaskDetailsModal
			@close-modal="viewTaskDetailsStore.closeModal"
			@delete-task="openConfirmDeleteModal"
			:task="taskDetails"
		/>

		<ConfirmDeleteModal
			v-if="isConfirmDeleteOpen"
			@confirm-delete="confirmDelete"
			@cancel-delete="closeConfirmDeleteModal"
		/>
	</BaseModal>
</template>

<script
	setup
	lang="ts"
>
	import { useTaskStore } from '@entities/task';
	import ConfirmDeleteModal from '@features/ViewTaskDetails/ui/ConfirmDeleteModal.vue';
	import { BaseModal } from '@shared/ui/BaseModal';
	import { storeToRefs } from 'pinia';
	import { ref } from 'vue';
	import { useViewTaskDetailsStore } from '../model/store';
	import TaskDetailsModal from './TaskDetailsModal.vue';

	const viewTaskDetailsStore = useViewTaskDetailsStore();
	const { deleteTask } = useTaskStore();
	const { isOpen, taskDetails } = storeToRefs(viewTaskDetailsStore);

	const isConfirmDeleteOpen = ref(false);
	const idDelete = ref('');

	const openConfirmDeleteModal = (id: string) => {
		idDelete.value = id;
		isConfirmDeleteOpen.value = true;
	};

	const closeConfirmDeleteModal = () => {
		idDelete.value = '';
		isConfirmDeleteOpen.value = false;
	};

	const confirmDelete = () => {
		deleteTask(idDelete.value);
		idDelete.value = '';
		isConfirmDeleteOpen.value = false;
		viewTaskDetailsStore.closeModal();
	};
</script>
