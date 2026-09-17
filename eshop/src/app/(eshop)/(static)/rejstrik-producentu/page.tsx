import Producers from 'pages-spa/Producers';
import getIntl from 'app/intl';
import { Metadata } from 'next';

export const generateMetadata = async (): Promise<Metadata> => {
	const intl = await getIntl();
	const t = intl.formatMessage;

	return {
		title: `${t(
			{ id: 'app.title.page' },
			{ title: `${t({ id: 'routes.producers.name' })}` }
		)}`,
		alternates: {
			canonical: `/${t({ id: 'routes.producers.name' })}`,
		},
	};
};

const ProducersListPage = async () => {
	return <Producers />;
};

export default ProducersListPage;
