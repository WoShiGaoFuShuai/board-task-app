<template>
	<Teleport to="body">
		<TransitionGroup
			tag="div"
			name="toast"
			class="toasts"
		>
			<ToastEl
				v-for="toast in toasts"
				:key="toast.id"
				:toast
				@close="toastStore.removeToast($event)"
			/>
		</TransitionGroup>
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
		right: 20px;
		bottom: 20px;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 12px;
		max-width: 360px;
	}

	.toast-move,
	.toast-enter-active,
	.toast-leave-active {
		transition:
			opacity 0.2s ease,
			transform 0.2s ease;
	}

	.toast-enter-from,
	.toast-leave-to {
		opacity: 0;
		transform: translateY(8px);
	}

	.toast-leave-active {
		position: absolute;
		right: 0;
	}
</style>
