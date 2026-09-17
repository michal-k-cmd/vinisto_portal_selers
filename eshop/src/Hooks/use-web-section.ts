import { useContext } from 'react';
import { DeviceServiceContext } from 'Services/DeviceService';
import useFormatMessage from 'Hooks/useFormatMessage';
import { usePathname } from 'next/navigation';

/**
 * Hook calculating the current web section using Next.js navigation.
 * This is the Next.js version of useWebSection.
 */
const useWebSectionNext = () => {
	const { isDesktop } = useContext(DeviceServiceContext);
	const t = useFormatMessage();
	const pathname = usePathname();

	const cartRoute = `/${t({ id: 'routes.cart.route' })}`;
	const cartShippingPaymentRoute = `/${t({
		id: 'routes.cart.shippingPayment.route',
	})}`;
	const cartShippingDataRoute = `/${t({ id: 'routes.cart.shipping.route' })}`;

	const isCheckout =
		(pathname === cartRoute && !isDesktop) ||
		pathname === cartShippingPaymentRoute ||
		pathname === cartShippingDataRoute;

	const isEshop = !isCheckout;

	return { isCheckout, isEshop };
};

export default useWebSectionNext;
