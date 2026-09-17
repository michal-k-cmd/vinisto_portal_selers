import UserSectionDashboard from 'pages-spa/UserSection/Dashboard';
import getIntl from 'app/intl';
import type { Metadata } from 'next';
import ProtectedRoute from 'pages-spa/UserSection/ProtectedRoute';

export const generateMetadata = async (): Promise<Metadata> => {
	const intl = await getIntl();
	const t = intl.formatMessage;

	return {
		title: `${t(
			{ id: 'app.title.page' },
			{ title: `${t({ id: 'routes.user-section.activeOrders.name' })}` }
		)}`,
	};
};

const ActiveOrdersSection = async () => {
	return (
		<ProtectedRoute>
			<UserSectionDashboard />
		</ProtectedRoute>
	);
};

export default ActiveOrdersSection;
