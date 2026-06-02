<template>
	<div class="popover-root">
		<div
			ref="triggerRef"
			@click="isOpen = !isOpen"
		>
			<slot name="trigger" />
		</div>
		<Teleport to="body">
			<div
				v-if="isOpen"
				ref="popoverRef"
				class="popover-panel"
				:style="floatingStyles"
			>
				<slot />
			</div>
		</Teleport>
	</div>
</template>

<script
	setup
	lang="ts"
>
	import { offset, useFloating } from '@floating-ui/vue';

	import { onClickOutside } from '@vueuse/core';
	import { useTemplateRef } from 'vue';

	const isOpen = defineModel<boolean>({ default: false });
	const triggerRef = useTemplateRef<HTMLElement>('triggerRef');
	const popoverRef = useTemplateRef<HTMLElement>('popoverRef');

	const { floatingStyles } = useFloating(triggerRef, popoverRef, {
		placement: 'bottom-start',
		middleware: [offset(10)],
	});

	onClickOutside(popoverRef, () => (isOpen.value = false), {
		ignore: [triggerRef],
	});
</script>

<style scoped>
	.popover-root {
		display: inline-flex;
	}

	.popover-panel {
		z-index: 50;
	}
</style>
