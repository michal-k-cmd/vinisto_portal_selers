import cx from 'classnames';
import { useSearchParams } from 'next/navigation';
import { useContext } from 'react';
import InitialsAvatar from 'vinisto_ui/src/components/initials-avatar';
import useLocalizedStreetAndNumber from 'Hooks/useLocalizedStreetAndNumber';
import { CUSTOMER_ID } from 'Services/PlatformService/constants';
import { LocalizationContext } from 'Services/LocalizationService';
import useGetCompany from 'Hooks/useGetB2bCustomer';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { REQUEST_CREDIT_INCREASE_MODAL } from 'Components/Modal/constants';
import { ModalContext } from 'Components/Modal/context';
import { RequestCreditIncreaseModalData } from 'Components/Modal/Components/RequestCreditIncrease';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';
import useVerifyCompanyCreditPaymentQuery from 'Hooks/useVerifyCompanyCreditPaymentQuery';

import styles from './styles.module.css';
import CredibilityInfo from './CrebilityInfo';

import {
	VinistoHelperDllEnumsCurrency,
	VinistoHelperDllEnumsPriceLevel,
} from '@/api-types/product-api';

const B2bCustomerInfo = () => {
	const { handleOpenModal } = useContext(ModalContext);
	const t = useContext(LocalizationContext).useFormatMessage();
	const { canCreateOrderAsCSO } = useContext(AuthenticationContext).vinistoUser;

	const localizeStreetAndAddress = useLocalizedStreetAndNumber();
	const searchParams = useSearchParams();
	const customerId = searchParams.get(CUSTOMER_ID);

	const verifyCompanyCreditPaymentQuery = useVerifyCompanyCreditPaymentQuery();

	const customerQuery = useGetCompany({ customerId });

	const b2bCustomer = customerQuery.data;

	const isb2bCustomerAndVerifyCreditDataFetched =
		customerQuery.isFetched && verifyCompanyCreditPaymentQuery.isFetched;

	if (!b2bCustomer) return null;

	const localizedStreetAndAddress = localizeStreetAndAddress(
		b2bCustomer.billingAddress ?? {}
	);

	const { company, email, city, zip } = b2bCustomer.billingAddress ?? {};
	if (!company) return null;
	const user = {
		firstName: company[0] ?? '',
		lastName: company[1] ?? '',
		email: email ?? '',
	};

	const currentCreditFormatted = getLocalizedPrice({
		price:
			(b2bCustomer.credit ?? 0) -
			(verifyCompanyCreditPaymentQuery.data?.result
				?.totalAmountNonPaidInvoices ?? 0),
		currency: VinistoHelperDllEnumsCurrency.CZK,
		displayCurrency: false,
	});

	const initialCreditFormatted = getLocalizedPrice({
		price: b2bCustomer.credit ?? 0,
		currency: VinistoHelperDllEnumsCurrency.CZK,
		displayCurrency: false,
	});

	const adminUriWithoutTrailingSlash =
		`${process.env.NEXT_PUBLIC_ADMIN_URI}`.replace(/\/$/, '');

	return (
		<div className={cx('mb-3', 'd-print-none')}>
			<div
				className={cx(
					'd-flex gap-3 align-items-center',
					styles.b2bCustomerInfo
				)}
			>
				<InitialsAvatar user={user} />
				<div className="lh-sm">
					<div>
						<strong>
							{b2bCustomer.validationData?.companyName ?? company}
						</strong>
					</div>
					<small>
						{localizedStreetAndAddress}, {zip} {city}
					</small>
				</div>
			</div>

			<CredibilityInfo b2bCustomer={b2bCustomer} />

			<div
				className={cx(
					'ps-2 pe-3 py-2 mb-2 d-flex align-items-center justify-content-between',
					styles.priceLevelInfo
				)}
			>
				<span className={styles.priceInfoLabel}>
					{t({ id: 'priceLevel' })}:{' '}
				</span>
				<span className={styles.priceInfoValue}>
					{t({
						id: `VinistoB2b.${
							b2bCustomer.priceLevel ?? VinistoHelperDllEnumsPriceLevel.Level1
						}`,
					})}
				</span>
			</div>
			<div
				className={cx(
					'ps-2 pe-3 py-2 mb-2 d-flex align-items-center justify-content-between',
					styles.creditInfo
				)}
			>
				<span className={styles.creditInfoLabel}>{t({ id: 'credit' })}: </span>
				<div
					className={cx('d-flex gap-3 align-items-center', {
						invisible: !isb2bCustomerAndVerifyCreditDataFetched,
					})}
				>
					{canCreateOrderAsCSO ? (
						<a
							className={styles.requestCreditIncreaseButton}
							target="_blank"
							href={`${adminUriWithoutTrailingSlash}/b2b-customer-detail/${customerId}`}
							rel="noreferrer"
						>
							Navýšit kredit
						</a>
					) : (
						<button
							className={styles.requestCreditIncreaseButton}
							onClick={() =>
								handleOpenModal(REQUEST_CREDIT_INCREASE_MODAL, {
									currentCredit: b2bCustomer.credit ?? 0,
									customerId,
									customerName:
										b2bCustomer.validationData?.companyName ?? company,
								} satisfies RequestCreditIncreaseModalData)
							}
						>
							Požádat o navýšení
						</button>
					)}
					{verifyCompanyCreditPaymentQuery.data?.result?.canPayByCredit ? (
						<span className={styles.creditInfoValue}>
							{/* eslint-disable-next-line no-irregular-whitespace */}
							{`${currentCreditFormatted} / ${initialCreditFormatted}`}
						</span>
					) : (
						<span className={styles.creditInfoValue}>Není aktivní</span>
					)}
				</div>
			</div>
		</div>
	);
};

export default B2bCustomerInfo;
