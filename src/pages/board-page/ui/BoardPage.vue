<template>
	<section>
		<section
			v-if="currentBoard"
			class="board-page"
		>
			<div class="board-header">
				<h1 class="board-title">{{ currentBoard.title }}</h1>
			</div>

			<FilterBar
				v-model="query"
				@toggle-filter="toggleFilter($event)"
				@reset-filters="resetActiveFilters"
				:hasActiveFilters
				:activeFilters
				class="board-filter-bar"
			/>

			<section
				v-if="!boardColumns.length"
				class="board-empty"
			>
				<div class="i-lucide-columns-3 text-3xl text-surface-600 mb-3" />
				<p class="text-surface-500 text-sm">No columns yet. Add them to get started!</p>
			</section>

			<section
				v-else
				class="board-columns"
			>
				<ColumnList
					:columns="columns"
					:isAnyFilterActive
				/>
			</section>
		</section>

		<section
			v-else
			class="board-not-found"
		>
			<div class="i-lucide-search-x text-3xl text-surface-600 mb-3" />
			<p class="text-surface-500 text-sm">Sorry, can't find the board</p>
		</section>

		<ViewTaskDetails />
	</section>
</template>

<script
	setup
	lang="ts"
>
	import { useBoardStore } from '@entities/board';
	import { useColumnStore } from '@entities/column';
	import { useTaskStore } from '@entities/task';
	import { useFilter } from '@features/FilterPanel';
	import { useViewTaskDetailsStore, ViewTaskDetails } from '@features/ViewTaskDetails';
	import { storeToRefs } from 'pinia';
	import { computed, onUnmounted, provide, watchEffect } from 'vue';
	import { useRoute } from 'vue-router';
	import ColumnList from './components/ColumnList.vue';
	import FilterBar from './components/FilterBar.vue';

	const route = useRoute();
	const boardStore = useBoardStore();
	const { setCurrentBoardId, resetCurrentBoardId } = boardStore;
	const { currentBoard } = storeToRefs(boardStore);
	const { getColumnsByIds } = useColumnStore();
	const { getTasksByIds } = useTaskStore();
	const viewTaskDetailsStore = useViewTaskDetailsStore();

	const paramsId = computed(() => {
		const id = route.params.id;
		if (!id) return '';

		return Array.isArray(id) ? id[0] : id;
	});

	watchEffect(() => {
		setCurrentBoardId(paramsId.value);
	});

	onUnmounted(() => resetCurrentBoardId());

	const boardColumns = computed(() => getColumnsByIds(currentBoard.value?.columnIds));

	const { query, activeFilters, toggleFilter, resetActiveFilters, hasActiveFilters, filterTasks, isAnyFilterActive } =
		useFilter();

	const columns = computed(() =>
		boardColumns.value.map((column) => {
			const allTasks = getTasksByIds(column.taskIds);

			const tasks = filterTasks(allTasks);

			return {
				column,
				tasks,
			};
		})
	);

	const handleTaskClicked = (id: string) => {
		viewTaskDetailsStore.open(id);
	};
	provide('onTaskClick', handleTaskClicked);
</script>

<style scoped>
	.board-page {
		display: flex;
		flex-direction: column;
		height: 100%;
		background-color: var(--colors-depth-2);
		padding: 20px 24px;
	}

	.board-header {
		margin-bottom: 16px;
	}

	.board-title {
		font-size: 18px;
		font-weight: 600;
		color: #fff;
		margin: 0;
	}

	.board-filter-bar {
		margin-bottom: 8px;
	}

	.board-columns {
		display: flex;
		gap: 16px;
		flex: 1;
		overflow-x: auto;
		align-items: flex-start;
	}

	.board-empty,
	.board-not-found {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex: 1;
		padding: 48px 24px;
	}
</style>
