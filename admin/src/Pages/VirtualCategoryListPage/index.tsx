import { useCallback, useContext, useMemo } from 'react';
import useAdminTable from 'Hooks/useAdminTable';
import { LocalizationContext } from 'Services/LocalizationService';
import { NumberParam, useQueryParams, withDefault } from 'Helpers/query-params';
import { useMutation, useQuery } from '@tanstack/react-query';
import { TableSchema } from 'Hooks/useTableSchema/interfaces';
import AdminListPage from 'Components/AdminListPage';
import { AdminTableVariants } from 'Components/AdminTable/interfaces';
import { ModalContext } from 'Components/Modal/context';
import { CREATE_EDIT_VIRTUAL_CATEGORY } from 'Components/Modal/constants';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { modes } from 'Components/Modal/Components/CreateEditVirtualCategory/constants';
import { Button } from 'react-bootstrap';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { confirmAlert } from 'react-confirm-alert';
import { AdminTableFilterType } from 'Components/AdminTable/constants';

import api from '@/api';
import {
	VinistoHelperDllEnumsVirtualCategoryState,
	VinistoProductDllModelsApiVirtualCategoryVirtualCategoriesReturn,
} from '@/api-types/product-api';

const VirtualCategoryListPage = () => {
	const { loginHash: userLoginHash } = useContext(
		AuthenticationContext
	).vinistoUser;
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const getActiveLanguageValue = useLocalizedValue();
	const { handleOpenModal } = useContext(ModalContext);
	const { handleShowSuccessNotification, handleShowErrorNotification } =
		useContext(NotificationsContext);

	const { handlers, state } = useAdminTable();

	const DEFAULT_ITEMS_PER_PAGE = 25;

	const [query, setQuery] = useQueryParams({
		Limit: withDefault(NumberParam, DEFAULT_ITEMS_PER_PAGE),
		Offset: withDefault(NumberParam, 0),
	});

	const filtersToSearchParamsMap = {
		url: 'SearchUrl',
		group: 'SearchGroup',
		titleH1: 'SearchTitleH1',
		state: 'SearchState',
		language: 'Language',
	};

	const filtersToParamsMap = Object.fromEntries(
		state.filters.map((filter) => [
			filtersToSearchParamsMap[
				filter.id as keyof typeof filtersToSearchParamsMap
			] ?? filter.id,
			filter.value,
		]) ?? []
	);

	const sortingToParamsMap =
		state.sorting.map((sorting) => ({
			SortingColumn: sorting.id,
			IsSortingDescending: sorting.desc,
		}))[0] ?? {};

	const virtualCategoryListQuery =
		useQuery<VinistoProductDllModelsApiVirtualCategoryVirtualCategoriesReturn>({
			queryKey: [
				'virtual-categories',
				{ ...query, ...filtersToParamsMap, ...sortingToParamsMap },
			],
			queryFn: () =>
				api.get(`product-api/virtual-categories`, {
					...query,
					...filtersToParamsMap,
					...sortingToParamsMap,
				}),
		});

	const pageCount = Math.ceil(
		(virtualCategoryListQuery.data?.count ?? 0) /
			(query.Limit ?? DEFAULT_ITEMS_PER_PAGE)
	);
	const pageNumber = query.Offset / query.Limit + 1;

	const switchVirtualCategoryState = (virtualCategoryId: string) =>
		api.patch(
			`product-api/virtual-categories/${virtualCategoryId}/switch-state`,
			{ userLoginHash }
		);

	const switchVirtualCategoryStateMutation = useMutation({
		mutationFn: switchVirtualCategoryState,
		onSuccess: () => {
			handleShowSuccessNotification(
				'admin.virtualCategory.switchState.successMessage'
			);
			virtualCategoryListQuery.refetch();
		},
		onError: () => {
			handleShowErrorNotification(
				'admin.virtualCategory.switchState.errorMessage'
			);
		},
	});

	const deleteVirtualCategory = (virtualCategoryId: string) =>
		api.delete(`product-api/virtual-categories/${virtualCategoryId}`, {
			userLoginHash,
		});

	const deleteVirtualCategoryStateMutation = useMutation({
		mutationFn: deleteVirtualCategory,
		onSuccess: () => {
			handleShowSuccessNotification(
				'admin.virtualCategory.delete.successMessage'
			);
			virtualCategoryListQuery.refetch();
		},
		onError: () => {
			handleShowErrorNotification('admin.virtualCategory.delete.errorMessage');
		},
	});

	const handleOnClickDeleteButton = useCallback(
		(virtualCategoryId: string, titleH1: string) => {
			confirmAlert({
				title: `${t({
					id: 'admin.virtualCategory.delete.confirmTitle',
				})}`,
				message: `${t(
					{
						id: 'admin.virtualCategory.delete.confirmMessage',
					},
					{ h1: titleH1 }
				)}`,
				buttons: [
					{
						label: `${t({
							id: 'admin.yes',
						})}`,
						onClick: () => {
							deleteVirtualCategoryStateMutation.mutate(virtualCategoryId);
						},
					},
					{
						label: `${t({
							id: 'admin.no',
						})}`,
						onClick: () => null,
					},
				],
			});
		},
		[deleteVirtualCategoryStateMutation, t]
	);

	const tableSchema: TableSchema = [
		{
			id: 'id',
			accessorFn: (row) => row.id,
			header: `${t({ id: 'admin.virtualCategory.id.label' })}`,
			enableColumnFilter: false,
		},
		{
			id: 'group',
			accessorFn: (row) => row.group,
			header: `${t({ id: 'admin.virtualCategory.group.label' })}`,
		},
		{
			id: 'url',
			accessorFn: (row) => row.url,
			header: `${t({ id: 'admin.virtualCategory.url.label' })}`,
		},
		{
			id: 'titleH1',
			accessorFn: (row) => getActiveLanguageValue(row.titleH1),
			header: `${t({ id: 'admin.virtualCategory.titleH1.label' })}`,
			enableSorting: false,
		},
		{
			id: 'seoTitle',
			accessorFn: (row) => getActiveLanguageValue(row.seoTitle),
			header: `${t({ id: 'admin.virtualCategory.seoTitle.label' })}`,
			enableColumnFilter: false,
			enableSorting: false,
		},
		{
			id: 'seoDescription',
			accessorFn: (row) => getActiveLanguageValue(row.seoDescription),
			header: `${t({ id: 'admin.virtualCategory.seoDescription.label' })}`,
			enableColumnFilter: false,
			enableSorting: false,
		},
		{
			id: 'contentHtml',
			accessorFn: (row) => getActiveLanguageValue(row.contentHtml),
			header: `${t({ id: 'admin.virtualCategory.contentHtml.label' })}`,
			enableColumnFilter: false,
			enableSorting: false,
		},
		{
			id: 'state',
			accessorFn: (row) =>
				`${t({
					id:
						row.state === VinistoHelperDllEnumsVirtualCategoryState.PUBLISHED
							? 'admin.virtualCategory.state.published'
							: 'admin.virtualCategory.state.draft',
				})}`,
			header: `${t({ id: 'admin.virtualCategory.state.label' })}`,
			meta: {
				filterType: AdminTableFilterType.DROPDOWN,
				dropDownFilterOptions:
					Object.values(VinistoHelperDllEnumsVirtualCategoryState).map(
						(key) => [
							key,
							`${t({
								id: `admin.virtualCategory.state.${key.toLowerCase()}`,
							})}`,
						]
					) ?? [],
			},
		},
		{
			id: 'actions',
			header: `akce`,
			cell: ({ row }) => (
				<div className="d-flex gap-1 flex-column">
					<Button
						{...(row.original.state ===
						VinistoHelperDllEnumsVirtualCategoryState.PUBLISHED
							? { variant: 'outline-primary' }
							: {})}
						style={{ width: 'fit-content' }}
						size="sm"
						onMouseDown={(e) => e.stopPropagation()}
						onMouseUp={(e) => e.stopPropagation()}
						onClick={(e) => {
							e.stopPropagation();
							switchVirtualCategoryStateMutation.mutate(row.original.id);
						}}
						disabled={switchVirtualCategoryStateMutation.isLoading}
					>
						{t({
							id:
								row.original.state ===
								VinistoHelperDllEnumsVirtualCategoryState.PUBLISHED
									? 'admin.virtualCategory.draft.label'
									: 'admin.virtualCategory.publish.label',
						})}
					</Button>
					<Button
						variant="outline-primary"
						style={{ width: 'fit-content' }}
						size="sm"
						onMouseDown={(e) => e.stopPropagation()}
						onMouseUp={(e) => e.stopPropagation()}
						onClick={(e) => {
							e.stopPropagation();
							handleOnClickDeleteButton(
								row.original.id,
								getActiveLanguageValue(row.original.titleH1)
							);
						}}
						disabled={deleteVirtualCategoryStateMutation.isLoading}
					>
						{t({ id: 'admin.virtualCategory.delete.label' })}
					</Button>
				</div>
			),
			enableColumnFilter: false,
			enableSorting: false,
		},
	];

	const adaptedState = useMemo(() => {
		return {
			...state,
			loading: virtualCategoryListQuery.isLoading,
			loaded: virtualCategoryListQuery.isSuccess,
			count: virtualCategoryListQuery.data?.count ?? 0,
			pageNumber: pageNumber,
			pageCount: pageCount,
			limit: query.Limit ?? DEFAULT_ITEMS_PER_PAGE,
			data: virtualCategoryListQuery.data?.virtualCategories ?? [],
		};
	}, [
		pageCount,
		pageNumber,
		query.Limit,
		state,
		virtualCategoryListQuery.data?.count,
		virtualCategoryListQuery.data?.virtualCategories,
		virtualCategoryListQuery.isLoading,
		virtualCategoryListQuery.isSuccess,
	]);

	const adaptedHandlers = {
		handleOnSortingChange: handlers.handleOnSortingChange,
		handleOnFiltersChange: handlers.handleOnFiltersChange,
		handleOnPageChange: (selectedPage: number) => {
			setQuery((prev) => ({
				...prev,
				Offset: (query.Limit ?? DEFAULT_ITEMS_PER_PAGE) * (selectedPage - 1),
			}));
		},
		handleOnPageSizeChange: (selectedLimit: number) => {
			setQuery((prev) => ({
				...prev,
				Limit: selectedLimit,
				Offset: 0,
			}));
		},
		handleOnRowSelectionChange: handlers.handleOnRowSelectionChange,
		handleOnToggleSelectAllRows: handlers.handleOnToggleSelectAllRows,
	};

	const handleOnTableRowClick = (entity: any) => {
		handleOpenModal(CREATE_EDIT_VIRTUAL_CATEGORY, {
			mode: modes.EDIT,
			entity,
			refetch: virtualCategoryListQuery.refetch,
		});
	};

	const handleOpenCreateModal = useCallback(() => {
		handleOpenModal(CREATE_EDIT_VIRTUAL_CATEGORY, {
			mode: modes.CREATE,
			refetch: virtualCategoryListQuery.refetch,
		});
	}, [handleOpenModal, virtualCategoryListQuery.refetch]);

	return (
		<AdminListPage
			adminTableSchema={tableSchema}
			handleOnTableRowClick={handleOnTableRowClick}
			handleOpenCreateModal={handleOpenCreateModal}
			btnCreateLabel="admin.virtualCategory.create.label"
			handlers={{ ...adaptedHandlers }}
			state={adaptedState}
			pageCount={pageCount}
			pageNumber={pageNumber}
			adminTableVariant={AdminTableVariants.DYNAMIC_COLUMNS}
			defaultColumnsExcluded={['id']}
			columnOrder={[
				'id',
				'group',
				'url',
				'titleH1',
				'seoTitle',
				'seoDescription',
				'contentHtml',
				'state',
			]}
		/>
	);
};

export default VirtualCategoryListPage;
