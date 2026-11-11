<template>
	<section class="flex h-screen">
		<Sidebar />
		<RouterView class="flex-1 overflow-y-auto" />
		<ToastList />
	</section>
</template>

<script
	setup
	lang="ts"
>
	import { useBoardStore } from '@entities/board';
	import { ToastList } from '@shared/toast';
	import { Sidebar } from '@widgets/sidebar';
	import { onMounted } from 'vue';

	const boardStore = useBoardStore();

	onMounted(() => {
		boardStore.fetchBoardsWithLength();
	});
</script>
