<template>
	<section v-if="currentBoard">
		<div>Its board page for {{ currentBoard.title }}</div>
	</section>
	<!--    //TODO: зробити редірект на 404 чи fallback?  -->
	<section v-else>Sorry, cant find the board</section>
</template>

<script
	setup
	lang="ts"
>
	import { useBoardStore } from '@entities/board';
	import { storeToRefs } from 'pinia';
	import { computed, onUnmounted, watchEffect } from 'vue';
	import { useRoute } from 'vue-router';

	const route = useRoute();
	const boardStore = useBoardStore();
	const { setCurrentBoardId, resetCurrentBoardId } = boardStore;
	const { currentBoard } = storeToRefs(boardStore);

	const paramsId = computed(() => {
		const id = route.params.id;
		return Array.isArray(id) ? id[0] : id;
	});

	watchEffect(() => {
		setCurrentBoardId(paramsId.value);
	});

	onUnmounted(() => resetCurrentBoardId());
</script>

<style scoped>
</style>
