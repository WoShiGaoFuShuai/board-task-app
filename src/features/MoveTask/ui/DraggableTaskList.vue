<template>
	<div
		ref="dragRef"
		:data-column-id="columnId"
		class="task-list"
	>
		<TaskCard
			v-for="task in tasks"
			:key="task.id"
			:task
		/>
	</div>
</template>

<script
	setup
	lang="ts"
>
	import { type Task, TaskCard } from '@entities/task';
	import { useTemplateRef } from 'vue';
	import { useDraggable } from 'vue-draggable-plus';
	import { useMoveTaskStore } from '../model/store.ts';

	defineProps<{
		tasks: Task[];
		columnId: string;
	}>();

	const dragRef = useTemplateRef<HTMLElement | null>('dragRef');

	const { moveTask } = useMoveTaskStore();

	useDraggable(dragRef, {
		animation: 150,
		ghostClass: 'ghost',
		group: 'tasks',
		onEnd(e) {
			const { from, to, oldDraggableIndex, newDraggableIndex } = e;

			if (oldDraggableIndex == null || newDraggableIndex == null) return;

			const columnIdFrom = from.dataset.columnId;
			const columnIdTo = to.dataset.columnId;
			if (!columnIdFrom || !columnIdTo) throw new Error('column id is missing on drag container');

			moveTask({ columnIdFrom, columnIdTo, oldIndex: oldDraggableIndex, newIndex: newDraggableIndex });
		},
	});
</script>

<style scoped>
	.ghost {
		opacity: 0.5;
		background: #c8ebfb;
	}

	.task-list {
		display: flex;
		flex-direction: column;
		gap: 8px;
		flex: 1;
		overflow-y: auto;
		padding: 8px;
		min-height: 70px;
	}
</style>
