import { useContext, useEffect, useMemo, useState } from 'react';
import cx from 'classnames';
import { find, get, head, isEmpty } from 'lodash-es';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import {
	CCard,
	CNav,
	CNavItem,
	CNavLink,
	CTabContent,
	CTabPane,
} from '@coreui/react';
import { TableSchema } from 'Hooks/useTableSchema/interfaces';
import { PageListAction } from 'Hooks/useAdminTable/constants';
import { Device } from 'Services/DeviceService/constants';
import { WAREHOUSE_QUANTITY_QUERY_KEY } from 'Services/WarehouseService/constants';
import useAdminTable from 'Hooks/useAdminTable';
import useDidMountEffect from 'Hooks/useDidMountEffect';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import useTableSchema from 'Hooks/useTableSchema';
import BundleService from 'Services/BundleService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import warehouseServiceInstance from 'Services/WarehouseService';
import AdminListPage from 'Components/AdminListPage';
import SPECIFICATION_IDS from 'Config/specificationIds';
import { VinistoLogoEmblemIcon } from 'Components/Icons';
import { IQueryArgument } from 'Services/ApiService/interfaces';
import { apiServiceInstance } from 'Services/ApiService';
import { ModalType } from 'Components/Modal/constants';
import { ModalContext } from 'Components/Modal/context';
import { NotificationsContext } from 'Services/NotificationService';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';

import { BundleListTableRow } from './interfaces';
import {
	B2B_PRICE_COLUMN,
	B2C_PRICE_COLUMN,
	BATCH_COLUMN,
	BundleListTabs,
	ID_COLUMN,
	IN_STOCK_COLUMN,
	IS_ACTIVE_PARAM,
	NAME_COLUMN,
	SORTING_COLUMN_MAP,
	STATE_COLUMN,
} from './constants';
import styles from './styles.module.css';

import './styles.css';

import { bundleAdapter } from '@/index';
import {
	ProductApi,
	VinistoHelperDllEnumsCurrency,
	VinistoHelperDllEnumsPriceDiscountType,
	VinistoHelperDllEnumsPriceLevel,
	VinistoProductDllModelsApiBundleBundlesGetParameters,
	VinistoProductDllModelsApiCategoryCategory,
} from '@/api-types/product-api';

const BundleListPage = () => {
	const authenticationContext = useContext(AuthenticationContext);
	const localizationContext = useContext(LocalizationContext);
	const { handleShowErrorNotification } = useContext(NotificationsContext);

	const defaultActiveKey = BundleListTabs.find((tab) => tab.isDefault)?.id ?? 1;
	const [activeKey, setActiveKey] = useState(defaultActiveKey);

	const t = localizationContext.useFormatMessage();
	const modalContext = useContext(ModalContext);
	const getTableSchema = useTableSchema<BundleListTableRow>();
	const getLocalizedValue = useLocalizedValue();
	const { handlers, state, pageNumber, pageCount, dispatch } =
		useAdminTable<BundleListTableRow>();

	const activeStateFilter = BundleListTabs[activeKey - 1].isActive;

	useEffect(() => {
		const newFilters = state.filters.filter((f) => f.id !== IS_ACTIVE_PARAM);
		if (activeStateFilter !== undefined) {
			newFilters.push({
				id: IS_ACTIVE_PARAM,
				value: activeStateFilter,
			});
		}
		handlers.handleOnFiltersChange(newFilters);
		// Do not fill other dependencies to prevent infinite loop
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeStateFilter, state.shouldReload]);

	const displayedBundleIds = useMemo(
		() => state.data.map((row) => row.id).sort(),
		[state.data]
	);
	const { data: stockData, isLoading: isStockDataLoading } = useQuery(
		[WAREHOUSE_QUANTITY_QUERY_KEY, String(displayedBundleIds)],
		async () => warehouseServiceInstance.getBundleQuantities(displayedBundleIds)
	);

	const tableSchema: TableSchema<BundleListTableRow> = [
		{
			header: `${t({ id: 'bundleList.identifier.warehouse' })}`,
			accessorKey: ID_COLUMN,
			accessorFn: (row) => row.warehouseId?.join(', '),
			enableSorting: false,
			enableColumnFilter: false,
			devices: [Device.MOBILE, Device.TABLET, Device.DESKTOP],
		},
		{
			header: `${t({ id: 'bundleList.name' })}`,
			id: NAME_COLUMN,
			accessorFn: (row) => getLocalizedValue(row.name ?? []),
			cell: ({ row }) => {
				return (
					<span
						dangerouslySetInnerHTML={{
							__html:
								getLocalizedValue(row?.original?.name).length > 0
									? getLocalizedValue(row?.original?.name)
									: row?.original?.name[0].value,
						}}
					></span>
				);
			},
			devices: [Device.MOBILE, Device.TABLET, Device.DESKTOP],
		},
		{
			header: `${t({ id: 'bundleList.batch' })}`,
			id: BATCH_COLUMN,
			accessorFn: (row) => {
				const specificationDetail = row.specificationDetails.find(
					(detail) => detail.value.definitionId === SPECIFICATION_IDS.BATCH
				);
				return specificationDetail
					? getLocalizedValue(specificationDetail.value.value)
					: null;
			},
			enableSorting: false,
			enableColumnFilter: false,
			devices: [Device.MOBILE, Device.TABLET, Device.DESKTOP],
		},
		{
			header: `${t({ id: 'bundleList.category' })}`,
			accessorFn: (row) => {
				return row.categories
					?.map((category) =>
						getLocalizedValue(
							(
								category as unknown as VinistoProductDllModelsApiCategoryCategory
							).name
						)
					)
					.join(', ');
			},
			enableSorting: true,
			enableColumnFilter: false,
			devices: [Device.MOBILE, Device.TABLET, Device.DESKTOP],
		},
		{
			header: `${t({ id: 'bundleList.pricePerPiece.B2C' })} ${t({
				id: 'bundleList.pricePerPiece.vat',
			})}`,
			id: B2C_PRICE_COLUMN,
			cell: (entity) => {
				const bundlePrices = bundleAdapter.fromApi(entity.row.original, {
					currency: VinistoHelperDllEnumsCurrency.CZK,
				}).bundlePrices;
				const { basePrice, discountedPrice, isDiscounted } = bundlePrices ?? {};
				const currency =
					basePrice?.currency == 'CZK' ? 'Kč' : basePrice?.currency;

				const isSupplierDiscount =
					discountedPrice?.discountType &&
					discountedPrice.discountType ===
						VinistoHelperDllEnumsPriceDiscountType.SupplierDiscount
						? true
						: false;
				return (
					<>
						<div className={cx(isDiscounted && styles.isDiscounted)}>
							{basePrice?.getFormatedValueWithVat({ displayCurrency: false })} (
							{basePrice?.getFormatedValue({
								displayCurrency: false,
							})}
							) {currency}
						</div>
						{isDiscounted && (
							<div
								className={cx(
									styles.discountedWrap,
									isSupplierDiscount && styles.isSupplier
								)}
							>
								{discountedPrice?.getFormatedValueWithVat({
									displayCurrency: false,
								})}{' '}
								({discountedPrice?.getFormatedValue({ displayCurrency: false })}
								) {currency}
								{!isSupplierDiscount && (
									<VinistoLogoEmblemIcon className={styles.vinistoEmblem} />
								)}
							</div>
						)}
					</>
				);
			},
			enableColumnFilter: false,
			devices: [Device.MOBILE, Device.TABLET, Device.DESKTOP],
		},
		{
			header: `${t({ id: 'bundleList.pricePerPiece.B2B' })} ${t({
				id: 'bundleList.pricePerPiece.vat',
			})}`,
			id: B2B_PRICE_COLUMN,
			cell: (entity) => {
				const b2bLevel1Price = entity.row.original.prices.find(
					(price) =>
						price.level === VinistoHelperDllEnumsPriceLevel.Level1 &&
						price.platformId === 1
				);

				return (
					<>
						{b2bLevel1Price ? (
							<>
								{getLocalizedPrice({
									price: b2bLevel1Price.valueWithVat ?? 0,
									currency:
										b2bLevel1Price.currency ??
										VinistoHelperDllEnumsCurrency.CZK,
									displayCurrency: false,
								})}{' '}
								(
								{getLocalizedPrice({
									price: b2bLevel1Price.value ?? 0,
									currency:
										b2bLevel1Price.currency ??
										VinistoHelperDllEnumsCurrency.CZK,
									displayCurrency: false,
								})}
								){' '}
								{t({
									id: `currency.${
										b2bLevel1Price.currency ?? VinistoHelperDllEnumsCurrency.CZK
									}`,
								})}
							</>
						) : null}
					</>
				);
			},
			enableColumnFilter: false,
			devices: [Device.MOBILE, Device.TABLET, Device.DESKTOP],
		},
		{
			header: `${t({ id: 'bundleList.inStock' })}`,
			id: IN_STOCK_COLUMN,
			cell: (entity) => {
				return isStockDataLoading
					? t({ id: 'bundleList.inStock.loading' })
					: find(
							stockData,
							(bundleStockData) => bundleStockData.itemId === entity.row.id
					  )?.quantity;
			},
			enableSorting: false,
			enableColumnFilter: false,
			devices: [Device.MOBILE, Device.TABLET, Device.DESKTOP],
		},
		{
			header: `${t({ id: 'bundleList.state' })}`,
			id: STATE_COLUMN,
			cell: (entity) => {
				const isGift = entity.row.original.isGift;
				const isTemporaryUnavailable = entity.row.original.temporaryUnavailable;
				const isClearanceSale = entity.row.original.isClearanceSale;
				const isSaleOver = entity.row.original.isSaleOver;

				return (
					<div className="d-flex flex-column gap-2">
						{isGift && (
							<span className="text-success">
								{t({ id: 'bundleList.state.gift' })}
							</span>
						)}
						{isTemporaryUnavailable && (
							<span className="text-danger">
								{t({ id: 'bundleList.state.temporaryUnavailable' })}
							</span>
						)}
						{isClearanceSale && (
							<span className="text-danger">
								{t({ id: 'bundleList.state.clearanceSale' })}
							</span>
						)}
						{isSaleOver && (
							<span className="text-danger">
								{t({ id: 'bundleList.state.saleOver' })}
							</span>
						)}
					</div>
				);
			},
			enableSorting: false,
			enableColumnFilter: false,
			devices: [Device.MOBILE, Device.TABLET, Device.DESKTOP],
		},
		{
			header: '',
			id: 'placeholder',
			cell: (entity) => {
				const isSaleOver = entity.row.original.isSaleOver;
				const isSet = entity.row.original.isSet;

				const hasVinistoPlusSupplierDiscount =
					entity.row.original.priceDiscounts?.find(
						(discount) =>
							discount.level === VinistoHelperDllEnumsPriceLevel.VinistoPlus &&
							'type' in discount &&
							discount.type ===
								VinistoHelperDllEnumsPriceDiscountType.SupplierDiscount
					);

				if (isSaleOver) {
					return null;
				}

				return (
					<div className="text-end d-flex align-items-center justify-content-between gap-2 w-100">
						{isSet ? null : hasVinistoPlusSupplierDiscount ? (
							<div className={styles.vinistoPlus}>
								<img
									src="/assets/images/vinisto-plus-logo.svg"
									alt={`${t({ id: 'VinistoPlus' })}`}
									width="36"
									className="me-2"
								/>
							</div>
						) : (
							<button
								className={styles.vinistoPlusButton}
								onClick={() => {
									modalContext.handleOpenModal(
										ModalType.CREATE_VINISTO_PLUS_PRICE,
										{
											bundle: entity.row.original,
											refetchBundleDetail: () => bundlesQuery.refetch(),
										}
									);
								}}
							>
								{t({ id: 'bundleDetail.sell.addToVinistoPlus' })}
							</button>
						)}
						<Link
							to={`/bundle-detail/${entity.row.id}`}
							className="btn btn-primary ms-auto"
						>
							{t({ id: 'bundleList.detailLink' })}
						</Link>
					</div>
				);
			},
			devices: [Device.TABLET, Device.DESKTOP],
		},
	];

	const adminTableSchema = getTableSchema(tableSchema);

	const apiParams: VinistoProductDllModelsApiBundleBundlesGetParameters = {
		limit: state.limit,
		offset: state.offset,
		isDeleted: false,
		isEnabled: true,
		hiddenSpecification: true,
		supplierIds: [authenticationContext.activeSupplierId],
		filterPrices: false,
	};
	const sortByColumn = head(state.sorting);
	if (sortByColumn?.id) {
		apiParams.sortingColumn = get(SORTING_COLUMN_MAP, `[${sortByColumn.id}]`);
		apiParams.isSortingDescending = sortByColumn?.desc;
	}
	state.filters?.forEach((filter) => {
		if (filter.id === NAME_COLUMN) {
			apiParams.searchName = String(filter.value);
		}
		if (filter.id === IS_ACTIVE_PARAM) {
			apiParams.isSaleOver = !(filter.value as boolean);
		}
	});

	const bundlesQuery = useQuery(['bundles', apiParams], () =>
		BundleService.getBundles(apiParams)
	);

	useEffect(() => {
		if (!isEmpty(state.filters)) {
			dispatch({
				type: PageListAction.setShouldReload,
				value: true,
			});
		}
	}, []);

	const categoryIds = useMemo(() => {
		return Array.from(
			new Set(bundlesQuery.data?.bundles?.map((row) => row.categories).flat())
		);
	}, [bundlesQuery.data]);

	const categoriesQuery = useQuery({
		queryKey: ['categories', categoryIds],
		queryFn: async () => {
			const params: IQueryArgument<
				keyof ProductApi.CategoriesGetCategoriesByIdsList.RequestQuery
			>[] = categoryIds.map((categoryId) => ({
				key: 'CategoryIds',
				value: categoryId,
			}));

			params.push({
				key: 'Limit',
				value: categoryIds.length,
			});

			return apiServiceInstance.get<ProductApi.CategoriesGetCategoriesByIdsList.ResponseBody>(
				'product-api/categories/GetCategoriesByIds',
				false,
				undefined,
				params
			);
		},
		enabled: !!categoryIds.length,
	});

	useEffect(() => {
		if (bundlesQuery.isSuccess) {
			const bundles = bundlesQuery.data.bundles || [];
			const categories = categoriesQuery.data?.categories || [];

			dispatch({
				type: PageListAction.setPageListState,
				value: {
					// @ts-ignore
					data: bundles.map(BundleService.mapApiToModel(categories)),
					count: bundlesQuery.data.count || 0,
					loaded: true,
				},
			});
		}
		if (bundlesQuery.isError) {
			handleShowErrorNotification('bundleList.loadingError');
		}
	}, [
		bundlesQuery.data,
		bundlesQuery.isSuccess,
		bundlesQuery.isError,
		categoriesQuery.data,
		categoriesQuery.isSuccess,
		dispatch,
		categoryIds,
		handleShowErrorNotification,
	]);

	useDidMountEffect(() => {
		dispatch({
			type: PageListAction.setShouldReload,
			value: true,
		});
	}, [authenticationContext.activeSupplierId]);

	return (
		<div className="p-3">
			<CCard className="m-0">
				<h2 className={styles.mainHeading}>
					{t({ id: BundleListTabs[activeKey - 1].heading })}
				</h2>
				<CNav
					variant="tabs"
					role="tablist"
					className={styles.tabsNav}
				>
					{BundleListTabs.map((tab) => (
						<CNavItem key={tab.id}>
							<CNavLink
								href="#"
								active={activeKey === tab.id}
								onClick={() => setActiveKey(tab.id)}
								className={styles.tabLink}
							>
								{t({ id: tab.tabName })}
							</CNavLink>
						</CNavItem>
					))}
				</CNav>
				<CTabContent>
					{BundleListTabs.map((tab) => (
						<CTabPane
							key={tab.id}
							role="tabpanel"
							visible={activeKey === tab.id}
						>
							<AdminListPage<BundleListTableRow>
								adminTableSchema={adminTableSchema}
								handlers={handlers}
								state={state}
								pageCount={pageCount}
								pageNumber={pageNumber}
							/>
						</CTabPane>
					))}
				</CTabContent>
			</CCard>
		</div>
	);
};

export default BundleListPage;
