import UserSectionFavorites from 'pages-spa/UserSection/Favorites';
import getIntl from 'app/intl';
import type { Metadata } from 'next';

export const generateMetadata = async (): Promise<Metadata> => {
	const intl = await getIntl();
	const t = intl.formatMessage;

	return {
		title: `${t(
			{ id: 'app.title.page' },
			{ title: `${t({ id: 'routes.user-section.favorites.name' })}` }
		)}`,
	};
};

const UserSectionFavoritesPage = () => {
	// BEWARE: This route should not be protected by auth!
	return <UserSectionFavorites />;
};

export default UserSectionFavoritesPage;
