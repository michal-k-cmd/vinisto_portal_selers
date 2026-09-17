import CartConfirmation from 'pages-spa/CartConfirmation';
import getIntl from 'app/intl';
import type { Metadata } from 'next';

export const generateMetadata = async (): Promise<Metadata> => {
	const intl = await getIntl();
	const t = intl.formatMessage;

	return {
		title: `${t(
			{ id: 'app.title.page' },
			{ title: `${t({ id: 'routes.cart.confirmation.name' })}` }
		)}`,
		robots: 'noindex, nofollow',
	};
};

const CartConfirmationPage = async () => {
	return <CartConfirmation />;
};

export default CartConfirmationPage;
