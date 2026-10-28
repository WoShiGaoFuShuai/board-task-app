<template>
	<BaseModal
		v-if="isOpen && taskDetails"
		@close="handleCloseModal"
		:isLoading
	>
		<TaskDetailsModal
			@close-modal="handleCloseModal"
			@delete-task="openConfirmDeleteModal"
			@edit-start="isEditing = true"
			@edit-finish-confirm="handleEditFinishConfirm"
			:task="taskDetails"
			:isEditing
			:isLoading
			:columns="columns"
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
	import { useColumnStore } from '@entities/column';
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

	const { columns } = storeToRefs(useColumnStore());

	const { isOpen, taskDetails } = storeToRefs(viewTaskDetailsStore);

	const isEditing = ref(false);
	const isLoading = ref(false);

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

	const resetConfirmModalContext = () => {
		confirmModalContext.value = {
			...MODAL_CONTEXT.empty,
		};
	};

	const reset = () => {
		isEditing.value = false;
		resetConfirmModalContext();
	};

	const handleCancel = () => {
		resetConfirmModalContext();
	};

	const handleConfirm = async () => {
		if (confirmModalContext.value.type === 'delete') {
			// TODO: потім додати toast а при error не закривати модалку
			const success = await viewTaskDetailsStore.deleteCurrentTask();
			if (success)
				console.log('deleted'); // TODO: toast
			else {
				// TODO: toast
				console.log('error');
				return;
			}
		}

		reset();
		viewTaskDetailsStore.closeModal();
	};

	const handleCloseModal = () => {
		if (isLoading.value) return;

		if (isEditing.value) {
			openConfirmEditModal();
			return;
		}

		reset();
		viewTaskDetailsStore.closeModal();
	};

	const handleEditFinishConfirm = async (editTaskPayload: EditTaskInput) => {
		if (isLoading.value) return;
		isLoading.value = true;
		// TODO: продумати потім якщо одракові дані - не змінювати
		try {
			await updateTask(editTaskPayload);
			isEditing.value = false;
			//TODO: ADD SUCCESS TOAST
		} catch (e) {
			console.error(e);
			// TODO: ADD ERROR TOAST
		} finally {
			isLoading.value = false;
		}
	};
</script>
