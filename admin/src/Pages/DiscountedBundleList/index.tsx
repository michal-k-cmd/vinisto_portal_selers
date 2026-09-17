import cx from 'classnames';
import AdminListPage from 'Components/AdminListPage';
import { AdminTableFilterType } from 'Components/AdminTable/constants';
import sortSuppliersByNameWeb from 'Helpers/sortSuppliersByNameWeb';
import useNavigateWithNewtabOption from 'Hooks/useNavigateWithNewtabOption';
import useAdminTable from 'Hooks/useAdminTable';
import { API_METHOD, PageListAction } from 'Hooks/useAdminTable/constants';
import { IPageListTableRow } from 'Hooks/useAdminTable/interfaces';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import useTableSchema from 'Hooks/useTableSchema';
import { TableSchema } from 'Hooks/useTableSchema/interfaces';
import { LocalizationContext } from 'Services/LocalizationService';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { DiscountPercentage, LogoBare } from 'vinisto_ui';
import { formatDate } from 'Helpers/format-date';
import { AdminTableVariants } from 'Components/AdminTable/interfaces';

import {
	DEFAULT_SORT,
	DISCOUNT_TAG_ID,
	DISCOUNT_TYPE_TRANSLATIONS_MAP,
	DiscountedBundleListTableKeys,
	FILTER_COLUMN_MAP,
	LIST_API_ENDPOINT,
	SORTING_COLUMN_MAP,
	SUPPLIER_FILTER_NAME_MAX_LENGTH,
} from './constants';
import { IBundleListRouteLoader } from './interfaces';

import {
	VinistoHelperDllEnumsPriceDiscountType,
	VinistoHelperDllEnumsPriceLevel,
	VinistoProductDllModelsApiBundleBundle,
} from '@/api-types/product-api';
import { bundleAdapter } from '@/index';

const DiscountedBundleListPage = () => {
	const [isNonDiscountedMode, setIsNonDiscountedMode] = useState(false);
	const localizationContext = useContext(LocalizationContext);
	const {
		activeCurrency: { currency },
	} = localizationContext;

	const t = localizationContext.useFormatMessage();
	const navigateWithNewtabOption = useNavigateWithNewtabOption();
	const getTableSchema = useTableSchema();
	const getLocalizedValue = useLocalizedValue();
	const { fetchData, handlers, state, dispatch, pageNumber, pageCount } =
		useAdminTable(DEFAULT_SORT);
	const data = useLoaderData() as IBundleListRouteLoader;

	const tableSchema: TableSchema<VinistoProductDllModelsApiBundleBundle> = [
		{
			header: `${t({ id: 'admin.bundleDetail.name.label' })}`,
			id: DiscountedBundleListTableKeys.NAME,
			accessorFn: (row) => getLocalizedValue(row?.name ?? []),
		},
		{
			header: `${t({ id: 'admin.bundleDetail.supplier.label' })}`,
			id: DiscountedBundleListTableKeys.SUPPLIER,
			accessorFn: (row) => row?.supplier?.nameWeb ?? '',
			enableSorting: false,
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
			id: 'price_standard',
			header: `${t({ id: 'admin.priceType.vinistoB2cLevel1' })}`,
			accessorFn: (ctx) => {
				const { bundlePrices } = bundleAdapter.fromApi(ctx, { currency });

				if (!bundlePrices.basePrice) return '';
				return `${bundlePrices.basePrice.valueWithVat} ${t({
					id: bundlePrices.basePrice.currency,
				})}`;
			},
			enableColumnFilter: false,
			enableSorting: true,
		},
		{
			id: 'price_discount',
			header: `${t({ id: 'admin.priceType.discount' })}`,
			cell: (ctx) => {
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
			id: 'discount_type',
			header: `${t({ id: 'admin.priceType.discountType' })}`,
			accessorFn: (ctx) => {
				const { bundlePrices } = bundleAdapter.fromApi(ctx, { currency });
				const type = bundlePrices.discountedPrice?.discountType;

				if (
					type !== VinistoHelperDllEnumsPriceDiscountType.SupplierDiscount &&
					type !== VinistoHelperDllEnumsPriceDiscountType.VinistoDiscount
				)
					return '';

				return t({ id: DISCOUNT_TYPE_TRANSLATIONS_MAP[type] });
			},
			cell: ({ row }) => {
				const { bundlePrices } = bundleAdapter.fromApi(row.original, {
					currency,
				});
				const type = bundlePrices.discountedPrice?.discountType;

				if (
					type !== VinistoHelperDllEnumsPriceDiscountType.SupplierDiscount &&
					type !== VinistoHelperDllEnumsPriceDiscountType.VinistoDiscount
				)
					return '';

				return (
					<div className="d-flex gap-1">
						{type ===
							VinistoHelperDllEnumsPriceDiscountType.VinistoDiscount && (
							<LogoBare width={18} />
						)}
						<span
							className={cx(
								type ===
									VinistoHelperDllEnumsPriceDiscountType.VinistoDiscount &&
									'fw-bold'
							)}
						>
							{t({ id: DISCOUNT_TYPE_TRANSLATIONS_MAP[type] })}
						</span>
					</div>
				);
			},
			meta: {
				filterType: AdminTableFilterType.DROPDOWN,
				dropDownFilterOptions: Object.entries(DISCOUNT_TYPE_TRANSLATIONS_MAP)
					.filter(([key]) => key !== VinistoHelperDllEnumsPriceLevel.Level1)
					.map(([key, value]) => [key, `${t({ id: value })}`]),
			},
			enableSorting: false,
		},
		{
			id: 'discount_start_date',
			header: `${t({ id: 'validity.from' })}`,
			accessorFn: (ctx) => {
				const { bundlePrices } = bundleAdapter.fromApi(ctx, { currency });

				const discountStartDate = bundlePrices.discountedPrice?.validFrom;

				if (!discountStartDate) return '';

				return `${formatDate(discountStartDate)}`;
			},
			enableColumnFilter: false,
			enableSorting: false,
		},
		{
			id: 'discount_expiration_date',
			header: `${t({ id: 'validity.to' })}`,
			accessorFn: (ctx) => {
				const { bundlePrices } = bundleAdapter.fromApi(ctx, { currency });

				const discountEndDate = bundlePrices.discountedPrice?.validTo;

				if (!discountEndDate) return '';
				if (discountEndDate.year() === 2038)
					return t({ id: 'validity.indefinite' });

				return `${formatDate(discountEndDate)}`;
			},
			enableColumnFilter: false,
			enableSorting: true,
		},
	];

	// Property 'accessorFn' is missing <somewhere>
	// @ts-expect-error I don't knopw what is the issue and it's most likely not worth the time to fix it
	const adminTableSchema = getTableSchema(tableSchema);

	const handleOnTableRowClick = (
		entity: IPageListTableRow,
		event: React.MouseEvent
	) => navigateWithNewtabOption(`/bundle-detail/${entity.id}`, event);

	const handleToggleDiscountMode = useCallback(() => {
		setIsNonDiscountedMode((currentValue) => !currentValue);
		handlers.handleOnPageChange(1);
		dispatch({
			type: PageListAction.setShouldReload,
			value: true,
		});
	}, [dispatch, handlers]);

	useEffect(() => {
		const apiParams: Record<string, any> = {
			limit: state.limit,
			offset: state.offset,
			hiddenSpecification: true,
			isHiddenTags: true,
			isPriceRequired: false,
			filterPrices: false,
		};

		if (isNonDiscountedMode) {
			apiParams.noTagId = DISCOUNT_TAG_ID;
		} else {
			apiParams.tagId = DISCOUNT_TAG_ID;
		}

		const [sortByColumn] = state.sorting;

		if (sortByColumn?.id) {
			apiParams.sortingColumn = SORTING_COLUMN_MAP[sortByColumn.id];
			apiParams.isSortingDescending = sortByColumn?.desc;
		}

		state.filters?.forEach(({ id, value }) => {
			if (typeof value === 'string') {
				const filterColumn = FILTER_COLUMN_MAP[id];
				if (filterColumn) {
					if (id == 'suppliers') {
						apiParams[filterColumn] = [value];
					} else {
						apiParams[filterColumn] = value;
					}
				}
			}
		});

		fetchData(
			LIST_API_ENDPOINT,
			apiParams,
			(payload) => payload?.bundles ?? [],
			'admin.bundleList.loadingError',
			API_METHOD.POST
		);
	}, [fetchData, isNonDiscountedMode, state]);

	return (
		<>
			<div className="d-flex flex-grow-0 mb-2 gap-2 px-3 align-items-end justify-content-md-end pe-3 flex-column flex-md-row">
				<Button
					onClick={handleToggleDiscountMode}
					variant={isNonDiscountedMode ? 'secondary' : 'primary'}
				>
					{t({
						id: isNonDiscountedMode
							? 'admin.discountedBundleList.showDiscounted'
							: 'admin.discountedBundleList.showNonDiscounted',
					})}
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
					DiscountedBundleListTableKeys.NAME,
					DiscountedBundleListTableKeys.SUPPLIER,
					'price_standard',
					'price_discount',
					'discount_type',
					'discount_start_date',
					'discount_expiration_date',
				]}
			/>
		</>
	);
};

export default DiscountedBundleListPage;
