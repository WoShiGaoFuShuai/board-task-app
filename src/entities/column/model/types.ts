export interface Column {
	id: string;
	title: string;
	taskIds: string[];
}

interface MoveTaskBase {
	oldIndex: number;
	newIndex: number;
}

export interface MoveTaskBetweenColumnsPayload extends MoveTaskBase {
	columnIdFrom: string;
	columnIdTo: string;
}

export interface MoveTaskInColumnPayload extends MoveTaskBase {
	columnId: string;
}
