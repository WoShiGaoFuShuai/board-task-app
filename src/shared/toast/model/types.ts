export type ToastType = 'error' | 'success';

export interface Toast {
	id: string;
	message: string;
	type: ToastType;
}

export interface AddToastPayload {
	message: string;
	type?: ToastType;
}
