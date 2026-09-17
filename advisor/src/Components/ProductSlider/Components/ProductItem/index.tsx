/* eslint-disable jsx-a11y/no-static-element-interactions */

import { useCallback } from 'react';
import Skeleton from 'react-loading-skeleton';
import cx from 'classnames';
import useSearchParams from 'Hooks/useSearchParams';
import { getBundleProducerNames } from 'Helpers/getBundleProducerNames';
import getLocalizedValue from 'Helpers/getLocalizedValue';

import { AdvisedBundleProps } from '../../interfaces';
import getFlagSpecification from '../../../../Helpers/getFlagSpecification';
import BundleProducer from '../BundleProducer';
import ProductSpecifications from '../Specifications';
import { ESHOP_URL } from '../../../../Services/constants';
import QuantityBox from '../../../QuantityBox';

import styles from './style.module.css';

import { bundleAdapter } from '@/index';
import { VinistoHelperDllEnumsCurrency } from '@/api-types/product-api';

const ProductItem = ({
	bundle,
	isLoading,
	isActive = false,
	skeletonAnimationEnable,
}: AdvisedBundleProps) => {
	const { currency = VinistoHelperDllEnumsCurrency.CZK } = useSearchParams();

	const adaptedBundle = bundle
		? bundleAdapter.fromApi(bundle, {
				currency: currency as VinistoHelperDllEnumsCurrency,
		  })
		: null;

	const bundlePrices = adaptedBundle?.bundlePrices ?? null;

	const { isDiscounted, discountedPrice, basePrice } = bundlePrices ?? {};

	const specificationDetails = bundle?.specificationDetails ?? [];
	const { component: flag } = getFlagSpecification(specificationDetails);
	const producerNames = getBundleProducerNames(adaptedBundle);

	const price = isDiscounted ? discountedPrice : basePrice;

	const bundleMetaForAnalytics = {
		item_name: getLocalizedValue(adaptedBundle?.name),
		item_brand: producerNames.join(', '),
		price: price?.value ?? 0,
	};

	const handleOpenBundleDetail = useCallback(() => {
		!isLoading &&
			isActive &&
			window.open(
				`${ESHOP_URL}/produkt-detail/${bundle?.url?.[0].value}`,
				'_blank'
			);
	}, [bundle?.url, isActive, isLoading]);

	return (
		<div
			className={cx(styles.productWrapper, isActive, {
				[styles.productWrapperInactive]: !isActive,
			})}
			onClick={handleOpenBundleDetail}
		>
			<div
				className={cx(styles.productWrapperOverflow, {
					[styles.productWrapperOverflowInactive]: !isActive,
				})}
			>
				<div
					className={cx(styles.thumbnailInfo, {
						[styles.thumbnailInfoInactive]: !isActive,
					})}
				>
					<div
						className={cx(styles.productThumbnail, {
							[styles.productThumbnailInactive]: !isActive,
						})}
					>
						{isLoading ? (
							<Skeleton
								width="32px"
								height="140px"
								className={styles.productThumbnailSkeleton}
								enableAnimation={skeletonAnimationEnable ? true : false}
							/>
						) : (
							<img
								src={bundle?.images?.[0]?.domainUrls?.thumb_208x240}
								alt="Product thumbnail"
								className={cx(styles.productThumbnailImg, {
									[styles.productThumbnailImgInactive]: !isActive,
								})}
							/>
						)}
					</div>
					<div
						className={cx(styles.productInfo, {
							[styles.productInfoInactive]: !isActive,
						})}
					>
						<div
							className={cx(styles.productInfoAnimationWrapper, {
								[styles.productInfoAnimationWrapperInactive]: !isActive,
							})}
						>
							<div
								className={cx(styles.productName, {
									[styles.productNameInactive]: !isActive,
								})}
							>
								{isLoading ? (
									<Skeleton
										height="12px"
										enableAnimation={skeletonAnimationEnable ? true : false}
										className={styles.productSkeleton}
									/>
								) : (
									bundle?.name?.[0].value
								)}
							</div>
							{isLoading ? (
								<Skeleton
									width="50px"
									height="12px"
									className={styles.productNameSkeleton}
									enableAnimation={skeletonAnimationEnable ? true : false}
								/>
							) : (
								<div
									className={cx(styles.productBundleProducer, {
										[styles.productBundleProducerInactive]: !isActive,
									})}
								>
									<BundleProducer
										flag={flag}
										name={producerNames.join(', ')}
									/>
								</div>
							)}
							<div
								className={cx(
									{ [styles.productSpecifications]: !isLoading },
									{
										[styles.productSpecificationsInactive]: !isActive,
									}
								)}
							>
								{isLoading ? (
									<Skeleton
										width="50px"
										height="12px"
										enableAnimation={skeletonAnimationEnable ? true : false}
									/>
								) : (
									<ProductSpecifications
										specifications={specificationDetails}
									/>
								)}
							</div>
							<div
								className={cx(
									{ [styles.productDescription]: !isLoading },
									{
										[styles.productDescriptionInactive]: !isActive,
									}
								)}
							>
								{isLoading ? (
									<Skeleton
										height="12px"
										count={4}
										enableAnimation={skeletonAnimationEnable ? true : false}
										className={styles.productSkeleton}
									/>
								) : (
									<div
										dangerouslySetInnerHTML={{
											__html: bundle?.description?.[0]?.value || '',
										}}
									></div>
								)}
							</div>
						</div>
					</div>
				</div>
				<div
					className={cx(styles.priceAddToCart, {
						[styles.priceAddToCartInactive]: !isActive,
					})}
				>
					<div
						className={cx(styles.priceAddToCartAnimatedWrapper, {
							[styles.priceAddToCartAnimatedWrapperInactive]: !isActive,
						})}
					>
						<div className={styles.productPrices}>
							<div className={styles.productPrice}>
								{isDiscounted && (
									<span className={styles.productPriceOriginal}>
										{basePrice?.getFormatedValue()}
									</span>
								)}
								{isLoading ? (
									<Skeleton
										width="35px"
										height="10px"
										enableAnimation={skeletonAnimationEnable ? true : false}
									/>
								) : (
									price?.getFormatedValueWithVat()
								)}
							</div>
							<div className={styles.productPriceNoVat}>
								{isLoading ? (
									<Skeleton
										width="20px"
										height="7px"
										enableAnimation={skeletonAnimationEnable ? true : false}
									/>
								) : (
									`bez DPH ${price?.getFormatedValue()}`
								)}
							</div>
						</div>
						<div
							className={styles.quantityBoxWrapper}
							onClick={(e) => {
								e.stopPropagation();
							}}
						>
							{isLoading || !bundle ? (
								<Skeleton
									height="30px"
									count={1}
									enableAnimation={skeletonAnimationEnable ? true : false}
									className={styles.productSkeleton}
								/>
							) : (
								<QuantityBox
									bundleId={bundle.id}
									bundleMetaForAnalytics={bundleMetaForAnalytics}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductItem;
