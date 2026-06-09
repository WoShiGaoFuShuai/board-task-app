<template>
	<button
		type="button"
		:aria-label="ariaLabel"
		:class="[size, type, br]"
	>
		<span :class="iconClass" />
	</button>
</template>

<script
	setup
	lang="ts"
>
	import { ButtonBorderRadius, ButtonSize, ButtonType } from '../model/constants.ts';

	interface ButtonIconsProps {
		ariaLabel?: string;
		iconClass: string;
		type?: ButtonType;
		size?: ButtonSize;
		br?: ButtonBorderRadius;
	}

	withDefaults(defineProps<ButtonIconsProps>(), {
		type: ButtonType.OUTLINE,
		size: ButtonSize.M,
		br: ButtonBorderRadius.M,
	});
</script>

<style scoped>
	button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
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

	.type_default {
		border: none;
	}

	.type_outline {
		border: 1px solid rgba(255, 255, 255, 0.06);
	}

	.border_n {
		border-radius: 0;
	}

	.border_m {
		border-radius: 8px;
	}

	.border-f {
		border-radius: 50%;
	}

	.size_s {
		width: var(--spacing-control-s);
		height: var(--spacing-control-s);
	}

	.size_m {
		width: var(--spacing-control);
		height: var(--spacing-control);
	}
</style>
