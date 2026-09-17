import { useContext, useEffect } from 'react';
import { head } from 'Helpers/lodash';
import { dayjsInstance as dayjs } from 'Services/Date';
import useNavigateWithNewtabOption from 'Hooks/useNavigateWithNewtabOption';
import { IPageListTableRow } from 'Hooks/useAdminTable/interfaces';
import { TableSchema } from 'Hooks/useTableSchema/interfaces';
import { API_METHOD } from 'Hooks/useAdminTable/constants';
import { stateTranslationKeys } from 'Pages/OrderList/constants';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import useTableSchema from 'Hooks/useTableSchema';
import useAdminTable from 'Hooks/useAdminTable';
import AdminListPage from 'Components/AdminListPage';
import { getAmountFilter } from 'Components/AdminTable/Filters/Amount/helpers';
import { AdminTableFilterType } from 'Components/AdminTable/constants';
import { RANGE_DATE_FILTER_DELIMITER } from 'Components/AdminTable/Filters/RangeDate/constants';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { AdminTableVariants } from 'Components/AdminTable/interfaces';
import { TablePopover } from 'vinisto_ui';
import {
	VinistoHelperDllEnumsCountryCode,
	VinistoHelperDllEnumsOrderOrderState,
} from 'vinisto_api_client/src/api-types/order-api/';
import './styles.css';

import {
	DEFAULT_SORT,
	getPlatformIdLabel,
	OrderListTableKeys,
	platformIdFilterOptions,
	platformIdFilterValues,
	PRICE_EQUALS,
	PRICE_GREATER,
	PRICE_LESS,
	SORTING_COLUMN_MAP,
} from './constants';

const OrderListPage = () => {
	const { loginHash: userLoginHash } = useContext(
		AuthenticationContext
	).vinistoUser;
	const localizationContext = useContext(LocalizationContext);

	const t = localizationContext.useFormatMessage();
	const navigateWithNewtabOption = useNavigateWithNewtabOption();
	const getTableSchema = useTableSchema();
	const getLocalizedValue = useLocalizedValue();
	const { fetchData, handlers, state, pageNumber, pageCount } =
		useAdminTable(DEFAULT_SORT);

	const tableSchema: TableSchema = [
		{
			header: `${t({ id: 'orderDetail.orderNumber.label' })}`,
			accessorKey: 'orderNumber',
			id: OrderListTableKeys.ID,
			cell: ({ row }) => {
				if (row.original.internalOrderNote) {
					const name = row.original.orderNumber;
					const note = row.original.internalOrderNote;

					return (
						<TablePopover
							name={name ?? ''}
							note={note}
						/>
					);
				}

				return <div>{row.original.orderNumber}</div>;
			},
		},
		{
			header: `${t({ id: 'admin.bundleDetail.platform.label' })}`,
			id: OrderListTableKeys.PLATFORM_ID,
			accessorFn: (row) => getPlatformIdLabel(row?.platformId),
			meta: {
				filterType: AdminTableFilterType.DROPDOWN,
				dropDownFilterOptions: platformIdFilterOptions,
			},
			enableSorting: false,
		},
		{
			header: `${t({ id: 'orderDetail.countryOfSale.label' })}`,
			id: OrderListTableKeys.COUNTRY_OF_SALE,
			accessorFn: (row) => row?.countryOfSale ?? '',
			meta: {
				filterType: AdminTableFilterType.DROPDOWN,
				dropDownFilterOptions: Object.values(
					VinistoHelperDllEnumsCountryCode
				).map((value) => [value, value]),
			},
			enableSorting: false,
		},
		{
			header: `${t({ id: 'orderDetail.billingInfo.trackingId.label' })}`,
			id: OrderListTableKeys.TRACKING_ID,
			accessorKey: OrderListTableKeys.TRACKING_ID,
			enableColumnFilter: false,
			enableSorting: false,
		},
		{
			header: `${t({ id: 'orderDetail.user.email.label' })}`,
			id: OrderListTableKeys.EMAIL,
			accessorFn: (row) => row?.user?.email ?? '',
		},
		{
			header: `${t({ id: 'orderDetail.delivery.label' })}`,
			id: OrderListTableKeys.DELIVERY_TYPE,
			accessorFn: (row) => getLocalizedValue(row?.delivery?.name ?? []),
		},
		{
			header: `${t({ id: 'orderDetail.payment.label' })}`,
			id: OrderListTableKeys.PAYMENT_TYPE,
			accessorFn: (row) => getLocalizedValue(row?.payment?.name ?? []),
			enableColumnFilter: false,
		},
		{
			header: `${t({ id: 'orderDetail.address.label' })}`,
			id: OrderListTableKeys.DELIVERY_ADDRESS,
			accessorFn: (row) => {
				if (row.delivery.deliveryAddress === null) return '';
				const {
					name,
					surname,
					street,
					landRegistryNumber,
					houseNumber,
					city,
					zip,
				} = row.delivery.deliveryAddress;
				const addressFields = [];
				addressFields.push(`${name} ${surname}`);
				addressFields.push(
					`${street} ${landRegistryNumber}${
						houseNumber ? '/' + houseNumber : ''
					}`
				);
				addressFields.push(`${city}`);
				addressFields.push(`${zip}`);
				return addressFields
					.filter((f) => f)
					.map((f) => f.trim())
					.join(', ');
			},
			enableColumnFilter: false,
			enableSorting: false,
		},
		{
			header: `${t({ id: 'orderDetail.phone.label' })}`,
			id: OrderListTableKeys.PHONE,
			accessorFn: (row) => row?.delivery?.deliveryAddress?.phone ?? '',
			enableSorting: false,
		},
		{
			header: `${t({ id: 'orderDetail.state.label' })}`,
			id: OrderListTableKeys.STATE,
			accessorFn: (entity: IPageListTableRow) => {
				const state: VinistoHelperDllEnumsOrderOrderState =
					entity[OrderListTableKeys.STATE];
				return state ? t({ id: stateTranslationKeys[state] }) : '';
			},
			meta: {
				filterType: AdminTableFilterType.DROPDOWN,
				dropDownFilterOptions: Object.values(
					VinistoHelperDllEnumsOrderOrderState
				).map((value) => [
					value,
					`${t({
						id: stateTranslationKeys[value],
					})}`,
				]),
			},
			enableSorting: false,
		},
		{
			header: `${t({ id: 'admin.orderList.created' })}`,
			id: OrderListTableKeys.TIME,
			accessorFn: (row) => {
				const createdChange = row.stateChangeRecords?.filter(
					(change: Record<string, any>) => change.state === 'CREATED'
				)[0];
				if (!createdChange || !createdChange.changeTime) {
					return;
				}
				return dayjs
					.unix(createdChange.changeTime)
					.format(`${t({ id: 'admin.dateTimeFormat' })}`);
			},
			meta: {
				filterType: AdminTableFilterType.RANGE_DATE,
			},
		},
		{
			header: `${t({ id: 'orderDetail.payment.price.label' })}`,
			id: OrderListTableKeys.PRICE,
			cell: ({ row }) => {
				if (
					row.original.orderCurrency === 'EUR' &&
					row.original.orderExchangeRate?.valueGoods &&
					row.original.orderExchangeRate?.valueGoods !== 0
				)
					return (
						<>
							<div className="price-eur">
								{Number(row.original.orderPriceWithVat).toFixed(2)}{' '}
								{row.original.orderCurrency}
							</div>
							<div className="hide">
								{Number(
									row.original.orderPriceWithVat *
										row.original.orderExchangeRate.valueGoods
								).toFixed(2)}{' '}
								CZK
							</div>
						</>
					);
				else
					return `${Number(row.original.orderPriceWithVat).toFixed(2)} ${
						row.original.orderCurrency
					}`;
			},
		},
	];

	const adminTableSchema = getTableSchema(tableSchema);

	const handleOnTableRowClick = (
		entity: IPageListTableRow,
		event: React.MouseEvent
	) => navigateWithNewtabOption(`/order-detail/${entity.id}`, event);

	useEffect(() => {
		const apiParams: { key: string; value: any }[] = [
			{ key: 'Limit', value: state.limit },
			{ key: 'Offset', value: state.offset },
			{
				key: 'UserLoginHash',
				value: userLoginHash,
			},
		];

		const sortByColumn = head(state.sorting);

		if (sortByColumn?.id) {
			apiParams.push({
				key: 'SortingColumn',
				value: SORTING_COLUMN_MAP[sortByColumn.id],
			});
			apiParams.push({
				key: 'IsSortingDescending',
				value: sortByColumn.desc ?? true,
			});
		}
		state.filters?.forEach((filter) => {
			if (filter.id === OrderListTableKeys.PRICE) {
				const amountFilter = getAmountFilter(String(filter.value));
				if (
					amountFilter.comparingNumberType === undefined ||
					amountFilter.value === undefined
				)
					return;

				if (amountFilter.comparingNumberType.valueOf() === PRICE_LESS) {
					apiParams.push({ key: 'PriceTo', value: amountFilter.value });
				} else if (
					amountFilter.comparingNumberType.valueOf() === PRICE_EQUALS
				) {
					apiParams.push({ key: 'PriceFrom', value: amountFilter.value });
					apiParams.push({ key: 'PriceTo', value: amountFilter.value });
				} else if (
					amountFilter.comparingNumberType.valueOf() === PRICE_GREATER
				) {
					apiParams.push({ key: 'PriceFrom', value: amountFilter.value });
				}
			} else if (filter.id === OrderListTableKeys.TIME) {
				if (typeof filter.value === 'string') {
					const dateFrom =
						filter.value.split(RANGE_DATE_FILTER_DELIMITER)[0] ?? '';
					const dateTo =
						filter.value.split(RANGE_DATE_FILTER_DELIMITER)[1] ?? '';
					apiParams.push({ key: 'TimeFrom', value: dateFrom });
					apiParams.push({ key: 'TimeTo', value: dateTo });
				}
			} else if (filter.id === OrderListTableKeys.STATE) {
				apiParams.push({ key: 'CurrentState', value: filter.value });
			} else if (filter.id === OrderListTableKeys.DELIVERY_TYPE) {
				apiParams.push({ key: 'DeliveryName', value: filter.value });
			} else if (filter.id === OrderListTableKeys.ID) {
				apiParams.push({ key: 'OrderNumber', value: filter.value });
			} else if (filter.id === OrderListTableKeys.PHONE) {
				apiParams.push({ key: 'DeliveryPhone', value: filter.value });
			} else if (filter.id === OrderListTableKeys.EMAIL) {
				apiParams.push({ key: 'UserEmail', value: filter.value });
			} else if (
				filter.id === OrderListTableKeys.PLATFORM_ID &&
				platformIdFilterValues.includes(String(filter.value))
			) {
				apiParams.push({ key: 'PlatformId', value: Number(filter.value) });
			}
			if (filter.id === OrderListTableKeys.COUNTRY_OF_SALE) {
				apiParams.push({ key: 'CountryOfSale', value: filter.value });
			}
		});
		fetchData(
			'order-api/orders',
			apiParams,
			(payload) => payload?.orders ?? [],
			'admin.orderList.loadingError',
			API_METHOD.GET
		);
	}, [fetchData, state, userLoginHash]);

	return (
		<AdminListPage
			adminTableSchema={adminTableSchema}
			handleOnTableRowClick={handleOnTableRowClick}
			handlers={handlers}
			state={state}
			pageCount={pageCount}
			pageNumber={pageNumber}
			adminTableVariant={AdminTableVariants.DYNAMIC_COLUMNS}
			columnOrder={[
				OrderListTableKeys.ID,
				OrderListTableKeys.PLATFORM_ID,
				OrderListTableKeys.COUNTRY_OF_SALE,
				OrderListTableKeys.TRACKING_ID,
				OrderListTableKeys.EMAIL,
				OrderListTableKeys.DELIVERY_TYPE,
				OrderListTableKeys.PAYMENT_TYPE,
				OrderListTableKeys.DELIVERY_ADDRESS,
				OrderListTableKeys.PHONE,
				OrderListTableKeys.STATE,
				OrderListTableKeys.TIME,
				OrderListTableKeys.PRICE,
			]}
		/>
	);
};

export default OrderListPage;
