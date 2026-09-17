import CartShippingData from 'pages-spa/CartShippingData';
import getIntl from 'app/intl';
import type { Metadata } from 'next';

export const generateMetadata = async (): Promise<Metadata> => {
	const intl = await getIntl();
	const t = intl.formatMessage;

	return {
		title: `${t(
			{ id: 'app.title.page' },
			{ title: `${t({ id: 'routes.cart.shipping.name' })}` }
		)}`,
		robots: 'noindex, nofollow',
	};
};

const CartShippingDataPage = async () => {
	return <CartShippingData />;
};

export default CartShippingDataPage;
