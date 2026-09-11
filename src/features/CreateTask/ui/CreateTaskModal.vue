<template>
	<dialog class="modal">
		<div class="modal-header">
			<h2 class="modal-title">Create Task</h2>

			<ButtonIcon
				icon-class="i-lucide-x text-base"
				aria-label="Close dialog"
				:type="ButtonType.DEFAULT"
				:size="ButtonSize.S"
				:color="ButtonColor.MUTED"
				@click="$emit('close')"
			/>
		</div>

		<div class="modal-body">
			<div class="field">
				<label
					class="field-label"
					for="task-title"
					>Title</label
				>
				<input
					v-model="form.title"
					class="field-input"
					type="text"
					id="task-title"
					name="title"
					placeholder="Task title"
				>
				<span
					v-if="errors.title"
					class="field-error"
					>{{ errors.title }}</span
				>
			</div>

			<div class="field">
				<label
					class="field-label"
					for="task-description"
					>Description</label
				>
				<textarea
					v-model="form.description"
					class="field-input field-textarea"
					id="task-description"
					name="description"
					placeholder="Add a description..."
				></textarea>
			</div>

			<div class="field">
				<span class="field-label">Column</span>
				<div
					v-if="columns.length"
					class="buttons-group"
				>
					<button
						class="chip column-chip"
						v-for="col in columns"
						:key="col.id"
						type="button"
						@click="form.columnId = col.id"
						:class="[{'column-chip--active': form.columnId === col.id}]"
					>
						{{ col.title }}
					</button>
				</div>
				<span
					v-if="errors.columnId"
					class="field-error"
					>{{ errors.columnId }}</span
				>
			</div>

			<div class="field">
				<span class="field-label">Priority</span>
				<div class="buttons-group">
					<button
						class="chip"
						v-for="p in PRIORITIES"
						:key="p.value"
						type="button"
						:class="[`priority-chip--${p.value}`,{'active': form.priority === p.value}]"
						@click="form.priority = p.value"
					>
						{{ p.label }}
					</button>
				</div>
			</div>

			<div class="field">
				<label
					class="field-label"
					for="task-due-date"
					>Due Date</label
				>
				<div class="date-wrapper">
					<input
						@click="showCalendar"
						v-model="form.dueDate"
						class="field-input"
						type="date"
						id="task-due-date"
						name="dueDate"
						:min="todayDate"
					>
				</div>
			</div>
		</div>
		<div class="modal-footer">
			<button
				class="btn-ghost"
				type="button"
				@click="$emit('close')"
			>
				Cancel
			</button>
			<button
				class="btn-primary"
				type="button"
				@click="handleSubmit"
			>
				Create Task
			</button>
		</div>
	</dialog>
</template>

<script
	setup
	lang="ts"
>
	import { useBoardStore } from '@entities/board';
	import { useColumnStore } from '@entities/column';
	import type { CreateTaskInput, TaskPriority } from '@entities/task';
	import { ButtonColor, ButtonIcon, ButtonSize, ButtonType } from '@shared/ui/ButtonIcon';
	import { storeToRefs } from 'pinia';
	import { computed, reactive, watch } from 'vue';

	const { currentBoard } = storeToRefs(useBoardStore());
	const { getColumnsByIds } = useColumnStore();

	const emit = defineEmits<{
		submit: [data: CreateTaskInput];
		close: [];
	}>();

	const PRIORITIES = [
		{ value: 'low' as const, label: 'Low' },
		{ value: 'medium' as const, label: 'Medium' },
		{ value: 'high' as const, label: 'High' },
	];

	const showCalendar = (e: MouseEvent) => {
		try {
			(e.currentTarget as HTMLInputElement).showPicker();
		} catch {
			// TODO: додати після тоаст з помилкою
		}
	};

	const todayDate = computed(() => new Date().toISOString().split('T')[0]);

	const columns = computed(() => getColumnsByIds(currentBoard.value?.columnIds));

	const form = reactive<CreateTaskInput>({
		title: '',
		description: null,
		columnId: columns.value[0]?.id ?? '',
		priority: 'medium' as TaskPriority,
		dueDate: null,
		assigneesId: [],
	});

	const errors = reactive({ title: '', columnId: '' });

	const validate = () => {
		errors.title = form.title.trim() ? '' : 'Title is required';
		errors.columnId = form.columnId ? '' : 'Create a column first';

		return !errors.title && !errors.columnId;
	};

	function handleSubmit() {
		if (!validate()) return;

		emit('submit', {
			...form,
			description: form.description?.trim() || null,
			dueDate: form.dueDate?.trim() || null,
		});
	}

	watch(
		() => form.title,
		() => (errors.title = '')
	);
</script>

<style scoped>
	.modal {
		position: static;
		display: flex;
		flex-direction: column;
		width: min(560px, calc(100vw - 32px));
		max-height: calc(100vh - 64px);
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 16px;
		background-color: var(--colors-depth-2);
		box-shadow: 0 20px 50px rgba(0, 0, 0, 0.45);
	}

	.modal-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 16px 24px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
	}

	.modal-title {
		font-size: 14px;
		font-weight: 600;
		color: var(--colors-surface-200);
	}

	.modal-body {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 20px 24px;
		overflow-y: auto;
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.field-label {
		font-size: 11px;
		font-weight: 600;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--colors-surface-500);
	}

	.field-input {
		width: 100%;
		padding: 8px 12px;
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 8px;
		background-color: var(--colors-depth-3);
		color: var(--colors-surface-200);
		font-size: 13px;
		font-weight: 500;
		outline: none;
		transition:
			border-color 0.15s ease,
			background-color 0.15s ease;
	}

	.field-input::placeholder {
		color: var(--colors-surface-600);
	}

	.field-input:hover {
		border-color: rgba(255, 255, 255, 0.1);
	}

	.field-input:focus {
		border-color: var(--colors-primary-400);
	}

	.field-textarea {
		min-height: 80px;
		resize: vertical;
	}

	.field-error {
		font-size: 11px;
		font-weight: 500;
		color: #ff3b30;
	}

	.date-wrapper {
		position: relative;
		display: flex;
		align-items: center;
	}

	input[type="date"] {
		color-scheme: dark;
	}

	.buttons-group {
		display: flex;
		gap: 8px;
	}

	.chip {
		padding: 4px 12px;
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 4px;
		background: transparent;
		color: var(--colors-surface-500);
		font-size: 11px;
		font-weight: 600;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		cursor: pointer;
		transition:
			color 0.15s ease,
			background-color 0.15s ease,
			border-color 0.15s ease;
	}

	.chip:hover {
		color: var(--colors-surface-300);
		background-color: rgba(255, 255, 255, 0.05);
	}

	/*TODO: переписати стилі на warning/danger/success in uno conf */

	.column-chip--active {
		color: var(--colors-surface-300);
		background-color: rgba(255, 255, 255, 0.05);
	}

	.priority-chip--low.active {
		color: #34c759;
		background-color: rgba(52, 199, 89, 0.12);
		border-color: rgba(52, 199, 89, 0.2);
	}

	.priority-chip--medium.active {
		color: #ff9f0a;
		background-color: rgba(255, 159, 10, 0.12);
		border-color: rgba(255, 159, 10, 0.2);
	}

	.priority-chip--high.active {
		color: #ff3b30;
		background-color: rgba(255, 59, 48, 0.12);
		border-color: rgba(255, 59, 48, 0.2);
	}

	.modal-footer {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 8px;
		padding: 16px 24px;
		border-top: 1px solid rgba(255, 255, 255, 0.06);
		flex-shrink: 0;
	}

	.btn-ghost {
		padding: 8px 16px;
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 8px;
		background: transparent;
		color: var(--colors-surface-400);
		font-size: 13px;
		font-weight: 500;
		cursor: pointer;
		transition:
			color 0.15s ease,
			background-color 0.15s ease,
			border-color 0.15s ease;
	}

	.btn-ghost:hover {
		color: var(--colors-surface-200);
		background-color: rgba(255, 255, 255, 0.06);
		border-color: rgba(255, 255, 255, 0.12);
	}

	.btn-primary {
		padding: 8px 16px;
		border: none;
		border-radius: 8px;
		background-color: var(--colors-primary-500);
		color: #fff;
		font-size: 13px;
		font-weight: 600;
		cursor: pointer;
		transition: background-color 0.15s ease;
	}

	.btn-primary:hover {
		background-color: var(--colors-primary-400);
	}

	.btn-primary:active {
		background-color: var(--colors-primary-600);
	}
</style>
