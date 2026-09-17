'use client';

import { createContext, FC } from 'react';

import {
	IStorageServiceContextModel,
	IStorageServiceProps,
} from './interfaces';

import StorageService from './index';

const defaultStorageServiceContextModel: IStorageServiceContextModel = {
	StorageService: new StorageService(),
};

export const StorageContext = createContext(defaultStorageServiceContextModel);

const StorageServiceProvider: FC<IStorageServiceProps> = ({ children }) => {
	const storageServiceContextModel: IStorageServiceContextModel = {
		StorageService: new StorageService(),
	};

	return (
		<StorageContext.Provider value={storageServiceContextModel}>
			{children}
		</StorageContext.Provider>
	);
};

export default StorageServiceProvider;
