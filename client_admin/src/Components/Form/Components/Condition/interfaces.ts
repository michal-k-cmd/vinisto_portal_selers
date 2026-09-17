import { ReactNode } from 'react';

export type PrimitiveType = string | number | boolean | null | undefined | Date;

export type ConditionProps<T extends PrimitiveType> = {
	field: string;
	condition: T | T[] | ((value: T) => boolean);
	children: ReactNode;
};
