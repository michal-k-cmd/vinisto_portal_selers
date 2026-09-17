import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import Detail from 'Components/Detail';
import {
	DetailTableColumn,
	DetailTableData,
} from 'Components/Detail/Table/types';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';

import styles from './styles.module.css';

import {
	VinistoHelperDllEnumsCurrency,
	VinistoHelperDllEnumsFeeRuleFeeRuleType,
	VinistoOrderDllModelsApiOrderItemsBaseItem,
	VinistoOrderDllModelsApiOrderOrderItem,
} from '@/api-types/order-api';

interface ProvisionsTableProps {
	item?: VinistoOrderDllModelsApiOrderOrderItem;
	setItem?: VinistoOrderDllModelsApiOrderItemsBaseItem;
	discountVolumePrice?: number | null;
	discountVolumePriceWithVat?: number | null;
	setQuantity?: number;
}

const ProvisionsTable = ({
	item,
	setItem,
	discountVolumePrice,
	discountVolumePriceWithVat,
	setQuantity,
}: ProvisionsTableProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	const amount = setQuantity
		? setQuantity * (setItem?.amount ?? 1)
		: item?.quantity ?? '-';
	//@ts-expect-error TS problem
	const bundle = item ? item?.bundle : setItem?.bundle;
	const feeRecord = bundle?.feeRecord;

	const isDomestic = (isDomesticBoolean: boolean) =>
		isDomesticBoolean
			? t({ id: 'orderDetail.bundleProvisions.domestic' })
			: t({ id: 'orderDetail.bundleProvisions.foreign' });

	const getTypeAndKind = ({
		bundleType,
		bundleKind,
	}: {
		bundleType: any;
		bundleKind: any;
	}) => {
		return (
			bundleType?.allowedValues?.join(', ') +
			'; ' +
			bundleKind?.allowedValues?.join(', ') +
			'; '
		);
	};

	// @ts-expect-error TS problem
	const setBundlePrice = setItem?.price?.value;
	// @ts-expect-error TS problem
	const setBundlePriceWithVat = setItem?.price?.valueWithVat;

	const bundlePrice =
		bundle?.discountPrice && 'value' in bundle.discountPrice
			? bundle?.discountPrice?.value
			: discountVolumePrice !== null
			? discountVolumePrice
			: bundle?.price?.value;

	const bundlePriceWithVat =
		bundle?.discountPrice && 'valueWithVat' in bundle.discountPrice
			? bundle?.discountPrice?.valueWithVat
			: discountVolumePriceWithVat !== null
			? discountVolumePriceWithVat
			: bundle?.price?.valueWithVat;

	const orderCurrency =
		bundle?.price?.currency &&
		bundle?.price.currency in VinistoHelperDllEnumsCurrency
			? VinistoHelperDllEnumsCurrency[
					bundle.price.currency as keyof typeof VinistoHelperDllEnumsCurrency
			  ]
			: VinistoHelperDllEnumsCurrency.CZK;

	// BE dont fees with right currency - temporary fixed to CZK
	const CZKCurrency = VinistoHelperDllEnumsCurrency.CZK;

	const provisionTotalFixed = feeRecord?.totalFeeValue?.fixedPrice
		? getLocalizedPrice({
				price: feeRecord?.totalFeeValue?.fixedPrice,
				currency: CZKCurrency,
		  })
		: null;

	const provisionTotalPercentage = feeRecord?.totalFeeValue?.percentage
		? feeRecord?.totalFeeValue?.percentage + '%'
		: null;

	const provisionTotal =
		[provisionTotalFixed, provisionTotalPercentage]
			.filter(Boolean)
			.join(' + ') || '–';

	const provisionLogisticFixed = feeRecord?.logisticFeeValue?.feeValue
		?.fixedPrice
		? getLocalizedPrice({
				price: feeRecord.logisticFeeValue.feeValue.fixedPrice,
				currency: CZKCurrency,
		  })
		: null;

	const provisionLogisticPercentage = feeRecord?.logisticFeeValue?.feeValue
		?.percentage
		? feeRecord.logisticFeeValue.feeValue.percentage + '%'
		: null;

	const provisionLogisticTotal =
		[provisionLogisticFixed, provisionLogisticPercentage]
			.filter(Boolean)
			.join(' + ') || '–';

	const provisionSaleFixed = feeRecord?.saleFeeValue?.feeValue?.fixedPrice
		? getLocalizedPrice({
				price: feeRecord.saleFeeValue.feeValue.fixedPrice,
				currency: CZKCurrency,
		  })
		: null;

	const provisionSaleercentage = feeRecord?.saleFeeValue?.feeValue?.percentage
		? feeRecord.saleFeeValue.feeValue.percentage + '%'
		: null;

	const provisionSaleTotal =
		[provisionSaleFixed, provisionSaleercentage].filter(Boolean).join(' + ') ||
		'–';

	const originCountryLogistic = feeRecord?.logisticFeeValue?.feeRule
		? feeRecord?.logisticFeeValue?.feeRule.originCountry
		: '';

	const destinationCountryLogistic = feeRecord?.logisticFeeValue?.feeRule
		? feeRecord?.logisticFeeValue?.feeRule.destinationCountry
		: '';

	const provisionLogisticRuleName = feeRecord?.logisticFeeValue?.feeRule
		? feeRecord.logisticFeeValue.feeRule.originCountry +
		  '->' +
		  feeRecord.logisticFeeValue.feeRule.destinationCountry +
		  '; ' +
		  ('name' in feeRecord.logisticFeeValue.feeRule
				? feeRecord.logisticFeeValue.feeRule.name &&
				  feeRecord.logisticFeeValue.feeRule.name + '; '
				: getTypeAndKind({
						bundleType:
							'bundleType' in feeRecord.logisticFeeValue.feeRule &&
							feeRecord.logisticFeeValue.feeRule.bundleType,
						bundleKind:
							'bundleKind' in feeRecord.logisticFeeValue.feeRule &&
							feeRecord.logisticFeeValue.feeRule.bundleKind,
				  })) +
		  isDomestic(originCountryLogistic === destinationCountryLogistic)
		: t({ id: 'orderDetail.bundleProvisions.noProvision' });

	const provisionSaleRuleName = feeRecord?.saleFeeValue?.feeRule
		? feeRecord.saleFeeValue.feeRule.originCountry +
		  '->' +
		  feeRecord.saleFeeValue.feeRule.destinationCountry +
		  '; ' +
		  ('name' in feeRecord.saleFeeValue.feeRule
				? feeRecord.saleFeeValue.feeRule.name &&
				  feeRecord.saleFeeValue.feeRule.name + '; '
				: getTypeAndKind({
						bundleType:
							'bundleType' in feeRecord.saleFeeValue.feeRule &&
							feeRecord.saleFeeValue.feeRule.bundleType,
						bundleKind:
							'bundleKind' in feeRecord.saleFeeValue.feeRule &&
							feeRecord.saleFeeValue.feeRule.bundleKind,
				  })) +
		  t({
				id:
					'orderDetail.bundleProvisions.' +
					feeRecord.saleFeeValue.feeRule.production,
		  })
		: t({ id: 'orderDetail.bundleProvisions.noProvision' });

	const tableColumns: DetailTableColumn[] = [
		{ title: t({ id: 'orderDetail.bundleProvisions.name' }), width: '100%' },
		{ title: t({ id: 'orderDetail.bundleProvisions.info' }) },
		{
			title: t({ id: 'orderDetail.bundleProvisions.price' }),
			minWidth: '105px',
		},
		{
			title: t({ id: 'orderDetail.bundleProvisions.priceWithVat' }),
			minWidth: '105px',
		},
		{
			title: t({ id: 'orderDetail.bundleProvisions.amount' }),
			minWidth: '70px',
		},
		{ title: t({ id: 'orderDetail.bundleProvisions.priceTotal' }) },
		{ title: t({ id: 'orderDetail.bundleProvisions.priceWithVatTotal' }) },
	];

	const tableData: DetailTableData = [
		[
			t({ id: 'orderDetail.bundleProvisions.productPrice' }),
			'-',
			getLocalizedPrice({
				price: setBundlePrice ?? bundlePrice ?? 0,
				currency: orderCurrency,
				decimalPlaces: 2,
			}),
			getLocalizedPrice({
				price: setBundlePriceWithVat ?? bundlePriceWithVat ?? 0,
				currency: orderCurrency,
				decimalPlaces: 2,
			}),
			amount,
			amount !== '-'
				? getLocalizedPrice({
						price: (setBundlePrice ?? bundlePrice ?? 0) * amount,
						currency: orderCurrency,
						decimalPlaces: 2,
				  })
				: '-',
			amount !== '-'
				? getLocalizedPrice({
						price: (setBundlePriceWithVat ?? bundlePriceWithVat ?? 0) * amount,
						currency: orderCurrency,
						decimalPlaces: 2,
				  })
				: '-',
		],
		[
			t({ id: 'orderDetail.bundleProvisions.sellerPayment' }),
			'-',
			feeRecord?.supplierYield !== null
				? getLocalizedPrice({
						price: feeRecord.supplierYield / (amount !== '-' ? amount : 1),
						currency: CZKCurrency,
						decimalPlaces: 2,
				  })
				: '-',
			feeRecord?.supplierYieldWithVat !== null
				? getLocalizedPrice({
						price:
							feeRecord.supplierYieldWithVat / (amount !== '-' ? amount : 1),
						currency: CZKCurrency,
						decimalPlaces: 2,
				  })
				: '-',
			amount,
			feeRecord?.supplierYield !== null
				? getLocalizedPrice({
						price: feeRecord.supplierYield,
						currency: CZKCurrency,
						decimalPlaces: 2,
				  })
				: '-',
			feeRecord?.supplierYieldWithVat !== null
				? getLocalizedPrice({
						price: feeRecord.supplierYieldWithVat,
						currency: CZKCurrency,
						decimalPlaces: 2,
				  })
				: '-',
		],
		[
			<>
				{t(
					{ id: 'orderDetail.bundleProvisions.provision' },
					{
						total: (
							<span className={styles.lightText}>
								({t({ id: 'orderDetail.bundleProvisions.provision.total' })})
							</span>
						),
					}
				)}
			</>,
			provisionTotal,
			feeRecord?.totalFeeValue?.vinistoFeeValue
				? getLocalizedPrice({
						price:
							feeRecord.totalFeeValue.vinistoFeeValue /
							(amount !== '-' ? amount : 1),
						currency: CZKCurrency,
						decimalPlaces: 2,
				  })
				: '-',
			feeRecord?.totalFeeValue?.vinistoFeeValueWithVat
				? getLocalizedPrice({
						price:
							feeRecord.totalFeeValue.vinistoFeeValueWithVat /
							(amount !== '-' ? amount : 1),
						currency: CZKCurrency,
						decimalPlaces: 2,
				  })
				: '-',
			amount,
			feeRecord?.totalFeeValue?.vinistoFeeValue
				? getLocalizedPrice({
						price: feeRecord.totalFeeValue.vinistoFeeValue,
						currency: CZKCurrency,
						decimalPlaces: 2,
				  })
				: '-',
			feeRecord?.totalFeeValue?.vinistoFeeValueWithVat
				? getLocalizedPrice({
						price: feeRecord.totalFeeValue.vinistoFeeValueWithVat,
						currency: CZKCurrency,
						decimalPlaces: 2,
				  })
				: '-',
		],
		[
			<div
				key={`logFee${bundle.id}`}
				className={styles.provisionFee}
			>
				{`${provisionLogisticRuleName} `}
				<div className={styles.lightText}>
					({t({ id: 'orderDetail.bundleProvisions.provisionLogistic' })})
				</div>
			</div>,
			provisionLogisticTotal,
			feeRecord?.logisticFeeValue?.feeValue?.vinistoFeeValue
				? getLocalizedPrice({
						price:
							feeRecord.logisticFeeValue.feeValue.vinistoFeeValue /
							(amount !== '-' ? amount : 1),
						currency: CZKCurrency,
						decimalPlaces: 2,
				  })
				: '-',
			feeRecord?.logisticFeeValue?.feeValue?.vinistoFeeValueWithVat
				? getLocalizedPrice({
						price:
							feeRecord.logisticFeeValue.feeValue.vinistoFeeValueWithVat /
							(amount !== '-' ? amount : 1),
						currency: CZKCurrency,
						decimalPlaces: 2,
				  })
				: '-',
			amount,
			feeRecord?.logisticFeeValue?.feeValue?.vinistoFeeValue
				? getLocalizedPrice({
						price: feeRecord.logisticFeeValue.feeValue.vinistoFeeValue,
						currency: CZKCurrency,
						decimalPlaces: 2,
				  })
				: '-',
			feeRecord?.logisticFeeValue?.feeValue?.vinistoFeeValueWithVat
				? getLocalizedPrice({
						price: feeRecord.logisticFeeValue.feeValue.vinistoFeeValueWithVat,
						currency: CZKCurrency,
						decimalPlaces: 2,
				  })
				: '-',
		],
		[
			<div
				key={`sellFee${bundle.id}`}
				className={styles.provisionFee}
			>
				{`${provisionSaleRuleName}`}
				<div className={styles.lightText}>
					(
					{feeRecord?.saleFeeValue?.feeRule?.type ===
					VinistoHelperDllEnumsFeeRuleFeeRuleType.DynamicSale
						? t({ id: 'orderDetail.bundleProvisions.dynamicProvision' })
						: t({ id: 'orderDetail.bundleProvisions.provisionSelling' })}
					)
				</div>
			</div>,
			provisionSaleTotal,
			feeRecord?.saleFeeValue?.feeValue?.vinistoFeeValue
				? getLocalizedPrice({
						price:
							feeRecord.saleFeeValue.feeValue.vinistoFeeValue /
							(amount !== '-' ? amount : 1),
						currency: CZKCurrency,
						decimalPlaces: 2,
				  })
				: '-',
			feeRecord?.saleFeeValue?.feeValue?.vinistoFeeValueWithVat
				? getLocalizedPrice({
						price:
							feeRecord.saleFeeValue.feeValue.vinistoFeeValueWithVat /
							(amount !== '-' ? amount : 1),
						currency: CZKCurrency,
						decimalPlaces: 2,
				  })
				: '-',
			amount,
			feeRecord?.saleFeeValue?.feeValue?.vinistoFeeValue
				? getLocalizedPrice({
						price: feeRecord.saleFeeValue.feeValue.vinistoFeeValue,
						currency: CZKCurrency,
						decimalPlaces: 2,
				  })
				: '-',
			feeRecord?.saleFeeValue?.feeValue?.vinistoFeeValueWithVat
				? getLocalizedPrice({
						price: feeRecord.saleFeeValue.feeValue.vinistoFeeValueWithVat,
						currency: CZKCurrency,
						decimalPlaces: 2,
				  })
				: '-',
		],
	];

	return (
		<div className="table-responsive mb-4">
			<Detail.Table
				columns={tableColumns}
				data={tableData}
				className={styles.provisionsTable}
			/>
		</div>
	);
};

export default ProvisionsTable;
