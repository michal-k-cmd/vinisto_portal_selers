import { RefObject, useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import { BasketContext } from 'Services/BasketService';
import { DeviceServiceContext } from 'Services/DeviceService';
import Basket from 'Components/Basket';
import SideBasket from 'Components/SideBasket';
import { TEST_IDS } from 'Constants/test-ids';
import { usePathname, useRouter } from 'next/navigation';

import { NavbarContext } from '../../context';

const NavBasket = () => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const { basketState } = useContext(BasketContext);
	const { isDesktopBig } = useContext(DeviceServiceContext);
	const { basketRef } = useContext(NavbarContext);

	const router = useRouter();
	const pathname = usePathname();

	const matchCart = pathname.startsWith(`/${t({ id: 'routes.cart.route' })}`);
	const matchCartShippingPayment = pathname.startsWith(
		`/${t({ id: 'routes.cart.shippingPayment.route' })}`
	);
	const matchCartShippingData = pathname.startsWith(
		`/${t({ id: 'routes.cart.shipping.route' })}`
	);

	const matchHomepage = pathname === '/';
	const matchCategory = pathname.startsWith(
		`/${t({ id: 'routes.category.route' })}/`
	);
	const matchTags = pathname.startsWith(`/${t({ id: 'routes.tag.route' })}/`);
	const matchProducts = pathname.startsWith(
		`/${t({ id: 'routes.products.route' })}/`
	);
	const matchNews = pathname.startsWith(`/${t({ id: 'routes.news.route' })}`);
	const matchOffers = pathname.startsWith(
		`/${t({ id: 'routes.offers.route' })}`
	);
	const matchRecommended = pathname.startsWith(
		`/${t({ id: 'routes.collectibleWines.route' })}`
	);
	const matchBundleDetail = pathname.startsWith(
		`/${t({ id: 'routes.product.route' })}/`
	);

	const itemsQuantity = basketState?.items?.length;

	const showSideBasket =
		(!!matchHomepage ||
			!!matchCategory ||
			!!matchTags ||
			!!matchProducts ||
			!!matchNews ||
			!!matchOffers ||
			!!matchRecommended ||
			!!matchBundleDetail) &&
		isDesktopBig &&
		itemsQuantity !== 0;

	const handleGoToBasket = () => {
		if (
			!(!!matchCart || !!matchCartShippingPayment || !!matchCartShippingData)
		) {
			router.push(`/${t({ id: 'routes.cart.route' })}`);
		}
	};

	return (
		<>
			<Basket
				ref={basketRef as RefObject<HTMLDivElement>}
				onClick={handleGoToBasket}
				showPrice={!showSideBasket}
				showCount={itemsQuantity !== 0}
				dataTestid={TEST_IDS.NAVBAR_BASKET_DESKTOP}
			/>
			{showSideBasket && <SideBasket />}
		</>
	);
};

export default NavBasket;
