import { useContext, useEffect, useState } from 'react';
import { CCard, CCardBody, CCol, CRow } from '@coreui/react';
import { dayjsInstance as dayjs } from 'Services/Date';
import { useParams } from 'react-router-dom';
import { TopBarButton, TopBarItem } from 'Components/TopBar/interfaces';
import { QueryParamsKeys } from 'Services/BillingService/interfaces';
import { ModalType } from 'Components/Modal/constants';
import { ModalContext } from 'Components/Modal/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { fetchBillingDetail } from 'Services/BillingService';
import { mapApiBillingDetail } from 'Services/BillingService/mapper';
import { LocalizationContext } from 'Services/LocalizationService';
import AdminTable from 'Components/AdminTable';
import TopBar from 'Components/TopBar';
import useGoBackInHistory from 'Hooks/useGoBackInHistory';

import styles from './styles.module.css';
import { getTimeRange } from './helpers';

const BillingDetailPage = () => {
	const { id: billingNumberId } = useParams();

	const authenticationContext = useContext(AuthenticationContext);
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const goBack = useGoBackInHistory();

	const [listState, setListState] = useState<Record<any, any>>({
		loading: false,
		loaded: false,
		data: [],
		error: null,
		shouldReload: false,
	});
	const modalContext = useContext(ModalContext);
	const userLoginHash = authenticationContext?.vinistoUser?.loginHash || '';

	const handleOpenModal = () => {
		modalContext.handleOpenModal(ModalType.BILLING_QUOTE);
	};

	useEffect(() => {
		// Do not trigger fetch if unauthenticated
		if (userLoginHash === '') return;

		// Do not trigger fetch if billing number is not provided
		if (billingNumberId === '' || !billingNumberId) return;

		// TODO: Responses should be cached for reasonable time
		fetchBillingDetail(billingNumberId, [
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
						data: mapApiBillingDetail(data),
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
	}, [userLoginHash, billingNumberId]); // Also triggers refetch page change

	const topBarItems: TopBarItem[] = [
		{
			label: t({ id: 'admin.billing.numberShort' }),
			value: listState.data.billingNumber,
		},
		{
			label: t({ id: 'admin.billing.timeRange' }),
			value: getTimeRange(listState.data.timeFrom, listState.data.timeTo),
		},
		{
			label: t({ id: 'admin.billing.date' }),
			value: dayjs(listState.data.date).format(`${t({ id: 'dateFormat' })}`),
		},
		{
			label: t({ id: 'admin.billing.discountSeller' }),
			value: `${listState.data.totalSellerDiscount ?? 0} Kč`,
		},
		{
			label: t({ id: 'admin.billing.discountVinisto' }),
			value: (
				<span className="vinisto-admin-billing-totalsum">{`${
					listState.data.totalVinistoDiscount ?? 0
				} Kč`}</span>
			),
		},
		{
			label: t({ id: 'admin.billing.sumTotal' }),
			value: (
				<span className="vinisto-admin-billing-totalsum">
					{`${listState?.data?.totalSum?.toFixed(2) ?? '-'} Kč`}
				</span>
			),
		},
		{
			label: `${t({ id: 'admin.billing.status' })}`,
			value: (
				<span
					className={`vinisto-admin-billing-status ${listState.data.state}`}
				>
					{t({ id: `admin.billing.status.${listState.data.state}` })}
				</span>
			),
		},
	];

	const topBarButtons: TopBarButton[] = [
		{
			label: t({ id: 'admin.billing.billingQuote' }),
			onClick: handleOpenModal,
		},
		{
			label: t({ id: 'admin.btn.back' }),
			onClick: goBack(),
		},
	];

	const discountData = [
		{
			id: t({ id: 'admin.billing.discountSellerId' }),
			name: t({ id: 'admin.billing.discountSellerDescription' }),
			soldPcs: '',
			sumPrice: '',
			sumFee: listState.data.totalSellerDiscount ?? 0,
			percentFee: '',
			totalProfit: '',
			lot: '',
		},
		{
			id: t({ id: 'admin.billing.discountVinistoId' }),
			name: t({ id: 'admin.billing.discountVinistoDescription' }),
			soldPcs: '',
			sumPrice: listState.data.totalVinistoDiscount ?? 0,
			sumFee: '',
			percentFee: '',
			totalProfit: '',
			lot: '',
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
							<AdminTable
								columns={[
									{
										id: 'order_number',
										header: `${t({ id: 'admin.billing.identifier' })}`,
										accessorKey: 'id',
										enableColumnFilter: false,
										enableSorting: false,
									},
									{
										id: 'name',
										header: `${t({ id: 'admin.billing.name' })}`,
										accessorKey: 'name',
										enableColumnFilter: false,
										enableSorting: false,
										cell: (context) => {
											return (
												<>
													{context.row.original.name}
													{(context.row.original.id ===
														t({ id: 'admin.billing.discountSellerId' }) ||
														context.row.original.id ===
															t({ id: 'admin.billing.discountVinistoId' })) && (
														<div className={styles.tooltip}>
															i
															<span className={styles.tooltiptext}>
																{context.row.original.id ===
																t({ id: 'admin.billing.discountSellerId' })
																	? t({
																			id: 'admin.billing.discountSellerTooltip',
																	  })
																	: t({
																			id: 'admin.billing.discountVinistoTooltip',
																	  })}
															</span>
														</div>
													)}
												</>
											);
										},
									},
									{
										header: `${t({ id: 'admin.billing.lot' })}`,
										accessorKey: 'lot',
										enableColumnFilter: false,
										enableSorting: false,
									},
									{
										id: 'pcs',
										header: `${t({ id: 'admin.billing.quantity' })}`,
										accessorKey: 'soldPcs',
										enableColumnFilter: false,
										enableSorting: false,
									},
									{
										id: 'price',
										header: `${t({ id: 'admin.billing.sumPrice' })}`,
										accessorKey: 'sumPrice',
										accessorFn: (row) =>
											row.sumPrice ? `${row.sumPrice.toFixed(2)} Kč` : '',
										enableColumnFilter: false,
										enableSorting: false,
									},
									{
										id: 'fee',
										header: `${t({ id: 'admin.billing.fee' })}`,
										accessorKey: 'sumFee',
										accessorFn: (row) =>
											row.sumFee ? `${row.sumFee.toFixed(2)} Kč` : '',
										enableColumnFilter: false,
										enableSorting: false,
									},
									{
										id: 'profit',
										header: `${t({ id: 'admin.billing.profit' })}`,
										accessorKey: 'totalProfit',
										accessorFn: (row) =>
											row.totalProfit ? `${row.totalProfit.toFixed(2)} Kč` : '',
										enableColumnFilter: false,
										enableSorting: false,
									},
								]}
								data={
									listState.data?.bundles?.length &&
									listState.data.bundles.concat(discountData)
								}
								loading={listState.loading}
							/>
						</CCardBody>
					</CCard>
				</CCol>
			</CRow>
		</div>
	);
};

export default BillingDetailPage;
