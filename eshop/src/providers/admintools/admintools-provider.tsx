'use client';

import useChat from 'Hooks/useChat';
import { useContext, useEffect } from 'react';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { useIsB2b } from 'Services/PlatformService';
import { Admintools } from 'vinisto_ui';
import { prefix } from 'Services/StorageService/helpers';
import { LocalStorageKeys } from 'Services/StorageService/constants';

type AdmintoolsProviderProps = {
	productDetailId?: string;
	className?: string;
};

const AdmintoolsProvider = (props: AdmintoolsProviderProps) => {
	const { hasAdminToolbarAccess } = useContext(
		AuthenticationContext
	).vinistoUser;

	const isB2b = useIsB2b();

	const platformToggleProps = {
		isB2b,
		prefix,
		storageKeys: LocalStorageKeys,
	};

	const { hideWidget } = useChat();

	useEffect(() => {
		if (hasAdminToolbarAccess) {
			hideWidget();
		}
		// useChat returns are not referentially stable
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hasAdminToolbarAccess]);

	if (!hasAdminToolbarAccess) return null;

	return (
		<Admintools
			{...props}
			platformToggleProps={platformToggleProps}
		/>
	);
};

export default AdmintoolsProvider;
