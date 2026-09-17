import getIntl from 'app/intl';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import ConfirmEmail from 'pages-spa/ConfirmEmail';

export const generateMetadata = async (): Promise<Metadata> => {
	const intl = await getIntl();
	const t = intl.formatMessage;

	return {
		title: `${t(
			{ id: 'app.title.page' },
			{ title: `${t({ id: 'confirmEmail.title' })}` }
		)}`,
	};
};

const ConfirmEmailPage = async ({
	params,
}: {
	params: Promise<{ hash: string }>;
}) => {
	const pageParams = await params;
	const hash = pageParams.hash;

	if (!hash) {
		return redirect('/');
	}

	return <ConfirmEmail hash={hash} />;
};

export default ConfirmEmailPage;
