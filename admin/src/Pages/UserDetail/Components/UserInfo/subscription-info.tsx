import Detail from 'Components/Detail';
import useUserSubscriptionsQuery from 'Pages/UserDetail/Hooks/useUserSubscriptionsQuery';
import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import useCancelSubscriptionMutation from 'Pages/UserDetail/Hooks/useCancelSubscriptionMutation';
import {
	DetailTableColumn,
	DetailTableData,
} from 'Components/Detail/Table/types';
import useSubscriptionPaymentsQuery from 'Pages/UserDetail/Hooks/useSubscriptionPaymentsQuery';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { dayjsInstance as dayjs } from 'vinisto_shared';
import DetailLinkButton from 'Components/Detail/Link';
import { NotificationsContext } from 'Services/NotificationService';
import { useMutation } from '@tanstack/react-query';
import { OrderService } from 'Services/OrderService/Order';
import { handleCreateDownloadPdf } from 'Pages/OrderDetail/helpers';

import { SubscriptionState } from '@/api-types/subscription-api';
import { subscriptionReadOnlyApi } from '@/subscription-service';

type SubscriptionInfoProps = {
	userId: string;
};

const SubscriptionInfo = ({ userId }: SubscriptionInfoProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const userLoginHash = useContext(AuthenticationContext).vinistoUser.loginHash;
	const { isLoading, isError, data } = useUserSubscriptionsQuery(userId);
	const cancelMutation = useCancelSubscriptionMutation();
	const { handleShowErrorNotification } = useContext(NotificationsContext);

	const { getPdfDocument } = OrderService;

	const subscriptions = data?.data?.subscriptions;
	const subscription =
		subscriptions?.find((sub) => sub.state === SubscriptionState.Active) ??
		subscriptions?.[0];

	const subscriptionPayments = useSubscriptionPaymentsQuery(
		subscription?.id ?? undefined
	);

	const handleClickCancel = (activeSubscriptionId: string) => {
		cancelMutation.mutate({
			subscriptionId: activeSubscriptionId,
			userLoginHash,
		});
	};

	const openInitialInvoice = useMutation(
		({ orderId, documentUrl }: { orderId: string; documentUrl: string }) =>
			getPdfDocument({
				orderId: orderId,
				UserLoginHash: userLoginHash,
				DocumentUrl: documentUrl,
			}),
		{
			onSuccess: (payload, variables) => {
				if (payload?.pdfData) {
					handleCreateDownloadPdf(payload?.pdfData, variables.documentUrl);
				}
			},
			onError: () => {
				handleShowErrorNotification('subscription.downloadError');
			},
		}
	);

	const handleDownloadInvoice = async (paymentId: string) => {
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
				handleShowErrorNotification('subscription.downloadError');
			});
	};

	const tableColumns: DetailTableColumn[] = [
		{ title: t({ id: 'subscription.invoiceNumber' }), width: '30%' },
		{ title: t({ id: 'subscription.issuedDate' }) },
		{ title: t({ id: 'subscription.file' }) },
	];

	const tableData: DetailTableData =
		subscriptionPayments.data?.data?.invoiceData?.map((invoice) => [
			invoice.variableSymbol ?? String(invoice.id),
			invoice.paidAt
				? dayjs(invoice.paidAt).format('D. M. YYYY')
				: t({ id: 'subscription.noIssuedDate' }),
			invoice.invoicePath && invoice.id ? (
				<DetailLinkButton
					onClick={() => {
						if (invoice.type === 'Create') {
							return openInitialInvoice.mutate({
								orderId: invoice.id ?? '',
								documentUrl: invoice.invoicePath ?? '',
							});
						}
						return handleDownloadInvoice(invoice.id ?? '');
					}}
				>
					{t({ id: 'subscription.downloadInvoice' })}
				</DetailLinkButton>
			) : (
				'-'
			),
		]) ?? [];

	if (isError) {
		return (
			<div className="d-flex gap-2 flex-column">
				<Detail.Subheading value={t({ id: 'VinistoPlus' })} />
				<span>Error loading subscription data</span>
			</div>
		);
	}

	return (
		<div className="d-flex gap-2 flex-column">
			<Detail.Subheading value={t({ id: 'VinistoPlus' })} />
			{isLoading ? null : subscription ? (
				<>
					<Detail.InfoWithLabel
						label={t({ id: 'admin.userDetail.info.subscriptionStatus' })}
						value={`${t({
							id: `subscriptionState.${subscription.state}`,
						})} ${
							subscription.isRenewDisabled
								? `(${t({ id: 'subscription.isRenewDisabled' })})`
								: ''
						} `}
					/>
					<Detail.InfoWithLabel
						label={t({ id: 'admin.userDetail.info.activationDate' })}
						value={dayjs(subscription.startDate).format('D. M. YYYY')}
					/>
					<Detail.InfoWithLabel
						label={t({ id: 'admin.userDetail.info.lastPaymentDate' })}
						value={dayjs(subscription.lastPayment).format('D. M. YYYY')}
					/>
					<Detail.InfoWithLabel
						label={t({ id: 'admin.userDetail.info.NextPaymentDate' })}
						value={dayjs(subscription.endDate).format('D. M. YYYY')}
					/>
					{subscription.state === SubscriptionState.Active &&
						!subscription.isRenewDisabled && (
							<Detail.Button
								label={t({
									id: 'admin.userDetail.info.deactivateSubscription',
								})}
								onClick={() => handleClickCancel(subscription.id ?? '')}
							>
								{t({ id: 'admin.userDetail.info.deactivateSubscription' })}
							</Detail.Button>
						)}
					<Detail.Table
						columns={tableColumns}
						data={tableData}
					/>
				</>
			) : (
				<div
					style={{ fontSize: '0.75rem', color: '#4d4d4e', lineHeight: '1rem' }}
				>
					{t({ id: 'admin.userDetail.info.noSubscription' })}
				</div>
			)}
		</div>
	);
};

export default SubscriptionInfo;
