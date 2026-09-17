import { FC, useContext, useEffect, useMemo, useState } from 'react';
import { CCard, CCardBody, CCol, CRow } from '@coreui/react';
import cx from 'classnames';
import { dayjsInstance as dayjs } from 'Services/Date';
import { useParams } from 'react-router-dom';
import { TopBarButton, TopBarItem } from 'Components/TopBar/interfaces';
import { QueryParamsKeys } from 'Services/BillingService/interfaces';
import { OrderDetailBundle } from 'Services/OrderService/interfaces';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { fetchOrderDetail } from 'Services/OrderService';
import { mapApiOrderDetail } from 'Services/OrderService/mapper';
import AdminTable from 'Components/AdminTable';
import TopBar from 'Components/TopBar';
import useGoBackInHistory from 'Hooks/useGoBackInHistory';

import './styles.css';

const OrderDetailPage: FC = () => {
	const authenticationContext = useContext(AuthenticationContext);
	const localizationContext = useContext(LocalizationContext);

	const { id: orderNumberId } = useParams();
	const t = localizationContext.useFormatMessage();
	const goBack = useGoBackInHistory();

	const [listState, setListState] = useState<Record<any, any>>({
		loading: false,
		loaded: false,
		data: [],
		error: null,
		shouldReload: false,
	});

	const userLoginHash = authenticationContext?.vinistoUser?.loginHash || '';

	useEffect(() => {
		// Do not trigger fetch if unauthenticated
		if (userLoginHash === '') return;

		// Do not trigger fetch if billing number is not provided
		if (orderNumberId === '' || !orderNumberId) return;

		// TODO: Responses should be cached for reasonable time
		fetchOrderDetail(orderNumberId, [
			{
				key: QueryParamsKeys.UserLoginHash,
				value: userLoginHash,
			},
		])
			.then((data) => {
				setListState((prevList) => {
					return {
						...prevList,
						loading: false,
						loaded: true,
						count: data.count,
						data: mapApiOrderDetail(data),
					};
				});
			})
			.catch((err) => {
				setListState((prevList) => {
					return {
						...prevList,
						loading: false,
						loaded: false,
						count: 0,
						error: err,
					};
				});
			});
	}, [userLoginHash, orderNumberId]); // Also triggers refetch page change

	const topBarItems: TopBarItem[] = useMemo(() => {
		const states = listState.data.state?.split(', ');
		const statesCssClass = states?.slice(-1)[0];
		const statesText = states
			?.map((state: string) => {
				return t({ id: `admin.orders.status.${state}` });
			})
			.join(', ');

		return [
			{
				label: t({ id: 'admin.order.orderNumber' }),
				value: listState.data.orderNumber,
			},
			{
				label: t({ id: 'admin.order.orderDate' }),
				value: dayjs(listState.data.date).format(`${t({ id: 'dateFormat' })}`),
			},
			{
				label: t({ id: 'admin.order.totalPrice' }),
				value: `${listState.data.orderPriceWithVat?.toFixed(2)} Kč`,
			},
			{
				label: t({ id: 'admin.order.status' }),
				value: (
					<span className={cx('vinisto-admin-order-status', statesCssClass)}>
						{statesText}
					</span>
				),
			},
		];
	}, [t, listState.data]);

	const topBarButtons: TopBarButton[] = [
		{
			label: t({ id: 'admin.btn.back' }),
			onClick: goBack(),
		},
	];

	return (
		<div className="noflex">
			<TopBar
				items={topBarItems}
				buttons={topBarButtons}
			/>
			<CRow>
				<CCol>
					<CCard className="mb-4">
						<CCardBody>
							<AdminTable<OrderDetailBundle>
								columns={[
									{
										id: 'order_number',
										header: `${t({ id: 'admin.order.id' })}`,
										accessorKey: 'id',
										enableColumnFilter: false,
										enableSorting: false,
									},
									{
										id: 'name',
										header: `${t({ id: 'admin.order.productName' })}`,
										accessorKey: 'name',
										enableColumnFilter: false,
										enableSorting: false,
									},
									{
										id: 'quantity',
										header: `${t({ id: 'admin.order.quantity' })}`,
										accessorKey: 'quantity',
										enableColumnFilter: false,
										enableSorting: false,
									},
									{
										id: 'price',
										header: `${t({ id: 'admin.order.totalPrice' })}`,
										accessorFn: (row) => `${row.price} Kč`,
										enableColumnFilter: false,
										enableSorting: false,
									},
								]}
								data={listState.data.orderItems}
								loading={listState.loading}
							/>
						</CCardBody>
					</CCard>
				</CCol>
			</CRow>
		</div>
	);
};

export default OrderDetailPage;
