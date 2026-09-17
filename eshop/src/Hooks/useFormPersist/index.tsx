import { useContext, useEffect } from 'react';
import { LocalStorageKeys } from 'Services/StorageService/constants';
import { StorageContext } from 'Services/StorageService/context';

export interface FormPersistConfig {
	watch: (names?: string | string[]) => any;
	exclude?: string[];
}

// TODO: Use in future

const useFormPersist = (
	name: keyof typeof LocalStorageKeys,
	{ watch, exclude = [] }: FormPersistConfig
) => {
	const storageContext = useContext(StorageContext);
	const watchedValues = watch();

	useEffect(() => {
		const values = exclude.length
			? Object.entries(watchedValues)
					.filter(([key]) => !exclude.includes(key))
					.reduce((obj, [key, val]) => Object.assign(obj, { [key]: val }), {})
			: Object.assign({}, watchedValues);

		if (Object.entries(values).length) {
			storageContext.StorageService.setItem(name, values);
		}
	}, [JSON.stringify(watchedValues)]);

	return {
		clear: () => storageContext.StorageService.removeItem(name),
	};
};

export default useFormPersist;
