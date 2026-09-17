'use client';

import { useContext, useEffect } from 'react';
import { ModalContext } from 'Components/Modal/context';
import { LocalizationContext } from 'Services/LocalizationService';
import FreeDeliveryProgressBar from 'Components/FreeDeliveryProgressBar';
import NextLink from 'next/link';
import getBundleImage, { IMAGE_SIZE_THUMB_64x80 } from 'Helpers/getBundleImage';
// import { useCurrentlyRecommendedTagBundles } from 'Hooks/useCurrentlyRecommendedTagBundles';
import ProductBox from 'Components/ProductBox';
import { QuantityBoxTypes } from 'Components/QuantityBox/constants';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import Flag from 'Components/Flag';
import { PRODUCERS_SPECIFICATION_UNIVERSAL_ID } from 'pages-spa/Producers/constants';
import useOnClickOutside from 'Hooks/useOnClickOutside';
import {
	RecommenderName,
	useExternalRecommendedBundles,
} from 'Hooks/useExternalRecommendedBundles';
import useAnalytics from 'Hooks/useAnalytics';
import { GA_EVENT } from 'Hooks/useAnalytics/constants';
import { AuthenticationContext } from 'Services/AuthenticationService/context';

import styles from './styles.module.css';

import { BundleSpecificationDetails } from '@/domain/bundle/specification-details';
import { Bundle } from '@/domain/bundle';

const CrossSellModal = () => {
	const { vinistoUser } = useContext(AuthenticationContext);
	const { modalData, handleCloseModal, modalRef } = useContext(ModalContext);
	const t = useContext(LocalizationContext).useFormatMessage();
	const getLocalizedValue = useLocalizedValue();
	const { sendEvent } = useAnalytics();

	const bundleItem = modalData?.bundleItem ?? {};
	const quantity = modalData?.quantity ?? 1;

	// Recommender carusel disabled in favor for external recomender
	//const currentlyRecommendedCarouselDataQuery =
	//	useCurrentlyRecommendedTagBundles();

	const externalRecommendedCarouselDataQuery = useExternalRecommendedBundles({
		type: RecommenderName.Basket_popup,
	});

	const supplier = bundleItem?.supplier;

	const producers = bundleItem?.specificationDetails?.find(
		(specification: BundleSpecificationDetails) =>
			specification.definition.id === PRODUCERS_SPECIFICATION_UNIVERSAL_ID
	);
	const producerNames =
		Object.values(producers?.definition.allowedValues ?? {})?.map((value) =>
			// @ts-expect-error Wrong typing
			getLocalizedValue(value.name || [])
		) ?? [].join(', ');

	const supplierName =
		supplier?.nameWeb ??
		t({
			id: 'productDetail.seller.name.others',
		});

	useOnClickOutside(
		[(modalRef as React.RefObject<Element>) ?? { current: null }],
		handleCloseModal
	);

	useEffect(() => {
		if (externalRecommendedCarouselDataQuery.data?.bundles.length) {
			const recommenderMeta = externalRecommendedCarouselDataQuery.data?.meta;
			const recommendedBundles =
				externalRecommendedCarouselDataQuery.data?.bundles;
			sendEvent(GA_EVENT.VIEW_ITEM_LIST, {
				item_list_id: 'recommendation_basket_popup',
				item_list_name: 'Recommendation',
				items: recommendedBundles.map((bundle, i) => ({
					item_id: bundle.id,
					item_name: getLocalizedValue(bundle.name),
					item_list_id: 'recommendation_basket_popup',
					item_list_name: 'Recommendation',
					index: i + 1,
					price:
						bundle.bundlePrices.discountedPrice?.value ??
						bundle.bundlePrices.basePrice?.value ??
						0,
				})),
				// @ts-expect-error analytics object is probably not typed exactly(?)
				filters: {
					recommender_client_identifier:
						recommenderMeta?.recommender_client_identifier,
					item_ids: recommendedBundles.map((bundle) => bundle.id),
					recommender: recommenderMeta?.recommender,
					recommendation_type: recommenderMeta?.recommendation_type,
					recommendation_id: recommenderMeta?.recommender_client_identifier,
					user_id: vinistoUser.id ?? null,
				},
			});
		}
	}, [
		externalRecommendedCarouselDataQuery.data?.bundles,
		externalRecommendedCarouselDataQuery.data?.meta,
		getLocalizedValue,
		sendEvent,
		vinistoUser.id,
	]);

	return (
		<>
			<div className={styles.modalHeader}>
				<div className={styles.header}>
					{t({ id: 'modal.crossSell.modalTitle' })}
				</div>
				<div className={styles.freeDeliveryWrap}>
					<FreeDeliveryProgressBar variant={'basket-horizontal'} />
				</div>
			</div>
			<div className={styles.addedItem}>
				<div className={styles.image}>
					{bundleItem && (
						<img
							src={getBundleImage(
								bundleItem?.images ?? [],
								IMAGE_SIZE_THUMB_64x80
							)}
							alt={`${t({ id: 'alt.bundleImage' })}`}
						/>
					)}
				</div>
				<div>
					<div className={styles.title}>
						{getLocalizedValue(bundleItem.name || []) ?? '-'}
					</div>
					{(supplier?.countryCode ?? producerNames ?? supplierName) && (
						<div className={styles.info}>
							{supplier?.countryCode && (
								<Flag
									code={supplier?.countryCode}
									className={styles.flag}
									width={16}
									height={12}
								/>
							)}
							{producerNames && (
								<span className={styles.producerName}>
									{producerNames}
									{producerNames && supplierName && (
										<span className={styles.sellerSeparator}> | </span>
									)}
								</span>
							)}

							{supplierName && (
								<span className={styles.sellerName}>
									{t(
										{ id: 'bundle.supplier.name' },
										{
											name: supplierName,
										}
									)}
								</span>
							)}
						</div>
					)}
				</div>
				<div>
					{t(
						{ id: 'order.pcs' },
						{
							count: quantity,
						}
					)}
				</div>
				<div className={styles.added}>{t({ id: 'modal.crossSell.added' })}</div>
			</div>
			<div className={styles.buttons}>
				<button
					className={styles.continue}
					onClick={() => handleCloseModal()}
				>
					{t({ id: 'modal.crossSell.continueShopping' })}
				</button>
				<NextLink
					className={styles.goToBasket}
					href={`/${t({ id: 'routes.cart.route' })}`}
					onClick={() => handleCloseModal()}
				>
					{t({ id: 'modal.crossSell.viewBasket' })}
				</NextLink>
			</div>
			<div className={styles.crossSellHeading}>
				{t({ id: 'modal.crossSell.crossSellHeading' })}
			</div>
			<div className={styles.crossSellItems}>
				{externalRecommendedCarouselDataQuery.data?.bundles?.map(
					(bundle: Bundle, index: number) => (
						<div
							className={styles.crossSellItem}
							key={bundle.id ?? index}
						>
							<ProductBox
								bundleData={bundle}
								openCrossSellModal={true}
								isCrossSell={true}
								showAddToBasketBtn={true}
								quantityBoxType={QuantityBoxTypes.DIRECT}
								itemListId="recommendation_basket_popup"
								itemListName="Recommendation"
								position={index}
							/>
						</div>
					)
				)}
			</div>
		</>
	);
};

export default CrossSellModal;
