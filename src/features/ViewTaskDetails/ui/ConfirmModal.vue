<template>
	<div class="confirm-overlay">
		<div class="confirm-dialog">
			<p class="confirm-question">{{ confirmModalContext.title }}</p>
			<div class="confirm-actions">
				<button
					type="button"
					class="btn-cancel"
					@click="$emit('cancel')"
				>
					{{ confirmModalContext.cancelBtnText }}
				</button>
				<button
					type="button"
					class="btn-confirm"
					@click="$emit('confirm')"
				>
					{{ confirmModalContext.confirmBtnText }}
				</button>
			</div>
		</div>
	</div>
</template>

<script
	setup
	lang="ts"
>
	import type { ModalContext } from '../model/types.ts';

	defineEmits<{
		confirm: [];
		cancel: [];
	}>();

	defineProps<{
		confirmModalContext: ModalContext;
	}>();
</script>

<style scoped>
	.confirm-overlay {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(0, 0, 0, 0.55);
		backdrop-filter: blur(2px);
		border-radius: inherit;
	}

	.confirm-dialog {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
		padding: 24px 28px;
		background-color: var(--colors-depth-3);
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 16px;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
	}

	.confirm-question {
		margin: 0;
		font-size: 14px;
		font-weight: 600;
		color: var(--colors-surface-200);
		text-align: center;
	}

	.confirm-actions {
		display: flex;
		gap: 8px;
	}

	.btn-cancel {
		padding: 8px 16px;
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 8px;
		background: transparent;
		color: var(--colors-surface-400);
		font-size: 13px;
		font-weight: 500;
		cursor: pointer;
		transition:
			background-color 0.15s ease,
			color 0.15s ease;
	}

	.btn-cancel:hover {
		background-color: rgba(255, 255, 255, 0.08);
		color: var(--colors-surface-200);
	}

	.btn-confirm {
		padding: 8px 16px;
		border: none;
		border-radius: 8px;
		background-color: var(--colors-danger);
		color: #fff;
		font-size: 13px;
		font-weight: 600;
		cursor: pointer;
		transition: background-color 0.15s ease;
	}

	.btn-confirm:hover {
		background-color: rgba(255, 59, 48, 0.8);
	}
</style>
