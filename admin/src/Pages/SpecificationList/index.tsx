import { useCallback, useContext, useEffect } from 'react';
import { get } from 'Helpers/lodash';
import useNavigateWithNewtabOption from 'Hooks/useNavigateWithNewtabOption';
import { IPageListTableRow } from 'Hooks/useAdminTable/interfaces';
import { TableSchema } from 'Hooks/useTableSchema/interfaces';
import { API_METHOD, PageListAction } from 'Hooks/useAdminTable/constants';
import { CREATE_SPECIFICATION } from 'Components/Modal/constants';
import { AdminTableFilterType } from 'Components/AdminTable/constants';
import useAdminTable from 'Hooks/useAdminTable';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import useTableSchema from 'Hooks/useTableSchema';
import { LocalizationContext } from 'Services/LocalizationService';
import { ModalContext } from 'Components/Modal/context';
import AdminListPage from 'Components/AdminListPage';
import { VinistoHelperDllEnumsSpecificationSpecificationType } from 'vinisto_api_client/src/api-types/product-api/';
import { AdminTableVariants } from 'Components/AdminTable/interfaces';

import {
	FILTER_COLUMN_MAP,
	SORTING_COLUMN_MAP,
	SpecificationListTableKeys,
} from './constants';

const SpecificationsListPage = () => {
	const { useFormatMessage } = useContext(LocalizationContext);
	const modalContext = useContext(ModalContext);

	const t = useFormatMessage();
	const navigateWithNewtabOption = useNavigateWithNewtabOption();
	const getTableSchema = useTableSchema();
	const getLocalizedValue = useLocalizedValue();
	const { fetchData, handlers, state, dispatch, pageNumber, pageCount } =
		useAdminTable();

	const tableSchema: TableSchema = [
		{
			header: `${t({ id: 'admin.specificationDetail.name.label' })}`,
			id: SpecificationListTableKeys.NAME_DB_COLUMN,
			accessorFn: (row) => getLocalizedValue(get(row, 'name', [])),
		},
		{
			header: `${t({
				id: 'admin.specificationDetail.specificationType.label',
			})}`,
			id: SpecificationListTableKeys.SPECIFICATION_TYPE_DB_COLUMN,
			accessorKey: SpecificationListTableKeys.SPECIFICATION_TYPE_DB_COLUMN,
			meta: {
				filterType: AdminTableFilterType.DROPDOWN,
				dropDownFilterOptions: Object.entries(
					VinistoHelperDllEnumsSpecificationSpecificationType
				).map(([key, value]) => [key, value]),
			},
		},
		{
			header: `${t({ id: 'admin.specificationDetail.order.label' })}`,
			id: SpecificationListTableKeys.ORDER_DB_COLUMN,
			accessorKey: SpecificationListTableKeys.ORDER_DB_COLUMN,
			enableColumnFilter: false,
		},
		{
			header: `${t({ id: 'admin.specificationDetail.orderDetail.label' })}`,
			id: SpecificationListTableKeys.ORDER_DETAIL_DB_COLUMN,
			accessorKey: SpecificationListTableKeys.ORDER_DETAIL_DB_COLUMN,
			enableColumnFilter: false,
		},
		{
			header: `${t({ id: 'admin.specificationDetail.isHidden.label' })}`,
			accessorKey: SpecificationListTableKeys.IS_HIDDEN_DB_COLUMN,
			cell: (row) =>
				row.getValue() ? t({ id: 'admin.yes' }) : t({ id: 'admin.no' }),
			meta: {
				filterType: AdminTableFilterType.YES_NO,
			},
		},
		{
			header: `${t({ id: 'admin.specificationDetail.isDetail.label' })}`,
			id: SpecificationListTableKeys.IS_DETAIL_DB_COLUMN,
			accessorKey: SpecificationListTableKeys.IS_DETAIL_DB_COLUMN,
			cell: (row) =>
				row.getValue() ? t({ id: 'admin.yes' }) : t({ id: 'admin.no' }),
			enableColumnFilter: false,
			enableSorting: false,
		},
	];

	const adminTableSchema = getTableSchema(tableSchema);

	const handleOnTableRowClick = (
		entity: IPageListTableRow,
		event: React.MouseEvent
	) => navigateWithNewtabOption(`/specification-detail/${entity.id}`, event);

	const handleOpenCreateModal = useCallback(() => {
		modalContext.handleOpenModal(CREATE_SPECIFICATION, {
			resetSpecificationList: () => dispatch({ type: PageListAction.reset }),
		});
	}, [modalContext.handleOpenModal, dispatch]);

	useEffect(() => {
		const apiParams: { key: string; value: any }[] = [
			{ key: 'Limit', value: state.limit },
			{ key: 'Offset', value: state.offset },
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
			'product-api/admin/specifications',
			apiParams,
			(payload) => get(payload, 'specifications', []) ?? [],
			'admin.specificationsList.loadingError',
			API_METHOD.GET
		);
	}, [fetchData, state]);

	return (
		<AdminListPage
			adminTableSchema={adminTableSchema}
			handleOpenCreateModal={handleOpenCreateModal}
			btnCreateLabel="admin.specificationsList.specificationCreate"
			handleOnTableRowClick={handleOnTableRowClick}
			handlers={handlers}
			state={state}
			pageCount={pageCount}
			pageNumber={pageNumber}
			adminTableVariant={AdminTableVariants.DYNAMIC_COLUMNS}
			columnOrder={[
				SpecificationListTableKeys.NAME_DB_COLUMN,
				SpecificationListTableKeys.SPECIFICATION_TYPE_DB_COLUMN,
				SpecificationListTableKeys.ORDER_DB_COLUMN,
				SpecificationListTableKeys.ORDER_DETAIL_DB_COLUMN,
				SpecificationListTableKeys.IS_HIDDEN_DB_COLUMN,
				SpecificationListTableKeys.IS_DETAIL_DB_COLUMN,
			]}
		/>
	);
};

export default SpecificationsListPage;
