import UserSectionOrders from 'pages-spa/UserSection/Orders';
import getIntl from 'app/intl';
import type { Metadata } from 'next';
import ProtectedRoute from 'pages-spa/UserSection/ProtectedRoute';

export const generateMetadata = async (): Promise<Metadata> => {
	const intl = await getIntl();
	const t = intl.formatMessage;

	return {
		title: `${t(
			{ id: 'app.title.page' },
			{ title: `${t({ id: 'routes.user-section.orders.name' })}` }
		)}`,
	};
};

const UserSectionOrdersPage = () => {
	return (
		<ProtectedRoute>
			<UserSectionOrders />
		</ProtectedRoute>
	);
};

export default UserSectionOrdersPage;
