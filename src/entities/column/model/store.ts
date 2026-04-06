import { defineStore } from "pinia";
import { ref } from "vue";
import type { Column } from "./types";

export const useColumnStore = defineStore('column', () => {
    const columns = ref<Column[]>([
        {
            id: 'col-1',
            title: 'To Do',
            boardId: 'board-1',
            taskIds: ['1', '4', '5'],
        },
        {
            id: 'col-2',
            title: 'In Progress',
            boardId: 'board-1',
            taskIds: ['2', '3'],
        },
        {
            id: 'col-3',
            title: 'Done',
            boardId: 'board-1',
            taskIds: [],
        },
        {
            id: 'col-4',
            title: 'Backlog',
            boardId: 'board-2',
            taskIds: [],
        },
        {
            id: 'col-5',
            title: 'In Review',
            boardId: 'board-2',
            taskIds: [],
        },
    ]);

    return { columns };
})
