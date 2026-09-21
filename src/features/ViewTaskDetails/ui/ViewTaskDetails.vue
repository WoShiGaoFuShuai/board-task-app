<template>
	<BaseModal
		v-if="isOpen && taskDetails"
		@close="handleCloseModal"
	>
		<TaskDetailsModal
			@close-modal="handleCloseModal"
			@delete-task="openConfirmDeleteModal"
			:task="taskDetails"
		/>

		<ConfirmModal
			v-if="isConfirmModalOpen"
			@confirm="handleConfirm"
			@cancel="handleCancel"
			:confirmModalContext
		/>
	</BaseModal>
</template>

<script
	setup
	lang="ts"
>
	import { useTaskStore } from '@entities/task';
	import ConfirmModal from '@features/ViewTaskDetails/ui/ConfirmModal.vue';
	import { BaseModal } from '@shared/ui/BaseModal';
	import { storeToRefs } from 'pinia';
	import { ref } from 'vue';
	import { computed, ref, shallowRef } from 'vue';
	import { MODAL_CONTEXT } from '../model/constants.ts';
	import { useViewTaskDetailsStore } from '../model/store';
	import type { ModalContext } from '../model/types.ts';
	import TaskDetailsModal from './TaskDetailsModal.vue';

	const viewTaskDetailsStore = useViewTaskDetailsStore();
	const { updateTask } = useTaskStore();
	const { isOpen, taskDetails } = storeToRefs(viewTaskDetailsStore);

	const isConfirmDeleteOpen = ref(false);
	const idDelete = ref('');
	const confirmModalContext = shallowRef<ModalContext>({
		...MODAL_CONTEXT.empty,
	});

	const openConfirmDeleteModal = (id: string) => {
		idDelete.value = id;
		isConfirmDeleteOpen.value = true;
	const isConfirmModalOpen = computed(() => confirmModalContext.value.type !== '');

	const openConfirmDeleteModal = () => {
		confirmModalContext.value = {
			...MODAL_CONTEXT.delete,
		};
	};

	const openConfirmEditModal = () => {
		confirmModalContext.value = {
			...MODAL_CONTEXT.edit,
		};
	};

	const handleCancel = () => {
		resetConfirmModalContext();
	};

	const handleConfirm = () => {
		if (confirmModalContext.value.type === 'delete') viewTaskDetailsStore.deleteCurrentTask();

		reset();
		viewTaskDetailsStore.closeModal();
	};

	const handleCloseModal = () => {
		if (isEditing.value) {
			openConfirmEditModal();
			return;
		}

		reset();
		viewTaskDetailsStore.closeModal();
	};

	const reset = () => {
		isEditing.value = false;
		resetConfirmModalContext();
	};

	const resetConfirmModalContext = () => {
		confirmModalContext.value = {
			...MODAL_CONTEXT.empty,
		};
	};
</script>
