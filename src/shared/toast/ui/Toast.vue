<template>
	<div class="toast">
		<span>{{ toast.message }}</span>
		<button-icon
			icon-class="i-lucide-x"
			aria-label="close"
			@click="$emit('close', toast.id)"
			class="toast-btn"
		/>
	</div>
</template>

<script
	setup
	lang="ts"
>
	import { ButtonIcon } from '@shared/ui/ButtonIcon';
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
		justify-content: space-between;
		gap: 20px;
		padding: 10px;
		min-width: 270px;
		background: red;
		border-radius: 4px;
	}

	.toast-btn {
		position: absolute;
		top: -24px;
		right: 0;
	}
</style>
