import { useCallback, useContext, useEffect, useMemo } from 'react';
import { get } from 'Helpers/lodash';
import { useLoaderData } from 'react-router-dom';
import Config from 'Config';
import { IPageListTableRow } from 'Hooks/useAdminTable/interfaces';
import { TableSchema } from 'Hooks/useTableSchema/interfaces';
import { CREATE_BUNDLE, CREATE_BUNDLE_SET } from 'Components/Modal/constants';
import { API_METHOD, PageListAction } from 'Hooks/useAdminTable/constants';
import { AdminTableFilterType } from 'Components/AdminTable/constants';
import useAdminTable from 'Hooks/useAdminTable';
import useLocalizedValue, {
	isLangValuePairArray,
} from 'Hooks/useLocalizedValue';
import useTableSchema from 'Hooks/useTableSchema';
import { ModalContext } from 'Components/Modal/context';
import { LocalizationContext } from 'Services/LocalizationService';
import AdminListPage from 'Components/AdminListPage';
import sortSuppliersByNameWeb from 'Helpers/sortSuppliersByNameWeb';
import { Button } from 'react-bootstrap';
import useNavigateWithNewtabOption from 'Hooks/useNavigateWithNewtabOption';
import { useQuery } from '@tanstack/react-query';
import CategoryService from 'Services/Category';
import { AdminTableVariants } from 'Components/AdminTable/interfaces';
import { DiscountPercentage } from 'vinisto_ui';
import { getSpecificationValue } from 'Components/SpecificationList/helpers';
import { parseSpecificationFiltersSearchParamsUrlToPostRequest } from 'Components/AdminTable/Filters/Specification/helpers';
import { IntegrationContext } from 'Services/IntergationService';

import {
	BundleListTableKeys,
	FILTER_COLUMN_MAP,
	LIST_API_ENDPOINT,
	SORTING_COLUMN_MAP,
	SUPPLIER_FILTER_NAME_MAX_LENGTH,
} from './constants';
import {
	BundleListTableRow,
	BundleListTableRowWithCategories,
	IBundleListRouteLoader,
} from './interfaces';

import { bundleAdapter } from '@/index';

const BundleListPage = () => {
	const localizationContext = useContext(LocalizationContext);
	const {
		activeCurrency: { currency },
	} = localizationContext;
	const modalContext = useContext(ModalContext);
	const { integrations } = useContext(IntegrationContext);
	const { getIntegrationById } = useContext(IntegrationContext);

	const t = localizationContext.useFormatMessage();
	const getTableSchema = useTableSchema<BundleListTableRowWithCategories>();
	const getLocalizedValue = useLocalizedValue();
	const { fetchData, handlers, state, dispatch, pageNumber, pageCount } =
		useAdminTable<BundleListTableRow>();
	const data = useLoaderData() as IBundleListRouteLoader;
	const navigateWithNewtabOption = useNavigateWithNewtabOption();

	const categoryIds = useMemo(() => {
		return Array.from(
			new Set(
				state.data
					?.map((bundle) => bundle.categories)
					.flat()
					.filter(Boolean)
			)
		);
	}, [state.data]);

	const { data: categories } = useQuery({
		queryKey: ['categories', categoryIds],
		queryFn: () => CategoryService.getByIds(categoryIds),
		enabled: categoryIds.length > 0,
	});

	const stateWithCategoriesMappedOnBundles = useMemo(() => {
		return {
			...state,
			data: state.data.map((bundle) => ({
				...bundle,
				categories: bundle.categories
					.map((categoryId: string) =>
						categories?.find((category) => category.id === categoryId)
					)
					.filter(Boolean),
			})),
		};
	}, [state, categories]);

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
		},
		{
			header: `${t({ id: 'admin.bundleDetail.bundleSpecifications' })}`,
			id: BundleListTableKeys.SPECIFICATIONS,
			accessorFn: (row) => row.specificationDetails,
			enableSorting: false,
			cell: ({ row }) =>
				row.original.specificationDetails.length ? (
					<ul
						className="list-unstyled"
						style={{ fontSize: '0.9rem' }}
					>
						{row.original.specificationDetails?.map((specification) => (
							<li key={specification.definition.id}>
								<span className="fw-medium">
									{getLocalizedValue(specification.definition.name)}:{' '}
								</span>
								<span>
									{getSpecificationValue(
										specification,
										t({ id: 'admin.yes' }),
										t({ id: 'admin.no' }),
										localizationContext.activeLanguageKey
									)}
								</span>
							</li>
						))}
					</ul>
				) : (
					'-'
				),

			meta: {
				filterType: AdminTableFilterType.SPECIFICATION,
			},
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
		},
		{
			header: `${t({ id: 'admin.bundleDetail.supplier.label' })}`,
			id: BundleListTableKeys.SUPPLIER,
			accessorFn: (row) => get(row, 'supplier.nameWeb', ''),
			enableSorting: true,
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
				const { bundlePrices } = bundleAdapter.fromApi(ctx, { currency });

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
					{context.row.original.tagsDetail?.map((tag) => (
						<div key={tag.id}>{tag.name}</div>
					))}
				</>
			),

			enableSorting: false,
			enableColumnFilter: false,
		},
		{
			header: `${t({ id: 'admin.bundleDetail.scoring.label' })}`,
			id: BundleListTableKeys.SCORING,
			accessorFn: (row) => get(row, 'scoring', ''),
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
						{context.row.original.availableOnPlatforms?.map((platform, i) => (
							<div key={`${platform}_${i}`}>
								{getIntegrationById(platform)?.integrationName}
							</div>
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
			meta: {
				filterType: AdminTableFilterType.MULTISELECT,
				dropDownFilterOptions: [
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
						'isClearanceSale',
						t({ id: 'admin.bundleDetail.flags.isClearanceSale' })?.toString() ??
							'',
					],
					[
						'isDeleted',
						t({ id: 'admin.bundleDetail.flags.isDeleted' })?.toString() ?? '',
					],
					[
						'isDeliveryFree',
						t({ id: 'admin.bundleDetail.flags.isDeliveryFree' })?.toString() ??
							'',
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
						'isForLogged',
						t({ id: 'admin.bundleDetail.flags.isForLogged' })?.toString() ?? '',
					],
					[
						'isGift',
						t({ id: 'admin.bundleDetail.flags.isGift' })?.toString() ?? '',
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
					[
						'temporaryUnavailable',
						t({
							id: 'admin.bundleDetail.flags.temporaryUnavailable',
						})?.toString() ?? '',
					],
				],
			},
			enableSorting: false,
		},
		{
			header: `${t({ id: 'admin.bundleDetail.isSet.label' })}`,
			id: BundleListTableKeys.IS_SET,
			enableSorting: false,
			accessorFn: (row) => row.isSet,
			cell: (row) =>
				row.getValue() ? t({ id: 'admin.yes' }) : t({ id: 'admin.no' }),
			meta: {
				filterType: AdminTableFilterType.YES_NO,
			},
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

	const handleOpenCreateBundleModal = useCallback(() => {
		modalContext.handleOpenModal(CREATE_BUNDLE, {
			resetBundleList: () => dispatch({ type: PageListAction.reset }),
		});
	}, [modalContext, dispatch]);

	const handleOpenCreateBundleSetModal = useCallback(() => {
		modalContext.handleOpenModal(CREATE_BUNDLE_SET, {
			resetBundleList: () => dispatch({ type: PageListAction.reset }),
		});
	}, [modalContext, dispatch]);

	useEffect(() => {
		const apiParams: Record<string, any> = {
			limit: state.limit,
			offset: state.offset,
			hiddenSpecification: true,
			isHiddenTags: true,
			isPriceRequired: false,
			isDeleted: false,
			filterPrices: false,
		};

		const [sortByColumn] = state.sorting;

		if (sortByColumn?.id) {
			apiParams.sortingColumn = get(SORTING_COLUMN_MAP, `[${sortByColumn.id}]`);
			apiParams.isSortingDescending = sortByColumn?.desc;
		}

		state.filters?.forEach(({ id, value }) => {
			if (id === 'flags' && typeof value === 'string') {
				const flags = value.split(',');
				flags.forEach((flag: string) => {
					switch (flag) {
						case 'isEnabled':
							apiParams.isEnabled = true;
							break;
						case 'isDisabled':
							apiParams.isEnabled = false;
							break;
						case 'isDeleted':
							apiParams.isDeleted = true;
							break;
						case 'isGift':
							apiParams.isGift = true;
							break;
						case 'temporaryUnavailable':
							apiParams.isTemporaryUnavailable = true;
							break;
						case 'isClearanceSale':
							apiParams.isClearanceSale = true;
							break;
						case 'isApproved':
							apiParams.isApproved = true;
							break;
						case 'isApprovedNot':
							apiParams.isApproved = false;
							break;
						case 'isDeliveryFree':
							apiParams.isDeliveryFree = true;
							break;
						case 'isForLogged':
							apiParams.isForLoggedUsers = true;
							break;
						case 'isIntangible':
							apiParams.isIntangible = true;
							break;
						case 'isSaleOver':
							apiParams.isSaleOver = true;
							break;
						case 'isSet':
							apiParams.isSet = true;
							break;
						default:
							break;
					}
				});
			} else if (id == 'suppliers') {
				const filterColumn = get(FILTER_COLUMN_MAP, `[${id}]`);
				if (filterColumn) {
					apiParams[filterColumn] = [value];
				}
			} else if (typeof value === 'string') {
				const filterColumn = get(FILTER_COLUMN_MAP, `[${id}]`);
				if (filterColumn) {
					apiParams[filterColumn] = value;
				}
			}
		});

		const filterParam = parseSpecificationFiltersSearchParamsUrlToPostRequest();

		if (filterParam.length) {
			apiParams.filters = filterParam;
		}

		fetchData(
			LIST_API_ENDPOINT,
			apiParams,
			(payload) => get(payload, 'bundles', []) ?? [],
			'admin.bundleList.loadingError',
			API_METHOD.POST
		);
	}, [fetchData, state]);

	return (
		<>
			<div className="d-flex flex-grow-0 mb-2 gap-2 px-3 align-items-end justify-content-md-end pe-3 flex-column flex-md-row">
				<Button onClick={handleOpenCreateBundleSetModal}>
					{t({ id: 'admin.bundleList.createBundleSet' })}
				</Button>
				<Button onClick={handleOpenCreateBundleModal}>
					{t({ id: 'admin.bundleList.createBundle' })}
				</Button>
			</div>
			<AdminListPage<BundleListTableRowWithCategories>
				adminTableSchema={adminTableSchema}
				handleOnTableRowClick={handleOnTableRowClick}
				handlers={handlers}
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
					BundleListTableKeys.SPECIFICATIONS,
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
		</>
	);
};

export default BundleListPage;
