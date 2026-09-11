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
	import { BaseModal } from '@shared/ui/BaseModal';
	import { ButtonIcon } from '@shared/ui/ButtonIcon';
	import { ref } from 'vue';

	const taskStore = useTaskStore();
	const openCreateTaskModal = ref(false);

	const submit = (payload: CreateTaskInput) => {
		taskStore.addTask(payload);
		openCreateTaskModal.value = false;

		//TODO: Add toast for success/failute
	};
</script>

<style scoped>
</style>
