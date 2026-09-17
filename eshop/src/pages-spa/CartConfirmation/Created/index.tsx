import { lazy, Suspense, useCallback, useContext } from 'react';
import cx from 'classnames';
import { useRouter } from 'next/navigation';
import Loader from 'Components/View/Loader';
import { LocalizationContext } from 'Services/LocalizationService';
import Container from 'Components/View/Container';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { useQueryState } from 'nuqs';
import { getPdfDocument, openPdf } from 'pages-spa/UserSection/Orders/helpers';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { NotificationsContext } from 'Services/NotificationService';
import { usePlatformContext } from 'Services/PlatformService';
import { Button, buttonVariants } from 'vinisto_ui';

import OrderInfoHandover from '../Components/OrderInfoHandover';
import PaymentInfo from '../Components/PaymentInfo';
const BigGreenOkIcon = lazy(() => import('Components/Icons/BigGreenOk'));

import styles from './styles.module.css';

import { Order } from '@/domain/order';
import {
	VinistoHelperDllEnumsOrderPaymentType,
	VinistoOrderDllModelsApiReturnDataInvoicesReturn,
} from '@/api-types/order-api';
import { VinistoGopayDllModelsApiPaymentInfo } from '@/api-types/services-api';
import api from '@/api';
import { Actions } from '@/message-bus/constants';

interface CreatedProps {
	apiOrderId: string | null;
	orderQuery: UseQueryResult<void | Order | null, unknown>;
	goPayPaymentQuery: UseQueryResult<
		void | VinistoGopayDllModelsApiPaymentInfo | null | undefined,
		unknown
	>;
	handleOnNavigateToOrders: () => void;
}

const Created = ({
	apiOrderId,
	orderQuery,
	goPayPaymentQuery,
	handleOnNavigateToOrders,
}: CreatedProps) => {
	const { isB2b, getIsInAdminIframe } = usePlatformContext();
	const { useFormatMessage, activeCurrency } = useContext(LocalizationContext);
	const t = useFormatMessage();
	const { isLoggedIn, vinistoUser, anonymousUID } = useContext(
		AuthenticationContext
	);
	const { handleShowErrorNotification } = useContext(NotificationsContext);
	const router = useRouter();

	const userLoginHash = vinistoUser.loginHash;

	const [goPayPaymentId] = useQueryState('id');

	const paymentType =
		(goPayPaymentId
			? goPayPaymentQuery.data?.paymentType
			: orderQuery.data?.payment?.paymentType) ?? null;

	const orderInvoicesQuery = useQuery({
		queryKey: ['orderInvoices', apiOrderId],
		queryFn: () =>
			api.get<VinistoOrderDllModelsApiReturnDataInvoicesReturn>(
				`order-api/invoices/order/${apiOrderId}/get-invoices`,
				{
					...(isLoggedIn
						? { UserLoginHash: userLoginHash }
						: { anonymousUserId: anonymousUID.anonymousUserId }),
				}
			),
		enabled: !!apiOrderId,
	});

	const handleOnClickInvoice = useCallback(
		(orderId: string, documentUrl: string) => async () => {
			try {
				const encodedPdfContent = await getPdfDocument(
					orderId,
					documentUrl,
					userLoginHash
				);
				if (!encodedPdfContent) throw new Error('No pdf content');
				openPdf(encodedPdfContent);
			} catch {
				handleShowErrorNotification('userSection.order.invoice.loadError');
			}
		},
		[handleShowErrorNotification, userLoginHash]
	);

	const isInAdminIframe = getIsInAdminIframe();

	return (
		<section id="content-wrapper">
			<Container className="d-print-none">
				<div className={styles.status}>
					<Suspense fallback={<Loader blank />}>
						<BigGreenOkIcon
							alt=""
							title=""
							className={styles.icon}
						/>
					</Suspense>
					<h1 className={styles.title}>
						{t({
							id: 'orderConfirmation.created.title',
						})}
					</h1>
					{isB2b && (
						<div className={styles.actions}>
							<Button
								variant={buttonVariants.CTA}
								className={styles.actionButton}
								onClick={() => window.print()}
							>
								{t({ id: 'orderConfirmation.created.printButton' })}
							</Button>
							<Button
								variant={buttonVariants.CTA}
								className={styles.actionButton}
								onClick={() => {
									if (isInAdminIframe) {
										return window.parent.postMessage(
											{
												action: Actions.RESET_BASKET_FROM_ESHOP,
											},
											'*'
										);
									}
									return router.push('/');
								}}
							>
								{t({ id: 'orderConfirmation.created.newOrderButton' })}
							</Button>
						</div>
					)}
				</div>
			</Container>

			{paymentType === VinistoHelperDllEnumsOrderPaymentType.BY_HANDOVER &&
				orderQuery.data?.orderNumber && (
					<div className={cx(isB2b && 'd-print-none')}>
						<OrderInfoHandover
							orderNumber={orderQuery.data?.orderNumber}
							orderEmail={orderQuery.data?.billingAddress?.email ?? ''}
						/>
					</div>
				)}
			{(paymentType === VinistoHelperDllEnumsOrderPaymentType.BANK_TRANSFER ||
				paymentType === VinistoHelperDllEnumsOrderPaymentType.CREDIT) && (
				<div className={cx(isB2b && 'd-print-none')}>
					<PaymentInfo
						orderId={orderQuery.data?.id ?? ''}
						orderNumber={orderQuery.data?.orderNumber ?? ''}
						isCreditPayment={
							paymentType === VinistoHelperDllEnumsOrderPaymentType.CREDIT
						}
						orderPrice={
							(orderQuery.data?.orderPriceWithVat ?? 0) -
							(orderQuery.data?.giftCouponPaymentWithVat ?? 0)
						}
						orderEmail={orderQuery.data?.billingAddress?.email ?? ''}
						orderCurrency={
							orderQuery.data?.orderCurrency ?? activeCurrency.currency
						}
					/>
				</div>
			)}
			{isLoggedIn && !isB2b && (
				<>
					<Container className="my-3 text-center d-print-none">
						<button
							onClick={handleOnNavigateToOrders}
							className={cx(
								'vinisto-btn vinisto-bg-green',
								styles.checkStateButton
							)}
						>
							{t({
								id: 'orderConfirmation.success.followOrderLink',
							})}
						</button>
					</Container>
					<Container className="mb-4 text-center d-print-none">
						{orderInvoicesQuery.data?.invoices?.map((invoice) => (
							<button
								key={invoice.id}
								className="vinisto-btn bg-transparent color-primary px-2"
								onClick={handleOnClickInvoice(
									invoice.objectId ?? '',
									invoice.path ?? ''
								)}
							>
								{t(
									{
										id: 'orderConfirmation.success.proformaLink',
									},
									{
										value: orderQuery.data?.orderNumber ?? '',
									}
								)}
							</button>
						))}
					</Container>
				</>
			)}
		</section>
	);
};

export default Created;
