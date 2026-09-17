import { useCallback, useContext, useEffect, useMemo } from 'react';
import useNavigateWithNewtabOption from 'Hooks/useNavigateWithNewtabOption';
import { IPageListTableRow } from 'Hooks/useAdminTable/interfaces';
import { TableSchema } from 'Hooks/useTableSchema/interfaces';
import { API_METHOD, PageListAction } from 'Hooks/useAdminTable/constants';
import { CREATE_SUPPLIER } from 'Components/Modal/constants';
import useAdminTable from 'Hooks/useAdminTable';
import useTableSchema from 'Hooks/useTableSchema';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { ModalContext } from 'Components/Modal/context';
import AdminListPage from 'Components/AdminListPage';
import Multiselect from 'Components/Multiselect';
import { useQuery } from '@tanstack/react-query';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { Button } from 'react-bootstrap';
import { AdminTableVariants } from 'Components/AdminTable/interfaces';
import { TablePopover } from 'vinisto_ui';

import {
	COUNTRY_DB_COLUMN,
	ID_DB_COLUMN,
	IS_SHIPPING_DB_COLUMN,
	NAME_WEB_DB_COLUMN,
	REG_NUMBER_DB_COLUMN,
	SORTING_COLUMN_MAP,
	TAX_NUMBER_DB_COLUMN,
} from './constants';

import supplierTagService from '@/supplier-service/tag';

const SupplierListPage = () => {
	const authenticationContext = useContext(AuthenticationContext);
	const { loginHash: userLoginHash } = authenticationContext.vinistoUser;
	const localizationContext = useContext(LocalizationContext);
	const modalContext = useContext(ModalContext);

	const t = localizationContext.useFormatMessage();
	const getLocalizedValue = useLocalizedValue();
	const navigateWithNewtabOption = useNavigateWithNewtabOption();
	const getTableSchema = useTableSchema();
	const { fetchData, handlers, state, dispatch, pageNumber, pageCount } =
		useAdminTable();

	const tableSchema: TableSchema = [
		{
			header: `${t({ id: 'admin.supplierDetail.identifier.label' })}`,
			id: ID_DB_COLUMN,
			accessorKey: ID_DB_COLUMN,
		},
		{
			header: `${t({ id: 'admin.supplierDetail.name.label' })}`,
			id: NAME_WEB_DB_COLUMN,
			accessorKey: NAME_WEB_DB_COLUMN,
			cell: ({ row }) => {
				if (row.original.internalSupplierNote) {
					const name = row.original.nameWeb;
					const note = row.original.internalSupplierNote;

					return (
						<TablePopover
							name={name ?? ''}
							note={note}
						/>
					);
				}

				return <div>{row.original.nameWeb}</div>;
			},
		},
		{
			header: `${t({ id: 'admin.supplierDetail.regNumber.label' })}`,
			id: REG_NUMBER_DB_COLUMN,
			accessorKey: REG_NUMBER_DB_COLUMN,
		},
		{
			header: `${t({ id: 'admin.supplierDetail.vatNumber.label' })}`,
			id: TAX_NUMBER_DB_COLUMN,
			accessorKey: TAX_NUMBER_DB_COLUMN,
		},
		{
			header: `${t({ id: 'admin.supplierDetail.countryCode.label' })}`,
			id: COUNTRY_DB_COLUMN,
			accessorKey: COUNTRY_DB_COLUMN,
			enableColumnFilter: false,
		},
		{
			header: `${t({ id: 'admin.supplierDetail.isShipping.label' })}`,
			id: IS_SHIPPING_DB_COLUMN,
			accessorKey: IS_SHIPPING_DB_COLUMN,
			enableColumnFilter: false,
			cell: (row) =>
				row.getValue()
					? `${t({ id: 'admin.yes' })}`
					: `${t({ id: 'admin.no' })}`,
		},
	];

	const adminTableSchema = getTableSchema(tableSchema);

	const handleOnTableRowClick = (
		entity: IPageListTableRow,
		event: React.MouseEvent
	) => navigateWithNewtabOption(`/supplier-detail/${entity.id}`, event);

	const handleOpenCreateModal = useCallback(() => {
		modalContext.handleOpenModal(CREATE_SUPPLIER, {
			resetSupplierList: () => dispatch({ type: PageListAction.reset }),
		});
	}, [modalContext, dispatch]);

	useEffect(() => {
		const apiParams: { key: string; value: any }[] = [
			{ key: 'limit', value: state.limit },
			{ key: 'offset', value: state.offset },
			{
				key: 'UserLoginHash',
				value: authenticationContext.vinistoUser?.loginHash,
			},
		];

		const sortByColumn = state.sorting[0];

		if (sortByColumn?.id) {
			apiParams.push({
				key: 'SortingColumn',
				value:
					SORTING_COLUMN_MAP[
						sortByColumn.id as keyof typeof SORTING_COLUMN_MAP
					],
			});
			apiParams.push({ key: 'IsSortingDescending', value: sortByColumn.desc });
		}

		state.filters?.forEach((filter) => {
			if (filter.id === NAME_WEB_DB_COLUMN) {
				apiParams.push({ key: 'SearchName', value: filter.value });
			} else if (filter.id === REG_NUMBER_DB_COLUMN) {
				apiParams.push({ key: 'SearchIco', value: filter.value });
			} else if (filter.id === IS_SHIPPING_DB_COLUMN) {
				apiParams.push({ key: 'SearchIsShipping', value: filter.value });
			} else if (filter.id === 'SearchSupplierTagIds') {
				if (!Array.isArray(filter?.value)) return;
				filter.value.forEach((value: string) => {
					apiParams.push({ key: filter.id, value });
				});
			}
		});

		fetchData(
			'supplier-api/suppliers',
			apiParams,
			(payload) => payload.suppliers ?? [],
			'admin.supplierList.loadingError',
			API_METHOD.GET
		);
	}, [fetchData, state, authenticationContext.vinistoUser]);

	const params = { userLoginHash, limit: 99 };
	const { data } = useQuery(['supplier-tags', params], () =>
		supplierTagService.getAll(params)
	);

	const initiallySelected = useMemo(() => {
		const activeSupplierTagIds =
			state.filters.find((filter) => filter.id === 'SearchSupplierTagIds')
				?.value || [];
		return Array.isArray(activeSupplierTagIds)
			? data?.supplierTags
					?.filter((tag) => activeSupplierTagIds?.includes(tag.id))
					.map((tag) => ({
						value: `${tag.id}`,
						label: getLocalizedValue(tag.name ?? []),
					}))
			: [];
	}, [data?.supplierTags, getLocalizedValue, state.filters]);

	return (
		<>
			<div className="d-flex px-3 py-2 justify-content-between align-items-end flex-grow-0 flex-column flex-md-row gap-2 gap-sm-0">
				<div className="flex-grow">
					<label>{t({ id: 'admin.supplier.searchByTags' })}</label>
					<Multiselect
						// Hack to enable on filter reset
						// TODO fix this with table reset callback (currently not exposed)
						key={initiallySelected?.toString()}
						initialSelected={initiallySelected}
						options={
							data?.supplierTags?.map((tag) => ({
								value: `${tag.id}`,
								label: getLocalizedValue(tag.name ?? []),
							})) ?? []
						}
						onSelectionChange={(selected) => {
							handlers.handleOnFiltersChange([
								...state.filters.filter((f) => f.id !== 'SearchSupplierTagIds'),
								{
									id: 'SearchSupplierTagIds',
									value: selected.map((s) => s.value),
								},
							]);
						}}
						maxWidth="auto"
					/>
				</div>
				<Button
					onClick={handleOpenCreateModal}
					className="mt-auto"
				>
					{t({ id: 'admin.supplierList.createSupplier' })}
				</Button>
			</div>

			<AdminListPage
				adminTableSchema={adminTableSchema}
				handleOnTableRowClick={handleOnTableRowClick}
				handlers={handlers}
				state={state}
				pageCount={pageCount}
				pageNumber={pageNumber}
				adminTableVariant={AdminTableVariants.DYNAMIC_COLUMNS}
				columnOrder={[
					ID_DB_COLUMN,
					NAME_WEB_DB_COLUMN,
					REG_NUMBER_DB_COLUMN,
					TAX_NUMBER_DB_COLUMN,
					COUNTRY_DB_COLUMN,
					IS_SHIPPING_DB_COLUMN,
				]}
				defaultColumnsExcluded={[ID_DB_COLUMN]}
			/>
		</>
	);
};

export default SupplierListPage;
