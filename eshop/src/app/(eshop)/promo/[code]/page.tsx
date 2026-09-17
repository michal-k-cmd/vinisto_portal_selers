import getIntl from 'app/intl';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import PromoView from 'pages-spa/Promo';

export const generateMetadata = async (): Promise<Metadata> => {
	const intl = await getIntl();
	const t = intl.formatMessage;

	return {
		title: `${t(
			{ id: 'app.title.page' },
			{ title: `${t({ id: 'routes.promo.name' })}` }
		)}`,
	};
};

const PromoPage = async ({ params }: { params: Promise<{ code: string }> }) => {
	const { code } = await params;

	if (!code) {
		return redirect('/');
	}

	return <PromoView code={code} />;
};

export default PromoPage;
