import BasketView from 'pages-spa/Basket';
import getIntl from 'app/intl';
import type { Metadata } from 'next';

export const generateMetadata = async (): Promise<Metadata> => {
	const intl = await getIntl();
	const t = intl.formatMessage;

	return {
		title: `${t(
			{ id: 'app.title.page' },
			{ title: `${t({ id: 'routes.cart.name' })}` }
		)}`,
		robots: 'noindex, nofollow',
	};
};

const Basket = async () => {
	return <BasketView />;
};

export default Basket;
