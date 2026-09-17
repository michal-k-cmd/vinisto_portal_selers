import { useContext, useEffect } from 'react';
import { get, head } from 'Helpers/lodash';
import { useLoaderData } from 'react-router-dom';
import Config from 'Config';
import useNavigateWithNewtabOption from 'Hooks/useNavigateWithNewtabOption';
import { IPageListTableRow } from 'Hooks/useAdminTable/interfaces';
import { TableSchema } from 'Hooks/useTableSchema/interfaces';
import { IBundleListRouteLoader } from 'Pages/BundleList/interfaces';
import { API_METHOD } from 'Hooks/useAdminTable/constants';
import { AdminTableFilterType } from 'Components/AdminTable/constants';
import { SUPPLIER_FILTER_NAME_MAX_LENGTH } from 'Pages/BundleList/constants';
import { getAmountFilter } from 'Components/AdminTable/Filters/Amount/helpers';
import useAdminTable from 'Hooks/useAdminTable';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import useTableSchema from 'Hooks/useTableSchema';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import AdminListPage from 'Components/AdminListPage';
import {
	VinistoStockingRequestDllModelsApiStockingRequestStockingRequest,
	VinistoWarehouseDllModelsApiWarehouseItemWarehouseItemReturn,
} from 'vinisto_api_client/src/api-types/warehouse-api';
import sortSuppliersByNameWeb from 'Helpers/sortSuppliersByNameWeb';
import { AdminTableVariants } from 'Components/AdminTable/interfaces';
import { IntegrationContext } from 'Services/IntergationService';

import {
	BUNDLE_ID_DB_COLUMN,
	FLAGS,
	LIST_API_ENDPOINT,
	NAME_DB_COLUMN,
	PLATFORM,
	QUANTITY_DB_COLUMN,
	SORTING_COLUMN_MAP,
	STOCKING_ON_WAY_DB_COLUMN,
	STOCKING_WAITING_DB_COLUMN,
	SUPPLIER_DB_COLUMN,
	URL_DB_COLUMN,
} from './constants';

type WarehouseBundleTableRow = IPageListTableRow &
	VinistoWarehouseDllModelsApiWarehouseItemWarehouseItemReturn;

const WarehouseBundleListPage = () => {
	const localizationContext = useContext(LocalizationContext);
	const authenticationContext = useContext(AuthenticationContext);
	const t = localizationContext.useFormatMessage();
	const { integrations } = useContext(IntegrationContext);
	const navigateWithNewtabOption = useNavigateWithNewtabOption();
	const getTableSchema = useTableSchema<WarehouseBundleTableRow>();
	const getLocalizedValue = useLocalizedValue();
	const { fetchData, handlers, state, pageNumber, pageCount } =
		useAdminTable<WarehouseBundleTableRow>();
	const data = useLoaderData() as IBundleListRouteLoader;

	const tableSchema: TableSchema<WarehouseBundleTableRow> = [
		{
			header: `${t({ id: 'admin.bundleDetail.bundleIdentifier.label' })}`,
			id: BUNDLE_ID_DB_COLUMN,
			accessorFn: (row) => row?.product?.warehouseId,
		},
		{
			header: `${t({ id: 'admin.bundleDetail.name.label' })}`,
			id: NAME_DB_COLUMN,
			accessorFn: (row) => getLocalizedValue(row?.bundleItem?.name),
		},
		{
			header: `${t({ id: 'admin.bundleDetail.url.label' })}`,
			id: URL_DB_COLUMN,
			cell: ({ row }) => {
				return (
					<a
						href={`${Config.eshopUrl}${t({
							id: 'eshop.routes.product.route',
						})}/${getLocalizedValue(row?.original?.bundleItem?.url)}`}
					>
						{getLocalizedValue(row?.original?.bundleItem?.url)}
					</a>
				);
			},
		},
		{
			header: `${t({ id: 'admin.bundleDetail.supplier.label' })}`,
			id: SUPPLIER_DB_COLUMN,
			accessorFn: (row) => {
				const bundleSupplierId = row?.bundleItem?.supplierId;
				return data.suppliers
					? Array.from(data.suppliers).find(
							(supplier) => supplier.id === bundleSupplierId
					  )?.nameWeb ?? bundleSupplierId
					: bundleSupplierId;
			},
			meta: {
				filterType: AdminTableFilterType.DROPDOWN,
				dropDownFilterOptions:
					data?.suppliers !== undefined
						? Array.from(data.suppliers)
								.sort(sortSuppliersByNameWeb)
								.map(({ id, nameWeb }) => [
									id ?? '',
									nameWeb
										? nameWeb.substring(0, SUPPLIER_FILTER_NAME_MAX_LENGTH)
										: '',
								])
						: [],
			},
		},
		{
			header: `${t({ id: 'admin.bundleDetail.stockingRequestsOnWay.label' })}`,
			id: STOCKING_ON_WAY_DB_COLUMN,
			enableColumnFilter: false,
			cell: ({ row }) => {
				return (
					<>
						{row.original.bundleItemStocking?.stockingRequestsOnWay?.map(
							(
								request: VinistoStockingRequestDllModelsApiStockingRequestStockingRequest,
								index: number
							) => (
								<div key={`stockingRequestsOnWay-${index}`}>
									<a
										href={`/stock-request-detail/${request?.id}`}
										onClick={(event) => event.stopPropagation()}
									>
										{`${request?.requestNumber} - ${request?.bundles?.[0].requestedCount}`}
									</a>
								</div>
							)
						)}
					</>
				);
			},
		},
		{
			header: `${t({
				id: 'admin.bundleDetail.stockingRequestsWaiting.label',
			})}`,
			id: STOCKING_WAITING_DB_COLUMN,
			enableColumnFilter: false,
			cell: ({ row }) => {
				return (
					<>
						{row.original.bundleItemStocking?.stockingRequestsWaiting?.map(
							(
								request: VinistoStockingRequestDllModelsApiStockingRequestStockingRequest,
								index: number
							) => (
								<div key={`stockingRequestsOnWay-${index}`}>
									<a
										href={`/stock-request-detail/${request?.id}`}
										onClick={(event) => event.stopPropagation()}
									>
										{`${request?.requestNumber} - ${request?.bundles?.[0].requestedCount}`}
									</a>
								</div>
							)
						)}
					</>
				);
			},
		},
		{
			header: `${t({ id: 'admin.warehouseItemDetail.quantity.label' })}`,
			id: QUANTITY_DB_COLUMN,
			accessorKey: QUANTITY_DB_COLUMN,
			meta: {
				filterType: AdminTableFilterType.AMOUNT,
			},
			accessorFn: (row) => row?.totalQuantity,
		},
		{
			header: `${t({ id: 'admin.bundleDetail.platform.label' })}`,
			id: PLATFORM,
			accessorKey: 'platform',
			enableSorting: false,
			cell: (context) => {
				return (
					<div>
						{context.row.original.bundleItem?.availableOnPlatforms?.map(
							(platform: string) => (
								<div key={platform}>{platform}</div>
							)
						)}
					</div>
				);
			},
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
			header: `${t({ id: 'admin.bundleDetail.flags.label' })}`,
			id: FLAGS,
			accessorFn: (row) => {
				return get(row, 'bundleItem.flags', {});
			},
			cell: (context) => {
				return (
					<div className="flex flex-col">
						{Object.entries(context.row.original?.bundleItem?.flags || {}).map(
							([key, value]) => {
								if (key === 'isEnabled' && value === false)
									return (
										<div key={key}>
											{t({ id: `admin.bundleDetail.flags.isEnabled.negated` })}
										</div>
									);
								else if (key === 'isApproved' && value === false)
									return (
										<div key={key}>
											{t({ id: `admin.bundleDetail.flags.isApproved.negated` })}
										</div>
									);
								else
									return value ? (
										<div key={key}>
											{t({ id: `admin.bundleDetail.flags.${key}` })}
										</div>
									) : null;
							}
						)}
					</div>
				);
			},
			meta: {
				filterType: AdminTableFilterType.MULTISELECT,
				dropDownFilterOptions: [
					[
						'isDeleted',
						t({ id: 'admin.bundleDetail.flags.isDeleted' })?.toString() ?? '',
					],
					[
						'temporaryUnavailable',
						t({
							id: 'admin.bundleDetail.flags.temporaryUnavailable',
						})?.toString() ?? '',
					],
					[
						'isGift',
						t({ id: 'admin.bundleDetail.flags.isGift' })?.toString() ?? '',
					],
					[
						'isEnabled',
						t({ id: 'admin.bundleDetail.flags.isEnabled' })?.toString() ?? '',
					],
					[
						'isDisabled',
						t({
							id: 'admin.bundleDetail.flags.isEnabled.negated',
						})?.toString() ?? '',
					],
					[
						'isClearanceSale',
						t({ id: 'admin.bundleDetail.flags.isClearanceSale' })?.toString() ??
							'',
					],
					[
						'isApproved',
						t({ id: 'admin.bundleDetail.flags.isApproved' })?.toString() ?? '',
					],
					[
						'isApprovedNot',
						t({
							id: 'admin.bundleDetail.flags.isApproved.negated',
						})?.toString() ?? '',
					],
					[
						'isDeliveryFree',
						t({ id: 'admin.bundleDetail.flags.isDeliveryFree' })?.toString() ??
							'',
					],
					[
						'isForLogged',
						t({ id: 'admin.bundleDetail.flags.isForLogged' })?.toString() ?? '',
					],
					[
						'isIntangible',
						t({ id: 'admin.bundleDetail.flags.isIntangible' })?.toString() ??
							'',
					],
					[
						'isSaleOver',
						t({ id: 'admin.bundleDetail.flags.isSaleOver' })?.toString() ?? '',
					],
					[
						'isSet',
						t({ id: 'admin.bundleDetail.flags.isSet' })?.toString() ?? '',
					],
				],
			},
			enableSorting: false,
		},
	];

	const adminTableSchema = getTableSchema(tableSchema);

	const handleOnTableRowClick = (
		entity: IPageListTableRow,
		event: React.MouseEvent
	) =>
		navigateWithNewtabOption(
			`/warehouse-bundle-detail/${get(entity, 'bundleItem.id', '')}`,
			event
		);

	useEffect(() => {
		const apiParams: Record<string, any> = {
			Limit: state.limit,
			Offset: state.offset,
			UserLoginHash: get(authenticationContext, 'vinistoUser.loginHash', ''),
			SearchBundleIsDeleted: false,
		};
		const sortByColumn = head(state.sorting);
		if (sortByColumn?.id) {
			apiParams.SortingColumn = get(SORTING_COLUMN_MAP, `[${sortByColumn.id}]`);
			apiParams.IsSortingDescending = sortByColumn?.desc;
		}
		state.filters?.forEach((filter) => {
			if (filter.id === NAME_DB_COLUMN) {
				apiParams.SearchBundleName = filter.value;
			} else if (filter.id === URL_DB_COLUMN) {
				apiParams.SearchBundleUrl = filter.value;
			}
			if (filter.id === SUPPLIER_DB_COLUMN) {
				apiParams.SupplierId = filter.value;
			} else if (filter.id === PLATFORM) {
				apiParams.SearchBundleByPlatformId = filter.value;
			} else if (filter.id === QUANTITY_DB_COLUMN) {
				const amountFilter = getAmountFilter(String(filter.value));
				if (
					amountFilter.comparingNumberType === undefined ||
					amountFilter.value === undefined
				)
					return;
				apiParams.SearchAmount = amountFilter.value;
				apiParams.AmountFilter = amountFilter.comparingNumberType;
			} else if (filter.id === BUNDLE_ID_DB_COLUMN) {
				apiParams.SearchProductWarehouseId = filter.value;
			}
		});

		state.filters?.forEach(({ id, value }) => {
			if (id !== 'flags' || typeof value !== 'string') return;
			const flags = value.split(',');
			flags.forEach((flag: string) => {
				switch (flag) {
					case 'isEnabled':
						apiParams.SearchBundleIsEnabled = true;
						break;
					case 'isDisabled':
						apiParams.SearchBundleIsEnabled = false;
						break;
					case 'isDeleted':
						apiParams.SearchBundleIsDeleted = true;
						break;
					case 'isGift':
						apiParams.SearchBundleIsGift = true;
						break;
					case 'temporaryUnavailable':
						apiParams.SearchBundleIsTemporaryUnavailable = true;
						break;
					case 'isClearanceSale':
						apiParams.SearchBundleIsClearanceSale = true;
						break;
					case 'isApproved':
						apiParams.SearchBundleIsApproved = true;
						break;
					case 'isApprovedNot':
						apiParams.SearchBundleIsApproved = false;
						break;
					case 'isDeliveryFree':
						apiParams.SearchBundleIsDeliveryFree = true;
						break;
					case 'isForLogged':
						apiParams.SearchBundleIsForLoggedUsers = true;
						break;
					case 'isIntangible':
						apiParams.SearchBundleIsIntangible = true;
						break;
					case 'isSaleOver':
						apiParams.SearchBundleIsSaleOver = true;
						break;
					case 'isSet':
						apiParams.SearchBundleIsSet = true;
						break;
					default:
						break;
				}
			});
		});

		fetchData(
			LIST_API_ENDPOINT,
			Object.entries(apiParams).map(([key, value]) => ({
				key,
				value,
			})),
			(payload) => get(payload, 'warehouseBundleSnapshots', []) ?? [],
			'admin.bundleList.loadingError',
			API_METHOD.GET
		);
	}, [fetchData, state]);

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
				BUNDLE_ID_DB_COLUMN,
				NAME_DB_COLUMN,
				URL_DB_COLUMN,
				SUPPLIER_DB_COLUMN,
				STOCKING_ON_WAY_DB_COLUMN,
				STOCKING_WAITING_DB_COLUMN,
				QUANTITY_DB_COLUMN,
				FLAGS,
			]}
		/>
	);
};

export default WarehouseBundleListPage;
