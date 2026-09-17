import {
	VinistoCommonDllModelsApiPricesPriceDiscountVolume,
	VinistoHelperDllEnumsAddonAddonType,
	VinistoHelperDllEnumsCurrency,
	VinistoHelperDllEnumsDiscountCouponDiscountCouponType,
	VinistoOrderDllModelsApiOrderAddonItem,
	VinistoOrderDllModelsApiOrderBundle,
	VinistoOrderDllModelsApiOrderDelivery,
	VinistoOrderDllModelsApiOrderDiscountCouponAmountDiscountCouponDefinition,
	VinistoOrderDllModelsApiOrderDiscountCouponPercentageDiscountCouponDefinition,
	VinistoOrderDllModelsApiOrderOrderItem,
	VinistoOrderDllModelsApiOrderPayment,
} from 'vinisto_api_client/src/api-types/order-api';
import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import Detail from 'Components/Detail';
import {
	DetailTableColumn,
	DetailTableData,
} from 'Components/Detail/Table/types';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { useNavigate } from 'react-router-dom';
import formatPrice from 'Helpers/format-price';
import PriceWithDiscount from 'Components/PriceWithDiscount';
import cx from 'classnames';
import { ModalContext } from 'Components/Modal/context';
import { BUNDLE_PROVISIONS } from 'Components/Modal/constants';
import { isB2b, isB2c } from 'Services/IntergationService/helpers';

import styles from './styles.module.css';
import ProvisionModalLink from './ProvisionModalLink';

import { VinistoHelperDllEnumsPriceLevel } from '@/api-types/user-api';

interface OrderItemsProps {
	items: VinistoOrderDllModelsApiOrderOrderItem[] | null | undefined;
	addons: VinistoOrderDllModelsApiOrderAddonItem[] | null | undefined;
	delivery: VinistoOrderDllModelsApiOrderDelivery | undefined;
	payment: VinistoOrderDllModelsApiOrderPayment | undefined;
	discountCoupons:
		| (
				| VinistoOrderDllModelsApiOrderDiscountCouponAmountDiscountCouponDefinition
				| VinistoOrderDllModelsApiOrderDiscountCouponPercentageDiscountCouponDefinition
		  )[]
		| undefined;
	orderPrice: number | null | undefined;
	orderPriceWithVat: number | null | undefined;
	orderPlatform: number | undefined;
	orderCurrency: VinistoHelperDllEnumsCurrency | null | undefined;
}

const IMAGE_WIDTH = 64;
const NAME_LEFT_PADDING = IMAGE_WIDTH + 3.2 * 2;

/**
 * This could be a helper/util function. it's only used here so far
 */
const getWmsCodeList = (item: VinistoOrderDllModelsApiOrderBundle) => {
	const bundleItems = item?.bundleItems;
	const regularBundleWmsCode = bundleItems
		// @ts-expect-error BE types are not updated? 'product' is not defined in 'bundleItem'
		?.map((bundleItem = {}) => bundleItem.product?.wmsCode)
		.filter(Boolean);

	if (regularBundleWmsCode.length) return regularBundleWmsCode.join(', ');

	const setBundleWmsCode = bundleItems?.map((bundleItem = {}) =>
		// @ts-expect-error BE types are not updated? 'product' is not defined in 'bundleItem'
		bundleItem.bundle.bundleItems
			// @ts-expect-error BE types are not updated? 'product' is not defined in 'bundleItem'
			.map((item = {}) => item.product?.wmsCode)
			.filter(Boolean)
	);

	return setBundleWmsCode.join(', ');
};

const OrderItems = ({
	items,
	addons,
	delivery,
	payment,
	discountCoupons,
	orderPrice,
	orderPriceWithVat,
	orderPlatform,
	orderCurrency,
}: OrderItemsProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const {
		activeCurrency: { title: activeCurrencyTitle },
	} = useContext(LocalizationContext);
	const localize = useLocalizedValue();

	const navigate = useNavigate();

	const shippingPackaging = addons?.find(
		(addon) => addon.addon?.type === 'Service'
	);
	const shippingPackagingName = shippingPackaging?.addon?.name ?? '';
	const shippingPackagingPrices =
		shippingPackaging?.addon?.actions?.[0]?.price ?? null;
	const displayedCurrency =
		orderCurrency ??
		payment?.price?.currency ??
		VinistoHelperDllEnumsCurrency.CZK;

	const tableColumns: DetailTableColumn[] = [
		{ title: t({ id: 'orderDetail.id' }) },
		{ title: t({ id: 'orderDetail.name' }), width: '40%' },
		{ title: t({ id: 'orderDetail.quantity' }) },
		{
			title: t(
				{ id: 'orderDetail.pricePerUnit' },
				{ currency: displayedCurrency }
			),
		},
		{
			title: t({ id: 'orderDetail.vatPercentage' }),
			footer: (
				<>
					<div className={cx(styles.footerCell, styles.footerLabel)}>
						{t({ id: 'orderDetail.totalOrderPrice' })}
					</div>
					<div className={cx(styles.footerCell, styles.footerLabel)}>
						{t({ id: 'orderDetail.vatValue' })}
					</div>
					<div className={cx(styles.footerCell, styles.footerLabel)}>
						{t({ id: 'orderDetail.totalPriceWithVat' })}
					</div>
				</>
			),
		},
		{
			title: t(
				{ id: 'orderDetail.totalPrice' },
				{ currency: displayedCurrency }
			),
			footer: (
				<>
					<div className={styles.footerCell}>{`${formatPrice(
						orderPrice ?? 0
					)} ${displayedCurrency}`}</div>
					<div className={styles.footerCell}>{`${formatPrice(
						(orderPriceWithVat ?? 0) - (orderPrice ?? 0)
					)} ${displayedCurrency}`}</div>
					<div className={styles.footerCell}>{`${formatPrice(
						orderPriceWithVat
					)} ${displayedCurrency}`}</div>
				</>
			),
		},
	];

	let tableData: DetailTableData = [];

	items &&
		items?.length > 0 &&
		(tableData = items?.map((item) => {
			const getVolumeDiscountPrice = () => {
				let highestVolumeDiscount: number | null = null;
				if (
					item.bundle.discountPrice &&
					'values' in item.bundle.discountPrice
				) {
					const volumePrices = item.bundle
						.discountPrice as VinistoCommonDllModelsApiPricesPriceDiscountVolume;
					const volumeDiscounts = volumePrices.values ?? {};

					Object.entries(volumeDiscounts)
						.reverse()
						.forEach((entry) => {
							if (
								highestVolumeDiscount === null &&
								(item?.quantity ?? 1) >= Number(entry[0])
							) {
								highestVolumeDiscount = entry[1];
								return;
							}
						});

					if (highestVolumeDiscount)
						return {
							discountVolumePrice: highestVolumeDiscount,
							discountVolumePriceWithVat:
								(highestVolumeDiscount *
									(100 + (item.bundle?.price?.vatValue ?? 21))) /
								100,
						};
				}
				return { discountVolumePrice: null, discountVolumePriceWithVat: null };
			};

			const { discountVolumePrice, discountVolumePriceWithVat } =
				getVolumeDiscountPrice();

			const basePrice = item.bundle.prices?.find(
				(price) =>
					price.level === VinistoHelperDllEnumsPriceLevel.Level1 &&
					price.platformId &&
					isB2c(price.platformId)
			);

			const isVinistoPlusItem =
				item.bundle.price.level === VinistoHelperDllEnumsPriceLevel.VinistoPlus;

			const hasVinistoPlusDiscount = (() => {
				if (isVinistoPlusItem && typeof basePrice?.valueWithVat === 'number') {
					return (
						basePrice?.valueWithVat - (item?.bundle.price.valueWithVat ?? 0) >
						0.01
					);
				}
				return false;
			})();

			const isDiscounted =
				item.bundle?.discountPrice && 'value' in item.bundle.discountPrice;

			const originalPriceForB2CItem = isDiscounted ? item.bundle.price : null;

			const originalPriceForVinistoPlusItem = hasVinistoPlusDiscount
				? basePrice
				: null;

			const originalPrice = isVinistoPlusItem
				? originalPriceForVinistoPlusItem
				: originalPriceForB2CItem;

			const calculatedPriceAfterB2bDiscount =
				item.calculatedPriceAfterB2bDiscount ?? null;

			const originalPriceForB2bItem = calculatedPriceAfterB2bDiscount
				? item.bundle.price
				: null;

			const isB2bOrder = isB2b(orderPlatform);

			return [
				getWmsCodeList(item.bundle),
				<BundleName
					key={item.bundle?.id}
					bundle={item}
					discountVolumePrice={discountVolumePrice}
					discountVolumePriceWithVat={discountVolumePriceWithVat}
				/>,
				item.quantity,
				!isB2bOrder ? (
					originalPrice ? (
						<PriceWithDiscount
							discountPrice={
								// @ts-expect-error value is not on all possible members
								item.bundle?.discountPrice?.value ??
								item.bundle?.price?.value ??
								0
							}
							price={originalPrice?.value ?? 0}
							key={item.bundle?.id}
						/>
					) : discountVolumePrice !== null ? (
						<PriceWithDiscount
							discountPrice={discountVolumePrice}
							price={item.bundle?.price?.value ?? 0}
							key={item.bundle?.id}
						/>
					) : (
						formatPrice(item.bundle?.price?.value ?? 0)
					)
				) : originalPriceForB2bItem ? (
					<PriceWithDiscount
						discountPrice={
							// @ts-expect-error value is not on all possible members
							calculatedPriceAfterB2bDiscount?.value ??
							// @ts-expect-error value is not on all possible members
							item.bundle?.discountPrice?.value ??
							item.bundle?.price?.value ??
							0
						}
						price={originalPriceForB2bItem.value ?? 0}
						key={item.bundle?.id}
					/>
				) : // Is volume discount possible on B2B?
				discountVolumePrice !== null ? (
					<PriceWithDiscount
						discountPrice={discountVolumePrice}
						price={item.bundle?.price?.value ?? 0}
						key={item.bundle?.id}
					/>
				) : (
					formatPrice(item.bundle?.price?.value ?? 0)
				),
				item.bundle?.price?.vatValue,
				!isB2bOrder ? (
					originalPrice ? (
						<PriceWithDiscount
							discountPrice={
								// @ts-expect-error valueWithVat is not on all possible members
								item.bundle?.discountPrice?.valueWithVat ??
								item.bundle?.price?.valueWithVat ??
								0
							}
							price={originalPrice?.valueWithVat ?? 0}
							quantity={item.quantity ?? 0}
							key={item.bundle?.id}
						/>
					) : discountVolumePriceWithVat !== null ? (
						<PriceWithDiscount
							discountPrice={discountVolumePriceWithVat ?? 0}
							price={item.bundle?.price?.valueWithVat ?? 0}
							quantity={item.quantity ?? 0}
							key={item.bundle?.id}
						/>
					) : (
						formatPrice(
							(item.bundle?.price?.valueWithVat ?? 0) * (item.quantity ?? 0)
						)
					)
				) : originalPriceForB2bItem ? (
					<PriceWithDiscount
						discountPrice={
							// @ts-expect-error value is not on all possible members
							calculatedPriceAfterB2bDiscount.valueWithVat ??
							// @ts-expect-error value is not on all possible members
							item.bundle?.discountPrice?.valueWithVat ??
							item.bundle?.price?.valueWithVat ??
							0
						}
						price={originalPriceForB2bItem.value ?? 0}
						quantity={item.quantity ?? 0}
						percentageDiscount={item.b2bPercentageDiscount}
						key={item.bundle?.id}
					/>
				) : // Is volume discount possible on B2B?
				discountVolumePrice !== null ? (
					<PriceWithDiscount
						discountPrice={discountVolumePrice}
						price={item.bundle?.price?.valueWithVat ?? 0}
						quantity={item.quantity ?? 0}
						key={item.bundle?.id}
					/>
				) : (
					formatPrice(
						(item.bundle?.price?.valueWithVat ?? 0) * (item.quantity ?? 0)
					)
				),
			];
		}));

	addons &&
		addons?.length > 0 &&
		addons
			?.filter(
				(addon) =>
					addon.addon?.type === VinistoHelperDllEnumsAddonAddonType.Gift ||
					addon.addon?.type ===
						VinistoHelperDllEnumsAddonAddonType.SubscriptionYear ||
					addon.addon?.type ===
						VinistoHelperDllEnumsAddonAddonType.SubscriptionMonth
			)
			.forEach((addonItem) => {
				const addon = addonItem.addon;
				const quantity = addonItem.quantity ?? 1;

				const actions = addon?.actions?.[0];
				// @ts-expect-error TS error: Property 'bundle' does not exist on type 'VinistoOrderDllModelsApiOrderAddonItem'.
				const bundle = actions?.bundle ?? null;

				/** Print subscriptions types in order detail if any */
				((addon &&
					addon?.type ===
						VinistoHelperDllEnumsAddonAddonType.SubscriptionYear) ||
					addon?.type ===
						VinistoHelperDllEnumsAddonAddonType.SubscriptionMonth) &&
					tableData?.push([
						'',
						<div
							style={{ display: 'flex', gap: '0.5rem' }}
							key={1}
						>
							<div style={{ padding: '0', width: IMAGE_WIDTH }}></div>
							<Detail.Link
								dangerouslySetInnerHTML={{
									__html:
										t({ id: 'admin.subscription.' + addon?.type + '.label' }) ||
										'',
								}}
							></Detail.Link>
							<div></div>
						</div>,
						'1',
						'',
						'',
						'',
					]);

				bundle &&
					tableData?.push([
						getWmsCodeList(bundle),
						<BundleName
							key={bundle.id}
							item={bundle}
						/>,
						quantity,
						formatPrice(actions?.price?.value ?? 0),
						actions?.price?.vatValue,
						formatPrice((actions?.price?.valueWithVat ?? 0) * (quantity ?? 0)),
					]);
			});

	shippingPackaging &&
		tableData?.push([
			'',
			<Detail.Link
				key={shippingPackaging.addon?.id}
				// TODO: Update the link to the shipping packaging detail page
				onClick={() => navigate(`/addon-detail/${shippingPackaging.addon?.id}`)}
				style={{
					paddingLeft: NAME_LEFT_PADDING,
				}}
			>
				{shippingPackagingName}
			</Detail.Link>,
			1,
			formatPrice(shippingPackagingPrices?.value ?? 0),
			shippingPackagingPrices?.vatValue,
			formatPrice(shippingPackagingPrices?.valueWithVat ?? 0),
		]);

	delivery &&
		tableData?.push([
			'',
			<Detail.Link
				key={delivery?.id}
				onClick={() => navigate(`/delivery-detail/${delivery?.id}`)}
				style={{
					paddingLeft: NAME_LEFT_PADDING,
				}}
			>
				{localize(delivery?.name ?? [])}
			</Detail.Link>,
			1,
			formatPrice(delivery?.price?.value),
			delivery?.price?.vatValue,
			formatPrice(delivery?.price?.valueWithVat),
		]);

	payment &&
		tableData?.push([
			'',
			<Detail.Link
				key={payment?.id}
				onClick={() => navigate(`/payment-detail/${payment?.id}`)}
				style={{
					paddingLeft: NAME_LEFT_PADDING,
				}}
			>
				{localize(payment?.name ?? [])}
			</Detail.Link>,
			1,
			formatPrice(payment?.price?.value),
			payment?.price?.vatValue,
			formatPrice(payment?.price?.valueWithVat),
		]);

	if (discountCoupons && discountCoupons.length > 0) {
		discountCoupons.map((discountCoupon) =>
			tableData?.push([
				'',
				<div key={discountCoupon?.id}>
					<Detail.Link
						onClick={() =>
							navigate(`/discount-coupon-detail/${discountCoupon?.id}`)
						}
						style={{
							paddingLeft: NAME_LEFT_PADDING,
						}}
					>
						{discountCoupon?.code ?? ''}
					</Detail.Link>
					<span>
						{' '}
						(
						{(() => {
							if (
								discountCoupon?.discountCouponType ===
								VinistoHelperDllEnumsDiscountCouponDiscountCouponType.AMOUNT
							)
								return `-${formatPrice(
									//@ts-expect-error - TS can't tell it's an AMOUNT coupon
									discountCoupon?.amountDiscount?.value
								)} ${activeCurrencyTitle}`;

							if (
								discountCoupon?.discountCouponType ===
								VinistoHelperDllEnumsDiscountCouponDiscountCouponType.PERCENTAGE
							)
								//@ts-expect-error - TS can't tell it's an PERCENTAGE coupon
								return `-${discountCoupon?.percentageDiscount}%`;

							if (
								discountCoupon?.discountCouponType ===
								VinistoHelperDllEnumsDiscountCouponDiscountCouponType.GIFT
							)
								//@ts-expect-error - TS can't tell it's an GIFT coupon
								return `-${discountCoupon?.amount?.value} ${activeCurrencyTitle}`;
						})()}
						)
					</span>
				</div>,
				1,
				'',
				'',
				`-${formatPrice(discountCoupon?.discountValueWithVat ?? 0)}`,
			])
		);
	}

	return (
		<Detail.Container>
			<Detail.Heading value={`${t({ id: 'orderDetail.items.title' })}`} />
			<div className="table-responsive">
				<Detail.Table
					columns={tableColumns}
					data={tableData}
				/>
			</div>
		</Detail.Container>
	);
};

export default OrderItems;

interface BundleNameProps {
	item?: VinistoOrderDllModelsApiOrderBundle;
	bundle?: VinistoOrderDllModelsApiOrderOrderItem;
	discountVolumePrice?: number | null;
	discountVolumePriceWithVat?: number | null;
}

const BundleName = ({
	item,
	bundle,
	discountVolumePrice,
	discountVolumePriceWithVat,
}: BundleNameProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const { handleOpenModal } = useContext(ModalContext);
	const navigate = useNavigate();

	const bundleItem = bundle ? bundle.bundle : item;

	const handleOnShowProvisions = () => {
		handleOpenModal(BUNDLE_PROVISIONS, {
			bundle,
			discountVolumePrice,
			discountVolumePriceWithVat,
		});
	};

	const supplierName = bundleItem?.supplierDetail?.nameWeb ?? '';
	const price = bundleItem?.price?.value ?? 0;

	return (
		<div
			key={bundleItem?.id}
			style={{
				display: 'flex',
				gap: '0.5rem',
			}}
		>
			<div
				style={{
					padding: '0.1rem 0',
				}}
			>
				<img
					src={bundleItem?.mainImage?.domainUrls?.thumb_64x80 ?? ''}
					alt={''}
					width={IMAGE_WIDTH}
					height={80}
				/>
			</div>

			<div>
				<Detail.Link
					onClick={() => navigate(`/bundle-detail/${bundleItem?.id}`)}
					dangerouslySetInnerHTML={{ __html: bundleItem?.name ?? '' }}
				></Detail.Link>

				<Detail.InfoWithLabel
					value={`${t({ id: 'orderDetail.supplier' })}: ${supplierName}`}
				></Detail.InfoWithLabel>

				{price > 0 &&
					(bundleItem?.feeRecord ||
						(bundleItem?.isSet &&
							// @ts-expect-error - BE types are not updated? 'bundle' is not defined in 'bundleItem'
							bundleItem?.bundleItems[0].bundle.feeRecord)) && (
						<ProvisionModalLink
							handleOnShowProvisions={handleOnShowProvisions}
						/>
					)}
			</div>
		</div>
	);
};
