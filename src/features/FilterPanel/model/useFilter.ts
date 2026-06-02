import type { Task } from '@entities/task';
import { refDebounced } from '@vueuse/core';
import { computed, ref } from 'vue';
import { matchesPriority, matchesQuery, matchesStatus } from './lib/matchers';
import type { ActiveFilters } from './types';

export const useFilter = () => {
	const activeFilters = ref<ActiveFilters>({
		priority: [],
		status: [],
	});

	const query = ref('');
	const queryDebounced = refDebounced(query, 200);

	const toggleFilter = <K extends keyof ActiveFilters>(filterInfo: { key: K; filter: ActiveFilters[K][number] }) => {
		const { key, filter } = filterInfo;
		const list = activeFilters.value[key] as Array<ActiveFilters[K][number]>;
		const idx = list.indexOf(filter);
		if (idx === -1) list.push(filter);
		else list.splice(idx, 1);
	};

	const resetActiveFilters = () => (activeFilters.value = { priority: [], status: [] });

	const hasActiveFilters = computed(() => Object.values(activeFilters.value).some((arr) => arr.length > 0));

	const isAnyFilterActive = computed(() => Boolean(query.value) || hasActiveFilters.value);

	const filterTasks = (allTasks: Task[]) => {
		return allTasks.filter(
			(task: Task) =>
				matchesPriority(task, activeFilters.value.priority) &&
				matchesStatus(task, activeFilters.value.status) &&
				matchesQuery(task, queryDebounced.value)
		);
	};

	return { query, activeFilters, toggleFilter, resetActiveFilters, hasActiveFilters, filterTasks, isAnyFilterActive };
};
