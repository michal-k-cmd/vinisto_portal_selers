import { useCallback, useContext, useEffect } from 'react';
import { dayjsInstance as dayjs } from 'Services/Date';
import { Button } from 'react-bootstrap';
import { FaCalendar } from 'react-icons/fa';
import { GrClose } from 'react-icons/gr';
import { TableSchema } from 'Hooks/useTableSchema/interfaces';
import { AdminTableFilterType } from 'Components/AdminTable/constants';
import { BANNER, EDIT_BANNER_VALIDITY } from 'Components/Modal/constants';
import { API_METHOD, PageListAction } from 'Hooks/useAdminTable/constants';
import {
	LIST_API_ENDPOINT,
	POSITION,
	POSITION_LOCALIZATION_MAP,
	POSITION_VALUES_MAP,
} from 'Services/Banner/constants';
import BannerService from 'Services/Banner';
import useAdminTable from 'Hooks/useAdminTable';
import useBanner from 'Hooks/useBanner';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import useTableSchema from 'Hooks/useTableSchema';
import { ModalContext } from 'Components/Modal/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import AdminListPage from 'Components/AdminListPage';
import { platformIdLabelMap } from 'Pages/OrderList/constants';
import { IntegrationContext } from 'Services/IntergationService';

import {
	ACTIVE_COLUMN,
	AVAILABLE_ON_PLATFORMS_COLUMN,
	FILTER_COLUMN_MAP,
	ORDER_COLUMN,
	POSITION_COLUMN,
	SORTING_COLUMN_MAP,
	TITLE_COLUMN,
	VALID_FROM_COLUMN,
	VALID_TO_COLUMN,
} from './constants';
import { BannerListTableRow } from './interfaces';

import { PlatformIdType } from '@/shared';

/**
 * @category Component Banner List Page
 */
const BannerListPage = () => {
	const localizationContext = useContext(LocalizationContext);
	const authenticationContext = useContext(AuthenticationContext);
	const notificationsContext = useContext(NotificationsContext);
	const modalContext = useContext(ModalContext);
	const { integrations } = useContext(IntegrationContext);

	const t = localizationContext.useFormatMessage();
	const getLocalizedValue = useLocalizedValue();
	const getTableSchema = useTableSchema<BannerListTableRow>();
	const { fetchData, handlers, state, dispatch, pageNumber, pageCount } =
		useAdminTable<BannerListTableRow>();
	const { removeWithConfirmation } = useBanner();

	const handleOnDelete = (bannerId: string) => () => {
		removeWithConfirmation(bannerId, () => {
			dispatch({ type: PageListAction.setShouldReload, value: true });
		});
	};

	const handleOnEdit = (banner: BannerListTableRow) => () => {
		modalContext.handleOpenModal(BANNER, {
			banner,
			imageObject: banner.imageObject,
			resetList: () =>
				dispatch({ type: PageListAction.setShouldReload, value: true }),
		});
	};

	const handleOpenCreateModal = useCallback(() => {
		modalContext.handleOpenModal(BANNER, {
			resetList: () =>
				dispatch({ type: PageListAction.setShouldReload, value: true }),
		});
	}, [modalContext.handleOpenModal, dispatch]);

	const tableSchema: TableSchema<BannerListTableRow> = [
		{
			accessorKey: TITLE_COLUMN,
			header: `${t({ id: 'admin.banner.title.label' })}`,
		},
		{
			accessorKey: AVAILABLE_ON_PLATFORMS_COLUMN,
			accessorFn: (row) =>
				row.availableOnPlatforms
					?.map((platform) => platformIdLabelMap[platform as PlatformIdType])
					.join(', '),
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
			id: VALID_FROM_COLUMN,
			header: `${t({ id: 'admin.banner.validFrom.label' })}`,
			accessorFn: (row) => {
				return dayjs(row.validFrom).format(`${t({ id: 'admin.dateFormat' })}`);
			},
			meta: {
				filterType: AdminTableFilterType.DATE,
			},
		},
		{
			id: VALID_TO_COLUMN,
			header: `${t({ id: 'admin.banner.validTo.label' })}`,
			accessorFn: (row) => {
				return dayjs(row.validTo).format(`${t({ id: 'admin.dateFormat' })}`);
			},
			meta: {
				filterType: AdminTableFilterType.DATE,
			},
		},
		{
			id: POSITION_COLUMN,
			header: `${t({ id: 'admin.banner.position.label' })}`,
			accessorFn: (row) => t({ id: POSITION_LOCALIZATION_MAP[row.position] }),
			meta: {
				filterType: AdminTableFilterType.DROPDOWN,
				dropDownFilterOptions: Object.values(POSITION).map((key) => [
					POSITION_VALUES_MAP[key],
					`${t({ id: POSITION_LOCALIZATION_MAP[key] })}`,
				]),
			},
		},
		{
			accessorKey: ORDER_COLUMN,
			header: `${t({ id: 'admin.banner.order.label' })}`,
			enableColumnFilter: false,
		},
		{
			id: ACTIVE_COLUMN,
			header: `${t({ id: 'admin.banner.active.label' })}`,
			enableColumnFilter: false,
			cell: (entity) => {
				const now = dayjs();
				const validFrom = dayjs(entity.row.original.validFrom);
				const validTo = dayjs(entity.row.original.validTo);
				const isActive = now.isBetween(validFrom, validTo, undefined, '[]');

				return (
					<div className="icon-center">
						{isActive ? t({ id: 'admin.yes' }) : t({ id: 'admin.no' })}
					</div>
				);
			},
		},
		{
			header: '',
			id: 'placeholder',
			cell: (entity) => (
				<div className="d-flex gap-2 text-end flex-nowrap">
					<Button onClick={handleOnEdit(entity.row.original)}>
						{t({ id: 'admin.bannerList.edit' })}
					</Button>
					<Button onClick={handleOnDelete(entity.row.id)}>
						{t({ id: 'admin.bannerList.delete' })}
					</Button>
				</div>
			),
		},
	];

	const adminTableSchema = getTableSchema(tableSchema);

	const handleBatchDelete = async () => {
		const selectedIds = Object.keys(state.selection).filter(
			(key) => state.selection[key]
		);

		const deletePromises = selectedIds.map((id) =>
			BannerService.remove(id, authenticationContext.vinistoUser.loginHash)
		);

		Promise.all(deletePromises)
			.then(() => {
				dispatch({ type: PageListAction.setShouldReload, value: true });
				notificationsContext.handleShowSuccessNotification(
					'admin.bannerList.batchDeleteSuccess'
				);
			})
			.catch(() => {
				notificationsContext.handleShowErrorNotification(
					'admin.bannerList.batchDeleteError'
				);
			});
	};

	const handleBatchEditValidTo = () => {
		const selectedIds = Object.keys(state.selection).filter(
			(key) => state.selection[key]
		);

		modalContext.handleOpenModal(EDIT_BANNER_VALIDITY, {
			selectedIds,
			state,
			dispatch,
		});
	};

	const batchActions = [
		{
			title: 'admin.bannerList.batchDelete',
			onClick: handleBatchDelete,
			ico: <GrClose />,
		},
		{
			title: 'admin.bannerList.batchEditValidity',
			onClick: handleBatchEditValidTo,
			ico: <FaCalendar />,
		},
	];

	useEffect(() => {
		const apiParams: { key: string; value: any }[] = [
			{ key: 'Limit', value: state.limit },
			{ key: 'Offset', value: state.offset },
			{
				key: 'UserLoginHash',
				value: authenticationContext.vinistoUser?.loginHash,
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
			LIST_API_ENDPOINT,
			apiParams,
			(payload) =>
				Array.isArray(payload?.sliderCarousels)
					? payload.sliderCarousels.map(
							BannerService.mapApiToEntity(getLocalizedValue)
					  )
					: [],
			'admin.bannerList.loadingError',
			API_METHOD.GET
		);
	}, [fetchData, state]);

	return (
		<AdminListPage<BannerListTableRow>
			adminTableSchema={adminTableSchema}
			handleOpenCreateModal={handleOpenCreateModal}
			btnCreateLabel="admin.bannerList.create"
			handleOnTableRowClick={() => undefined}
			handlers={{
				...handlers,
			}}
			state={state}
			pageCount={pageCount}
			pageNumber={pageNumber}
			batchActions={batchActions}
		/>
	);
};

export default BannerListPage;
