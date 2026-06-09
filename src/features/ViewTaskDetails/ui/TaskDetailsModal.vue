<template>
	<section
		class="task-details-modal"
		role="dialog"
		aria-modal="true"
		aria-labelledby="task-details-title"
	>
		<header class="modal-header">
			<div class="modal-title-block">
				<h2
					id="task-details-title"
					class="modal-title"
				>
					{{ task.title }}
				</h2>
			</div>

			<ButtonIcon
				icon-class="i-lucide-x text-base"
				aria-label="Close"
				:size="ButtonSize.S"
				:type="ButtonType.DEFAULT"
				@click="$emit('closeModal')"
			/>
		</header>

		<div class="chips-row">
			<span :class="['chip', `chip-priority-${task.priority}`]">
				<div class="i-lucide-flag text-xs" />
				{{ task.priority }}
			</span>
			<span :class="['chip', `chip-status-${task.status}`]">
				<div class="i-lucide-circle-dot text-xs" />
				{{ task.status }}
			</span>
		</div>

		<section class="modal-body">
			<h3 class="section-label">
				<div class="i-lucide-align-left text-xs" />
				Description
			</h3>
			<p class="description">{{ task.description }}</p>
		</section>

		<section class="meta-section">
			<div class="meta-row">
				<span class="meta-label">
					<div class="i-lucide-calendar-plus text-sm" />
					Created
				</span>
				<span class="meta-value">{{ formattedDate }}</span>
			</div>

			<div class="meta-row">
				<span class="meta-label">
					<div class="i-lucide-calendar text-sm" />
					Due date
				</span>
				<span class="meta-value">{{ task.dueDate }}</span>
			</div>

			<div class="meta-row meta-row-assignees">
				<span class="meta-label">
					<div class="i-lucide-users text-sm" />
					Assignees
				</span>
				<div class="assignees">
					<span
						v-for="id in task.assigneesId"
						:key="id"
						class="avatar"
						>{{ id.slice(-1).toUpperCase() }}</span
					>
				</div>
			</div>
		</section>
	</section>
</template>

<script
	setup
	lang="ts"
>
	import type { Task } from '@entities/task';
	import { ButtonIcon, ButtonSize, ButtonType } from '@shared/ui/ButtonIcon';
	import { computed } from 'vue';

	defineEmits<{
		closeModal: [];
	}>();

	const props = defineProps<{
		task: Task;
	}>();

	const formattedDate = computed(() =>
		new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(props.task.createdAt))
	);
</script>

<style scoped>
	.task-details-modal {
		display: flex;
		flex-direction: column;
		width: min(560px, calc(100vw - 32px));
		padding: 20px 24px;
		background-color: var(--colors-depth-2);
		border-radius: 16px;
		box-shadow: 0 20px 50px rgba(0, 0, 0, 0.45);
	}

	.modal-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 12px;
		margin-bottom: 16px;
	}

	.modal-title-block {
		display: flex;
		flex-direction: column;
		gap: 4px;
		min-width: 0;
	}

	.modal-title {
		margin: 0;
		font-size: 18px;
		font-weight: 600;
		color: var(--colors-surface-200);
		line-height: 1.3;
	}

	.chips-row {
		position: relative;
		display: flex;
		align-items: center;
		gap: 8px;
		flex-wrap: wrap;
		padding-bottom: 16px;
		margin-bottom: 16px;
	}

	.chip {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		padding: 4px 8px;
		border-radius: 4px;
		font-size: 11px;
		font-weight: 600;
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}

	.chip-priority-high {
		color: #ff3b30;
		background-color: rgba(255, 59, 48, 0.12);
	}

	.chip-priority-medium {
		color: #ff9f0a;
		background-color: rgba(255, 159, 10, 0.12);
	}

	.chip-priority-low {
		color: #34c759;
		background-color: rgba(52, 199, 89, 0.12);
	}

	.chip-status-todo {
		color: var(--colors-surface-400);
		background-color: rgba(255, 255, 255, 0.08);
	}

	.chip-status-inProgress {
		color: #007aff;
		background-color: rgba(0, 122, 255, 0.12);
	}

	.chip-status-done {
		color: #34c759;
		background-color: rgba(52, 199, 89, 0.12);
	}

	.divider {
		height: 1px;
		background-color: rgba(255, 255, 255, 0.06);
	}

	.modal-body {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding-bottom: 16px;
		margin-bottom: 16px;
	}

	.chips-row,
	.modal-body {
		&::after {
			content: "";
			position: absolute;
			height: 1px;
			background-color: rgba(255, 255, 255, 0.06);
			left: 0;
			right: 0;
			bottom: 0;
		}
	}

	.section-label {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		margin: 0;
		font-size: 11px;
		font-weight: 600;
		color: var(--colors-surface-500);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.description {
		margin: 0;
		font-size: 13px;
		font-weight: 500;
		color: var(--colors-surface-300);
		line-height: 1.5;
		white-space: pre-wrap;
	}

	.meta-section {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.meta-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		min-height: 24px;
	}

	.meta-row-assignees {
		align-items: flex-start;
	}

	.meta-label {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-size: 12px;
		font-weight: 500;
		color: var(--colors-surface-500);
	}

	.meta-value {
		font-size: 12px;
		font-weight: 500;
		color: var(--colors-surface-300);
	}

	.assignees {
		display: flex;
		align-items: center;
	}

	.avatar {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
		border-radius: 50%;
		background-color: var(--colors-depth-3);
		color: var(--colors-surface-200);
		font-size: 11px;
		font-weight: 600;
		border: 2px solid var(--colors-depth-2);
		margin-left: -6px;
	}

	.avatar:first-child {
		margin-left: 0;
	}
</style>
