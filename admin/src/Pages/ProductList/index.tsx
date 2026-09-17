import { useCallback, useContext, useEffect } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import AdminListPage from 'Components/AdminListPage';
import { ModalContext } from 'Components/Modal/context';
import { CREATE_PRODUCT } from 'Components/Modal/constants';
import { AdminTableFilterType } from 'Components/AdminTable/constants';
import useNavigateWithNewtabOption from 'Hooks/useNavigateWithNewtabOption';
import useAdminTable from 'Hooks/useAdminTable';
import useTableSchema from 'Hooks/useTableSchema';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { TableSchema } from 'Hooks/useTableSchema/interfaces';
import { IPageListTableRow } from 'Hooks/useAdminTable/interfaces';
import { API_METHOD, PageListAction } from 'Hooks/useAdminTable/constants';

import { ProductListTableRow } from './interfaces';
import ProductTagList from './ProductTagList';
import {
	FILTER_COLUMN_MAP,
	ProductListTableKeys,
	SORTING_COLUMN_MAP,
} from './constants';
import useProductBatchActions from './useProductBatchActions';

import { productAdapter } from '@/index';

const ProductListPage = () => {
	const modalContext = useContext(ModalContext);
	const { useFormatMessage } = useContext(LocalizationContext);

	const t = useFormatMessage();
	const navigateWithNewtabOption = useNavigateWithNewtabOption();
	const getTableSchema = useTableSchema<ProductListTableRow>();
	const getLocalizedValue = useLocalizedValue();
	const { fetchData, handlers, state, dispatch, pageNumber, pageCount } =
		useAdminTable<ProductListTableRow>();

	const tableSchema: TableSchema<ProductListTableRow> = [
		{
			header: `${t({ id: 'admin.productDetail.warehouseId.label' })}`,
			id: ProductListTableKeys.WAREHOUSE_ID_COLUMN,
			accessorKey: ProductListTableKeys.WAREHOUSE_ID_COLUMN,
		},
		{
			header: `${t({ id: 'admin.productDetail.EAN.label' })}`,
			id: ProductListTableKeys.EAN_COLUMN,
			accessorKey: ProductListTableKeys.EAN_COLUMN,
			enableSorting: false,
		},
		{
			header: `${t({ id: 'admin.productDetail.name.label' })}`,
			id: ProductListTableKeys.NAME_COLUMN,
			accessorFn: (row) => getLocalizedValue(row.name ?? []),
		},
		{
			header: `${t({ id: 'admin.productDetail.tags.label' })}`,
			accessorKey: ProductListTableKeys.TAGS_COLUMN,
			cell: (row) => (
				<ProductTagList tags={row.row.original.tagsDetail ?? []} />
			),
			enableSorting: false,
			enableColumnFilter: false,
		},
		{
			header: `${t({ id: 'admin.productDetail.standardPrice.label' })}`,
			accessorKey: ProductListTableKeys.PRICE_COLUMN,
			accessorFn: (row) => {
				const { productPrices } = productAdapter.fromApi(row);

				if (!productPrices.basePrice || !productPrices.basePrice.currency)
					return '';

				return `${productPrices.basePrice.valueWithVat} ${t({
					id: productPrices.basePrice.currency,
				})}`;
			},
			enableSorting: false,
			enableColumnFilter: false,
		},
		{
			header: `${t({ id: 'admin.productDetail.isEnabled.label' })}`,
			id: ProductListTableKeys.IS_ENABLED_COLUMN,
			accessorKey: 'isEnabled',
			cell: (row) => (
				<div className="icon-center">
					{row.getValue() ? t({ id: 'admin.yes' }) : t({ id: 'admin.no' })}
				</div>
			),
			meta: {
				filterType: AdminTableFilterType.YES_NO,
			},
		},
		{
			header: `${t({ id: 'admin.productDetail.isDeleted.label' })}`,
			id: ProductListTableKeys.IS_DELETED_COLUMN,
			accessorKey: 'isDeleted',
			cell: (row) => (
				<div className="icon-center">
					{row.getValue() ? t({ id: 'admin.yes' }) : t({ id: 'admin.no' })}
				</div>
			),
			meta: {
				filterType: AdminTableFilterType.YES_NO,
			},
		},
	];

	const adminTableSchema = getTableSchema(tableSchema);

	const handleOnTableRowClick = (
		entity: IPageListTableRow,
		event: React.MouseEvent
	) => navigateWithNewtabOption(`/product-detail/${entity.id}`, event);

	const handleOpenCreateModal = useCallback(() => {
		modalContext.handleOpenModal(CREATE_PRODUCT, {
			resetProductList: () => dispatch({ type: PageListAction.reset }),
		});
	}, [modalContext, dispatch]);

	useEffect(() => {
		const apiParams: { key: string; value: any }[] = [
			{ key: 'limit', value: state.limit },
			{ key: 'offset', value: state.offset },
			{ key: 'IncludeDeleted', value: true },
			{ key: 'IncludeDisabled', value: true },
		];

		const [sortByColumn] = state.sorting;

		if (SORTING_COLUMN_MAP[sortByColumn?.id] !== undefined) {
			apiParams.push({
				key: 'SortingColumn',
				value: SORTING_COLUMN_MAP[sortByColumn.id],
			});
			apiParams.push({ key: 'IsSortingDescending', value: sortByColumn.desc });
		}

		state.filters?.forEach((filter) => {
			if (FILTER_COLUMN_MAP[filter.id] !== undefined) {
				apiParams.push({
					key: FILTER_COLUMN_MAP[filter.id],
					value: filter.value,
				});
			}
		});

		fetchData(
			'product-api/products',
			apiParams,
			(payload) => payload.products ?? [],
			'admin.productList.loadingError',
			API_METHOD.GET
		);
	}, [fetchData, state]);

	const batchActions = useProductBatchActions(state, dispatch);

	return (
		<AdminListPage<ProductListTableRow>
			adminTableSchema={adminTableSchema}
			batchActions={batchActions}
			handleOpenCreateModal={handleOpenCreateModal}
			btnCreateLabel="admin.productList.productCreate"
			handleOnTableRowClick={handleOnTableRowClick}
			handlers={handlers}
			state={state}
			pageCount={pageCount}
			pageNumber={pageNumber}
		/>
	);
};

export default ProductListPage;
