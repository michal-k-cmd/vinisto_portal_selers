import {
	type KeyboardEvent,
	type MouseEvent,
	useCallback,
	useContext,
	useState,
} from 'react';
import cx from 'classnames';
import { get, toNumber, unescape } from 'lodash-es';
import Skeleton from 'react-loading-skeleton';
import Link from 'next/link';
import { IQuantityBoxProps } from 'Components/ProductBox/Components/QuantityBox/interfaces';
import { MIN_QUANTITY } from 'Components/ProductBox/Components/QuantityBox/constants';
import createCurrencyValue from 'Helpers/createCurrencyValue';
import getBundleImage, { IMAGE_SIZE_THUMB_64x80 } from 'Helpers/getBundleImage';
import getFlagSpecification from 'Helpers/getFlagSpecification';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { FavoritesContext } from 'Services/FavoritesService';
import { LocalizationContext } from 'Services/LocalizationService';
import { WarehouseContext } from 'Services/WarehouseService';
import BundleProducer from 'Components/ProductBox/Components/BundleProducer';
import ButtonAddToBasket from 'Components/ProductBox/Components/ButtonAddToBasket';
import QuantityBox from 'Components/ProductBox/Components/QuantityBox';
import Rating from 'Components/Rating';
import StockAvailability from 'Components/StockAvailability';
import { bundleAdapter } from 'vinisto_api_client/src/index';
import { VinistoHelperDllEnumsCurrency } from 'vinisto_api_client/src/api-types/product-api';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { useIsB2b } from 'Services/PlatformService';

import ButtonFavorites from '../ButtonFavorites';

import { IFavoriteProps } from './interfaces';

const FavoritesItem = (props: IFavoriteProps) => {
	const { handleOnRemoveItemFromFavorites, handleOnAddToFavorites } =
		useContext(FavoritesContext);
	const localizationContext = useContext(LocalizationContext);
	const { title: currencyTitle, currency } = localizationContext.activeCurrency;
	const { priceLevel } = useContext(AuthenticationContext).vinistoUser;

	const warehouseContext = useContext(WarehouseContext);
	const getLocalizedValue = useLocalizedValue();
	const t = localizationContext.useFormatMessage();
	const isB2b = useIsB2b();

	const { favoriteData } = props;

	const bundleData = 'isLoading' in favoriteData ? null : favoriteData.Bundle;
	const alwaysRedirectToDetail = get(props, 'alwaysRedirectToDetail', false);
	const isUniqueBundle = true;
	const localizedBundleUrl = getLocalizedValue(get(bundleData, 'url', []));
	const itemId = get(bundleData, 'id', '');
	const isRemoved = get(props, 'isRemoved', false);
	const isTemporaryUnavailable = bundleData?.temporaryUnavailable ?? false;

	const bundlePrice = bundleData
		? bundleAdapter.fromApi(bundleData, {
				currency,
				customerPriceLevel: priceLevel,
		  }).bundlePrices
		: null;

	const { basePrice, discountedPrice, isDiscounted } = bundlePrice ?? {};

	const { shortVariety: producerName, component: flag } = getFlagSpecification(
		bundleData?.specificationDetails ?? []
	);
	const isLoading = get(props, 'isLoading', false);

	const availableQuantity = bundleData?.id
		? [warehouseContext.getQuantity(bundleData.id)].filter(
				(x): x is number => x !== undefined
		  )
		: [];
	const rating = get(bundleData, 'bundleEvaluation.averageStars', 0) / 2;
	const totalEvaluationCount = get(
		bundleData,
		'bundleEvaluation.totalEvaluationCount',
		0
	);

	const [quantity, setQuantity] =
		useState<IQuantityBoxProps['quantity']>(MIN_QUANTITY);

	const handleRemoveItemFromFavorites = useCallback(
		(event: MouseEvent<HTMLElement>) => {
			if (event) {
				event.stopPropagation();
				event.preventDefault();
			}

			handleOnRemoveItemFromFavorites(itemId);
		},
		[handleOnRemoveItemFromFavorites, itemId]
	);

	const handleOnReturnBundleBack = useCallback(
		(event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => {
			if (event) {
				event.stopPropagation();
				event.preventDefault();
			}

			handleOnAddToFavorites(itemId);
		},
		[handleOnAddToFavorites, itemId]
	);

	const bundleMetaForAnalytics = {
		item_name: getLocalizedValue(bundleData?.name),
		item_brand: producerName,
		price: isDiscounted
			? discountedPrice?.valueWithVat ?? 0
			: basePrice?.valueWithVat ?? 0,
	};

	return (
		<div
			className={cx('vinisto-user-favorite', {
				discounted: isDiscounted,
			})}
		>
			<div className="vinisto-user-orders__orders__order-body__item">
				<div className="vinisto-user-orders__orders__order-body__item__info">
					{!isLoading && (
						<Link
							className="vinisto-wine__item-overlay"
							href={`/${t({
								id: 'routes.product.route',
							})}/${localizedBundleUrl}`}
						/>
					)}
					<div className="vinisto-user-orders__orders__order-body__item__info__img">
						{isLoading ? (
							<Skeleton
								containerClassName="w-75 h-100 d-block mx-auto"
								height="68px"
							/>
						) : (
							<img
								src={getBundleImage(
									get(bundleData, 'images', []),
									IMAGE_SIZE_THUMB_64x80
								)}
								alt={`${t({ id: 'alt.bundleImage' })}`}
							/>
						)}
					</div>
					<div className="vinisto-user-orders__orders__order-body__item__info__data">
						<div className="vinisto-user-orders__orders__order-body__item__info__data__name">
							{isLoading ? (
								<Skeleton />
							) : (
								// TODO solve html entities in a more robust way in the future
								unescape(getLocalizedValue(bundleData?.name)) ?? '-'
							)}
						</div>
						{!isB2b && (
							<div className="vinisto-user-orders__orders__order-body__item__info__data__score">
								{isLoading ? (
									<Skeleton
										width="20px"
										count={5}
										style={{ marginRight: '.125rem' }}
										inline
									/>
								) : (
									<div className="vinisto-wine__review mb-0">
										<Rating
											defaultValue={rating}
											readOnly
										/>
										<span className="vinisto-wine__review__wrap-count">
											({totalEvaluationCount})
										</span>
									</div>
								)}
							</div>
						)}
						{isLoading ? (
							<Skeleton containerClassName="w-100" />
						) : (
							<div className="vinisto-user-orders__orders__order-body__item__info__data__winery">
								<BundleProducer
									flag={flag}
									name={producerName}
									isLoading={isLoading}
								/>
							</div>
						)}
					</div>
				</div>

				<div className="vinisto-user-orders__orders__order-body__item__prices">
					{isLoading ? (
						<Skeleton
							count={1.6}
							width="50%"
						/>
					) : (
						<>
							<div className="vinisto-user-orders__orders__order-body__item__prices__total">
								<span className="vinisto-user-orders__orders__order-body__item__prices__big-price">
									{t(
										{
											id: isUniqueBundle ? 'price' : 'price.from',
										},
										{
											value: createCurrencyValue(
												basePrice?.valueWithVat ?? 0,
												1,
												currency === VinistoHelperDllEnumsCurrency.EUR ? 2 : 0
											),
											currency: `${currencyTitle}`,
										}
									)}
								</span>
								{isDiscounted && (
									<span className="vinisto-user-orders__orders__order-body__item__prices__big-price-discounted">
										{t(
											{
												id: isUniqueBundle ? 'price' : 'price.from',
											},
											{
												value: createCurrencyValue(
													discountedPrice?.valueWithVat ?? 0,
													1,
													currency === VinistoHelperDllEnumsCurrency.EUR ? 2 : 0
												),
												currency: `${currencyTitle}`,
											}
										)}
									</span>
								)}
							</div>
							<div className="vinisto-user-orders__orders__order-body__item__prices__without-vat">
								{`${t({ id: 'basket.priceWithoutVAT' })} `}
								<span className="fw-bolder price-span">{`${
									isDiscounted
										? createCurrencyValue(
												discountedPrice?.value ?? 0,
												1,
												currency === VinistoHelperDllEnumsCurrency.EUR ? 2 : 0
										  )
										: createCurrencyValue(
												basePrice?.value ?? 0,
												1,
												currency === VinistoHelperDllEnumsCurrency.EUR ? 2 : 0
										  )
								} ${currencyTitle}`}</span>
							</div>
						</>
					)}
				</div>

				<div className="vinisto-user-orders__orders__order-body__item__stock">
					<StockAvailability
						availableQuantity={availableQuantity}
						deliveryDate={warehouseContext.deliveryDate}
						isTemporaryUnavailable={isTemporaryUnavailable}
						fallback={<Skeleton width="50%" />}
					/>
				</div>

				{!alwaysRedirectToDetail && (
					<QuantityBox
						{...{
							availableQuantity: availableQuantity[0] ?? 0,
							quantity,
							setQuantity,
							isUniqueBundle,
							isLoading,
						}}
					/>
				)}

				<div className="vinisto-user-orders__orders__order__cta">
					{isLoading ? (
						<Skeleton
							width="8.75rem"
							height="30px"
						/>
					) : !alwaysRedirectToDetail ? (
						<ButtonAddToBasket
							count={toNumber(quantity)}
							bundleId={itemId}
							bundleMetaForAnalytics={bundleMetaForAnalytics}
							availableCount={availableQuantity[0] ?? 0}
							disabled={
								availableQuantity.length === 0 || availableQuantity[0] <= 0
							}
						/>
					) : (
						<Link
							href={`/${t({
								id: 'routes.product.route',
							})}/${localizedBundleUrl}`}
						>
							<button className="vinisto-wine__add-to-cart__button vinisto-bg-green vinisto-btn">
								{t({ id: 'bundle.button.show' })}
							</button>
						</Link>
					)}
				</div>
				{isLoading ? (
					<Skeleton
						width="20px"
						height="20px"
					/>
				) : (
					<ButtonFavorites
						{...{ itemId }}
						removeItemFromFavorites={handleRemoveItemFromFavorites}
					/>
				)}
				{isRemoved && (
					<div className="vinisto-user-favorite__delete-wrap">
						<div
							className="vinisto-user-favorite__delete-wrap__text"
							onClick={handleOnReturnBundleBack}
							onKeyDown={handleOnReturnBundleBack}
							tabIndex={0}
							role="button"
						>
							{t({ id: 'userSection.favorites.removed.label' })}
							<br />
							<span className="color-primary pointer fw-bolder">
								{t({
									id: 'userSection.favorites.removed.returnBack',
								})}
							</span>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default FavoritesItem;
