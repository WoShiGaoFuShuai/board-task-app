<template>
	<section v-if="currentBoard">
		<div v-if="currentBoard.title">{{ currentBoard.title }}</div>

		<section v-if="!boardColumns.length">Don't have columns yes. Add them!</section>
		<section
			v-else
			class="flex gap-4"
		>
			<ColumnCard
				v-for="col in boardColumns"
				:key="col.id"
				:column="col"
			/>
		</section>
	</section>
	<!--    //TODO: зробити редірект на 404 чи fallback?  -->
	<section v-else>Sorry, cant find the board</section>
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

	//TODO: CHECK ALL types => make them export from index!!!
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
</style>
