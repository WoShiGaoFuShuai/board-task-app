<template>
	<ColumnCard
		v-for="{ column, tasks } in columns"
		:key="column.id"
		:column
		:tasksAmount="tasks.length"
	>
		<template #column-body>
			<DraggableTaskList
				:tasks
				:emptyPhrase
			/>
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
