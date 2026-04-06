import { defineStore } from "pinia";
import { ref } from "vue";
import type { Task } from "./types";

export const useTaskStore = defineStore('task', () => {
    const tasks = ref<Task[]>([
        {
            id: '1',
            title: 'Design login page',
            description: 'Create wireframes and final design for the login screen',
            priority: 'high',
            status: 'done',
            columnId: 'col-1',
            createdAt: '2026-04-01T09:00:00Z',
            assigneesId: ['user-1', 'user-2'],
        },
        {
            id: '2',
            title: 'Set up Pinia stores',
            description: 'Initialize stores for tasks, projects, and users',
            priority: 'high',
            status: 'inProgress',
            columnId: 'col-2',
            createdAt: '2026-04-02T10:30:00Z',
            assigneesId: ['user-1'],
        },
        {
            id: '3',
            title: 'Implement drag and drop',
            description: 'Allow tasks to be moved between columns via drag and drop',
            priority: 'medium',
            status: 'inProgress',
            columnId: 'col-2',
            createdAt: '2026-04-03T11:00:00Z',
            assigneesId: ['user-3'],
        },
        {
            id: '4',
            title: 'Write unit tests for store',
            priority: 'low',
            status: 'todo',
            columnId: 'col-1',
            createdAt: '2026-04-04T08:00:00Z',
            assigneesId: [],
        },
        {
            id: '5',
            title: 'Deploy to production',
            description: 'Configure CI/CD pipeline and deploy the app',
            priority: 'medium',
            status: 'todo',
            columnId: 'col-1',
            createdAt: '2026-04-05T14:00:00Z',
            assigneesId: ['user-2'],
        },
    ]);

    return { tasks };
})