import getIntl from 'app/intl';
import { Metadata } from 'next';
import ContestView from 'pages-spa/Contest';

export const generateMetadata = async (): Promise<Metadata> => {
	const intl = await getIntl();
	const t = intl.formatMessage;

	return {
		title: `${t(
			{ id: 'app.title.page' },
			{ title: `${t({ id: 'routes.contest.name' })}` }
		)}`,
		alternates: {
			canonical: `/${t({ id: 'routes.contest.name' })}`,
		},
	};
};

const ContestEasterPage = () => {
	return <ContestView />;
};

export default ContestEasterPage;
