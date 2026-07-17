export interface MoveTaskPayload {
	itemId: string;
	columnIdTo: string;
	prevSiblingId: string | null;
	nextSiblingId: string | null;
}
