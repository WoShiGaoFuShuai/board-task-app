import { serve } from '@hono/node-server';
import { eq, inArray } from 'drizzle-orm';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { db } from './db';
import { boardsTable, columnsTable, tasksTable } from './db/schema';

const app = new Hono();

// TODO: коли виллю на прод додати origin, creds і тд
app.use('/api/*', cors());

app.get('/api/boards', async (c) => {
	const boards = await db.select().from(boardsTable);

	const columns = boards.length
		? await db
				.select()
				.from(columnsTable)
				.where(
					inArray(
						columnsTable.boardId,
						boards.map((b) => b.id)
					)
				)
		: [];

	const boardWithLength = boards.map((board) => {
		const length = columns.filter((col) => col.boardId === board.id).length;
		return { ...board, length };
	});

	return c.json({
		ok: true,
		boards: boardWithLength,
	});
});

app.get('/api/board/:id', async (c) => {
	const id = c.req.param('id');

	const [board] = await db.select().from(boardsTable).where(eq(boardsTable.id, id));

	if (!board) return c.json({ ok: false, message: 'Board not found' }, 404);
	const columns = await db.select().from(columnsTable).where(eq(columnsTable.boardId, id));

	const tasksRaw = columns.length
		? await db
				.select()
				.from(tasksTable)
				.where(
					inArray(
						tasksTable.columnId,
						columns.map((c) => c.id)
					)
				)
		: [];

	const normalizedTasks = tasksRaw.map((task) => ({ ...task, assigneesId: JSON.parse(task.assigneesId) }));

	return c.json({
		ok: true,
		board,
		columns,
		tasks: normalizedTasks,
	});
});

// TASKS
app.get('/api/tasks', async (c) => {
	const rawTasks = await db.select().from(tasksTable);

	const tasks = rawTasks.map((task) => ({ ...task, assigneesId: JSON.parse(task.assigneesId) }));
	return c.json({
		ok: true,
		tasks,
	});
});

app.post('/api/tasks', async (c) => {
	const rawReq = await c.req.json();

	const normalizedReq = {
		...rawReq,
		assigneesId: JSON.stringify(rawReq.assigneesId),
	};

	await db.insert(tasksTable).values(normalizedReq);

	return c.json({ ok: true, message: 'Task was added' }, 201);

	// TODO: повертати створену задачу
	// TODO: валідація через Zod
});

app.patch('/api/tasks/:id', async (c) => {
	const id = c.req.param('id');

	const rawReq = await c.req.json();

	const normalizedReq = {
		...rawReq,
	};

	if (rawReq.assigneesId) normalizedReq.assigneesId = JSON.stringify(rawReq.assigneesId);

	const res = await db
		.update(tasksTable)
		.set({
			...normalizedReq,
		})
		.where(eq(tasksTable.id, id));

	if (res.changes === 0) return c.json({ ok: false, message: 'Could not update tasks' }, 404);

	return c.json({ ok: true, message: 'Task is updated' });
});

app.delete('/api/tasks/:id', async (c) => {
	const id = c.req.param('id');

	const res = await db.delete(tasksTable).where(eq(tasksTable.id, id));

	if (res.changes === 0) return c.json({ ok: false, message: 'Could not delete tasks' }, 404);

	return c.json({ ok: true, message: 'Task is deleted' });
});

serve(
	{
		fetch: app.fetch,
		port: 3000,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	}
);
