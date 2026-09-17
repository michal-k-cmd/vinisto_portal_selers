import { useCallback, useContext, useRef, useState } from 'react';
import cx from 'classnames';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LocalizationContext } from 'Services/LocalizationService';
import Rating from 'Components/Rating';
import FilterDropdownArrowIcon from 'Components/Icons/FilterDropdownArrow';
import getSrcSet from 'Helpers/getSrcSet';
import { BasketContext } from 'Services/BasketService';
import getFlagSpecification from 'Helpers/getFlagSpecification';
import { WarehouseContext } from 'Services/WarehouseService';
import { ModalContext } from 'Components/Modal/context';
import { FILL_NICKNAME_MODAL, REVIEW_MODAL } from 'Components/Modal/constants';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import PlusIcon from 'Components/Icons/PlusIcon';
import { getLocalizedOrderState } from 'pages-spa/UserSection/Orders/helpers';
import useLocalizedDateTime from 'Hooks/useLocalizedDateTime';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';
import { DeviceServiceContext } from 'Services/DeviceService';
import UserBundleNotes from 'pages-spa/UserSection/UserBundleNotes';
import EditIcon from 'Components/Icons/Edit';
import { VinistoHelperDllEnumsCurrency } from 'vinisto_api_client/src/api-types/order-api';
import { useFindBundleInBasket } from 'pages-spa/Bundle/hooks';
import { useIsB2b } from 'Services/PlatformService';

import { BoughtProductProps, Order } from './interface';
import styles from './styles.module.css';
import LastOrderLink from './Columns/LastOrderLink';

const BoughtProduct = ({
	image,
	bundleId,
	bundleName,
	bundleUrl,
	bundleSpecificationDetails,
	bundle,
	orders,
	rating,
	notes,
	refetchBoughtProducts,
	refetchBundleNotes,
	showRatingButton = true,
	showNewNoteButton = true,
	showBuyAgainButton = true,
	showMoreButton = true,
	showLastOrder = false,
	showEditRatingButton = false,
	productClassName,
	lastOrderClassName,
	showMoreContent,
}: BoughtProductProps) => {
	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();
	const { handleOnAddToBasket } = useContext(BasketContext);
	const router = useRouter();
	const warehouseContext = useContext(WarehouseContext);
	const { handleOpenModal } = useContext(ModalContext);
	const { nickname } = useContext(AuthenticationContext).vinistoUser;
	const { isDesktop } = useContext(DeviceServiceContext);
	const isB2b = useIsB2b();

	const itemInBasket = useFindBundleInBasket({ bundleId });

	const getLocalizedDate = useLocalizedDateTime();

	const {
		shortVariety: producerName,
		component: flag,
		varietyUrl: producerUrl,
	} = getFlagSpecification(bundleSpecificationDetails || []);

	const availableQuantity = warehouseContext.getQuantity(bundleId);
	const {
		isDeleted,
		isSaleOver,
		temporaryUnavailable: isTemporaryUnavailable,
		isGift,
		isSet,
	} = bundle ?? {};

	const [isOpen, setIsOpen] = useState<boolean>(false);

	const srcSet = getSrcSet(image?.domainUrls);

	const handleBuyAgain = useCallback(
		async ({ openCrossSellModal = true }) => {
			if (itemInBasket) {
				return router.push(`/${t({ id: 'routes.cart.route' })}`);
			}

			await handleOnAddToBasket({
				quantity: 1,
				bundleId: String(bundleId),
				bundleMetaForAnalytics: {
					item_name: bundleName,
					item_brand: producerName,
					// TODO ADD SOME PRICE - but I don't have a clue where to get it from, I can't find it in any of the interfaces
					price: 0,
				},
				openCrossSellModal,
			});

			router.push(`/${t({ id: 'routes.cart.route' })}`);
		},
		[
			itemInBasket,
			handleOnAddToBasket,
			bundleId,
			bundleName,
			producerName,
			router,
			t,
		]
	);

	const handleOpenRatingModal = useCallback(
		() =>
			nickname
				? handleOpenModal(REVIEW_MODAL, {
						bundleId,
						forceReload: refetchBoughtProducts,
						title: t({ id: 'modal.review.modalTitle' }, { name: bundleName }),

						reviewData: rating,
				  })
				: handleOpenModal(FILL_NICKNAME_MODAL),
		[
			nickname,
			handleOpenModal,
			bundleId,
			refetchBoughtProducts,
			t,
			bundleName,
			rating,
		]
	);

	const inputRef = useRef<HTMLTextAreaElement>(null);

	const handleOnAddNote = useCallback(() => {
		setIsOpen(true);
		inputRef.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'center',
		});
		inputRef.current?.focus();
	}, []);

	return (
		<div className={cx(styles.productWrap, isOpen && styles.open)}>
			<div className={cx(styles.product, productClassName)}>
				<div className={styles.imageWrap}>
					<img
						srcSet={srcSet ?? undefined}
						sizes={`(max-width: 767.98px) 60px, 80px`}
						src={image?.domainUrls?.['original_png']}
						alt={bundleName}
						className={styles.image}
					/>
				</div>
				<div className={styles.productInfo}>
					<Link
						href={`/${t({ id: 'routes.product.route' })}/${bundleUrl}`}
						className={styles.productName}
					>
						{bundleName}
					</Link>
					<Link
						href={`/${t({
							id: 'routes.products.route',
						})}/Vyrobce/${producerUrl}`}
						className={styles.producer}
					>
						{flag}
						<span className={styles.producerName}>{producerName}</span>
					</Link>
				</div>

				{showLastOrder && orders && orders.length > 0 ? (
					<LastOrderLink
						order={
							orders[orders.length - 1].id &&
							orders[orders.length - 1].orderNumber
								? ({
										order_id: orders[orders.length - 1].id,
										order_number: orders[orders.length - 1].orderNumber,
								  } as Order)
								: null
						}
						className={lastOrderClassName}
					/>
				) : (
					<div className={styles.orders}>
						{orders && (
							<div>
								{t(
									{
										id: 'userSection.bought-products.orders.pluralized',
									},
									{ count: orders.length }
								)}
							</div>
						)}
						{!!notes?.length && (
							<div>
								<span className={styles.separator}>, </span>
								{t(
									{
										id: 'userSection.bought-products.notes.pluralized',
									},
									{ count: notes.length }
								)}
							</div>
						)}
					</div>
				)}

				{showMoreButton && !isDesktop && (
					<div className={cx(styles.more, isOpen && styles.open)}>
						<div className={styles.overflow}>
							{showMoreContent ? (
								showMoreContent
							) : (
								<>
									<div className={styles.notes}>
										<p className={styles.subheading}>
											{t({
												id: 'userSection.bought-products.notes',
											})}
										</p>
										<p className={styles.notesInfo}>
											{t({
												id: 'userSection.bought-products.notesInfo',
											})}
										</p>
										<UserBundleNotes
											notes={notes}
											bundleId={bundleId}
											inputRef={inputRef}
											refetchData={refetchBundleNotes}
										/>
									</div>
									<div className={styles.productOrders}>
										<p className={styles.subheading}>
											{t({
												id: 'userSection.bought-products.orders',
											})}
										</p>
										<div className={styles.productOrdersTable}>
											{orders &&
												orders.map((order, index) => (
													<div
														className={styles.productOrdersTableItem}
														key={'usboughtpri' + index}
													>
														<Link
															href={`/${t({
																id: 'routes.user-section.route',
															})}/${t({
																id: 'routes.user-section.orders.route',
															})}?id=${order.id}`}
															key={'usboughtprili' + index}
															className={styles.orderLink}
														>
															{t(
																{ id: 'userSection.order.title' },
																{ value: order.orderNumber }
															)}
														</Link>
														<div
															className={styles.orderStatus}
															style={{
																color: getLocalizedOrderState(
																	order?.state ?? ''
																).color,
															}}
														>
															{t({
																id: getLocalizedOrderState(order?.state ?? '')
																	.text,
															})}
														</div>
														<div className={styles.orderDate}>
															{getLocalizedDate(
																Number(order?.createdAt) * 1000
															)}
														</div>
														<div className={styles.orderPrice}>
															{t({
																id: 'userSection.bought-products.order.price',
															})}{' '}
															<span className={styles.price}>
																{getLocalizedPrice({
																	price: Number(order?.orderPriceWithVat),
																	currency:
																		order?.orderCurrency as VinistoHelperDllEnumsCurrency,
																})}
															</span>
														</div>
													</div>
												))}
										</div>
									</div>
								</>
							)}
						</div>
					</div>
				)}

				<div className={styles.buttons}>
					{showRatingButton && !isB2b && (
						<div className={styles.ratingWrap}>
							{rating?.stars != null ? (
								<button
									className={styles.rating}
									onClick={handleOpenRatingModal}
								>
									<Rating
										defaultValue={rating.stars / 2}
										isLarge
										readOnly
									/>
								</button>
							) : (
								<button
									className={cx(styles.rateButton, {
										invisible: isSet,
									})}
									onClick={handleOpenRatingModal}
								>
									{t({ id: 'userSection.boughtProduct.rateProduct' })}
								</button>
							)}
						</div>
					)}
					{showNewNoteButton && (
						<button
							className={styles.rateButton}
							onClick={handleOnAddNote}
						>
							<PlusIcon className={styles.plusNote} />{' '}
							{t({ id: 'userSection.bought-products.newNote' })}
						</button>
					)}
					{showBuyAgainButton && (
						<div className={styles.buyAgainWrap}>
							<button
								className={styles.buyAgainButton}
								onClick={() => handleBuyAgain({ openCrossSellModal: false })}
								disabled={
									availableQuantity === 0 ||
									isDeleted ||
									isSaleOver ||
									isTemporaryUnavailable ||
									isGift
								}
							>
								{t({ id: 'userSection.order.btn.buyAgain' })}
							</button>
						</div>
					)}
					{showEditRatingButton && !isB2b && (
						<button
							className={styles.rateButton}
							onClick={handleOpenRatingModal}
						>
							<EditIcon className={styles.editIcon} />{' '}
							{t({ id: 'userSection.boughtProduct.editRating' })}
						</button>
					)}
					{showMoreButton && (
						<button
							className={cx(styles.moreInfoButton, isOpen && styles.open)}
							onClick={() => setIsOpen(!isOpen)}
						>
							{t({
								id: isOpen
									? 'userSection.bought-products.lessInfo'
									: 'userSection.bought-products.moreInfo',
							})}
							<FilterDropdownArrowIcon />
						</button>
					)}
				</div>
			</div>
			{showMoreButton && isDesktop && (
				<div className={cx(styles.more, isOpen && styles.open)}>
					<div className={styles.overflow}>
						{showMoreContent ? (
							showMoreContent
						) : (
							<>
								<div className={styles.notes}>
									<p className={styles.subheading}>
										{t({
											id: 'userSection.bought-products.notes',
										})}
									</p>
									<p className={styles.notesInfo}>
										{t({
											id: 'userSection.bought-products.notesInfo',
										})}
									</p>
									<UserBundleNotes
										notes={notes}
										bundleId={bundleId}
										inputRef={inputRef}
										refetchData={refetchBundleNotes}
									/>
								</div>
								<div className={styles.productOrders}>
									<p className={styles.subheading}>
										{t({
											id: 'userSection.bought-products.orders',
										})}
									</p>
									<div className={styles.productOrdersTable}>
										{orders &&
											orders.map((order, index) => (
												<div
													className={styles.productOrdersTableItem}
													key={'usboughtorders' + index}
												>
													<Link
														href={`/${t({
															id: 'routes.user-section.route',
														})}/${t({
															id: 'routes.user-section.orders.route',
														})}?id=${order.id}`}
														key={'usboughtordersi' + index}
														className={styles.orderLink}
													>
														{t(
															{ id: 'userSection.order.title' },
															{ value: order.orderNumber }
														)}
													</Link>
													<div
														className={styles.orderStatus}
														style={{
															color: getLocalizedOrderState(order?.state ?? '')
																.color,
														}}
													>
														{t({
															id: getLocalizedOrderState(order?.state ?? '')
																.text,
														})}
													</div>
													<div className={styles.orderDate}>
														{getLocalizedDate(Number(order?.createdAt) * 1000)}
													</div>
													<div className={styles.orderPrice}>
														{t({
															id: 'userSection.bought-products.order.price',
														})}{' '}
														<span className={styles.price}>
															{getLocalizedPrice({
																price: Number(order?.orderPriceWithVat),
																currency:
																	order?.orderCurrency as VinistoHelperDllEnumsCurrency,
															})}
														</span>
													</div>
												</div>
											))}
									</div>
								</div>
							</>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default BoughtProduct;
