import { useCallback, useContext, useEffect } from 'react';
import { get, head } from 'Helpers/lodash';
import Config from 'Config';
import { TableSchema } from 'Hooks/useTableSchema/interfaces';
import { VinistoHelperDllEnumsLanguage } from 'vinisto_api_client/src/api-types/product-api/';
import { CategoryType } from 'Services/Category/interfaces';
import { CATEGORY } from 'Components/Modal/constants';
import { API_METHOD, PageListAction } from 'Hooks/useAdminTable/constants';
import { LANGUAGE_CODE_MAP } from 'Services/ApiService/constants';
import { CATEGORY_API_ENDPOINT } from 'Services/Category/constants';
import useNavigateWithNewtabOption from 'Hooks/useNavigateWithNewtabOption';
import useAdminTable from 'Hooks/useAdminTable';
import useTableSchema from 'Hooks/useTableSchema';
import CategoryService from 'Services/Category';
import { RefetchEvent, refetchEventEmitter } from 'Services/RefetchService';
import { ModalContext } from 'Components/Modal/context';
import { LocalizationContext } from 'Services/LocalizationService';
import AdminListPage from 'Components/AdminListPage';
import { AdminTableVariants } from 'Components/AdminTable/interfaces';

import {
	ALLOWED_SEARCH_COUNTRIES,
	NAME_DB_COLUMN,
	SORTING_COLUMN_MAP,
	TRANSLATION,
	URL_DB_COLUMN,
} from './constants';
import { CategoryTableRow } from './interfaces';

const CategoryListPage = () => {
	const { useFormatMessage, activeLanguageKey } =
		useContext(LocalizationContext);
	const activeLanguage = activeLanguageKey as VinistoHelperDllEnumsLanguage;
	const modalContext = useContext(ModalContext);

	const t = useFormatMessage();
	const navigateWithNewtabOption = useNavigateWithNewtabOption();
	const getTableSchema = useTableSchema<CategoryTableRow>();
	const { fetchData, handlers, state, dispatch, pageNumber, pageCount } =
		useAdminTable<CategoryTableRow>();

	const tableSchema: TableSchema<CategoryTableRow> = [
		{
			header: `${t({ id: 'admin.categoryDetail.name.label' })}`,
			id: NAME_DB_COLUMN,
			accessorFn: (row) => row.translations[activeLanguage]?.name,
		},
		{
			header: `${t({ id: 'admin.categoryDetail.url.label' })}`,
			id: URL_DB_COLUMN,
			cell: ({ row }) => {
				return (
					<a
						href={`${Config.eshopUrl}${t({
							id: 'eshop.routes.category.route',
						})}/${row.original.translations[activeLanguage].url}`}
					>
						{row.original.translations[activeLanguage].url}
					</a>
				);
			},
		},
		{
			header: `${t({ id: 'admin.categoryDetail.translations.label' })}`,
			id: TRANSLATION,
			accessorFn: (row) =>
				Object.keys(row.translations)
					.map(
						(language) =>
							LANGUAGE_CODE_MAP[language as VinistoHelperDllEnumsLanguage] ??
							null
					)
					.filter((description) => description)
					.join(', '),
			enableColumnFilter: false,
			enableSorting: false,
		},
		{
			header: `${t({
				id: 'admin.categoryDetail.allowedSearchCountries.label',
			})}`,
			id: ALLOWED_SEARCH_COUNTRIES,
			accessorFn: (row) => Object.values(row.allowedSearchCountries).join(', '),
			enableColumnFilter: false,
			enableSorting: false,
		},
	];

	const adminTableSchema = getTableSchema(tableSchema);

	const handleOnTableRowClick = (
		entity: CategoryTableRow,
		event: React.MouseEvent
	) => navigateWithNewtabOption(`/category-detail/${entity.id}`, event);

	const handleOpenCreateModal = useCallback(() => {
		modalContext.handleOpenModal(CATEGORY, {
			resetCategoryList: () => dispatch({ type: PageListAction.reset }),
		});
	}, [modalContext, dispatch]);

	useEffect(() => {
		const apiParams: { key: string; value: any }[] = [
			{ key: 'limit', value: state.limit },
			{ key: 'offset', value: state.offset },
		];
		const sortByColumn = head(state.sorting);
		if (sortByColumn?.id) {
			apiParams.push({
				key: 'SortingColumn',
				value: get(SORTING_COLUMN_MAP, `[${sortByColumn.id}]`),
			});
			apiParams.push({ key: 'IsSortingDescending', value: sortByColumn.desc });
		}
		state.filters?.forEach((filter) => {
			if (filter.id === URL_DB_COLUMN) {
				apiParams.push({ key: 'SearchUrl', value: filter.value });
			} else if (filter.id === NAME_DB_COLUMN) {
				apiParams.push({ key: 'SearchName', value: filter.value });
			}
		});

		const fetch = () => {
			fetchData(
				CATEGORY_API_ENDPOINT,
				apiParams,
				(payload) =>
					Array.isArray(payload.categories)
						? payload.categories
								.map(CategoryService.mapApiToEntity)
								.filter(
									(category): category is CategoryType =>
										typeof category !== 'undefined'
								)
						: [],
				'admin.categoryList.loadingError',
				API_METHOD.GET
			);
		};

		fetch();
		return refetchEventEmitter.onEvent(RefetchEvent.CATEGORY, fetch);
	}, [fetchData, state]);

	return (
		<AdminListPage<CategoryTableRow>
			adminTableSchema={adminTableSchema}
			handleOpenCreateModal={handleOpenCreateModal}
			btnCreateLabel="admin.categoryList.categoryCreate"
			handleOnTableRowClick={handleOnTableRowClick}
			handlers={handlers}
			state={state}
			pageCount={pageCount}
			pageNumber={pageNumber}
			adminTableVariant={AdminTableVariants.DYNAMIC_COLUMNS}
			columnOrder={[NAME_DB_COLUMN, URL_DB_COLUMN, TRANSLATION]}
		/>
	);
};

export default CategoryListPage;
