<template>
	<Teleport to="body">
		<div
			class="toasts"
			v-if="toasts.length"
		>
			<ToastEl
				v-for="toast in toasts"
				:key="toast.id"
				:toast
				@close="toastStore.removeToast($event)"
			/>
		</div>
	</Teleport>
</template>

<script
	setup
	lang="ts"
>
	import { storeToRefs } from 'pinia';
	import { useToastStore } from '../model/store.ts';
	import ToastEl from './Toast.vue';

	const toastStore = useToastStore();
	const { toasts } = storeToRefs(toastStore);
</script>

<style scoped>
	.toasts {
		position: fixed;
		z-index: 999;
		bottom: 20px;
		right: 20px;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 16px;
	}
</style>
