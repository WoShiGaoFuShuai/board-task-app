<template>
	<ColumnCard
		v-for="{column, tasks} in columns"
		:key="column.id"
		:column
		:tasks
	>
		<template #empty> {{ isAnyFilterActive ? 'No filtered tasks' : 'No tasks yet' }} </template>
	</ColumnCard>
</template>

<script
	setup
	lang="ts"
>
	import { type Column, ColumnCard } from '@entities/column';
	import { type Task, useTaskStore } from '@entities/task';
	import { computed } from 'vue';

	const props = defineProps<{
		boardColumns: Column[];
		filterTasks: (allTasks: Task[]) => Task[];
		isAnyFilterActive: boolean;
	}>();

	const { getTasksByIds } = useTaskStore();

	const columns = computed(() =>
		props.boardColumns.map((column) => {
			const allTasks = getTasksByIds(column.taskIds);

			const tasks = props.filterTasks(allTasks);

			return {
				column,
				tasks,
			};
		})
	);
</script>
