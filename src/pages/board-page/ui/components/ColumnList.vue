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
	import type { Task } from '@entities/task';

	defineProps<{
		columns: { column: Column; tasks: Task[] }[];
		isAnyFilterActive: boolean;
	}>();
</script>
