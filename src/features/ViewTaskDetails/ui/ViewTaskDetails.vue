<template>
	<BaseModal
		v-if="isOpen && taskDetails"
		@close="handleCloseModal"
	>
		<TaskDetailsModal
			@close-modal="handleCloseModal"
			@delete-task="openConfirmDeleteModal"
			@edit-start="isEditing = true"
			@edit-finish-confirm="handleEditFinishConfirm"
			:task="taskDetails"
			:isEditing
			:columnIds="currentBoard?.columnIds"
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
	import { useBoardStore } from '@entities/board';
	import { type EditTaskInput, useTaskStore } from '@entities/task';
	import ConfirmModal from '@features/ViewTaskDetails/ui/ConfirmModal.vue';
	import { BaseModal } from '@shared/ui/BaseModal';
	import { storeToRefs } from 'pinia';
	import { computed, ref, shallowRef } from 'vue';
	import { MODAL_CONTEXT } from '../model/constants.ts';
	import { useViewTaskDetailsStore } from '../model/store';
	import type { ModalContext } from '../model/types.ts';
	import TaskDetailsModal from './TaskDetailsModal.vue';

	const viewTaskDetailsStore = useViewTaskDetailsStore();
	const { updateTask } = useTaskStore();

	const boardStore = useBoardStore();
	const { currentBoard } = storeToRefs(boardStore);

	const { isOpen, taskDetails } = storeToRefs(viewTaskDetailsStore);

	const isEditing = ref(false);

	const confirmModalContext = shallowRef<ModalContext>({
		...MODAL_CONTEXT.empty,
	});

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

	const handleEditFinishConfirm = (editTaskPayload: EditTaskInput) => {
		// TODO: продумати потім якщо одракові дані - не змінювати

		const res = updateTask(editTaskPayload);

		//TODO: ADD SUCCESS TOAST
		if (res) console.log('success');
		else console.log('error');

		isEditing.value = false;
	};
</script>
