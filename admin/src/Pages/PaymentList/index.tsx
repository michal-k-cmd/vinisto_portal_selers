import { useCallback, useContext, useEffect } from 'react';
import { get } from 'Helpers/lodash';
import useNavigateWithNewtabOption from 'Hooks/useNavigateWithNewtabOption';
import { IPageListTableRow } from 'Hooks/useAdminTable/interfaces';
import { TableSchema } from 'Hooks/useTableSchema/interfaces';
import { API_METHOD, PageListAction } from 'Hooks/useAdminTable/constants';
import { CREATE_PAYMENT } from 'Components/Modal/constants';
import { AdminTableFilterType } from 'Components/AdminTable/constants';
import useAdminTable from 'Hooks/useAdminTable';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import useTableSchema from 'Hooks/useTableSchema';
import { LocalizationContext } from 'Services/LocalizationService';
import { ModalContext } from 'Components/Modal/context';
import AdminListPage from 'Components/AdminListPage';
import { VinistoHelperDllEnumsOrderPaymentType } from 'vinisto_api_client/src/api-types/order-api/';
import { AdminTableVariants } from 'Components/AdminTable/interfaces';

import {
	FILTER_COLUMN_MAP,
	PaymentListTableKeys,
	SORTING_COLUMN_MAP,
} from './constants';

const PaymentListPage = () => {
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
			header: `${t({ id: 'admin.paymentDetail.name.label' })}`,
			id: PaymentListTableKeys.NAME,
			accessorFn: (row) => getLocalizedValue(get(row, 'name', [])),
		},
		{
			header: `${t({ id: 'admin.paymentDetail.paymentType.label' })}`,
			id: PaymentListTableKeys.PAYMENT_TYPE,
			accessorKey: PaymentListTableKeys.PAYMENT_TYPE,
			meta: {
				filterType: AdminTableFilterType.DROPDOWN,
				dropDownFilterOptions: Object.entries(
					VinistoHelperDllEnumsOrderPaymentType
				).map(([key, value]) => [key, value]),
			},
		},
		{
			header: `${t({ id: 'platform' })}`,
			id: PaymentListTableKeys.PLATFORM,
			accessorKey: PaymentListTableKeys.PLATFORM,
			accessorFn: (row) => row.allowedOnPlatforms.join(', '),
			// Neither sorting nor filtering is implemented in API
			enableColumnFilter: false,
			enableSorting: false,
			//meta: {
			//	filterType: AdminTableFilterType.DROPDOWN,
			//	dropDownFilterOptions:
			//		integrations?.map((platform) => [
			//			`${platform.integrationId}`,
			//			`${platform.integrationName}`,
			//		]) ?? [],
			//},
		},
		{
			header: `${t({ id: 'admin.paymentDetail.order.label' })}`,
			id: PaymentListTableKeys.ORDER,
			accessorKey: PaymentListTableKeys.ORDER,
			enableColumnFilter: false,
		},
		{
			header: `${t({ id: 'admin.paymentDetail.isActive.label' })}`,
			id: PaymentListTableKeys.IS_ACTIVE,
			accessorKey: PaymentListTableKeys.IS_ACTIVE,
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
	) => navigateWithNewtabOption(`/payment-detail/${entity.id}`, event);

	const handleOpenCreateModal = useCallback(() => {
		modalContext.handleOpenModal(CREATE_PAYMENT, {
			resetPaymentList: () => dispatch({ type: PageListAction.reset }),
		});
	}, [modalContext.handleOpenModal, dispatch]);

	useEffect(() => {
		const apiParams: { key: string; value: any }[] = [
			{ key: 'limit', value: state.limit },
			{ key: 'offset', value: state.offset },
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
			'order-api/payments',
			apiParams,
			(payload) => get(payload, 'payments', []) ?? [],
			'admin.paymentList.loadingError',
			API_METHOD.GET
		);
	}, [fetchData, state]);

	return (
		<AdminListPage
			adminTableSchema={adminTableSchema}
			handleOpenCreateModal={handleOpenCreateModal}
			btnCreateLabel="admin.paymentList.paymentCreate"
			handleOnTableRowClick={handleOnTableRowClick}
			handlers={handlers}
			state={state}
			pageCount={pageCount}
			pageNumber={pageNumber}
			adminTableVariant={AdminTableVariants.DYNAMIC_COLUMNS}
			columnOrder={[
				PaymentListTableKeys.NAME,
				PaymentListTableKeys.PLATFORM,
				PaymentListTableKeys.PAYMENT_TYPE,
				PaymentListTableKeys.ORDER,
				PaymentListTableKeys.IS_ACTIVE,
			]}
		/>
	);
};

export default PaymentListPage;
