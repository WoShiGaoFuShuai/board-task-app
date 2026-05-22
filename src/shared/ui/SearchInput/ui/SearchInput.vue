<template>
	<div class="search-input">
		<div class="i-lucide-search text-sm text-surface-500 search-icon" />
		<input
			type="search"
			class="search-field"
			placeholder="Search"
			aria-label="Search"
			v-model="model"
		>
	</div>
</template>

<script
	setup
	lang="ts"
>
	const model = defineModel<string>({ default: '' });
</script>

<style scoped>
	.search-input {
		position: relative;
		display: flex;
		align-items: center;
		width: 100%;
	}

	.search-icon {
		position: absolute;
		left: 10px;
		pointer-events: none;
	}

	.search-field {
		width: 100%;
		padding: 8px 12px 8px 32px;
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 8px;
		background-color: var(--colors-depth-2);
		color: var(--colors-surface-200);
		font-size: 13px;
		outline: none;
		transition:
			border-color 0.15s ease,
			background-color 0.15s ease;
	}

	.search-field::placeholder {
		color: var(--colors-surface-500);
	}

	.search-field:hover {
		background-color: rgba(255, 255, 255, 0.04);
	}

	.search-field:focus {
		border-color: var(--colors-primary-400);
		background-color: var(--colors-depth-2);
	}

	.search-field::-webkit-search-cancel-button {
		appearance: none;
		width: 14px;
		height: 14px;
		background-color: var(--colors-surface-500);
		mask: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><line x1='18' y1='6' x2='6' y2='18'/><line x1='6' y1='6' x2='18' y2='18'/></svg>")
			no-repeat center;
		cursor: pointer;
	}

	.search-field::-webkit-search-cancel-button:hover {
		background-color: var(--colors-surface-300);
	}
</style>
