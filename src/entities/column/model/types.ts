export interface Column {
	id: string;
	title: string;
	taskIds: string[];
}

export interface ChangeTaskOrderPayload {
	columnId: string;
	oldIndex: number;
	newIndex: number;
}
