<template>
	<ColumnCard
		v-for="{ column, tasks } in columns"
		:key="column.id"
		:column
		:tasksAmount="tasks.length"
	>
		<template #column-body>
			<div class="column-body">
				<DraggableTaskList
					:column-id="column.id"
					:tasks
					class="column-body-tasks"
				/>

				<div
					v-if="!tasks.length"
					class="column-empty"
				>
					<span>
						{{ emptyPhrase }}
					</span>
				</div>
			</div>
		</template>
	</ColumnCard>
</template>

<script
	setup
	lang="ts"
>
	import { type Column, ColumnCard } from '@entities/column';
	import type { Task } from '@entities/task';
	import { DraggableTaskList } from '@features/MoveTask';
	import { computed } from 'vue';

	const props = defineProps<{
		columns: { column: Column; tasks: Task[] }[];
		isAnyFilterActive: boolean;
	}>();

	const emptyPhrase = computed(() => (props.isAnyFilterActive ? 'No filtered tasks' : 'No tasks yet'));
</script>

<style scoped>
	.column-body {
		position: relative;
	}

	.column-empty {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 24px 12px;
		color: var(--colors-surface-600);
		font-size: 13px;
		position: absolute;
		inset: 0;
		pointer-events: none;
	}
</style>
