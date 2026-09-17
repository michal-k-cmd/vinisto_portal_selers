import { createContext, FC } from 'react';

import {
	IStorageServiceContextValues,
	IStorageServiceProps,
} from './interfaces';

import StorageService from './index';

const defaultStorageServiceContextValues: IStorageServiceContextValues = {
	StorageService: new StorageService(),
};

export const StorageContext = createContext(defaultStorageServiceContextValues);

const StorageServiceProvider: FC<IStorageServiceProps> = ({ children }) => {
	const storageServiceContextValues: IStorageServiceContextValues = {
		StorageService: new StorageService(),
	};

	return (
		<StorageContext.Provider value={storageServiceContextValues}>
			{children}
		</StorageContext.Provider>
	);
};

export default StorageServiceProvider;
