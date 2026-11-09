<template>
	<div>
		<ButtonIcon
			iconClass="i-lucide-plus text-sm text-surface-500"
			ariaLabel="Add tasks"
			@click="openCreateTaskModal = true"
		/>

		<BaseModal
			@close="openCreateTaskModal = false"
			v-if="openCreateTaskModal"
		>
			<CreateTaskModal
				@close="openCreateTaskModal = false"
				@submit="submit"
				:isSubmitting
			/>
		</BaseModal>
	</div>
</template>

<script
	setup
	lang="ts"
>
	import type { CreateTaskInput } from '@entities/task';
	import { useTaskStore } from '@entities/task';
	import CreateTaskModal from '@features/CreateTask/ui/CreateTaskModal.vue';
	import { useToastStore } from '@shared/toast';
	import { BaseModal } from '@shared/ui/BaseModal';
	import { ButtonIcon } from '@shared/ui/ButtonIcon';
	import { ref } from 'vue';

	const taskStore = useTaskStore();
	const toastStore = useToastStore();

	const openCreateTaskModal = ref(false);
	const isSubmitting = ref(false);

	const submit = async (payload: CreateTaskInput) => {
		if (isSubmitting.value) return;
		isSubmitting.value = true;

		try {
			await taskStore.addTask(payload);
			openCreateTaskModal.value = false;
			toastStore.addToast({ message: 'Task was added successfully!', type: 'success' });
		} catch (err) {
			toastStore.addToast({ message: 'Task was not added!', type: 'error' });
			console.error('[CreateTask]', err);
		} finally {
			isSubmitting.value = false;
		}
	};
</script>

<style scoped>
</style>
