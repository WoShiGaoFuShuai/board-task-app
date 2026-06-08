export const ButtonType = {
	DEFAULT: 'type_default',
	OUTLINE: 'type_outline',
} as const;

export type ButtonType = (typeof ButtonType)[keyof typeof ButtonType];

export const ButtonSize = {
	S: 'size_s',
	M: 'size_m',
} as const;

export type ButtonSize = (typeof ButtonSize)[keyof typeof ButtonSize];

export const ButtonBorderRadius = {
	N: 'border_n',
	M: 'border_m',
	F: 'border_f',
} as const;

export type ButtonBorderRadius = (typeof ButtonBorderRadius)[keyof typeof ButtonBorderRadius];
