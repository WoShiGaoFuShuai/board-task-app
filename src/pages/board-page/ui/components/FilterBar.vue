<template>
	<div class="filter-bar">
		<Popover v-model="isPopoverOpen">
			<template #trigger>
				<ButtonIcon
					class="i-lucide-list-filter text-sm text-surface-300"
					ariaLabel="Filter"
				/>
			</template>

			<FilterPanel
				@toggle-filter="$emit('toggleFilter', $event)"
				@reset-filters="$emit('resetFilters')"
				:hasActiveFilters
				:activeFilters
			/>
		</Popover>
		<SearchInput v-model="modelQuery" />
	</div>
</template>

<script
	setup
	lang="ts"
>
	import type { ActiveFilters, ToggleFilterPayload } from '@features/FilterPanel';
	import { FilterPanel } from '@features/FilterPanel';
	import { ButtonIcon } from '@shared/ui/ButtonIcon';
	import { Popover } from '@shared/ui/Popover';
	import { SearchInput } from '@shared/ui/SearchInput';
	import { ref } from 'vue';

	const modelQuery = defineModel<string>({ default: '' });
	const isPopoverOpen = ref(false);

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
	.filter-bar {
		display: flex;
		align-items: center;
		gap: 8px;
		width: 100%;
	}
</style>
