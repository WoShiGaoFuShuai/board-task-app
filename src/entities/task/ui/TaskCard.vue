<template>
	<div class="task-card">
		<h5 class="task-title">{{ task.title }}</h5>

		<div class="task-meta">
			<span
				v-if="task.priority"
				:class="['task-priority', `priority-${task.priority}`]"
			>
				{{ task.priority }}
			</span>
			<button
				v-else
				class="task-meta-btn"
				type="button"
			>
				<div class="i-lucide-flag text-xs" />
			</button>

			<span
				v-if="task.dueDate"
				class="task-due-date"
			>
				<div class="i-lucide-calendar text-xs" />
				{{ formattedDueDate }}
			</span>
			<button
				v-else
				class="task-meta-btn"
				type="button"
			>
				<div class="i-lucide-calendar text-xs" />
			</button>
		</div>
	</div>
</template>

<script
	setup
	lang="ts"
>
	import { computed } from 'vue';
	import type { Task } from '../model/types.ts';

	const props = defineProps<{
		task: Task;
	}>();

	const formattedDueDate = computed(() => {
		if (!props.task.dueDate) return '';
		return new Date(props.task.dueDate).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
		});
	});
</script>

<style scoped>
	.task-card {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 10px 12px;
		background-color: var(--colors-depth-2);
		border-radius: 8px;
		cursor: pointer;
		transition: background-color 0.15s ease;
	}

	.task-card:hover {
		background-color: rgba(255, 255, 255, 0.06);
	}

	.task-title {
		margin: 0;
		font-size: 13px;
		font-weight: 500;
		color: var(--colors-surface-200);
		line-height: 1.4;
	}

	.task-priority {
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		padding: 1px 6px;
		border-radius: 4px;
	}

	.priority-high {
		color: #ff3b30;
		background-color: rgba(255, 59, 48, 0.12);
	}

	.priority-medium {
		color: #ff9f0a;
		background-color: rgba(255, 159, 10, 0.12);
	}

	.priority-low {
		color: #34c759;
		background-color: rgba(52, 199, 89, 0.12);
	}

	.task-meta {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.task-due-date {
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: 11px;
		color: var(--colors-surface-500);
	}

	.task-meta-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 22px;
		height: 22px;
		padding: 0;
		border: none;
		border-radius: 4px;
		background: transparent;
		color: var(--colors-surface-600);
		cursor: pointer;
		transition:
			opacity 0.15s ease,
			color 0.15s ease,
			background-color 0.15s ease;
	}

	.task-meta-btn:hover {
		color: var(--colors-surface-300);
		background-color: rgba(255, 255, 255, 0.08);
	}
</style>
