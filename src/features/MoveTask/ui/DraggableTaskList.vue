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
			const { to, oldDraggableIndex, newDraggableIndex, item } = e;

			if (oldDraggableIndex == null || newDraggableIndex == null) return;

			const columnIdTo = to.dataset.columnId;
			if (!columnIdTo) throw new Error('Column id is missing on drag container');

			const itemId = item.dataset?.taskId ?? null;
			if (!itemId) throw new Error('Draggable item has no ID');

			const prevSibling = item.previousElementSibling as HTMLElement | null;
			const nextSibling = item.nextElementSibling as HTMLElement | null;

			const prevSiblingId = prevSibling?.dataset.taskId ?? null;
			const nextSiblingId = nextSibling?.dataset.taskId ?? null;

			moveTask({ itemId, columnIdTo, prevSiblingId, nextSiblingId });
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
