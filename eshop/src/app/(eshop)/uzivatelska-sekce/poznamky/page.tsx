import UserSectionNotes from 'pages-spa/UserSection/Notes';
import ProtectedRoute from 'pages-spa/UserSection/ProtectedRoute';
import getIntl from 'app/intl';
import type { Metadata } from 'next';

export const generateMetadata = async (): Promise<Metadata> => {
	const intl = await getIntl();
	const t = intl.formatMessage;

	return {
		title: `${t(
			{ id: 'app.title.page' },
			{ title: `${t({ id: 'routes.user-section.notes.name' })}` }
		)}`,
	};
};

const UserSectionNotesPage = () => {
	return (
		<ProtectedRoute>
			<UserSectionNotes />
		</ProtectedRoute>
	);
};

export default UserSectionNotesPage;
