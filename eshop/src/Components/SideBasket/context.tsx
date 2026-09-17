'use client';

import * as React from 'react';
import { get } from 'lodash-es';

import {
	ISideBasketContextProviderProps,
	ISideBasketContextValue,
	OpenedBundleIdType,
} from './interfaces';

const defaultContextValue: ISideBasketContextValue = {
	alternativeBundles: [],
	setAlternativeBundles: () => {},
	openedBundleId: '',
	setOpenedBundleId: () => {},
};

export const SideBasketContext =
	React.createContext<ISideBasketContextValue>(defaultContextValue);

const SideBasketContextProvider: React.FC<ISideBasketContextProviderProps> = (
	props
) => {
	const children = get(props, 'children', '');
	const [alternativeBundles, setAlternativeBundles] = React.useState<
		Record<any, any>[]
	>([]);
	const [openedBundleId, setOpenedBundleId] =
		React.useState<OpenedBundleIdType>(null);

	const contextValue: ISideBasketContextValue = {
		alternativeBundles,
		setAlternativeBundles,
		openedBundleId,
		setOpenedBundleId,
	};

	return (
		<SideBasketContext.Provider value={contextValue}>
			{children}
		</SideBasketContext.Provider>
	);
};

export default SideBasketContextProvider;
