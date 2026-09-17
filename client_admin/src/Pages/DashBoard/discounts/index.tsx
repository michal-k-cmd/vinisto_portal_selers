import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import AdminTableLight from 'Components/AdminTable/Variants/light';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { LangValuePair } from 'Hooks/useLocalizedValue/interfaces';
import {
	VinistoHelperDllEnumsBundleSortableColumns,
	VinistoProductDllModelsApiBundleBundle,
	VinistoProductDllModelsApiBundleBundlesGetParameters,
} from 'vinisto_api_client/src/api-types/product-api';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import BundleService from 'Services/BundleService';
import { LocalizationContext } from 'Services/LocalizationService';
import { useContext } from 'react';
import { dayjsInstance } from 'Services/Date';
import { Link } from 'react-router-dom';
import DiscountPercentage from 'vinisto_ui/src/components/price/components/discount-percentage';
import AdminPagination from 'Components/AdminPagination';
import useAdminTable from 'Hooks/useAdminTable';
import { InfoButton } from 'Components/InfoBox';

import { BusinessType, BusinessTypeType } from '../constants';

import styles from './styles.module.css';
import { DISCOUNT_EXPIRING_DAYS } from './constants';

import { bundleAdapter } from '@/index';
import { VinistoHelperDllEnumsCurrency } from '@/api-types/order-api';

const discountTagId = '636120fd9f513ca7b69ae599';

interface DashboardDiscountsProps {
	bussinessType: BusinessTypeType;
}

export const DashboardDiscounts = ({
	bussinessType,
}: DashboardDiscountsProps) => {
	const localizationContext = useContext(LocalizationContext);

	const t = localizationContext.useFormatMessage();
	const { activeSupplierId } = useContext(AuthenticationContext);

	const isB2b = bussinessType === BusinessType.B2B;

	const localize = useLocalizedValue();

	const {
		state,
		pageNumber,
		pageCount,
		handlers,
		updateTableState,
		updateCount,
	} = useAdminTable<VinistoProductDllModelsApiBundleBundle>(
		[
			{
				id: 'name',
				desc: true,
			},
		],
		5
	);

	const queryParams: VinistoProductDllModelsApiBundleBundlesGetParameters = {
		supplierIds: [activeSupplierId],
		limit: state.limit,
		offset: state.offset,
		tagId: discountTagId,
		sortingColumn:
			VinistoHelperDllEnumsBundleSortableColumns.PRICE_DISCOUNT_EXPIRATION_DATE,
		isSortingDescending: false,
		isEnabled: true,
		isDeleted: false,
	};

	const { data, isError, isLoading } = useQuery({
		queryKey: ['bundles', queryParams],
		queryFn: () => BundleService.getBundles(queryParams),
		onSuccess: (data) => {
			const bundles = data?.bundles ?? [];
			updateTableState(bundles as VinistoProductDllModelsApiBundleBundle[]);
			updateCount(data.count ?? 0);
		},
		refetchOnWindowFocus: true,
		refetchOnMount: true,
		staleTime: 0,
	});

	const columnsDef: ColumnDef<VinistoProductDllModelsApiBundleBundle>[] = [
		{
			id: 'name',
			header: `${t({ id: 'dashboard.discounts.name' })}`,
			cell: (ctx) => {
				return (
					<Link to={`/bundle-detail/${ctx.row.original.id}`}>
						{localize(ctx.row.original.name as LangValuePair[])}
					</Link>
				);
			},
			enableColumnFilter: false,
			enableSorting: false,
		},
		{
			id: 'price_standard',
			header: `${t({
				id: `dashboard.discounts.priceStandard.${isB2b ? 'B2B' : 'B2C'}`,
			})}`,
			accessorFn: (ctx) => {
				const bundlePrices = bundleAdapter.fromApi(ctx, {
					currency: VinistoHelperDllEnumsCurrency.CZK,
				}).bundlePrices;
				const { basePrice } = bundlePrices ?? {};
				if (!basePrice) return '';
				return `${basePrice?.valueWithVat} Kč`;
			},
			enableColumnFilter: false,
			enableSorting: false,
		},
		{
			id: 'price_discount',
			header: `${t({ id: 'dashboard.discounts.priceDiscount' })}`,
			cell: (ctx) => {
				const bundlePrices = bundleAdapter.fromApi(ctx.row.original, {
					currency: VinistoHelperDllEnumsCurrency.CZK,
				}).bundlePrices;
				const { discountedPrice, basePrice } = bundlePrices ?? {};

				if (!bundlePrices.isDiscounted) return '';

				return (
					<div className="d-flex align-items-center gap-2">
						<DiscountPercentage
							// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
							discountedPriceWithVat={discountedPrice!.valueWithVat}
							standardPriceWithVat={basePrice.valueWithVat}
							options={{
								padTargetLength: 2,
							}}
						/>
						{discountedPrice?.valueWithVat} Kč
					</div>
				);
			},
			enableColumnFilter: false,
			enableSorting: false,
		},
		{
			id: 'discount_start_date',
			header: `${t({ id: 'dashboard.discounts.discountStartDate' })}`,
			accessorFn: (ctx) => {
				const bundlePrices = bundleAdapter.fromApi(ctx, {
					currency: VinistoHelperDllEnumsCurrency.CZK,
				}).bundlePrices;
				const { discountedPrice } = bundlePrices ?? {};
				if (!bundlePrices.isDiscounted || !discountedPrice?.validFrom)
					return '';
				return `${discountedPrice.validFrom.format('DD.MM.YYYY')}`;
			},
			enableColumnFilter: false,
			enableSorting: false,
		},
		{
			id: VinistoHelperDllEnumsBundleSortableColumns.PRICE_DISCOUNT_EXPIRATION_DATE,
			header: `${t({ id: 'dashboard.discounts.discountEndDate' })}`,
			accessorFn: (ctx) => {
				const bundlePrices = bundleAdapter.fromApi(ctx, {
					currency: VinistoHelperDllEnumsCurrency.CZK,
				}).bundlePrices;
				const { discountedPrice } = bundlePrices ?? {};
				if (!bundlePrices.isDiscounted || !discountedPrice?.validTo) return '';
				return `${discountedPrice.validTo.format('DD.MM.YYYY')}`;
			},
			enableColumnFilter: false,
			enableSorting: false,
		},
		{
			id: 'note',
			header: ``,
			enableColumnFilter: false,
			enableSorting: false,
			cell: (ctx) => {
				const bundlePrices = bundleAdapter.fromApi(ctx.row.original, {
					currency: VinistoHelperDllEnumsCurrency.CZK,
				}).bundlePrices;
				const { discountedPrice } = bundlePrices ?? {};
				if (!bundlePrices.isDiscounted || !discountedPrice?.validTo) return '';

				const diff = discountedPrice.validTo.diff(dayjsInstance(), 'days');
				if (diff < DISCOUNT_EXPIRING_DAYS) {
					return <DiscountIsExpiring />;
				}

				return '';
			},
		},
	];

	if (data?.count === 0 || isError)
		return (
			<div className={styles.noData}>
				{t({ id: 'dashboard.discounts.noData' })}
			</div>
		);

	return (
		<>
			<AdminTableLight<VinistoProductDllModelsApiBundleBundle>
				data={
					data?.bundles as unknown as VinistoProductDllModelsApiBundleBundle[]
				}
				columns={columnsDef}
				loading={isLoading}
			/>
			<AdminPagination
				pageCount={pageCount}
				onPageChange={handlers.handleOnPageChange}
				currentPage={pageNumber}
				className={styles.pagination}
			/>
		</>
	);
};

export default DashboardDiscounts;

const DiscountIsExpiring = () => {
	return (
		<div className="fw-bold d-flex align-items-center gap-2">
			Tato akce brzy končí. <InfoButton className={styles.infoButton} />
		</div>
	);
};
