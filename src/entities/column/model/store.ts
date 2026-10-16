import { defineStore } from 'pinia';
import { shallowRef } from 'vue';
import type { Column } from './types';

export const useColumnStore = defineStore('column', () => {
	const columns = shallowRef<Column[]>([]);

	const setColumns = (cols: Column[]) => {
		columns.value = cols;
	};

	const resetColumns = () => {
		columns.value = [];
	};

	return { columns, setColumns, resetColumns };
});
