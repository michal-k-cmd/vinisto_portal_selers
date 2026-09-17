// import { LocalizationContext } from 'Services/LocalizationService';
// import cx from 'classnames';
import useVerifyCompanyCreditPaymentQuery from 'Hooks/useVerifyCompanyCreditPaymentQuery';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';
import useGetUserById from 'Hooks/use-get-user-by-id';

import Title from '../B2bHeaderCards/Title';
import Main from '../B2bHeaderCards/Main';

import styles from './styles.module.css';

import { VinistoHelperDllEnumsCurrency } from '@/api-types/product-api';
import { VinistoAuthDllModelsApiUserCompany } from '@/api-types/user-api';

const CreditInfo = () => {
	const { data: user } = useGetUserById();

	const verifyCompanyCreditPaymentQuery = useVerifyCompanyCreditPaymentQuery();

	const totalCredit =
		(user as VinistoAuthDllModelsApiUserCompany | undefined)?.credit ?? 0;

	const usedCredit =
		verifyCompanyCreditPaymentQuery.data?.result?.totalAmountNonPaidInvoices ??
		0;

	const remainingCredit = totalCredit - usedCredit;

	const usedCreditAsPercentage = usedCredit / (totalCredit / 100);
	const usedCreditAsPercentageNormalized = Number.isFinite(
		usedCreditAsPercentage
	)
		? Math.floor(usedCreditAsPercentage)
		: 0;

	const totalCreditFloored = Math.floor(totalCredit);
	const remainingCreditFloored = Math.floor(remainingCredit);

	return (
		<div className={styles.creditInfo}>
			<Title>kreditní limit</Title>
			<Main>
				{getLocalizedPrice({
					price: totalCreditFloored,
					currency: VinistoHelperDllEnumsCurrency.CZK,
				})}
			</Main>
			<div className={styles.info}>
				<span>{`čerpáno ${usedCreditAsPercentageNormalized} %`}</span>
				<span>{`zbývá ${getLocalizedPrice({
					price: remainingCreditFloored,
					currency: VinistoHelperDllEnumsCurrency.CZK,
				})}`}</span>
			</div>
			<div
				className={styles.range}
				style={{
					'--range-percentage': `${usedCreditAsPercentageNormalized}%`,
				}}
			></div>
		</div>
	);
};

export default CreditInfo;
