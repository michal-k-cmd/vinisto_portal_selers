export const modes = {
	CREATE: 'CREATE',
	EDIT: 'EDIT',
} as const;

export type Mode = (typeof modes)[keyof typeof modes];
