import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { AddToastPayload, Toast } from './types.ts';

const TIMEOUT_MS = 5000;

export const useToastStore = defineStore('toast', () => {
	const toasts = ref<Toast[]>([]);

	const addToast = ({ message, type = 'error' }: AddToastPayload) => {
		const id = crypto.randomUUID();
		toasts.value.push({ id, message, type });

		setTimeout(() => {
			removeToast(id);
		}, TIMEOUT_MS);
	};

	const removeToast = (id: string) => {
		const index = toasts.value.findIndex((t) => t.id === id);
		if (index === -1) return;

		toasts.value.splice(index, 1);
	};

	return { toasts, addToast, removeToast };
});
