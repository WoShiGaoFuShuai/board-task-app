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
				:columns
				class="board-filter-bar"
			/>

			<CreateTask />

			<!--            // TODO: add create columns logic, if there is no columns - cant create task-->

			<section
				v-if="!columns.length"
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
					:columns="columnsWithTasks"
					:isAnyFilterActive
				/>
			</section>
		</section>

		<section
			v-else-if="!isLoading"
			class="board-not-found"
		>
			<div
				:class="errorState.statusCode === 404 ? 'i-lucide-search-x' : 'i-lucide-cloud-off'"
				class="text-3xl text-surface-600 mb-3"
			/>
			<div class="flex flex-col items-center gap-3">
				<p class="text-surface-500 text-sm">{{ errorState.message }}</p>

				<button
					v-if="errorState.statusCode !== 404"
					class="board-retry-btn"
					type="button"
					@click="loadBoard(paramsId)"
				>
					<div class="i-lucide-rotate-cw text-sm" />
					<span>Retry</span>
				</button>
			</div>
		</section>

		<section
			v-else
			class="board-loading"
		>
			<p class="board-loading-text">Loading your board…</p>
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
	import { CreateTask } from '@features/CreateTask';
	import { useFilter } from '@features/FilterPanel';
	import { useViewTaskDetailsStore, ViewTaskDetails } from '@features/ViewTaskDetails';
	import { ApiError } from '@shared/api/ApiError.ts';
	import { storeToRefs } from 'pinia';
	import { computed, onUnmounted, provide, ref, shallowRef, watch } from 'vue';
	import { useRoute } from 'vue-router';
	import ColumnList from './components/ColumnList.vue';
	import FilterBar from './components/FilterBar.vue';

	const route = useRoute();
	const boardStore = useBoardStore();
	const columnStore = useColumnStore();
	const { resetCurrentBoard, fetchBoardFullInfo } = boardStore;
	const { currentBoard } = storeToRefs(boardStore);
	const { resetColumns } = columnStore;
	const { columns } = storeToRefs(columnStore);

	const { getTasksByColumnId } = useTaskStore();
	const viewTaskDetailsStore = useViewTaskDetailsStore();

	const paramsId = computed(() => {
		const id = route.params.id;
		if (!id) return '';

		return Array.isArray(id) ? id[0] : id;
	});

	const isLoading = ref(false);
	const errorState = shallowRef<{ message: string; statusCode: null | number }>({
		message: '',
		statusCode: null,
	});

	const loadBoard = async (id: string) => {
		resetCurrentBoard();
		isLoading.value = true;
		errorState.value = {
			message: '',
			statusCode: null,
		};

		try {
			await fetchBoardFullInfo(id);
		} catch (err) {
			if (err instanceof ApiError && err.statusCode === 404) {
				errorState.value = {
					message: 'Sorry, the board is not found.',
					statusCode: err.statusCode,
				};

				return;
			}

			errorState.value = {
				message: 'There was an error while fetching board. Try again',
				statusCode: null,
			};
		} finally {
			isLoading.value = false;
		}
	};

	watch(
		paramsId,
		async (val) => {
			if (!val) return;

			await loadBoard(val);
		},
		{ immediate: true }
	);

	onUnmounted(() => {
		resetCurrentBoard();
		resetColumns();
	});

	const { query, activeFilters, toggleFilter, resetActiveFilters, hasActiveFilters, filterTasks, isAnyFilterActive } =
		useFilter();

	const columnsWithTasks = computed(() =>
		columns.value.map((column) => {
			const allTasks = getTasksByColumnId(column.id);

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
	.board-not-found,
	.board-loading {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex: 1;
		padding: 48px 24px;
	}

	.board-loading {
		gap: 12px;
	}

	.board-loading-text {
		margin: 0;
		font-size: 13px;
		font-weight: 500;
		color: var(--colors-surface-400);
	}

	.board-retry-btn {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 8px 14px;
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 8px;
		background-color: rgba(255, 255, 255, 0.06);
		color: var(--colors-surface-200);
		font-size: 13px;
		font-weight: 500;
		cursor: pointer;
		transition:
			background-color 0.15s ease,
			color 0.15s ease;
	}

	.board-retry-btn:hover {
		background-color: rgba(255, 255, 255, 0.08);
		color: #fff;
	}

	.board-retry-btn:active {
		background-color: rgba(255, 255, 255, 0.1);
	}

	.board-retry-btn:focus-visible {
		outline: 2px solid var(--colors-primary-400);
		outline-offset: 2px;
	}
</style>
