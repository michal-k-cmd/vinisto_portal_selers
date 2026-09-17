import { useQueries } from '@tanstack/react-query';
import { useContext, useMemo, useState } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import { Button } from 'vinisto_ui';
import { dayjsInstance as dayjs } from 'vinisto_shared';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import Empty from 'pages-spa/UserSection/BoughtProducts/Empty';

import BillingRow from '../BillingRow';

import { subscriptionReadOnlyApi } from '@/subscription-service';
import { SubscriptionResponse } from '@/api-types/subscription-api';
import api from '@/api';
import { VinistoOrderDllModelsApiReturnDataOrderReturn } from '@/api-types/order-api';

const REQUEST_LIMIT = 100;
const INITIAL_LISTED_INVOICES = 5;

const Billings = ({
	subscriptions,
}: {
	subscriptions: SubscriptionResponse[];
}) => {
	const { loginHash: UserLoginHash } = useContext(
		AuthenticationContext
	).vinistoUser;
	const t = useContext(LocalizationContext).useFormatMessage();

	const [showAll, setShowAll] = useState(false);

	const queries = subscriptions.map((subscription) => ({
		queryKey: ['subscriptionBillings', { subscription }],

		queryFn: async () => {
			const [res, order] = await Promise.all([
				await subscriptionReadOnlyApi.subscriptionPaymentsInvoicesList({
					SubscriptionId: subscription.id ?? '',
					Limit: REQUEST_LIMIT,
				}),
				api
					.get<VinistoOrderDllModelsApiReturnDataOrderReturn>(
						`order-api/orders/${subscription.orderId}`,
						{
							UserLoginHash,
						}
					)
					.then((res) => res.order),
			]);

			return {
				...res.data,
				invoiceData: res.data?.invoiceData?.map((invoice) => ({
					...invoice,
					currency: order?.orderCurrency,
					subscription,
				})),
			};
		},
	}));

	const subscriptionBillingsQueries = useQueries({
		queries: queries,
	});

	const isAllQueriesFetched = subscriptionBillingsQueries.every(
		(query) => query.isFetched
	);
	const isAllQueriesSuccessful = subscriptionBillingsQueries.every(
		(query) => query.isSuccess
	);

	const sortedFlattenedQueriesData = useMemo(() => {
		if (!isAllQueriesFetched) return [];
		const transformadData = subscriptionBillingsQueries
			.flatMap((query) => [...(query.data?.invoiceData ?? [])])
			.filter((payment) => payment != null)
			.map((payment) => ({
				...payment,
				subscription: payment.subscription,
			}));
		transformadData.sort((a, b) => +dayjs(b?.paidAt) - +dayjs(a?.paidAt));
		return transformadData;
	}, [isAllQueriesFetched, subscriptionBillingsQueries]);

	const allInvoices = sortedFlattenedQueriesData;
	const lastInvoices = sortedFlattenedQueriesData.slice(
		0,
		INITIAL_LISTED_INVOICES
	);

	return (
		<div className="mb-3">
			{isAllQueriesSuccessful && allInvoices.length === 0 && (
				<Empty>{t({ id: 'userSection.vinistoplus.billing.empty' })}</Empty>
			)}
			{(showAll ? allInvoices : lastInvoices)?.map((invoice) => (
				<BillingRow
					key={invoice.id}
					subscription={invoice.subscription}
					payment={invoice}
				/>
			))}
			{allInvoices.length > INITIAL_LISTED_INVOICES && !showAll && (
				<Button
					onClick={() => setShowAll(true)}
					className="mt-2"
				>
					{t({ id: 'userSection.vinistoplus.moreInvoices' })}
				</Button>
			)}
		</div>
	);
};

export default Billings;
