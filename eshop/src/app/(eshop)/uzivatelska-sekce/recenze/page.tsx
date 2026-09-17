import ProtectedRoute from 'pages-spa/UserSection/ProtectedRoute';
import UserSectionReviews from 'pages-spa/UserSection/Reviews';
import getIntl from 'app/intl';
import type { Metadata } from 'next';

export const generateMetadata = async (): Promise<Metadata> => {
	const intl = await getIntl();
	const t = intl.formatMessage;

	return {
		title: `${t(
			{ id: 'app.title.page' },
			{ title: `${t({ id: 'routes.user-section.reviews.name' })}` }
		)}`,
	};
};

const UserSectionReviewsPage = () => {
	return (
		<ProtectedRoute>
			<UserSectionReviews />
		</ProtectedRoute>
	);
};

export default UserSectionReviewsPage;
