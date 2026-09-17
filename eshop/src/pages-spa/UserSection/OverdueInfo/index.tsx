import cx from 'classnames';
import { useContext } from 'react';
import useVerifyCompanyCreditPaymentQuery from 'Hooks/useVerifyCompanyCreditPaymentQuery';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';
import { LocalizationContext } from 'Services/LocalizationService';
import Link from 'next/link';

import Main from '../B2bHeaderCards/Main';
import Title from '../B2bHeaderCards/Title';
import { ORDERS_LIST_ID } from '../Orders/constants';

import styles from './styles.module.css';

import { VinistoHelperDllEnumsCurrency } from '@/api-types/product-api';

const OverdueInfo = () => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const verifyCompanyCreditPaymentQuery = useVerifyCompanyCreditPaymentQuery();

	const totalAmountNonPaidInvoicesOverdue = Math.round(
		verifyCompanyCreditPaymentQuery.data?.result
			?.totalAmountNonPaidInvoicesOverdue ?? 0
	);
	const totalAmountWithVatNonPaidInvoicesOverdue = Math.round(
		verifyCompanyCreditPaymentQuery.data?.result
			?.totalAmountWithVatNonPaidInvoicesOverdue ?? 0
	);
	const nonPaidInvoicesOverdueCount =
		verifyCompanyCreditPaymentQuery.data?.result?.nonPaidInvoicesOverdue ?? 0;

	const isInOverdue =
		totalAmountNonPaidInvoicesOverdue > 0 && nonPaidInvoicesOverdueCount > 0;

	return (
		<div
			className={cx(styles.overdueInfo, {
				[styles.overdue]: isInOverdue,
			})}
		>
			<Title>
				<span>{t({ id: 'userSection.b2b.overdue.title' })}</span>
				{isInOverdue && (
					<span className={styles.nonPaidCount}>
						{nonPaidInvoicesOverdueCount}×
					</span>
				)}
			</Title>
			<Main>
				{getLocalizedPrice({
					price: totalAmountNonPaidInvoicesOverdue,
					currency: VinistoHelperDllEnumsCurrency.CZK,
				})}
				<div className={styles.sub}>
					{totalAmountWithVatNonPaidInvoicesOverdue > 0 &&
						t(
							{ id: 'price.withVAT' },
							{
								priceWithCurrency: getLocalizedPrice({
									price: totalAmountWithVatNonPaidInvoicesOverdue,
									currency: VinistoHelperDllEnumsCurrency.CZK,
								}),
							}
						)}
				</div>
			</Main>

			{isInOverdue ? (
				<div className={styles.info}>
					<div className="d-flex align-items-center gap-1">
						<img
							src={`/assets/images/alert.svg`}
							alt=""
							width={14}
							height={14}
						/>
						<span>{t({ id: 'userSection.b2b.overdue.paymentRequired' })}</span>
					</div>
					<Link
						href={`/${t({ id: 'routes.user-section.route' })}/${t({
							id: 'routes.user-section.orders.route',
						})}?isOverdue=true#${ORDERS_LIST_ID}`}
						className={styles.paymentLink}
					>
						{t({ id: 'userSection.b2b.overdue.pay' })} →
					</Link>
				</div>
			) : (
				<div className={styles.info}>
					<div className="d-flex gap-1 align-items-center">
						<img
							src={`/assets/images/check-green.svg`}
							alt=""
							width={14}
							height={14}
						/>
						<span>{t({ id: 'userSection.b2b.overdue.allPaid' })}</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default OverdueInfo;
