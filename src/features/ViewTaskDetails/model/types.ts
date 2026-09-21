type ModalContextType = '' | 'edit' | 'delete';

export interface ModalContext {
	title: string;
	cancelBtnText: string;
	confirmBtnText: string;
	type: ModalContextType;
}
