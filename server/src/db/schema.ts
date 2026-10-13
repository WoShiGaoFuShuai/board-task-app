import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const boardsTable = sqliteTable('boards', {
	id: text().notNull().primaryKey(),
	title: text().notNull(),
});

export const columnsTable = sqliteTable('columns', {
	id: text().notNull().primaryKey(),
	title: text().notNull(),
	boardId: text().notNull(),
});

export const tasksTable = sqliteTable('tasks', {
	columnId: text().notNull(),
	order: text().notNull(),
	id: text().notNull().primaryKey(),
	title: text().notNull(),
	description: text(),
	priority: text().$type<'low' | 'medium' | 'high'>(),
	createdAt: text().notNull(),
	assigneesId: text().notNull(),
	dueDate: text(),
});
