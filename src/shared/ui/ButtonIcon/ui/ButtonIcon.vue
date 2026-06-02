<template>
	<button
		type="button"
		:aria-label="ariaLabel"
	>
		<span v-bind="$attrs" />
	</button>
</template>

<script
	setup
	lang="ts"
>
	defineOptions({
		inheritAttrs: false,
	});

	defineProps<{
		ariaLabel: string | undefined;
	}>();
</script>

<style scoped>
	button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		width: 34px;
		height: 34px;
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 8px;
		background-color: var(--colors-depth-2);
		color: var(--colors-surface-300);
		cursor: pointer;
		transition:
			border-color 0.15s ease,
			background-color 0.15s ease,
			color 0.15s ease;
	}

	button:hover {
		background-color: rgba(255, 255, 255, 0.04);
		color: var(--colors-surface-200);
	}

	button:focus-visible {
		outline: none;
		border-color: var(--colors-primary-400);
	}
</style>
