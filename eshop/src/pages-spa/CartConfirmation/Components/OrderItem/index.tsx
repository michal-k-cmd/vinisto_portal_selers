import { useContext } from 'react';
import cx from 'classnames';
import Skeleton from 'react-loading-skeleton';
import Flag from 'Components/Flag';
import { IOrderItemDataProps } from 'pages-spa/CartConfirmation/Components/OrderItem/interfaces';
import { getCountryCode } from 'Helpers/getFlagSpecification';
import { DeviceServiceContext } from 'Services/DeviceService';
import { LocalizationContext } from 'Services/LocalizationService';
import BundleProducer from 'Components/ProductBox/Components/BundleProducer';
import { getDiscountPriceValues } from 'vinisto_shared/src/price/get-discount-prices';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';
import { useIsB2b } from 'Services/PlatformService';

const OrderItem = ({ orderItemData, isGift }: IOrderItemDataProps) => {
	const isB2b = useIsB2b();
	const t = useContext(LocalizationContext).useFormatMessage();
	const deviceServiceContext = useContext(DeviceServiceContext);
	const isDesktop = deviceServiceContext.isDesktop;

	const bundle = orderItemData.bundle;
	const quantity = orderItemData.quantity ?? 0;

	if (bundle === null || bundle === undefined) return null;

	const basePrice = bundle.price;

	const discountedPrice = bundle.discountPrice;

	const calculatedPriceAfterB2bDiscount =
		orderItemData && 'calculatedPriceAfterB2bDiscount' in orderItemData
			? orderItemData.calculatedPriceAfterB2bDiscount
			: null;

	const { discountedPriceWithoutVat, discountedPriceWithVat } =
		getDiscountPriceValues({
			quantityInBasket: quantity,
			basePrice,
			discountedPrice: calculatedPriceAfterB2bDiscount ?? discountedPrice,
		});

	const priceCurrency = bundle.price?.currency;

	const producerSpecificationValue = bundle.producerSpecification?.value ?? '';

	const countrySpecification = bundle.countrySpecification ?? '';

	const supplierName = bundle.supplierDetail?.nameWeb ?? '';

	// THIS WILL ALWAYS BE FALSE DUE TO THE CONDITION ON LINE 23 (`if (bundle === null || bundle === undefined) return null`)
	// All the code branches returning skeletons are completely pointless here. TODO refactor this.
	const isLoading = bundle === null;

	const priceWithVat = discountedPriceWithVat ?? basePrice?.valueWithVat;

	const priceWithoutVat = discountedPriceWithoutVat ?? basePrice?.value;

	const totalPriceWithoutVAT = (priceWithoutVat ?? 0) * quantity;

	const totalPriceWithVAT = (priceWithVat ?? 0) * quantity;

	return (
		<>
			<div className="vinisto-user-orders__orders__order-body__item vinisto-cart__item vinisto-order-summary desktop-only">
				<div className="vinisto-user-orders__orders__order-body__item__info">
					<div className="vinisto-user-orders__orders__order-body__item__info__img">
						{isLoading ? (
							<Skeleton
								height="80px"
								width="80%"
							/>
						) : (
							<img
								src={bundle.mainImage?.domainUrls?.thumb_64x80}
								alt={`${t({ id: 'alt.bundleImage' })}`}
							/>
						)}
					</div>
					<div className="vinisto-user-orders__orders__order-body__item__info__data">
						<div className="vinisto-user-orders__orders__order-body__item__info__data__name">
							{isLoading ? <Skeleton /> : bundle.name}
						</div>
						{isLoading ? (
							<Skeleton width="90%" />
						) : (
							<div className="vinisto-user-orders__orders__order-body__item__info__data__winery">
								<BundleProducer
									flag={
										<Flag
											code={getCountryCode(countrySpecification)}
											width="24"
											className="vinisto-flag"
										/>
									}
									name={producerSpecificationValue}
								/>
							</div>
						)}
					</div>
				</div>

				<div>
					{isLoading ? (
						<Skeleton
							count={1.6}
							width="80px"
						/>
					) : (
						<>
							<div className="vinisto-user-orders__orders__order-body__item__prices__total">
								<span className="fw-bolder">
									<span className="fw-light">{quantity} x </span>
									{getLocalizedPrice({
										price: (isB2b ? priceWithoutVat : priceWithVat) ?? 0,
										currency: priceCurrency,
									})}
								</span>
							</div>
							<div className="vinisto-user-orders__orders__order-body__item__prices__total mt-1">
								{t(
									{ id: 'bundle.supplierSmall.name' },
									{
										name: (
											<span className="vinisto-color-success fw-bolder">
												{supplierName.length > 0
													? supplierName
													: t({
															id: 'productDetail.seller.name.others',
													  })}
											</span>
										),
									}
								)}
							</div>
						</>
					)}
				</div>

				<div className="vinisto-cart__item__price">
					<div className="vinisto-user-orders__orders__order-body__item__prices">
						{isLoading ? (
							<Skeleton
								count={1.6}
								width="80px"
							/>
						) : !isGift ? (
							<>
								<div className="vinisto-user-orders__orders__order-body__item__prices__total">
									{`${t({ id: 'basket.totalPrice' })} `}
									<span
										className={cx('fw-bold', {
											'vinisto-user-orders__orders__order-body__item__prices__big-price':
												isDesktop,
										})}
									>
										{getLocalizedPrice({
											price: isB2b ? totalPriceWithoutVAT : totalPriceWithVAT,
											currency: priceCurrency,
										})}
									</span>
								</div>

								<div className="vinisto-user-orders__orders__order-body__item__prices__without-vat">
									{`${t({
										id: isB2b
											? 'basket.priceWithVAT'
											: 'basket.priceWithoutVAT',
									})} `}
									<span className="fw-bolder price-span">
										{getLocalizedPrice({
											price: isB2b ? totalPriceWithVAT : totalPriceWithoutVAT,
											currency: priceCurrency,
										})}
									</span>
								</div>
							</>
						) : (
							<div className="vinisto-user-orders__orders__order-body__item__prices__total fw-bold vinisto-user-orders__orders__order-body__item__prices__big-price">
								{`${t({ id: 'basket.price.free' })} `}
							</div>
						)}
					</div>
				</div>
			</div>
			<div className="vinisto-user-favorite vinisto-cart__item--mobile tablet-mobile-only border border-0">
				<div className="vinisto-user-orders__orders__order-body d-block">
					<div className="vinisto-user-orders__orders__order-body__item">
						<div className="vinisto-user-orders__orders__order-body__item__close"></div>
						<div className="vinisto-user-orders__orders__order-body__item__info__img">
							{isLoading ? (
								<Skeleton
									height="80px"
									width="80%"
								/>
							) : (
								<img
									src={bundle.mainImage?.domainUrls?.thumb_64x80}
									alt={`${t({ id: 'alt.bundleImage' })}`}
								/>
							)}
						</div>
						<div className="vinisto-user-orders__orders__order-body__item__info vinisto-cart-item-info">
							<div className="vinisto-user-orders__orders__order-body__item__info__data">
								<div className="vinisto-user-orders__orders__order-body__item__info__data__name mb-0">
									{isLoading ? <Skeleton /> : bundle.name}
								</div>
							</div>
							<div className="vinisto-user-orders__orders__order-body__item__info__data w-100">
								<div className="w-100">
									<div className="vinisto-user-orders__orders__order-body__item__info__data__winery">
										{isLoading ? (
											<Skeleton width="90%" />
										) : (
											<div className="vinisto-user-orders__orders__order-body__item__info__data__winery">
												<BundleProducer
													flag={
														<Flag
															code={getCountryCode(countrySpecification)}
															width="24"
															className="vinisto-flag"
														/>
													}
													name={producerSpecificationValue}
												/>
											</div>
										)}
									</div>
								</div>
								<div></div>
							</div>
							<div className="vinisto-user-orders__orders__order-body__item__info__data mt-2 flex-wrap align-items-start">
								<div className="vinisto-user-orders__orders__order-body__item__prices__without-vat d-flex flex-column">
									<div className="vinisto-order-finish__count">
										{t({ id: 'carousel.info.pcs' }, { count: quantity })}
									</div>
									<div className="tablet-mobile-only">
										{t(
											{ id: 'bundle.supplierSmall.name' },
											{
												name: (
													<span className="vinisto-color-success fw-bolder">
														{supplierName.length > 0
															? supplierName
															: t({
																	id: 'productDetail.seller.name.others',
															  })}
													</span>
												),
											}
										)}
									</div>
								</div>
								{!isGift ? (
									<div className="vinisto-user-orders__orders__order-body__item__prices">
										<div className="vinisto-user-orders__orders__order-body__item__prices__total">
											<span className="vinisto-user-orders__orders__order-body__item__prices__big-price">
												{getLocalizedPrice({
													price: isB2b
														? totalPriceWithoutVAT
														: totalPriceWithVAT,
													currency: priceCurrency,
												})}
											</span>
										</div>
										<div className="vinisto-user-orders__orders__order-body__item__prices__without-vat">
											{`${t({
												id: isB2b
													? 'basket.priceWithVAT'
													: 'basket.priceWithoutVAT',
											})} `}
											<span className="fw-bolder price-span">
												{getLocalizedPrice({
													price: isB2b
														? totalPriceWithVAT
														: totalPriceWithoutVAT,
													currency: priceCurrency,
												})}
											</span>
										</div>
									</div>
								) : (
									<div className="vinisto-user-orders__orders__order-body__item__prices">
										<div className="vinisto-user-orders__orders__order-body__item__prices__total">
											<span className="vinisto-user-orders__orders__order-body__item__prices__big-price">
												{`${t({ id: 'basket.price.free' })}`}
											</span>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default OrderItem;
