import { FC, useCallback, useContext, useEffect } from 'react';
import { get } from 'Helpers/lodash';
import useNavigateWithNewtabOption from 'Hooks/useNavigateWithNewtabOption';
import { IPageListTableRow } from 'Hooks/useAdminTable/interfaces';
import { TableSchema } from 'Hooks/useTableSchema/interfaces';
import { API_METHOD, PageListAction } from 'Hooks/useAdminTable/constants';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import useAdminTable from 'Hooks/useAdminTable';
import useTableSchema from 'Hooks/useTableSchema';
import { LocalizationContext } from 'Services/LocalizationService';
import { CREATE_DELIVERY } from 'Components/Modal/constants';
import { ModalContext } from 'Components/Modal/context';
import AdminListPage from 'Components/AdminListPage';
import { AdminTableFilterType } from 'Components/AdminTable/constants';
import { VinistoHelperDllEnumsOrderDeliveryType } from 'vinisto_api_client/src/api-types/supplier-api/';
import { AdminTableVariants } from 'Components/AdminTable/interfaces';
import { IntegrationContext } from 'Services/IntergationService';

import {
	DeliveryListTableKeys,
	FILTER_COLUMN_MAP,
	SORTING_COLUMN_MAP,
} from './constants';
import { DeliveryList, DeliveryListType } from './interfaces';

const DeliveryListPage: FC<DeliveryList> = ({
	transportBaseType: deliveryType,
}) => {
	const { integrations } = useContext(IntegrationContext);
	const localizationContext = useContext(LocalizationContext);
	const modalContext = useContext(ModalContext);

	const t = localizationContext.useFormatMessage();
	const navigateWithNewtabOption = useNavigateWithNewtabOption();
	const getTableSchema = useTableSchema();
	const getLocalizedValue = useLocalizedValue();
	const { fetchData, handlers, state, dispatch, pageNumber, pageCount } =
		useAdminTable();

	const tableSchema: TableSchema = [
		{
			header: `${t({ id: 'admin.deliveryDetail.name.label' })}`,
			id: DeliveryListTableKeys.NAME,
			accessorKey: DeliveryListTableKeys.NAME,
			accessorFn: (row) => getLocalizedValue(get(row, 'name', [])),
		},
		{
			header: `${t({ id: 'admin.deliveryDetail.description.label' })}`,
			id: DeliveryListTableKeys.DESCRIPTION,
			accessorKey: DeliveryListTableKeys.DESCRIPTION,
			accessorFn: (row) => getLocalizedValue(get(row, 'description', [])),
			enableColumnFilter: false,
			enableSorting: false,
		},
		{
			header: `${t({ id: 'platform' })}`,
			id: DeliveryListTableKeys.PLATFORM,
			accessorKey: DeliveryListTableKeys.PLATFORM,
			accessorFn: (row) => row.allowedOnPlatforms.join(', '),
			meta: {
				filterType: AdminTableFilterType.DROPDOWN,
				dropDownFilterOptions:
					integrations?.map((platform) => [
						`${platform.integrationId}`,
						`${platform.integrationName}`,
					]) ?? [],
			},
		},
		{
			header: `${t({ id: 'admin.paymentDetail.prices.label' })}`,
			id: DeliveryListTableKeys.PRICE,
			accessorKey: DeliveryListTableKeys.PRICE,
			cell: (row) => {
				const prices = row.getValue() as Record<any, any>[];
				if (prices?.length === 0) return '-';
				return prices?.map((price, index) => (
					<div key={index}>
						{index !== 0 && <hr className="my-1" />}
						<span>{`Min: ${price?.minOrderPrice} ${price?.currency} `}</span>
						<span>{`Max: ${price?.minOrderPrice} ${price?.currency}`}</span>
						<br />
						<span>{`Cena s DPH: ${price?.valueWithVat} ${price?.currency}`}</span>
					</div>
				));
			}, // TODO: centering
			enableColumnFilter: false,
			enableSorting: false,
		},
		{
			header: `${t({ id: 'admin.deliveryDetail.deliveryType.label' })}`,
			id: DeliveryListTableKeys.DELIVERY_TYPE,
			accessorKey: DeliveryListTableKeys.DELIVERY_TYPE,
			meta: {
				filterType: AdminTableFilterType.DROPDOWN,
				dropDownFilterOptions:
					Object.entries(VinistoHelperDllEnumsOrderDeliveryType).map(
						([key, value]) => [key, value.toString()]
					) ?? [],
			},
		},
		{
			header: `${t({ id: 'admin.deliveryDetail.paymentMethods.label' })}`,
			id: DeliveryListTableKeys.PAYMENTS,
			accessorKey: DeliveryListTableKeys.PAYMENTS,
			cell: (row) => {
				const payments = row.getValue() as Record<any, any>[];
				if (payments?.length === 0) return '-';
				return payments?.map((payment, index) => (
					<div key={index}>
						{index !== 0 && <hr className="my-1" />}
						<span>{`${getLocalizedValue(payment?.name ?? [])}`}</span>
					</div>
				));
			},
			enableColumnFilter: false,
			enableSorting: false,
		},
		{
			header: `${t({ id: 'admin.deliveryDetail.order.label' })}`,
			id: DeliveryListTableKeys.ORDER,
			accessorKey: DeliveryListTableKeys.ORDER,
			enableColumnFilter: false,
		},
		{
			header: `${t({ id: 'admin.deliveryDetail.isActive.label' })}`,
			id: DeliveryListTableKeys.IS_ACTIVE,
			accessorKey: DeliveryListTableKeys.IS_ACTIVE,
			cell: (row) =>
				row.getValue() ? t({ id: 'admin.yes' }) : t({ id: 'admin.no' }),
			meta: {
				filterType: AdminTableFilterType.YES_NO,
			},
		},
	];

	const adminTableSchema = getTableSchema(tableSchema);

	const handleOnTableRowClick = (
		entity: IPageListTableRow,
		event: React.MouseEvent
	) => navigateWithNewtabOption(`/delivery-detail/${entity.id}`, event);

	const handleOpenCreateModal = useCallback(() => {
		modalContext.handleOpenModal(CREATE_DELIVERY, {
			resetDeliveryList: () => dispatch({ type: PageListAction.reset }),
			transportBaseType: deliveryType,
		});
	}, [modalContext, deliveryType, dispatch]);

	useEffect(() => {
		const apiParams: { key: string; value: any }[] = [
			{ key: 'limit', value: state.limit },
			{ key: 'offset', value: state.offset },
			{
				key: 'isForStocking',
				value: deliveryType === DeliveryListType.STOCK ? true : false,
			},
			{
				key: 'IsForCustomerDelivery',
				value: deliveryType === DeliveryListType.ESHOP ? true : false,
			},
		];

		const [sortByColumn] = state.sorting;

		if (Object.hasOwn(SORTING_COLUMN_MAP, sortByColumn?.id)) {
			apiParams.push({
				key: 'SortingColumn',
				value: SORTING_COLUMN_MAP[sortByColumn.id],
			});
			apiParams.push({ key: 'IsSortingDescending', value: sortByColumn.desc });
		}
		state.filters?.forEach((filter) => {
			if (Object.hasOwn(FILTER_COLUMN_MAP, filter.id)) {
				apiParams.push({
					key: FILTER_COLUMN_MAP[filter.id],
					value: filter.value,
				});
			}
		});
		fetchData(
			'order-api/deliveries',
			apiParams,
			(payload) => payload.deliveries ?? [],
			'admin.deliveryList.loadingError',
			API_METHOD.GET
		);
	}, [deliveryType, fetchData, state]);

	return (
		<AdminListPage
			adminTableSchema={adminTableSchema}
			handleOpenCreateModal={handleOpenCreateModal}
			btnCreateLabel="admin.deliveryList.deliveryCreate"
			handleOnTableRowClick={handleOnTableRowClick}
			handlers={handlers}
			state={state}
			pageCount={pageCount}
			pageNumber={pageNumber}
			adminTableVariant={AdminTableVariants.DYNAMIC_COLUMNS}
			columnOrder={[
				DeliveryListTableKeys.NAME,
				DeliveryListTableKeys.DESCRIPTION,
				DeliveryListTableKeys.PLATFORM,
				DeliveryListTableKeys.PRICE,
				DeliveryListTableKeys.DELIVERY_TYPE,
				DeliveryListTableKeys.PAYMENTS,
				DeliveryListTableKeys.ORDER,
				DeliveryListTableKeys.IS_ACTIVE,
			]}
		/>
	);
};

export default DeliveryListPage;
