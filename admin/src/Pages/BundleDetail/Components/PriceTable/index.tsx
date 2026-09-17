import { useCallback, useContext, useMemo } from 'react';
import { TableSchema } from 'Hooks/useTableSchema/interfaces';
import Detail from 'Components/Detail';
import { LocalizationContext } from 'Services/LocalizationService';
import { dayjsInstance as dayjs } from 'vinisto_shared';
import DeleteIcon from 'Components/Icons/Delete';
import { DiscountPercentage } from 'vinisto_ui';
import { JANUARY_FIRST_2038_IN_SECONDS } from 'Pages/BundleDetail/constants';
import { DISCOUNT_TYPE_TRANSLATIONS_MAP } from 'Pages/DiscountedBundleList/constants';
import { apiServiceInstance } from 'Services/ApiService';
import { NotificationsContext } from 'Services/NotificationService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { confirmAlert } from 'react-confirm-alert';
import { IntegrationContext } from 'Services/IntergationService';
import { UseQueryResult } from '@tanstack/react-query';
import { Dayjs } from 'dayjs';
import { isB2b, isB2c } from 'Services/IntergationService/helpers';

import styles from './styles.module.css';
import { transformPlatformPricesToTablePrices } from './helpers';

import { Bundle } from '@/domain/bundle';
import {
	BundlesEditVolumeDiscountPriceUpdatePayload,
	VinistoHelperDllEnumsCurrency,
	VinistoHelperDllEnumsPriceDiscountType,
	VinistoHelperDllEnumsPriceLevel,
	VinistoProductDllModelsApiBundlePricesReturn,
} from '@/api-types/product-api';
import Price, { DiscountedPrice } from '@/domain/price';

interface PriceTableProps {
	bundle: Bundle;
	handleOnRemoveBundlePrice: (
		currency: string,
		priceType: VinistoHelperDllEnumsPriceLevel,
		discountType?: VinistoHelperDllEnumsPriceDiscountType,
		platformId?: number,
		discountId?: string
	) => () => void;
	refetchBundleDetail: () => void;
	refetchBundlePrices: () => void;
	pricesQuery: UseQueryResult<
		VinistoProductDllModelsApiBundlePricesReturn,
		unknown
	>;
}

const PriceTable = ({
	bundle,
	handleOnRemoveBundlePrice,
	refetchBundleDetail,
	refetchBundlePrices,
	pricesQuery,
}: PriceTableProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const { getIntegrationById } = useContext(IntegrationContext);
	const { handleShowSuccessNotification, handleShowErrorNotification } =
		useContext(NotificationsContext);
	const { vinistoUser } = useContext(AuthenticationContext);

	const { bundlePrices } = bundle;
	const { allDiscountedPrices } = bundlePrices;

	const platforms = Array.from(
		[
			...(pricesQuery.data?.prices ?? []),
			...(pricesQuery.data?.discountPrices ?? []),
		].reduce((acc, item) => {
			const platformId = item.platformId;
			if (typeof platformId === 'number') {
				acc.add(platformId);
			}
			return acc;
		}, new Set<number>())
	).sort((a, b) => a - b);

	const platformPrices = pricesQuery.data
		? platforms.map((platform) =>
				transformPlatformPricesToTablePrices(pricesQuery.data, platform)
		  )
		: [];

	// BUSSINES LOGIC NOTE: currently, only B2C bundles can have volume discount
	// Should this change, this have to change as well
	const volumeBundlePrice = allDiscountedPrices.find(
		(price) =>
			price.discountType ===
			VinistoHelperDllEnumsPriceDiscountType.VolumeDiscount
	);

	const handleDeleteVolumeDiscount = useCallback(
		(params: {
			volumeDiscountQuantity: number;
			priceType: VinistoHelperDllEnumsPriceLevel;
		}) => {
			const { volumeDiscountQuantity, priceType } = params;

			if (volumeBundlePrice === undefined) return;

			const filteredValues =
				'values' in volumeBundlePrice &&
				(volumeBundlePrice?.values ?? [])
					.filter((value) => value.quantity !== volumeDiscountQuantity)
					.map((value: any) => {
						return {
							[value.quantity]: value.value,
						};
					});

			const filteredValuesTransformed: { [key: string]: any } = {};
			filteredValues &&
				filteredValues.forEach((value: any) => {
					Object.keys(value).forEach((key) => {
						filteredValuesTransformed[key] = value[key];
					});
				});

			const requestData: BundlesEditVolumeDiscountPriceUpdatePayload = {
				id: 'priceId' in volumeBundlePrice ? volumeBundlePrice?.priceId : '',
				values: filteredValuesTransformed ?? {},
				currency:
					volumeBundlePrice?.currency ?? VinistoHelperDllEnumsCurrency.CZK,
				validFrom: Number(volumeBundlePrice?.validFrom)
					? Number(volumeBundlePrice?.validFrom) / 1000
					: null,
				validTo: Number(volumeBundlePrice?.validTo)
					? Number(volumeBundlePrice?.validTo) / 1000
					: null,
				priceLevel: priceType,
				isSupplierDiscount:
					('isSupplierDiscount' in volumeBundlePrice &&
						volumeBundlePrice?.isSupplierDiscount) ??
					false,
				userLoginHash: vinistoUser?.loginHash,
			};

			confirmAlert({
				title: `${t(
					{
						id: 'admin.confirm.deleteBundlePrice.title',
					},
					{
						priceTypeAccusative: String(
							t({ id: 'priceTypeAccusative.discount' })
						),
					}
				)}`,
				message: `${t(
					{
						id: 'admin.confirm.deleteBundlePrice.message',
					},
					{
						priceTypeAccusative: String(
							t({ id: 'priceTypeAccusative.discount' })
						),
					}
				)}`,
				buttons: [
					{
						label: `${t({
							id: 'admin.confirm.deleteBundlePrice.yes',
						})}`,
						onClick: () => {
							apiServiceInstance
								.put(
									`product-api/bundles/${bundle.id}/EditVolumeDiscountPrice`,
									requestData,
									true
								)
								.then(() => {
									handleShowSuccessNotification(
										'admin.addVolumeDiscountToBundle.success'
									);
									refetchBundleDetail();
									refetchBundlePrices?.();
								})
								.catch(() => {
									handleShowErrorNotification(
										'admin.addVolumeDiscountToBundle.error',
										{}
									);
								});
						},
					},
					{
						label: `${t({
							id: 'admin.confirm.deleteBundlePrice.no',
						})}`,
					},
				],
			});
		},
		[
			bundle.id,
			handleShowErrorNotification,
			handleShowSuccessNotification,
			refetchBundleDetail,
			refetchBundlePrices,
			t,
			vinistoUser?.loginHash,
			volumeBundlePrice,
		]
	);

	const handleDelete = useCallback(
		(params: {
			currency: string;
			priceType: VinistoHelperDllEnumsPriceLevel;
			discountType?: VinistoHelperDllEnumsPriceDiscountType;
			volumeDiscountQuantity?: number;
			platformId: number;
			priceId?: string;
		}) => {
			const {
				currency,
				priceType,
				discountType,
				volumeDiscountQuantity,
				platformId,
				priceId,
			} = params;
			if (
				volumeBundlePrice &&
				'values' in volumeBundlePrice &&
				(volumeBundlePrice.values ?? []).length > 1 &&
				volumeDiscountQuantity
			) {
				handleDeleteVolumeDiscount({
					volumeDiscountQuantity,
					priceType,
				});
			} else {
				handleOnRemoveBundlePrice(
					currency,
					priceType,
					discountType,
					platformId,
					priceId
				)();
			}
		},
		[handleDeleteVolumeDiscount, handleOnRemoveBundlePrice, volumeBundlePrice]
	);

	type PriceRow = (Price | DiscountedPrice) & {
		id: string;
		isSupplierDiscount?: boolean;
		validFrom?: Dayjs | null;
		validTo?: Dayjs | null;
		discountedValue?: number;
		discountedValueWithVat?: number;
		volumeDiscountQuantity?: number;
		discountType?: VinistoHelperDllEnumsPriceDiscountType;
	};

	const PriceTableSchema: TableSchema<PriceRow> = useMemo(
		() => [
			{
				header: `${t({ id: 'admin.logList.priceType' })}`,
				accessorFn: (ctx) => {
					const {
						discountType,
						volumeDiscountQuantity,
						platformId,
						priceType,
					} = ctx;
					if (
						discountType ===
						VinistoHelperDllEnumsPriceDiscountType.VolumeDiscount
					)
						return `B2C Množstevní sleva (od ${volumeDiscountQuantity} ks)`;

					if (
						isB2c(platformId) &&
						priceType === VinistoHelperDllEnumsPriceLevel.Level1
					)
						return `B2C`;

					if (isB2c(platformId)) return `B2C ${t({ id: priceType })}`;

					if (isB2b(platformId))
						return t({ id: `VinistoB2b.${ctx.priceType}` });

					return `${getIntegrationById(ctx.platformId)?.integrationName} ${
						ctx.priceType
					}`;
				},
				size: 165,
				enableSorting: false,
				enableColumnFilter: false,
			},
			{
				header: `${t({ id: 'orderDetail.totalOrderPrice' })}`,
				accessorFn: (ctx) => {
					if (!ctx.value) return null;
					return `${ctx.value} ${t({ id: ctx.currency })}`;
				},
				size: 110,
				enableSorting: false,
				enableColumnFilter: false,
			},
			{
				header: `${t({ id: 'VatRate' })}`,
				accessorFn: (ctx) => {
					if (!ctx.vatValue) return null;
					return `${ctx.vatValue} %`;
				},
				size: 70,
				enableSorting: false,
				enableColumnFilter: false,
			},
			{
				header: `${t({ id: 'bundle.item.price' })}`,
				accessorFn: (ctx) => {
					if (!ctx.valueWithVat) return null;
					return `${ctx.valueWithVat} ${t({ id: ctx.currency })}`;
				},
				size: 110,
				enableSorting: false,
				enableColumnFilter: false,
			},
			{
				header: `${t({ id: 'discountWithoutVat' })}`,
				cell: (ctx) => {
					const { value, discountedValue, currency } = ctx.row.original;
					if (!discountedValue) return null;
					return (
						<div className={styles.discountedPrice}>
							<span className="text-nowrap">{`${discountedValue} ${currency}`}</span>
							<DiscountPercentage
								discountedPriceWithVat={discountedValue}
								standardPriceWithVat={value}
							/>
						</div>
					);
				},
				size: 150,
				enableSorting: false,
				enableColumnFilter: false,
			},
			{
				header: `${t({ id: 'discountWithVat' })}`,
				cell: (ctx) => {
					const { discountedValueWithVat, valueWithVat, currency } =
						ctx.row.original;
					if (!discountedValueWithVat) return null;
					return (
						<div className={styles.discountedPrice}>
							<span className="text-nowrap">{`${discountedValueWithVat} ${currency}`}</span>
							<DiscountPercentage
								discountedPriceWithVat={discountedValueWithVat}
								standardPriceWithVat={valueWithVat}
							/>
						</div>
					);
				},
				size: 150,
				enableSorting: false,
				enableColumnFilter: false,
			},
			{
				header: `${t({ id: 'discountDuration' })}`,
				cell: (context) => {
					const { validFrom, validTo } = context.row.original;
					const isUntilCancelled =
						dayjs.unix(JANUARY_FIRST_2038_IN_SECONDS).toString() ===
						validTo?.utc(true).toString();

					if (!validFrom || !validTo) return null;
					dayjs(context.row.original.validTo).format(
						`${t({ id: 'admin.dateFormat' })}`
					);
					return `${validFrom.format(`${t({ id: 'admin.dateFormat' })}`)} – ${
						isUntilCancelled
							? t({
									id: 'admin.bundleDetail.orderLimitation.untilCancellation',
							  })
							: validTo.format(`${t({ id: 'admin.dateFormat' })}`)
					}`;
				},
				size: 160,
				enableSorting: false,
				enableColumnFilter: false,
			},
			{
				header: `${t({ id: 'admin.priceType.discountType' })}`,
				accessorFn: (ctx) => {
					const isSupplierDiscountText =
						ctx.isSupplierDiscount !== undefined
							? ` - ${ctx.isSupplierDiscount ? 'za prodejce' : 'za vinisto'}`
							: '';
					if (bundle.flags.isSet) {
						return `${t({
							id: 'admin.priceType.setDiscount',
						})}${isSupplierDiscountText}`;
					}
					if (!ctx.discountType) return null;
					return `${t({
						id: DISCOUNT_TYPE_TRANSLATIONS_MAP[ctx.discountType],
					})}${isSupplierDiscountText}`;
				},
				size: 150,
				enableSorting: false,
				enableColumnFilter: false,
			},
			{
				header: `${t({ id: 'actions' })}`,
				size: 50,
				cell: ({ row }) => {
					const {
						currency,
						priceType,
						discountType,
						platformId,
						volumeDiscountQuantity,
						id,
					} = row.original;

					const isBasePrice =
						priceType === VinistoHelperDllEnumsPriceLevel.Level1 &&
						isB2c(platformId) &&
						!discountType;

					if (isBasePrice || !priceType || bundle.flags.isSet) return null;

					return (
						<button>
							<DeleteIcon
								onClick={() =>
									handleDelete({
										currency,
										priceType,
										discountType,
										volumeDiscountQuantity,
										platformId,
										priceId: id,
									})
								}
							/>
						</button>
					);
				},
			},
		],
		[bundle.flags.isSet, getIntegrationById, handleDelete, t]
	);

	return (
		<>
			{platformPrices.map((platformPriceData, i) => (
				<div
					className="table-responsive w-100"
					key={i}
				>
					<Detail.DynamicTable<PriceRow>
						className="mb-5"
						key={i}
						// @ts-expect-error the typing is overly complex here and probably not worth fixing for now
						data={platformPriceData}
						columns={PriceTableSchema}
					/>
				</div>
			))}
		</>
	);
};

export default PriceTable;
