import ProtectedRoute from 'pages-spa/UserSection/ProtectedRoute';
import UserSectionSettings from 'pages-spa/UserSection/Settings';
import getIntl from 'app/intl';
import type { Metadata } from 'next';

export const generateMetadata = async (): Promise<Metadata> => {
	const intl = await getIntl();
	const t = intl.formatMessage;

	return {
		title: `${t(
			{ id: 'app.title.page' },
			{ title: `${t({ id: 'routes.user-section.settings.name' })}` }
		)}`,
	};
};

const UserSectionSettingsPage = () => {
	return (
		<ProtectedRoute>
			<UserSectionSettings />
		</ProtectedRoute>
	);
};
export default UserSectionSettingsPage;
