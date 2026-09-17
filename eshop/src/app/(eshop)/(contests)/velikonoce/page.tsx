import getIntl from 'app/intl';
import { Metadata } from 'next';
import ContestEasterView from 'pages-spa/ContestEaster';

export const generateMetadata = async (): Promise<Metadata> => {
	const intl = await getIntl();
	const t = intl.formatMessage;

	return {
		title: `${t(
			{ id: 'app.title.page' },
			{ title: `${t({ id: 'routes.easterContest.name' })}` }
		)}`,
		alternates: {
			canonical: `/${t({ id: 'routes.easterContest.name' })}`,
		},
	};
};

const ContestEasterPage = () => {
	return <ContestEasterView />;
};

export default ContestEasterPage;
