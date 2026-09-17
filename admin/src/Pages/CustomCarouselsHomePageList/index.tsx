import { useCallback, useContext, useEffect } from 'react';
import { get } from 'Helpers/lodash';
import useNavigateWithNewtabOption from 'Hooks/useNavigateWithNewtabOption';
import { IPageListTableRow } from 'Hooks/useAdminTable/interfaces';
import { TableSchema } from 'Hooks/useTableSchema/interfaces';
import { API_METHOD, PageListAction } from 'Hooks/useAdminTable/constants';
import useAdminTable from 'Hooks/useAdminTable';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import useTableSchema from 'Hooks/useTableSchema';
import { LocalizationContext } from 'Services/LocalizationService';
import AdminListPage from 'Components/AdminListPage';
import { CREATE_HOMEPAGE_CUSTOM_CAROUSEL } from 'Components/Modal/constants';
import { ModalContext } from 'Components/Modal/context';
import { AdminTableVariants } from 'Components/AdminTable/interfaces';
import { platformIdLabelMap } from 'Pages/OrderList/constants';
import { AdminTableFilterType } from 'Components/AdminTable/constants';
import { IntegrationContext } from 'Services/IntergationService';

import {
	FILTER_COLUMN_MAP,
	HPCarouselListTableKeys,
	SORTING_COLUMN_MAP,
} from './constants';

import { PlatformIdType } from '@/shared';

const CustomCarouselsHomePageList = () => {
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
			header: `${t({ id: 'admin.customCarouselsHomePageList.name.label' })}`,
			id: HPCarouselListTableKeys.NAME_DB_COLUMN,
			accessorFn: (row) => getLocalizedValue(get(row, 'name', [])),
			enableColumnFilter: true,
			enableSorting: true,
		},
		{
			accessorKey: HPCarouselListTableKeys.AVAILABLE_ON_PLATFORMS_COLUMN,
			accessorFn: (row) =>
				typeof row.availableOnPlatform === 'number'
					? platformIdLabelMap[row.availableOnPlatform as PlatformIdType]
					: null,
			header: `${t({ id: 'platform' })}`,
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
			header: `${t({
				id: 'admin.customCarouselsHomePageList.sequenceNumber.label',
			})}`,
			id: HPCarouselListTableKeys.ORDER_DB_COLUMN,
			accessorKey: 'sequenceNumber',
			enableColumnFilter: false,
			enableSorting: true,
		},
		{
			header: `${t({
				id: 'admin.customCarouselsHomePageList.isActive.label',
			})}`,
			id: HPCarouselListTableKeys.IS_ENABLED_DB_COLUMN,
			accessorKey: 'isEnabled',
			enableColumnFilter: false,
			enableSorting: false,
			cell: (row) =>
				row.getValue() ? t({ id: 'admin.yes' }) : t({ id: 'admin.no' }),
		},
	];

	const adminTableSchema = getTableSchema(tableSchema);

	const handleOnTableRowClick = (
		entity: IPageListTableRow,
		event: React.MouseEvent
	) =>
		navigateWithNewtabOption(
			`/custom-carousels-homepage-detail/${entity.id}`,
			event
		);

	const handleOpenCreateModal = useCallback(() => {
		modalContext.handleOpenModal(CREATE_HOMEPAGE_CUSTOM_CAROUSEL, {
			resetCustomCarouselsList: () => dispatch({ type: PageListAction.reset }),
		});
	}, [modalContext, dispatch]);

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
			`product-api/admin/homepage-custom-carousels/`,
			apiParams,
			(payload) => get(payload, 'homepageCustomCarousels', []) ?? [],
			'admin.customCarouselsHomePageList.loadingError',
			API_METHOD.GET
		);
	}, [fetchData, state]);

	return (
		<AdminListPage
			adminTableSchema={adminTableSchema}
			handleOpenCreateModal={handleOpenCreateModal}
			btnCreateLabel="admin.customCarouselsHomePage.addCarousel"
			handleOnTableRowClick={handleOnTableRowClick}
			handlers={handlers}
			state={state}
			pageCount={pageCount}
			pageNumber={pageNumber}
			adminTableVariant={AdminTableVariants.DYNAMIC_COLUMNS}
			columnOrder={[
				HPCarouselListTableKeys.NAME_DB_COLUMN,
				HPCarouselListTableKeys.AVAILABLE_ON_PLATFORMS_COLUMN,
				HPCarouselListTableKeys.ORDER_DB_COLUMN,
				HPCarouselListTableKeys.IS_ENABLED_DB_COLUMN,
			]}
		/>
	);
};

export default CustomCarouselsHomePageList;
