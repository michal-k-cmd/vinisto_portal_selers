import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';
import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import { dayjsInstance as dayjs } from 'vinisto_shared';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { getPdfDocument, openPdf } from 'pages-spa/UserSection/Orders/helpers';

import styles from './styles.module.css';

import {
	Currency,
	SubscriptionInvoiceResponse,
	SubscriptionResponse,
	SubscriptionType,
} from '@/api-types/subscription-api';
import { subscriptionReadOnlyApi } from '@/subscription-service';
import { VinistoHelperDllEnumsCurrency } from '@/api-types/product-api';

const BillingRow = ({
	subscription,
	payment,
}: {
	subscription: SubscriptionResponse | undefined;
	payment: SubscriptionInvoiceResponse & {
		currency: VinistoHelperDllEnumsCurrency | undefined;
	};
}) => {
	const { handleShowErrorNotification } = useContext(NotificationsContext);
	const t = useContext(LocalizationContext).useFormatMessage();
	const { loginHash: userLoginHash } = useContext(
		AuthenticationContext
	).vinistoUser;

	const openInitialInvoice = async (payment: SubscriptionInvoiceResponse) => {
		const { id, invoicePath } = payment;
		if (!id || !invoicePath) throw new Error();

		getPdfDocument(id, invoicePath, userLoginHash)
			.then((pdfInBase64) => {
				if (pdfInBase64) openPdf(pdfInBase64);
			})
			.catch(() => {
				handleShowErrorNotification('userSection.order.invoice.loadError');
			});
	};

	const downloadInvoice = async (paymentId: string) => {
		subscriptionReadOnlyApi
			.subscriptionPaymentsInvoiceList({
				paymentId,
				userLoginHash,
			})
			.then(async (response) => {
				const blob = await response.blob();
				const url = window.URL.createObjectURL(blob);
				window.open(url, '_blank');
				setTimeout(() => window.URL.revokeObjectURL(url), 1500);
			})
			.catch(() => {
				handleShowErrorNotification('userSection.order.invoice.loadError');
			});
	};

	return (
		<div className={styles.billingRow}>
			<div className={styles.name}>
				<strong style={{ textTransform: 'capitalize' }}>
					{subscription?.type
						? t(
								{ id: 'vinistoPlus.billing.title' },
								{
									subscriptionPeriod: (() => {
										if (subscription?.type === SubscriptionType.Month)
											return t({ id: 'month.adjective' });
										if (subscription?.type === SubscriptionType.Year)
											return t({ id: 'year.adjective' });
									})(),
									subscriptionName: t({
										id: 'userSection.vinistoplus.becomeMember.info.vinistoplus',
									}),
								}
						  )
						: payment?.name}
				</strong>
			</div>
			<div className={styles.count}>
				{t({ id: 'amount.pcs' }, { count: 1 })}
			</div>
			<div>
				<span className={styles.mobilePrice}>
					{t({ id: 'vinistoPlus.billling.totalPriceWithVat' })}:
				</span>{' '}
				<span className={styles.price}>
					{getLocalizedPrice({
						price: payment.priceWithVat ?? 0,
						currency: payment.currency ?? Currency.CZK,
					})}
				</span>
			</div>
			<div className={styles.billingStatus}>
				<div className={styles.status}>
					{t({ id: 'vinistoPlus.billling.paid' })}
				</div>
				<div>
					{payment.paidAt ? dayjs(payment.paidAt).format('D. M. YYYY') : null}
				</div>
			</div>
			<div className={styles.invoiceWrapper}>
				<a
					className={styles.invoice}
					href={payment.invoicePath ?? '#'}
					onClick={(e) => {
						e.preventDefault();
						if (payment.type === 'Create') {
							return openInitialInvoice(payment);
						}
						return downloadInvoice(payment.id ?? '');
					}}
				>
					{t(
						{ id: 'vinistoPlus.billing.invoice' },
						{ invoiceId: payment.variableSymbol ?? payment.id }
					)}
				</a>
			</div>
		</div>
	);
};

export default BillingRow;
