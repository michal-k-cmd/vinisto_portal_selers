import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { useQuery } from '@tanstack/react-query';
import DetailView from 'Components/Detail/View';
import BillingService from 'Services/OrderService/Billing';
import { OrderHeader } from 'Pages/BillingDetail/Components/Header';
import { dayjsInstance as dayjs } from 'Services/Date';
import OrderItems from 'Pages/BillingDetail/Components/Items';

const BillingDetailPage = () => {
	const { id: billingId } = useParams();
	if (!billingId) throw new Error('Missing billingId');

	const { loginHash: userLoginHash } = useContext(
		AuthenticationContext
	).vinistoUser;
	const t = useContext(LocalizationContext).useFormatMessage();
	const { getBillingById, getOrdersByBillingId } = BillingService;

	const { data: billingData } = useQuery(['billing', billingId], () =>
		getBillingById({
			billingId,
			UserLoginHash: userLoginHash,
		})
	);

	const { data: ordersDataBilling } = useQuery(
		['ordersBilling', billingId],
		() =>
			getOrdersByBillingId({
				billingId: billingId,
				UserLoginHash: userLoginHash,
			})
	);

	const billingNumber = billingData?.billingNumber ?? '';
	const billingDate = dayjs(billingData?.createdAt).format(
		`${t({ id: 'admin.dateFormat' })}`
	);

	const billingTimeFromTo = `${dayjs(billingData?.timeFrom).format(
		`${t({ id: 'admin.dateFormat.day' })}`
	)} - ${dayjs(billingData?.timeTo).format(
		`${t({ id: 'admin.dateFormat' })}`
	)}`;

	return (
		<DetailView>
			<OrderHeader
				billingNumber={billingNumber}
				billingDate={billingDate}
				billingTimeFromTo={billingTimeFromTo}
				state={billingData?.state}
				totalSum={billingData?.totalSum}
			/>
			<OrderItems items={ordersDataBilling ?? []} />
		</DetailView>
	);
};

export default BillingDetailPage;
