<template>
	<BaseModal
		v-if="isOpen && taskDetails"
		@close="viewTaskDetailsStore.closeModal"
	>
		<TaskDetailsModal
			@close-modal="viewTaskDetailsStore.closeModal"
			:task="taskDetails"
		/>
	</BaseModal>
</template>

<script
	setup
	lang="ts"
>
	import { BaseModal } from '@shared/ui/BaseModal';
	import { storeToRefs } from 'pinia';
	import { useViewTaskDetailsStore } from '../model/store';
	import TaskDetailsModal from './TaskDetailsModal.vue';

	const viewTaskDetailsStore = useViewTaskDetailsStore();
	const { isOpen, taskDetails } = storeToRefs(viewTaskDetailsStore);
</script>
