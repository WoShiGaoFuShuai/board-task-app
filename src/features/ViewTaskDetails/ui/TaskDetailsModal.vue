<template>
	<section
		class="task-details-modal"
		role="dialog"
		aria-modal="true"
		aria-labelledby="task-details-title"
	>
		<header class="modal-header">
			<div class="modal-title-block">
				<input
					type="text"
					v-if="isEditing"
					v-model="editTaskForm.title"
					class="title-input"
					aria-label="Task title"
				>
				<h2
					v-else
					id="task-details-title"
					class="modal-title"
				>
					{{ task.title }}
				</h2>
			</div>

			<button
				v-if="isEditing"
				type="button"
				class="btn-save"
				@click="editTaskConfirm"
			>
				Save
			</button>
			<ButtonIcon
				v-else
				class="edit-btn default"
				icon-class="i-lucide-pencil text-base"
				aria-label="Edit"
				:size="ButtonSize.S"
				:type="ButtonType.DEFAULT"
				@click="$emit('editStart')"
			/>

			<ButtonIcon
				icon-class="i-lucide-trash text-base"
				aria-label="Delete"
				:size="ButtonSize.S"
				:type="ButtonType.DEFAULT"
				@click="$emit('deleteTask')"
			/>

			<ButtonIcon
				icon-class="i-lucide-x text-base"
				aria-label="Close"
				:size="ButtonSize.S"
				:type="ButtonType.DEFAULT"
				@click="$emit('closeModal')"
			/>
		</header>

		<div class="chips-row">
			<div
				v-if="isEditing"
				class="chip-select-wrapper"
			>
				<select
					v-model="editTaskForm.priority"
					class="chip-select"
					aria-label="Priority"
				>
					<option
						v-for="(option, i) in TASK_PRIORITIES"
						:key="i"
						:value="option"
					>
						{{ option }}
					</option>
					<option :value="null">No priority</option>
				</select>
			</div>
			<span
				v-else-if="task.priority"
				:class="['chip', `chip-priority-${task.priority}`]"
			>
				<div class="i-lucide-flag text-xs" />
				{{ task.priority }}
			</span>

			<div
				v-if="isEditing && columnIds"
				class="chip-select-wrapper"
			>
				<select
					v-model="editTaskForm.columnId"
					class="chip-select"
					aria-label="Column"
				>
					<option
						v-for="(option, i) in columnIds"
						:key="i"
						:value="option"
					>
						{{ option }}
					</option>
				</select>
			</div>
			<span
				v-else
				:class="['chip', `chip-column-${task.columnId}`]"
			>
				<div class="i-lucide-circle-dot text-xs" />
				{{ task.columnId }}
			</span>
		</div>

		<section class="modal-body">
			<h3 class="section-label">
				<div class="i-lucide-align-left text-xs" />
				Description
			</h3>
			<textarea
				v-if="isEditing"
				v-model="editTaskForm.description"
				class="description-textarea"
				placeholder="Add a description…"
				aria-label="Description"
			></textarea>
			<p
				v-else-if="task.description"
				class="description"
			>
				{{ task.description }}
			</p>
		</section>

		<section class="meta-section">
			<div class="meta-row">
				<span class="meta-label">
					<div class="i-lucide-calendar-plus text-sm" />
					Created
				</span>
				<span class="meta-value">{{ formattedCreatedDate }}</span>
			</div>

			<div class="meta-row">
				<span class="meta-label">
					<div class="i-lucide-calendar text-sm" />
					Due date
				</span>

				<div
					v-if="isEditing"
					class="date-wrapper"
				>
					<input
						v-model="editTaskForm.dueDate"
						class="field-input"
						type="date"
						:min="todayDate"
					>
				</div>
				<span
					v-else-if="task.dueDate"
					class="meta-value"
					>{{ formattedDueDate }}</span
				>
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
	import { type EditTaskInput, TASK_PRIORITIES, type Task } from '@entities/task';
	import { ButtonIcon, ButtonSize, ButtonType } from '@shared/ui/ButtonIcon';
	import { computed, reactive, watch } from 'vue';

	// TODO: пройтись по html і додати if якщо треба (description, due_date etc) або просто not-set чи щось таке?

	const emit = defineEmits<{
		closeModal: [];
		deleteTask: [];
		editStart: [];
		editFinishConfirm: [editedTask: EditTaskInput];
	}>();

	const props = defineProps<{
		task: Task;
		isEditing: boolean;
		columnIds?: string[];
	}>();

	const formatDate = (dateStr: string | null): string => {
		if (!dateStr) return '';
		return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(dateStr));
	};

	const formattedCreatedDate = computed(() => formatDate(props.task.createdAt));

	const formattedDueDate = computed(() => formatDate(props.task.dueDate));

	const todayDate = new Date().toISOString().split('T')[0];

	const editTaskForm = reactive<Omit<EditTaskInput, 'id'>>({
		title: props.task.title,
		priority: props.task.priority,
		columnId: props.task.columnId,
		description: props.task.description,
		dueDate: props.task.dueDate,
	});

	const editTaskConfirm = () => {
		emit('editFinishConfirm', {
			id: props.task.id,
			...editTaskForm,
			title: editTaskForm.title.trim(),
			description: editTaskForm.description?.trim() || null,
			dueDate: editTaskForm.dueDate?.trim() || null,
		});
	};

	const syncFormFromTask = (task: Task) => {
		editTaskForm.title = task.title;
		editTaskForm.priority = task.priority;
		editTaskForm.columnId = task.columnId;
		editTaskForm.description = task.description;
		editTaskForm.dueDate = task.dueDate;
	};

	watch(
		() => props.isEditing,
		(val) => {
			if (!val) syncFormFromTask(props.task);
		}
	);

	watch(() => props.task, syncFormFromTask);
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
		margin-right: auto;
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

	.chip-column-todo {
		color: var(--colors-surface-400);
		background-color: rgba(255, 255, 255, 0.08);
	}

	.chip-column-inProgress {
		color: #007aff;
		background-color: rgba(0, 122, 255, 0.12);
	}

	.chip-column-done {
		color: #34c759;
		background-color: rgba(52, 199, 89, 0.12);
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

	.title-input {
		width: 100%;
		padding: 2px 6px;
		margin: 0;
		font-size: 18px;
		font-weight: 600;
		color: var(--colors-surface-200);
		background: transparent;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 6px;
		outline: none;
		line-height: 1.3;
		transition: border-color 0.15s ease;
	}

	.title-input:focus {
		border-color: var(--colors-primary-400);
	}

	.btn-save {
		padding: 6px 14px;
		border: none;
		border-radius: 8px;
		background-color: var(--colors-primary-500);
		color: #fff;
		font-size: 13px;
		font-weight: 600;
		cursor: pointer;
		white-space: nowrap;
		transition: background-color 0.15s ease;
	}

	.btn-save:hover {
		background-color: var(--colors-primary-400);
	}

	.chip-select-wrapper {
		display: inline-flex;
	}

	.chip-select {
		padding: 4px 8px;
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 4px;
		background-color: var(--colors-depth-3);
		color: var(--colors-surface-300);
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		cursor: pointer;
		outline: none;
		color-scheme: dark;
		transition: border-color 0.15s ease;
	}

	.chip-select:focus {
		border-color: var(--colors-primary-400);
	}

	.description-textarea {
		width: 100%;
		min-height: 80px;
		padding: 8px 10px;
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 8px;
		background-color: var(--colors-depth-3);
		color: var(--colors-surface-200);
		font-size: 13px;
		font-weight: 500;
		line-height: 1.5;
		resize: vertical;
		outline: none;
		box-sizing: border-box;
		transition: border-color 0.15s ease;
	}

	.description-textarea::placeholder {
		color: var(--colors-surface-500);
	}

	.description-textarea:focus {
		border-color: var(--colors-primary-400);
	}

	.date-wrapper {
		display: flex;
		align-items: center;
	}

	.field-input {
		padding: 4px 8px;
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 8px;
		background-color: var(--colors-depth-3);
		color: var(--colors-surface-200);
		font-size: 12px;
		font-weight: 500;
		outline: none;
		color-scheme: dark;
		transition: border-color 0.15s ease;
	}

	.field-input:focus {
		border-color: var(--colors-primary-400);
	}

	.field-input::-webkit-calendar-picker-indicator {
		opacity: 0.4;
		cursor: pointer;
		filter: invert(1);
	}
</style>
