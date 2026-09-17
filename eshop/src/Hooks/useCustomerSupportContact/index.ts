import Config from 'Config';
import { useIsB2b } from 'Services/PlatformService';

export type CustomerSupportAudience =
	keyof typeof Config.market.customerSupport;

export const getCustomerSupportContact = (audience: CustomerSupportAudience) =>
	Config.market.customerSupport[audience];

const useCustomerSupportContact = () => {
	const isB2b = useIsB2b();

	return getCustomerSupportContact(isB2b ? 'b2b' : 'b2c');
};

export default useCustomerSupportContact;
