import HomeView from 'pages-spa/Home';
import { Metadata } from 'next';
import getIntl from 'app/intl';

import RegisterModal from './RegisterModal';

export const generateMetadata = async (): Promise<Metadata> => {
	const intl = await getIntl();
	const t = intl.formatMessage;

	return {
		title: `${t(
			{ id: 'app.title.page' },
			{ title: `${t({ id: 'routes.registration.route' })}` }
		)}`,
		alternates: {
			canonical: `/${t({ id: 'routes.registration.route' })}`,
		},
	};
};

const RegisterPage = async () => {
	return (
		<div>
			<RegisterModal />
			<HomeView />
		</div>
	);
};

export default RegisterPage;
