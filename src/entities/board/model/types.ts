export interface Board {
	title: string;
	id: string;
}

export interface BoardWithLength extends Board {
	length: number;
}
