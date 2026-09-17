import { ReactNode } from 'react';

export type TGetFlagSpecificationReturnType = {
	variety: string;
	shortVariety: string;
	country?: string;
	component?: ReactNode;
};

export type TGetSingleFlagReturnType = {
	component?: ReactNode;
	key?: string;
	countryCode?: string;
} | null;
