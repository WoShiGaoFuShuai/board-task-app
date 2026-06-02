<template>
	<div class="filter-panel">
		<header class="filter-header">
			<span class="filter-title">Filters</span>
			<button
				class="filter-reset"
				type="button"
				:disabled="!hasActiveFilters"
				@click="$emit('resetFilters')"
			>
				Reset
			</button>
		</header>

		<section class="filter-section">
			<p class="filter-section-label">{{ priority.title }}</p>

			<div class="filter-chips">
				<button
					type="button"
					v-for="item in priority.items"
					:key="item.value"
					class="filter-chip"
					:class="{ [`chip-priority--${item.value}`]: activeFilters.priority.includes(item.value)}"
					@click="$emit('toggleFilter', {key: priority.id, filter: item.value })"
				>
					{{ item.value }}
				</button>
			</div>
		</section>

		<section class="filter-section">
			<p class="filter-section-label">{{ status.title }}</p>

			<div class="filter-chips">
				<button
					type="button"
					v-for="item in status.items"
					:key="item.value"
					class="filter-chip"
					:class="{ 'chip-status--active': activeFilters.status.includes(item.value)}"
					@click="$emit('toggleFilter', {key: status.id, filter: item.value })"
				>
					{{ item.value }}
				</button>
			</div>
		</section>
	</div>
</template>

<script
	lang="ts"
	setup
>
	import { priority, status } from '../model/constants';
	import type { ActiveFilters, ToggleFilterPayload } from '../model/types';

	defineEmits<{
		toggleFilter: [payload: ToggleFilterPayload];
		resetFilters: [];
	}>();

	defineProps<{
		hasActiveFilters: boolean;
		activeFilters: ActiveFilters;
	}>();
</script>

<style scoped>
	.filter-panel {
		display: flex;
		flex-direction: column;
		gap: 16px;
		width: 280px;
		padding: 14px;
		background-color: var(--colors-depth-3);
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 12px;
		box-shadow:
			0 10px 30px rgba(0, 0, 0, 0.4),
			0 2px 6px rgba(0, 0, 0, 0.2);
		font-family: inherit;
	}

	.filter-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.filter-title {
		margin: 0;
		font-size: 13px;
		font-weight: 600;
		color: var(--colors-surface-200);
	}

	.filter-reset {
		border: none;
		background: transparent;
		font-size: 12px;
		font-weight: 500;
		color: var(--colors-primary-400);
		transition:
			color 0.15s ease,
			opacity 0.15s ease;
	}

	.filter-reset:hover:not(:disabled) {
		color: var(--colors-primary-300);
	}

	.filter-reset:disabled {
		color: var(--colors-surface-600);
		cursor: not-allowed;
	}

	.filter-section {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.filter-section-label {
		font-size: 10px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--colors-surface-500);
	}

	.filter-chips {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}

	.filter-chip {
		padding: 5px 10px;
		border: 1px solid transparent;
		border-radius: 6px;
		background-color: rgba(255, 255, 255, 0.04);
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--colors-surface-400);
		transition:
			background-color 0.15s ease,
			color 0.15s ease,
			border-color 0.15s ease;
	}

	.filter-chip:hover {
		background-color: rgba(255, 255, 255, 0.08);
		color: var(--colors-surface-200);
	}

	.chip-priority--high {
		color: #ff3b30;
		background-color: rgba(255, 59, 48, 0.12);
	}

	.chip-priority--medium {
		color: #ff9f0a;
		background-color: rgba(255, 159, 10, 0.12);
	}

	.chip-priority--low {
		color: #34c759;
		background-color: rgba(52, 199, 89, 0.12);
	}

	.chip-status--active {
		color: var(--colors-primary-300);
		background-color: rgba(124, 58, 237, 0.18);
		border-color: rgba(124, 58, 237, 0.4);
	}
</style>
