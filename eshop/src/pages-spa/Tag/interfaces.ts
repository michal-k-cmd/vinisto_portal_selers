import React from 'react';

import {
	VinistoHelperDllEnumsCountryCode,
	VinistoHelperDllEnumsCurrency,
} from '@/api-types/product-api';

export interface ITagProps {
	tagUrl?: string;
}

export interface ITagContextValues extends Required<ITagProps> {
	tagData: Record<any, any>;
}

export interface ITagContextProviderProps {
	children?: React.ReactNode;
}

export interface IFetchTagByUrlProps {
	tagUrl: string;
	countryOfSale: VinistoHelperDllEnumsCountryCode;
	Currency: VinistoHelperDllEnumsCurrency;
}
