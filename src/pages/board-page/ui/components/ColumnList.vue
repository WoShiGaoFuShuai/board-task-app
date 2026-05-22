<template>
	<ColumnCard
		v-for="{column, tasks} in columns"
		:key="column.id"
		:column
		:tasks
	>
		<template #empty> {{ query ? 'No filtered tasks' : 'No tasks yet' }} </template>
	</ColumnCard>
</template>

<script
	setup
	lang="ts"
>
	import { type Column, ColumnCard } from '@entities/column';
	import { useTaskStore } from '@entities/task';
	import { computed } from 'vue';

	const props = defineProps<{
		boardColumns: Column[];
		query: string;
	}>();

	const { getTasksByIds } = useTaskStore();

	const columns = computed(() =>
		props.boardColumns.map((column) => {
			const allTasks = getTasksByIds(column.taskIds);
			const q = props.query.trim().toLowerCase();

			const tasks = q
				? allTasks.filter(
						(task) => task.title.toLowerCase().includes(q) || task.description?.toLowerCase().includes(q)
					)
				: allTasks;

			return {
				column,
				tasks,
			};
		})
	);
</script>
