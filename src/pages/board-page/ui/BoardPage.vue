<template>
	<section
		v-if="currentBoard"
		class="board-page"
	>
		<div class="board-header">
			<h1 class="board-title">{{ currentBoard.title }}</h1>
		</div>

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
			<ColumnCard
				v-for="col in boardColumns"
				:key="col.id"
				:column="col"
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
</template>

<script
	setup
	lang="ts"
>
	import { useBoardStore } from '@entities/board';
	import { ColumnCard, useColumnStore } from '@entities/column';
	import { storeToRefs } from 'pinia';
	import { computed, onUnmounted, watchEffect } from 'vue';
	import { useRoute } from 'vue-router';

	const route = useRoute();
	const boardStore = useBoardStore();
	const { setCurrentBoardId, resetCurrentBoardId } = boardStore;
	const { currentBoard } = storeToRefs(boardStore);
	const { getColumnsByIds } = useColumnStore();

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
</script>

<style scoped>
	.board-page {
		display: flex;
		flex-direction: column;
		height: 100%;
		background-color: var(--colors-depth-2);
	}

	.board-header {
		padding: 20px 24px 16px;
	}

	.board-title {
		font-size: 18px;
		font-weight: 600;
		color: #fff;
		margin: 0;
	}

	.board-columns {
		display: flex;
		gap: 16px;
		flex: 1;
		padding: 0 24px 24px;
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
