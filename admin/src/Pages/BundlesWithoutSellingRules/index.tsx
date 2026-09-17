import { useContext, useMemo } from 'react';
import { get } from 'Helpers/lodash';
import Config from 'Config';
import { IPageListTableRow } from 'Hooks/useAdminTable/interfaces';
import { TableSchema } from 'Hooks/useTableSchema/interfaces';
import { VinistoProductDllModelsApiTagTag } from 'vinisto_api_client/src/api-types/product-api/';
import useAdminTable from 'Hooks/useAdminTable';
import useLocalizedValue, {
	isLangValuePairArray,
} from 'Hooks/useLocalizedValue';
import useTableSchema from 'Hooks/useTableSchema';
import { LocalizationContext } from 'Services/LocalizationService';
import AdminListPage from 'Components/AdminListPage';
import useNavigateWithNewtabOption from 'Hooks/useNavigateWithNewtabOption';
import { useQuery } from '@tanstack/react-query';
import CategoryService from 'Services/Category';
import { AdminTableVariants } from 'Components/AdminTable/interfaces';
import { DiscountPercentage } from 'vinisto_ui';
import { BundleListTableKeys } from 'Pages/BundleList/constants';
import {
	BundleListTableRow,
	BundleListTableRowWithCategories,
	IBundleListRouteLoader,
} from 'Pages/BundleList/interfaces';
import {
	NumberParam,
	StringParam,
	useQueryParams,
	withDefault,
} from 'Helpers/query-params';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { useLoaderData } from 'react-router-dom';
import CountrySelector from 'Components/CountrySelector';
import { AdminTableFilterType } from 'Components/AdminTable/constants';
import { IntegrationContext } from 'Services/IntergationService';

import { bundleAdapter } from '@/index';
import api from '@/api';
import { VinistoProductDllModelsApiBundleBundlesReturn } from '@/api-types/supplier-api';
import { VinistoHelperDllEnumsCountryCode } from '@/api-types/user-api';

const BundlesWithoutSellingRules = () => {
	const localizationContext = useContext(LocalizationContext);
	const {
		activeCurrency: { currency },
	} = localizationContext;
	const { integrations } = useContext(IntegrationContext);

	const t = localizationContext.useFormatMessage();
	const getTableSchema = useTableSchema<BundleListTableRowWithCategories>();
	const getLocalizedValue = useLocalizedValue();
	const { handlers, state } = useAdminTable<BundleListTableRow>();
	const navigateWithNewtabOption = useNavigateWithNewtabOption();
	const userLoginHash = useContext(AuthenticationContext).vinistoUser.loginHash;
	const routeLoaderData = useLoaderData() as IBundleListRouteLoader;

	const DEFAULT_ITEMS_PER_PAGE = 25;

	const [query, setQuery] = useQueryParams({
		Type: StringParam,
		OriginCountry: StringParam,
		DestinationCountry: StringParam,
		Offset: withDefault(NumberParam, 0),
		Limit: withDefault(NumberParam, DEFAULT_ITEMS_PER_PAGE),
	});

	const invalidBundlesQuery = useQuery({
		queryKey: [
			'get-invalid-bundles',
			{ ...query, UserLoginHash: userLoginHash },
		],
		queryFn: () =>
			api.get<VinistoProductDllModelsApiBundleBundlesReturn>(
				`supplier-api/admin/fee-rules/get-invalid-bundles`,
				{ ...query, UserLoginHash: userLoginHash }
			),

		enabled: Boolean(
			query.Type &&
				query.OriginCountry &&
				query.DestinationCountry &&
				userLoginHash
		),
	});

	const pageCount = Math.ceil(
		(invalidBundlesQuery.data?.count ?? 0) /
			(query.Limit ?? DEFAULT_ITEMS_PER_PAGE)
	);
	const pageNumber = query.Offset / query.Limit + 1;

	const categoryIds = useMemo(() => {
		return Array.from(
			new Set(
				invalidBundlesQuery.data?.bundles
					?.map((bundle) => bundle.categories)
					.flat()
					.filter(Boolean)
			)
		);
	}, [invalidBundlesQuery.data]);

	const { data: categories } = useQuery({
		queryKey: ['categories', categoryIds],
		queryFn: () => CategoryService.getByIds(categoryIds),
		enabled: categoryIds.length > 0,
	});

	const stateWithCategoriesMappedOnBundles = useMemo(() => {
		return {
			...state,
			loading: invalidBundlesQuery.isLoading,
			loaded: invalidBundlesQuery.isSuccess,
			count: invalidBundlesQuery.data?.count ?? 0,
			pageNumber: pageNumber,
			pageCount: pageCount,
			limit: query.Limit ?? DEFAULT_ITEMS_PER_PAGE,
			data:
				invalidBundlesQuery.data?.bundles?.map((bundle) => ({
					...bundle,
					supplier:
						routeLoaderData?.suppliers?.find(
							(supplier) => supplier.id === bundle.supplierId
						) ?? null,
					categories: bundle.categories
						.map((categoryId: string) =>
							categories?.find((category) => category.id === categoryId)
						)
						.filter(Boolean),
				})) ?? [],
		};
	}, [
		state,
		invalidBundlesQuery.isLoading,
		invalidBundlesQuery.isSuccess,
		invalidBundlesQuery.data?.count,
		invalidBundlesQuery.data?.bundles,
		pageNumber,
		pageCount,
		query.Limit,
		routeLoaderData.suppliers,
		categories,
	]);

	const tableSchema: TableSchema<BundleListTableRowWithCategories> = [
		{
			header: `${t({ id: 'admin.bundleDetail.name.label' })}`,
			id: BundleListTableKeys.NAME,
			accessorFn: (row) => getLocalizedValue(get(row, 'name', [])),
			cell: ({ row }) => {
				return (
					<span
						dangerouslySetInnerHTML={{
							__html: getLocalizedValue(row?.original?.name) ?? '-',
						}}
					></span>
				);
			},
			enableSorting: false,
			enableColumnFilter: false,
		},
		{
			header: `${t({ id: 'admin.bundleDetail.url.label' })}`,
			id: BundleListTableKeys.URL,
			cell: ({ row }) => {
				return (
					<a
						href={`${Config.eshopUrl}${t({
							id: 'eshop.routes.product.route',
						})}/${getLocalizedValue(row?.original?.url)}`}
					>
						{getLocalizedValue(row?.original?.url)}
					</a>
				);
			},
			enableSorting: false,
			enableColumnFilter: false,
		},
		{
			header: `${t({ id: 'admin.bundleDetail.supplier.label' })}`,
			id: BundleListTableKeys.SUPPLIER,
			accessorFn: (row) => get(row, 'supplier.nameWeb', ''),
			enableSorting: false,
			enableColumnFilter: false,
		},
		{
			header: `${t({ id: 'admin.bundleDetail.categories.label' })}`,
			id: BundleListTableKeys.CATEGORY,
			cell: (cellContext) => {
				return (
					/* Fragments has to be here to not break csv export */
					/* eslint-disable react/jsx-no-useless-fragment */
					<>
						{cellContext.row.original.categories?.map((category) => (
							<div key={category?.id}>
								{isLangValuePairArray(category?.name) &&
									getLocalizedValue(category?.name)}
							</div>
						))}
					</>
				);
			},
			enableSorting: false,
			enableColumnFilter: false,
		},
		{
			header: `${t({ id: 'admin.bundleDetail.b2cPrice.label' })}`,
			id: 'price_standard',
			accessorFn: (ctx) => {
				// @ts-expect-error The mapped type is merged with categories, which TS don't like, but it's fine
				const { bundlePrices } = bundleAdapter.fromApi(ctx, {
					currency,
				});

				if (!bundlePrices.basePrice) return '';
				return `${bundlePrices.basePrice?.valueWithVat} ${t({
					id: bundlePrices.basePrice?.currency
						? bundlePrices.basePrice?.currency
						: 'CZK',
				})}`;
			},
			enableColumnFilter: false,
			enableSorting: false,
		},
		{
			header: `${t({ id: 'admin.priceType.discount' })}`,
			id: 'price_discount',
			cell: (ctx) => {
				// @ts-expect-error The mapped type is merged with categories, which TS don't like, but it's fine
				const { bundlePrices } = bundleAdapter.fromApi(ctx.row.original, {
					currency,
				});

				bundlePrices.discountedPrice;

				if (!bundlePrices.basePrice || !bundlePrices.discountedPrice) return '';

				return (
					<div className="d-flex align-items-center gap-2">
						<DiscountPercentage
							discountedPriceWithVat={bundlePrices.discountedPrice.valueWithVat}
							standardPriceWithVat={bundlePrices.basePrice.valueWithVat}
						/>
						<span className="text-nowrap">
							{bundlePrices.discountedPrice.valueWithVat}{' '}
							{t({ id: bundlePrices.discountedPrice.currency })}
						</span>
					</div>
				);
			},
			enableColumnFilter: false,
			enableSorting: false,
		},
		{
			header: `${t({ id: 'admin.bundleDetail.tags.label' })}`,
			id: BundleListTableKeys.TAG,
			cell: (context) => (
				/* Fragments has to be here to not break csv export */
				/* eslint-disable react/jsx-no-useless-fragment */
				<>
					{context.row.original.tagsDetail?.map(
						(tag: VinistoProductDllModelsApiTagTag) => (
							<div key={tag.id}>{tag.name}</div>
						)
					)}
				</>
			),

			enableSorting: false,
			enableColumnFilter: false,
		},
		{
			header: `${t({ id: 'admin.bundleDetail.scoring.label' })}`,
			id: BundleListTableKeys.SCORING,
			accessorFn: (row) => get(row, 'scoring', ''),
			enableSorting: false,
			enableColumnFilter: false,
		},
		{
			header: `${t({ id: 'admin.bundleDetail.platform.label' })}`,
			id: BundleListTableKeys.PLATFORM,
			enableSorting: false,
			accessorKey: 'availableOnPlatforms',
			cell: (context) => {
				return (
					<div>
						{context.row.original.availableOnPlatforms?.map((platform) => (
							<div key={platform}>{platform}</div>
						))}
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
			id: BundleListTableKeys.FLAGS,
			accessorFn: (row) => get(row, 'flags', {}),
			cell: (context) => {
				const flags = context.row.original.flags || {};
				const isSet = context.row.original.isSet;
				return (
					<div className="flex flex-col">
						{flags.isApproved === false && (
							<div>
								{t({ id: 'admin.bundleDetail.flags.isApproved.negated' })}
							</div>
						)}
						{flags.isApproved === true && (
							<div>{t({ id: 'admin.bundleDetail.flags.isApproved' })}</div>
						)}
						{flags.isClearanceSale && (
							<div>{t({ id: 'admin.bundleDetail.flags.isClearanceSale' })}</div>
						)}
						{flags.isDeleted && (
							<div>{t({ id: 'admin.bundleDetail.flags.isDeleted' })}</div>
						)}
						{flags.isDeliveryFree && (
							<div>{t({ id: 'admin.bundleDetail.flags.isDeliveryFree' })}</div>
						)}
						{flags.isEnabled === true && (
							<div>{t({ id: 'admin.bundleDetail.flags.isEnabled' })}</div>
						)}
						{flags.isEnabled === false && (
							<div>
								{t({ id: 'admin.bundleDetail.flags.isEnabled.negated' })}
							</div>
						)}
						{flags.isForLogged && (
							<div>{t({ id: 'admin.bundleDetail.flags.isForLogged' })}</div>
						)}
						{flags.isGift && (
							<div>{t({ id: 'admin.bundleDetail.flags.isGift' })}</div>
						)}
						{flags.isIntangible && (
							<div>{t({ id: 'admin.bundleDetail.flags.isIntangible' })}</div>
						)}
						{flags.isSaleOver && (
							<div>{t({ id: 'admin.bundleDetail.flags.isSaleOver' })}</div>
						)}
						{isSet && <div>{t({ id: 'admin.bundleDetail.flags.isSet' })}</div>}
						{flags.isTemporaryUnavailable && (
							<div>
								{t({ id: 'admin.bundleDetail.flags.isTemporaryUnavailable' })}
							</div>
						)}
					</div>
				);
			},
			enableSorting: false,
			enableColumnFilter: false,
		},
		{
			header: `${t({ id: 'admin.bundleDetail.isSet.label' })}`,
			id: BundleListTableKeys.IS_SET,
			accessorFn: (row) => row.isSet,
			cell: (row) =>
				row.getValue() ? t({ id: 'admin.yes' }) : t({ id: 'admin.no' }),
			enableSorting: false,
			enableColumnFilter: false,
		},
		{
			header: `${t({ id: 'admin.bundleDetail.availableCount.label' })}`,
			id: 'availableCount',
			accessorFn: (row) => get(row, 'availableCount', ''),
			enableColumnFilter: false,
			enableSorting: false,
		},
		{
			header: `${t({ id: 'admin.bundleDetail.piecesPerPackage.label' })}`,
			id: 'piecesPerPackage',
			accessorFn: (row) => get(row, 'piecesPerPackage', ''),
			enableColumnFilter: false,
			enableSorting: false,
		},
		{
			header: `${t({ id: 'admin.bundleDetail.packagesOnPallet.label' })}`,
			id: 'packagesOnPallet',
			accessorFn: (row) => get(row, 'packagesOnPallet', ''),
			enableColumnFilter: false,
			enableSorting: false,
		},
		{
			header: `${t({ id: 'admin.bundleDetail.warehouseId.label' })}`,
			id: 'warehouseId',
			accessorFn: (row) => get(row, 'warehouseId', ''),
			enableColumnFilter: false,
			enableSorting: false,
		},
		{
			header: `${t({ id: 'admin.bundleDetail.allowedCountries.label' })}`,
			id: 'allowedCountries',
			accessorFn: (row) => get(row, 'allowedCountries', ''),
			enableColumnFilter: false,
			enableSorting: false,
		},
	];

	const adminTableSchema = getTableSchema(tableSchema);

	const handleOnTableRowClick = (
		entity: IPageListTableRow,
		event: React.MouseEvent
	) => {
		navigateWithNewtabOption(`/bundle-detail/${entity.id}`, event);
	};

	const adaptedHandlers = {
		handleOnSortingChange: handlers.handleOnSortingChange,
		handleOnFiltersChange: handlers.handleOnFiltersChange,
		handleOnPageChange: (selectedPage: number) => {
			setQuery((prev) => ({
				...prev,
				Offset: (query.Limit ?? DEFAULT_ITEMS_PER_PAGE) * (selectedPage - 1),
			}));
			//handlers.handleOnPageChange(selectedPage);
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

	return (
		<div>
			<div className="card mb-3 p-3 pb-2">
				<CountrySelector
					sourceCountry={
						query.OriginCountry as VinistoHelperDllEnumsCountryCode
					}
					targetCountry={
						query.DestinationCountry as VinistoHelperDllEnumsCountryCode
					}
					setSourceCountry={(country: VinistoHelperDllEnumsCountryCode) => {
						setQuery((prev) => ({
							...prev,
							OriginCountry: country,
							Offset: 0,
						}));
					}}
					setTargetCountry={(country: VinistoHelperDllEnumsCountryCode) => {
						setQuery((prev) => ({
							...prev,
							DestinationCountry: country,
							Offset: 0,
						}));
					}}
				/>
			</div>
			<AdminListPage<BundleListTableRowWithCategories>
				adminTableSchema={adminTableSchema}
				handleOnTableRowClick={handleOnTableRowClick}
				handlers={{ ...adaptedHandlers }}
				state={stateWithCategoriesMappedOnBundles}
				pageCount={pageCount}
				pageNumber={pageNumber}
				adminTableVariant={AdminTableVariants.DYNAMIC_COLUMNS}
				defaultColumnsExcluded={[
					'warehouseId',
					'allowedCountries',
					'piecesPerPackage',
					'packagesOnPallet',
					'availableCount',
					'price_standard',
					'price_discount',
				]}
				columnOrder={[
					BundleListTableKeys.NAME,
					BundleListTableKeys.URL,
					BundleListTableKeys.SUPPLIER,
					BundleListTableKeys.CATEGORY,
					'price_standard',
					'price_discount',
					BundleListTableKeys.TAG,
					BundleListTableKeys.SCORING,
					BundleListTableKeys.FLAGS,
					BundleListTableKeys.IS_SET,
					'availableCount',
					'piecesPerPackage',
					'packagesOnPallet',
					'warehouseId',
					'allowedCountries',
				]}
			/>
		</div>
	);
};

export default BundlesWithoutSellingRules;
