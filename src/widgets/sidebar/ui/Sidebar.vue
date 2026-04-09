<template>
	<aside class="sidebar">
		<div class="sidebar-header">
			<div class="flex items-center gap-2">
				<div class="i-lucide-layout-dashboard text-primary-400 text-xl" />
				<span class="text-white font-semibold text-sm tracking-wide uppercase"> Boards </span>
			</div>
		</div>

		<nav class="sidebar-nav">
			<RouterLink
				v-for="board in boardStore.boards"
				:key="board.id"
				:to="{ name: 'board', params: { id: board.id } }"
				class="sidebar-link"
			>
				<div class="i-lucide-kanban text-base" />
				<span class="truncate">{{ board.title }}</span>
				<span class="ml-auto text-xs opacity-50"> {{ board.columnIds.length }} </span>
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

	const boardStore = useBoardStore();
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

	.sidebar-footer {
		padding: 8px;
		border-top: 1px solid rgba(255, 255, 255, 0.06);
	}
</style>
