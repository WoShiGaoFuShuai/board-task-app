import type { ModalContext } from './types.ts';

export const MODAL_CONTEXT: Record<'empty' | 'edit' | 'delete', ModalContext> = {
	empty: {
		title: '',
		cancelBtnText: '',
		confirmBtnText: '',
		type: '',
	},
	edit: {
		title: "Edit progress won't be saved",
		cancelBtnText: 'Cancel',
		confirmBtnText: 'Leave',
		type: 'edit',
	},
	delete: {
		title: 'Sure you want to delete?',
		cancelBtnText: 'Cancel',
		confirmBtnText: 'Delete',
		type: 'delete',
	},
};
