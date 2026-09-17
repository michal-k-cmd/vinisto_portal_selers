import UserSectionClubDiscounts from 'pages-spa/UserSection/ClubDiscounts';
import ProtectedRoute from 'pages-spa/UserSection/ProtectedRoute';
import getIntl from 'app/intl';
import type { Metadata } from 'next';

export const generateMetadata = async (): Promise<Metadata> => {
	const intl = await getIntl();
	const t = intl.formatMessage;

	return {
		title: `${t(
			{ id: 'app.title.page' },
			{ title: `${t({ id: 'routes.user-section.club-coupons.name' })}` }
		)}`,
	};
};

const UserSectionClubDiscountsPage = () => {
	return (
		<ProtectedRoute>
			<UserSectionClubDiscounts />
		</ProtectedRoute>
	);
};

export default UserSectionClubDiscountsPage;
