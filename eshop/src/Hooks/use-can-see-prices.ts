import { useIsClient } from '@uidotdev/usehooks';
import { useContext } from 'react';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { useIsB2b } from 'Services/PlatformService';

import { VinistoHelperDllEnumsUserUserType } from '@/api-types/user-api';

const useCanSeePrices = () => {
	const isClient = useIsClient();
	const isB2b = useIsB2b();
	const { isLoggedIn, vinistoUser } = useContext(AuthenticationContext);

	if (!isB2b) return true;

	return (
		isClient &&
		isLoggedIn &&
		vinistoUser.type === VinistoHelperDllEnumsUserUserType.Company
	);
};

export default useCanSeePrices;
