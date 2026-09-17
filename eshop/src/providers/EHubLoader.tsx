'use client';

import { LocalStorageKeys } from 'Services/StorageService/constants';
import { StorageContext } from 'Services/StorageService/context';
import { useSearchParams } from 'next/navigation';
import { useContext, useEffect } from 'react';

const EhubLoader = () => {
	const storage = useContext(StorageContext);
	const searchParams = useSearchParams();
	const ehub = searchParams.get('ehub');

	useEffect(() => {
		if (ehub) storage.StorageService.setItem(LocalStorageKeys.EHUB, ehub);
	}, [ehub, storage.StorageService]);

	return null;
};

export default EhubLoader;
