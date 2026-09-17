import UserSectionBoughtProducts from 'pages-spa/UserSection/BoughtProducts';
import ProtectedRoute from 'pages-spa/UserSection/ProtectedRoute';
import getIntl from 'app/intl';
import type { Metadata } from 'next';

export const generateMetadata = async (): Promise<Metadata> => {
	const intl = await getIntl();
	const t = intl.formatMessage;

	return {
		title: `${t(
			{ id: 'app.title.page' },
			{ title: `${t({ id: 'routes.user-section.bought-products.name' })}` }
		)}`,
	};
};

const UserSectionBoughtProductsPage = () => {
	return (
		<ProtectedRoute>
			<UserSectionBoughtProducts />
		</ProtectedRoute>
	);
};

export default UserSectionBoughtProductsPage;
