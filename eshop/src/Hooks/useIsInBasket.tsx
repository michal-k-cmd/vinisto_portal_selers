'use client';

import { usePathname } from 'next/navigation';
import { useContext, useMemo } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';

const useIsInBasket = (includeConfirmationPage = false) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const pathname = usePathname();

	const isInBasket = useMemo(
		() =>
			pathname === `/${t({ id: 'routes.cart.route' })}` ||
			pathname === `/${t({ id: 'routes.cart.shippingPayment.route' })}` ||
			pathname === `/${t({ id: 'routes.cart.shipping.route' })}` ||
			(includeConfirmationPage &&
				pathname === `/${t({ id: 'routes.cart.confirmation.route' })}`),
		[includeConfirmationPage, pathname, t]
	);

	return !!isInBasket;
};

export default useIsInBasket;
