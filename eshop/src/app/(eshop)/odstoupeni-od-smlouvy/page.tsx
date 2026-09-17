import ContractWithdraw from 'pages-spa/ContractWithdraw';
import getIntl from 'app/intl';
import type { Metadata } from 'next';

export const generateMetadata = async (): Promise<Metadata> => {
	const intl = await getIntl();
	const t = intl.formatMessage;

	return {
		title: `${t(
			{ id: 'app.title.page' },
			{ title: `${t({ id: 'routes.contractWithdraw.name' })}` }
		)}`,
	};
};

const ContractWithdrawPage = async () => {
	return <ContractWithdraw />;
};

export default ContractWithdrawPage;
