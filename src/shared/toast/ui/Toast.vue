<template>
	<div
		:class="['toast', `toast_${toast.type}`]"
		:role="toast.type === 'error' ? 'alert' : 'status'"
	>
		<div :class="[TOAST_ICONS[toast.type], 'text-base shrink-0']" />
		<span class="toast-message">{{ toast.message }}</span>
		<ButtonIcon
			icon-class="i-lucide-x"
			aria-label="Close notification"
			:type="ButtonType.DEFAULT"
			:size="ButtonSize.S"
			:color="ButtonColor.MUTED"
			class="toast-btn"
			@click="$emit('close', toast.id)"
		/>
	</div>
</template>

<script
	setup
	lang="ts"
>
	import { ButtonColor, ButtonIcon, ButtonSize, ButtonType } from '@shared/ui/ButtonIcon';
	import { TOAST_ICONS } from '../model/constants.ts';
	import type { Toast } from '../model/types.ts';

	defineProps<{
		toast: Toast;
	}>();

	defineEmits<{
		close: [id: string];
	}>();
</script>

<style scoped>
	.toast {
		position: relative;
		display: flex;
		align-items: center;
		gap: 10px;
		width: 100%;
		min-width: 280px;
		padding: 10px 8px 10px 16px;
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 12px;
		background-color: var(--colors-depth-3);
		box-shadow:
			0 10px 15px rgba(0, 0, 0, 0.08),
			0 4px 6px rgba(0, 0, 0, 0.04);
	}

	.toast::before {
		content: "";
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		width: 3px;
		background-color: var(--toast-accent);
	}

	.toast_error {
		--toast-accent: var(--colors-danger);
	}

	.toast_success {
		--toast-accent: var(--colors-success);
	}

	.toast-message {
		flex: 1;
		font-size: 13px;
		font-weight: 500;
		line-height: 1.4;
		color: var(--colors-surface-200);
		overflow-wrap: anywhere;
	}

	.toast-btn {
		background-color: transparent;
	}

	.toast-btn:hover {
		background-color: rgba(255, 255, 255, 0.08);
	}
</style>
