<template>
	<div class="column shadow-md">
		<div class="column-header">
			<div class="flex items-center justify-between">
				<span class="column-title">{{ column.title }}</span>
				<span class="column-count">{{ column.taskIds.length }}</span>
			</div>
		</div>

		<div class="column-body">
			<div
				v-if="!column.taskIds.length"
				class="column-empty"
			>
				No tasks yet
			</div>
			<!-- TODO: task cards will go here -->
		</div>

		<div class="column-footer">
			<button
				class="add-task-btn"
				type="button"
			>
				<div class="i-lucide-plus text-sm" />
				<span>Add task</span>
			</button>
		</div>
	</div>
</template>

<script
	setup
	lang="ts"
>
	import type { Column } from '../model/types.ts';

	defineProps<{
		column: Column;
	}>();
</script>

<style scoped>
	.column {
		display: flex;
		flex-direction: column;
		width: 280px;
		min-width: 280px;
		max-height: 100%;
		background-color: var(--colors-depth-3);
		border-radius: 12px;
	}

	.column-header {
		padding: 14px 14px 10px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
	}

.column-title {
		font-size: 13px;
		font-weight: 600;
		color: var(--colors-surface-300);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.column-count {
		font-size: 12px;
		font-weight: 500;
		color: var(--colors-surface-500);
		background-color: rgba(255, 255, 255, 0.06);
		padding: 1px 8px;
		border-radius: 10px;
	}

	.column-body {
		flex: 1;
		overflow-y: auto;
		padding: 8px;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.column-empty {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 24px 12px;
		color: var(--colors-surface-600);
		font-size: 13px;
	}

	.column-footer {
		padding: 8px;
		border-top: 1px solid rgba(255, 255, 255, 0.06);
	}

	.add-task-btn {
		display: flex;
		align-items: center;
		gap: 8px;
		width: 100%;
		padding: 6px 10px;
		border: none;
		border-radius: 8px;
		background: transparent;
		color: var(--colors-surface-500);
		font-size: 13px;
		cursor: pointer;
		transition:
			background-color 0.15s ease,
			color 0.15s ease;
	}

	.add-task-btn:hover {
		background-color: rgba(255, 255, 255, 0.05);
		color: var(--colors-primary-400);
	}
</style>
