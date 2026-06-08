<template>
	<Teleport to="body">
		<section class="modal-section">
			<div ref="target"><slot></slot></div>
		</section>
	</Teleport>
</template>

<script
	setup
	lang="ts"
>
	import { onClickOutside, onKeyStroke, useScrollLock } from '@vueuse/core';

	import { useTemplateRef } from 'vue';

	const emit = defineEmits<{
		close: [];
	}>();

	const isLocked = useScrollLock(document.body);
	isLocked.value = true;

	const target = useTemplateRef('target');

	onKeyStroke('Escape', () => {
		emit('close');
	});

	onClickOutside(target, () => {
		emit('close');
	});
</script>

<style scoped>
	.modal-section {
		position: fixed;
		z-index: 999;
		background-color: rgba(0, 0, 0, 0.3);
		inset: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
