import { defineStore } from "pinia";
import { ref } from "vue";
import type { Board } from "./types";

export const useBoardStore = defineStore('board', () => {
    const boards = ref<Board[]>([
        {
            id: 'board-1',
            title: 'Frontend Project',
            columnIds: ['col-1', 'col-2', 'col-3'],
        },
        {
            id: 'board-2',
            title: 'Marketing Campaign',
            columnIds: ['col-4', 'col-5'],
        },
    ]);

    return { boards };
})
