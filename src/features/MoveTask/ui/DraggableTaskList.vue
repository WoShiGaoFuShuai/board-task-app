<template>
	<div
		ref="dragRef"
		class="column-body"
	>
		<div
			v-if="!tasks.length"
			class="column-empty"
		>
			<span>
				{{ emptyPhrase }}
			</span>
		</div>

		<template v-else>
			<TaskCard
				v-for="task in tasks"
				:key="task.id"
				:task
			/>
		</template>
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

	const props = defineProps<{
		tasks: Task[];
		emptyPhrase: string;
		columnId: string;
	}>();

	const parentWrapperRef = useTemplateRef<HTMLElement | null>('dragRef');

	const { moveTask } = useMoveTaskStore();

	useDraggable(parentWrapperRef, {
		animation: 150,
		ghostClass: 'ghost',
		onEnd(e) {
			const { oldDraggableIndex, newDraggableIndex } = e;

			if (oldDraggableIndex == null || newDraggableIndex == null) return;
			if (oldDraggableIndex === newDraggableIndex) return;

			moveTask({ columnId: props.columnId, oldIndex: oldDraggableIndex, newIndex: newDraggableIndex });
		},
	});
</script>

<style scoped>
	.ghost {
		opacity: 0.5;
		background: #c8ebfb;
	}

	.column-body {
		flex: 1;
		overflow-y: auto;
		padding: 8px;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.column-empty {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 24px 12px;
		color: var(--colors-surface-600);
		font-size: 13px;
	}
</style>
