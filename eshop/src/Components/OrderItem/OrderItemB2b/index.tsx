'use client';

import cx from 'classnames';
import Link from 'next/link';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';
import { LocalizationContext } from 'Services/LocalizationService';
import { Fragment, useCallback, useContext, useMemo } from 'react';
import { GoPayServiceContext } from 'Services/GoPayService';
import { useQuery } from '@tanstack/react-query';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import {
	getIsInvoiceOverdue,
	getPdfDocument,
	openPdf,
} from 'pages-spa/UserSection/Orders/helpers';
import { NotificationsContext } from 'Services/NotificationService';
import { dayjsInstance as dayjs } from 'vinisto_shared';
import { Button, ButtonLink, buttonSizes, buttonVariants } from 'vinisto_ui';
import DownloadFile from 'vinisto_ui/src/components/icons/download-file';
import { useIsB2b } from 'Services/PlatformService';
import { DeviceServiceContext } from 'Services/DeviceService';
import QrPaymentButton from 'Components/QrPaymentButton';
import { BundleIdAndQuantity } from 'Services/BasketService/interfaces';
import {
	getCreationDate,
	getLocalizedOrderState,
} from 'pages-spa/UserSection/Orders/helpers';
import useAddItemsToBasket, {
	showBuyAgainButton as shouldShowBuyAgainButton,
} from 'Hooks/use-add-items-to-basket';
import Loading from 'Components/OrderItem/OrderItemB2c/loading';

import styles from './styles.module.css';

import {
	VinistoOrderDllModelsApiOrderAddonItem,
	VinistoOrderDllModelsApiOrderOrder,
	VinistoOrderDllModelsApiOrderOrderItem,
	VinistoOrderDllModelsApiOrderOrderWithInvoice,
} from '@/api-types/order-api';
import { B2B_NUMERIC_CODE } from '@/shared';
import {
	VinistoHelperDllEnumsAddonAddonType,
	VinistoHelperDllEnumsInvoiceInvoiceState,
	VinistoHelperDllEnumsInvoiceInvoiceType,
	VinistoHelperDllEnumsOrderOrderState,
	VinistoHelperDllEnumsOrderPaymentType,
} from '@/api-types/order-api';
import api from '@/api';
import { OrderApi } from '@/api-types/order-api';

interface OrderItemRefactoredProps {
	order:
		| VinistoOrderDllModelsApiOrderOrder
		| (VinistoOrderDllModelsApiOrderOrderWithInvoice & {
				orderItems?: VinistoOrderDllModelsApiOrderOrderItem[] | null;
				addons?: VinistoOrderDllModelsApiOrderAddonItem[] | null;
				delivery: null;
		  });
	isLoading: boolean;
	orderNumberAsLink?: boolean;
	handleOnClickPayOnline?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	showDetailButton?: boolean;
	className?: string;
}

export const OrderListHeaderDesktopOnly = () => {
	const { isDesktop } = useContext(DeviceServiceContext);
	const isB2b = useIsB2b();
	if (!isDesktop || !isB2b) return null;
	return (
		<div className={styles.order}>
			<div className={styles.tableHeader}>Objednávka</div>
			<div className={styles.tableHeader}>Stav</div>
			<div className={styles.tableHeader}>Datum / splatnost</div>
			<div
				className={styles.tableHeader}
				style={{ justifySelf: 'end' }}
			>
				Cena
			</div>
			<div
				className={styles.tableHeader}
				style={{ justifySelf: 'end' }}
			>
				Akce
			</div>
		</div>
	);
};

// TODO handle loading (error) state better
const OrderItemB2b = ({
	order,
	isLoading,
	orderNumberAsLink = true,
	handleOnClickPayOnline,
	showDetailButton = true,
	className,
}: OrderItemRefactoredProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const { handleOnPayOnline } = useContext(GoPayServiceContext);
	const { handleShowErrorNotification } = useContext(NotificationsContext);
	const { vinistoUser } = useContext(AuthenticationContext);
	const userLoginHash = vinistoUser.loginHash;

	const { addItemsToBasket, isAddingItemsToBasket } = useAddItemsToBasket();

	const handleOnRetryPayment = () =>
		handleOnPayOnline({
			order: order,
			notificationUrl: `${process.env.NEXT_PUBLIC_API_URI}services-api/gopay/notify`,
			returnUrl: `${window.location.origin}/${t({
				id: 'routes.user-section.route',
			})}/${t({ id: 'routes.user-section.vinistoplus.route' })}?oid=${
				order.id
			}`,
		});

	const orderStates = order.state?.split(',')?.map((state) => state.trim());
	const lastOrderState = orderStates?.[orderStates.length - 1];

	const isSubscriptionOrder =
		order.orderItems &&
		order.orderItems.length === 0 &&
		order.addons?.every((addonItem) =>
			[
				VinistoHelperDllEnumsAddonAddonType.SubscriptionMonth,
				VinistoHelperDllEnumsAddonAddonType.SubscriptionYear,
			].includes(addonItem.addon?.type as VinistoHelperDllEnumsAddonAddonType)
		);

	const invoicesQuery = useQuery({
		queryKey: ['orderInvoices', order.id, userLoginHash],
		queryFn: () =>
			api
				.get<
					OrderApi.InvoicesOrderGetInvoicesList.ResponseBody,
					OrderApi.InvoicesOrderGetInvoicesList.RequestQuery
				>(`order-api/invoices/order/${order.id}/get-invoices`, {
					UserLoginHash: userLoginHash,
				})
				.then((res) => res.invoices),
		enabled: !!order.id,
	});

	const hasOverdueInvoice = useMemo(
		() =>
			invoicesQuery.data?.some((invoice) => getIsInvoiceOverdue(invoice)) ??
			false,
		[invoicesQuery.data]
	);

	const hasNonPaidInvoice = useMemo(
		() =>
			invoicesQuery.data?.some(
				(invoice) =>
					[
						VinistoHelperDllEnumsInvoiceInvoiceType.Invoice,
						VinistoHelperDllEnumsInvoiceInvoiceType.Proforma,
					].includes(invoice.type) &&
					invoice.state === VinistoHelperDllEnumsInvoiceInvoiceState.Created
			) ?? false,
		[invoicesQuery.data]
	);

	const showQrPaymentBtn =
		(lastOrderState === VinistoHelperDllEnumsOrderOrderState.CREATED &&
			order.payment?.paymentType ===
				VinistoHelperDllEnumsOrderPaymentType.BANK_TRANSFER) ||
		(order.payment?.paymentType ===
			VinistoHelperDllEnumsOrderPaymentType.CREDIT &&
			hasNonPaidInvoice);

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

	const itemsToAdd: BundleIdAndQuantity[] =
		order.orderItems?.map((orderItem) => {
			const id = orderItem?.bundle?.id ?? '';

			return {
				bundleId: id,
				quantity: orderItem.quantity ?? 1,
				bundleMetaForAnalytics: {
					// TODO - Find a way to get the correct price of the item
					price: 0,
					item_name: orderItem.bundle.name,
					item_brand: orderItem.bundle.producerSpecification?.value ?? '',
				},
			};
		}) ?? [];

	const showBuyAgainButton = shouldShowBuyAgainButton(order);

	const isB2bOrder = order.platformId === B2B_NUMERIC_CODE;
	const currency = order.orderCurrency;
	const createdAtDate = getCreationDate(order.stateChangeRecords ?? []);
	const localizedState = getLocalizedOrderState(order.state ?? '');
	const trackingLink =
		order && 'delivery' in order ? order.delivery?.trackingUrl ?? '' : '';
	const lastState = (order.stateChangeRecords ?? [])[
		(order.stateChangeRecords ?? []).length - 1
	];

	const showPayOnlineBtn = Boolean(
		!isLoading &&
			lastState &&
			lastState.state === VinistoHelperDllEnumsOrderOrderState.CREATED &&
			order.payment?.goPayId
	);

	if (isLoading) return <Loading isDesktop />;
	// if (isLoading) return null;

	return (
		<div
			className={cx(styles.order, className, {
				[styles.overdueOrder]: hasOverdueInvoice,
			})}
		>
			<div className={styles.orderNumber}>
				{orderNumberAsLink ? (
					<Link
						href={`/uzivatelska-sekce/objednavky?id=${order.id}`}
						className={styles.orderNumberLink}
					>
						Objednávka č. {order.orderNumber}
					</Link>
				) : (
					<>Objednávka č. {order.orderNumber}</>
				)}
			</div>
			<div className={styles.stateHeader}>stav</div>
			<div
				className={styles.orderState}
				style={{
					color: localizedState.color ?? '',
				}}
			>
				{t({ id: localizedState.text })}
			</div>
			<div className={styles.dateHeader}>datum</div>
			<div className={styles.orderCreatedAtDate}>{createdAtDate}</div>

			<div className={styles.orderPrice}>
				{getLocalizedPrice({
					price: (isB2bOrder ? order.orderPrice : order.orderPriceWithVat) ?? 0,
					currency,
				})}
			</div>
			<div className={styles.orderPriceSecondary}>
				{t(
					{ id: 'price.withVAT' },
					{
						priceWithCurrency: getLocalizedPrice({
							price: order.orderPriceWithVat,
							currency,
						}),
					}
				)}
			</div>

			<div className={styles.buttons}>
				{showPayOnlineBtn && handleOnClickPayOnline && (
					<Button
						variant={buttonVariants.BASIC}
						size={buttonSizes.S}
						onClick={
							isSubscriptionOrder
								? handleOnRetryPayment
								: handleOnClickPayOnline
						}
					>
						Zaplatit online
					</Button>
				)}

				{showQrPaymentBtn && order.id && <QrPaymentButton orderId={order.id} />}

				{!showBuyAgainButton && trackingLink && (
					<ButtonLink
						variant={buttonVariants.BASIC}
						size={buttonSizes.S}
						href={trackingLink}
					>
						Sledovat zásilku
					</ButtonLink>
				)}
				{showBuyAgainButton && itemsToAdd.length > 0 && (
					<Button
						variant={buttonVariants.CTA}
						size={buttonSizes.S}
						disabled={isAddingItemsToBasket}
						aria-busy={isAddingItemsToBasket}
						onClick={async () => await addItemsToBasket(itemsToAdd)}
					>
						{t({
							id: isAddingItemsToBasket
								? 'userSection.order.btn.orderAgainLoading'
								: 'userSection.order.btn.orderAgain',
						})}
					</Button>
				)}
				{showDetailButton && (
					<ButtonLink
						variant={buttonVariants.BASIC}
						size={buttonSizes.S}
						href={`/uzivatelska-sekce/objednavky?id=${order.id}`}
					>
						Podrobnosti
					</ButtonLink>
				)}
			</div>
			{invoicesQuery.data?.map((invoice, i) => {
				// TODO make this a separate component?
				const invoiceDueDate = dayjs.unix(invoice.invoiceDueTo);
				const isInovoiceOverdue = getIsInvoiceOverdue(invoice);

				return (
					<Fragment key={invoice.id}>
						<div className={styles[`invoice-${i}`]}>
							<DownloadFile
								width={14}
								height={14}
								className={styles.downloadFileIcon}
							/>
							<button
								className={styles.invoiceLink}
								onClick={handleOnClickInvoice(
									invoice.objectId ?? '',
									invoice.path ?? ''
								)}
							>
								{t({ id: `invoice.type.${invoice.type}` })}
							</button>
						</div>
						<div className={styles.overdueNote}>
							{isInovoiceOverdue && (
								<span className={styles.overdueNote}>
									{t({ id: 'userSection.b2b.overdue.title' })}
								</span>
							)}
						</div>
						<div className={styles.invoiceDueTo}>
							{isInovoiceOverdue && (
								<span className={styles.overdueNote}>
									splatnost: {invoiceDueDate.format('D. M. YYYY')}
								</span>
							)}
						</div>
					</Fragment>
				);
			})}
		</div>
	);
};

export default OrderItemB2b;
