import CartShippingPayment from 'pages-spa/CartShippingPayment';
import getIntl from 'app/intl';
import type { Metadata } from 'next';

export const generateMetadata = async (): Promise<Metadata> => {
	const intl = await getIntl();
	const t = intl.formatMessage;

	return {
		title: `${t(
			{ id: 'app.title.page' },
			{ title: `${t({ id: 'routes.cart.shippingPayment.name' })}` }
		)}`,
		robots: 'noindex, nofollow',
	};
};

const CartShippingPaymentPage = () => {
	return <CartShippingPayment />;
};

export default CartShippingPaymentPage;
