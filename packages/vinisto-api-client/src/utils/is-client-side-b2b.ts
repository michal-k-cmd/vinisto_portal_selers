import { VinistoHelperDllEnumsDeliveryAndPaymentPlatform } from '../api-types/order-api';
import { getCookieByName } from './get-cookie-by-name';

// TO CONSIDER: This is not pretty, but moving prefixing to 'shared' is complicated
// Also, this is a hack and should be replaced by using params everywhere (for instantiating api and  calling adapter)
const ESHOP_PLATFORM_COOKIE_NAME = `VINISTO_ESHOP_${process.env?.NODE_ENV ?? import.meta.env.MODE}_ACTIVE_PLATFORM`

const isClientSideB2b = () => {

	if (typeof window === 'undefined') return false;

	const searchParams = new URLSearchParams(
		window.location.search.replace('?', '')
	);
	const isB2bSubdomain = window.location.host?.split('.')[0] === 'b2b';

	const isB2bForcedByEnv = process.env.NEXT_PUBLIC_FORCE_B2B === 'true';

	const platformCookie = getCookieByName(
		ESHOP_PLATFORM_COOKIE_NAME
	);

	if (platformCookie) {
		return isB2bForcedByEnv
			? true
			: platformCookie === VinistoHelperDllEnumsDeliveryAndPaymentPlatform.B2B;
	}

	return !!searchParams.get('isB2b') || isB2bSubdomain || isB2bForcedByEnv;
};

export default isClientSideB2b;
