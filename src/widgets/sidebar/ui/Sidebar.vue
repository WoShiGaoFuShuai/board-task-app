<template>
	<aside class="sidebar">
		<div class="sidebar-header">
			<div class="flex items-center gap-2">
				<div class="i-lucide-layout-dashboard text-primary-400 text-xl" />
				<span class="text-white font-semibold text-sm tracking-wide uppercase"> Boards </span>
			</div>
		</div>

		<nav class="sidebar-nav">
			<div
				v-if="isLoading"
				class="sidebar-state"
				role="status"
			>
				<div class="i-lucide-loader-circle text-base animate-spin" />
				<span>Loading boards…</span>
			</div>

			<div
				v-else-if="isError"
				class="sidebar-error"
			>
				<div class="sidebar-state">
					<div class="i-lucide-circle-alert text-base" />
					<span>Couldn't load boards</span>
				</div>
				<button
					class="sidebar-retry"
					type="button"
					@click="loadBoards"
				>
					<div class="i-lucide-rotate-cw text-sm" />
					<span>Retry</span>
				</button>
			</div>

			<div
				v-else-if="!boardStore.boards.length"
				class="sidebar-state"
			>
				<div class="i-lucide-folder-open text-base" />
				<span>No boards yet. Create one below.</span>
			</div>

			<RouterLink
				v-for="board in boardStore.boards"
				v-else
				:key="board.id"
				:to="{ name: 'board', params: { id: board.id } }"
				class="sidebar-link"
			>
				<div class="i-lucide-kanban text-base" />
				<span class="truncate">{{ board.title }}</span>
				<span class="ml-auto text-xs opacity-50"> {{ board.length }} </span>
			</RouterLink>
		</nav>

		<div class="sidebar-footer">
			<button
				class="sidebar-link group"
				type="button"
			>
				<div class="i-lucide-plus text-base text-primary-400 group-hover:text-primary-300" />
				<span>New board</span>
			</button>
		</div>
	</aside>
</template>

<script
	setup
	lang="ts"
>
	import { useBoardStore } from '@entities/board';
	import { onMounted, ref } from 'vue';

	const boardStore = useBoardStore();

	const isLoading = ref(false);
	const isError = ref(false);

	const loadBoards = async () => {
		if (isLoading.value) return;
		isLoading.value = true;
		isError.value = false;

		try {
			await boardStore.fetchBoardsWithLength();
		} catch (e) {
			console.error(e);
			isError.value = true;
		} finally {
			isLoading.value = false;
		}
	};

	onMounted(loadBoards);
</script>

<style scoped>
	.sidebar {
		display: flex;
		flex-direction: column;
		width: 260px;
		height: 100%;
		background-color: var(--colors-depth-1);
		border-right: 1px solid rgba(255, 255, 255, 0.06);
	}

	.sidebar-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20px 16px 12px;
	}

	.sidebar-nav {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 2px;
		padding: 0 8px;
		overflow-y: auto;
	}

	.sidebar-link {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 8px 12px;
		border-radius: 8px;
		color: var(--colors-surface-400);
		font-size: 14px;
		text-decoration: none;
		transition:
			background-color 0.15s ease,
			color 0.15s ease;
		cursor: pointer;
	}

	.sidebar-link:hover {
		background-color: rgba(255, 255, 255, 0.05);
		color: #fff;
	}

	.router-link-exact-active {
		background-color: rgba(255, 255, 255, 0.1);
		color: #fff;
	}

	.sidebar-state {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 8px 12px;
		color: var(--colors-surface-500);
		font-size: 13px;
		line-height: 1.4;
	}

	.sidebar-error {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 4px;
	}

	.sidebar-retry {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		margin-left: 12px;
		padding: 6px 10px;
		border: none;
		border-radius: 8px;
		background-color: rgba(255, 255, 255, 0.05);
		color: var(--colors-surface-300);
		font-size: 12px;
		font-weight: 500;
		cursor: pointer;
		transition:
			background-color 0.15s ease,
			color 0.15s ease;
	}

	.sidebar-retry:hover {
		background-color: rgba(255, 255, 255, 0.1);
		color: #fff;
	}

	.sidebar-footer {
		padding: 8px;
		border-top: 1px solid rgba(255, 255, 255, 0.06);
	}
</style>
