import getIntl from 'app/intl';
import { Metadata } from 'next';
import SommelierAdvice from 'pages-spa/SommelierAdvice';

export const generateMetadata = async (): Promise<Metadata> => {
	const intl = await getIntl();
	const t = intl.formatMessage;

	return {
		title: `${t(
			{ id: 'app.title.page' },
			{ title: `${t({ id: 'routes.sommelierAdvice.name' })}` }
		)}`,
		alternates: {
			canonical: `/${t({ id: 'routes.sommelierAdvice.name' })}`,
		},
	};
};

const SommelierAdvicePage = async () => {
	return <SommelierAdvice />;
};

export default SommelierAdvicePage;
