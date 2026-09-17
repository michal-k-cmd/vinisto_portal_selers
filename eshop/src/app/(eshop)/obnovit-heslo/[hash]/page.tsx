import getIntl from 'app/intl';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import ResetPassword from 'pages-spa/ResetPassword';

export const generateMetadata = async (): Promise<Metadata> => {
	const intl = await getIntl();
	const t = intl.formatMessage;

	return {
		title: `${t(
			{ id: 'app.title.page' },
			{ title: `${t({ id: 'routes.resetPassword.name' })}` }
		)}`,
	};
};

const ResetPasswordPage = async ({
	params,
}: {
	params: Promise<{ hash: string }>;
}) => {
	const pageParams = await params;
	const hash = pageParams.hash;

	if (!hash) {
		return redirect('/');
	}

	return <ResetPassword hash={hash} />;
};

export default ResetPasswordPage;
