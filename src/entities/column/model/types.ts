export interface Column {
	id: string;
	title: string;
	taskIds: string[];
}

export interface MoveTaskPayload {
	columnIdFrom: string;
	columnIdTo: string;
	oldIndex: number;
	newIndex: number;
}
