import VinistotequeView from 'pages-spa/Vinistoteque';
import getIntl from 'app/intl';
import { Metadata } from 'next';

export const generateMetadata = async (): Promise<Metadata> => {
	const intl = await getIntl();
	const t = intl.formatMessage;

	return {
		title: `${t(
			{ id: 'app.title.page' },
			{ title: `${t({ id: 'routes.vinistoteque.name' })}` }
		)}`,
		alternates: {
			canonical: `/${t({ id: 'routes.vinistoteque.name' })}`,
		},
	};
};

const VinistotequePage = async () => {
	return <VinistotequeView />;
};

export default VinistotequePage;
