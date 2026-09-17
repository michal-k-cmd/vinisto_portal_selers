import AdminDetail from 'Components/AdminDetail';
import {
	COUPON_CREATION_ACTION_TYPE,
	LIMITATION_TYPE,
} from 'Components/Modal/Components/CreateDiscountCoupon/constants';
import { apiServiceInstance } from 'Services/ApiService';
import {
	VinistoHelperDllBaseBaseReturn,
	VinistoHelperDllEnumsDiscountCouponDiscountCouponType,
	VinistoHelperDllEnumsErrorSpecificError,
	VinistoMongoConnectorModelsCommonPricesPrice,
	VinistoOrderDllModelsApiDiscountCouponDefinitionModelsAmountDiscountCouponDefinition,
	VinistoOrderDllModelsApiDiscountCouponDefinitionModelsPercentageDiscountCouponDefinition,
	VinistoOrderDllModelsApiReturnDataDiscountCouponReturn,
} from 'vinisto_api_client/src/api-types/order-api/';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { dayjsInstance as dayjs } from 'Services/Date';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import { last } from 'Helpers/lodash';
import { useContext } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { BsArrowClockwise, BsCurrencyBitcoin } from 'react-icons/bs';
import { FaCheck, FaPercentage, FaWineBottle } from 'react-icons/fa';
import { GrUser, GrValidate } from 'react-icons/gr';
import {
	MdCategory,
	MdClose,
	MdKeyboardBackspace,
	MdOutlineClosedCaptionDisabled,
	MdOutlineDelete,
	MdProductionQuantityLimits,
} from 'react-icons/md';
import {
	RiBarcodeBoxLine,
	RiCalendarEventFill,
	RiCoupon2Fill,
	RiCoupon2Line,
} from 'react-icons/ri';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { OrderService } from 'vinisto_api_client';
import api from 'vinisto_api_client/src/api';
import { useQuery } from '@tanstack/react-query';

import SpecificationDetail from './Components/SpecificationDetail';
import IsCouponUsed from './IsCouponUsed';
import CategoryDetail from './Components/CategoryDetail';
import SupplierDetail from './Components/SupplierDetail';
import UserDetail from './Components/UserDetail';

import {
	VinistoCommonDllModelsApiCouponLimitationsLimitationDefinitionCategory,
	VinistoCommonDllModelsApiCouponLimitationsLimitationDefinitionSpecification,
	VinistoCommonDllModelsApiCouponLimitationsLimitationDefinitionSupplier,
} from '@/api-types/order-api';

const DiscountCouponDetailPage = () => {
	const authenticationContext = useContext(AuthenticationContext);
	const { loginHash } = authenticationContext.vinistoUser;
	const localizationContext = useContext(LocalizationContext);
	const notificationsContext = useContext(NotificationsContext);
	const t = localizationContext.useFormatMessage();
	const getLocalizedValue = useLocalizedValue();
	const history = useNavigate();
	const { id: discountCouponId } = useParams();

	const { data: couponDetailData, refetch: refetchCouponDetailData } = useQuery(
		['discountCouponDetail', discountCouponId],
		() =>
			api
				.get<VinistoOrderDllModelsApiReturnDataDiscountCouponReturn>(
					`order-api/discount-coupons/${discountCouponId}/GetDiscountCoupon`,
					{ UserLoginHash: loginHash }
				)
				.then((data) => data.discountCoupon)
				.catch(() => {
					notificationsContext.handleShowErrorNotification(
						'admin.couponDetail.loadingError'
					);
				}),
		{
			enabled: !!discountCouponId,
		}
	);

	const { data: discountCouponOrdersData } = useQuery(
		['ordersWithDiscountCode', discountCouponId],
		() =>
			OrderService.getOrdersWithDiscountCode(discountCouponId ?? '', {
				UserLoginHash: loginHash,
			}),
		{
			enabled: !!discountCouponId,
		}
	);

	const isActive = couponDetailData?.isActive;
	const isReusable =
		couponDetailData &&
		'isReusable' in couponDetailData &&
		couponDetailData?.isReusable;
	const couponType = couponDetailData?.discountCouponType;
	const validFrom = couponDetailData?.validFrom ?? 0;
	const validTo = couponDetailData?.validTo ?? 0;
	const creationDate = couponDetailData?.createdAt ?? 0;
	const isCombinable =
		couponDetailData &&
		'isCombinable' in couponDetailData &&
		couponDetailData?.isCombinable;
	const isForDiscountedItems =
		couponDetailData &&
		'isForDiscountedItems' in couponDetailData &&
		couponDetailData?.isForDiscountedItems;
	const isSupplierDiscount =
		couponDetailData &&
		'isSupplierDiscount' in couponDetailData &&
		couponDetailData?.isSupplierDiscount;
	const isVisibleOnProductDetail =
		couponDetailData &&
		'isVisibleOnProductDetail' in couponDetailData &&
		couponDetailData?.isVisibleOnProductDetail;
	const limitationDefinition =
		(couponDetailData &&
			'limitationDefinition' in couponDetailData &&
			couponDetailData?.limitationDefinition) ??
		{};
	const name = couponDetailData?.name ?? [];
	const shortDescription = couponDetailData?.shortDescription ?? [];
	const description = couponDetailData?.description ?? [];
	const isVisibleInUsersSection =
		(couponDetailData &&
			'isVisibleInUsersSection' in couponDetailData &&
			couponDetailData?.isVisibleInUsersSection) ??
		false;
	const isForRegisteredUsers =
		(couponDetailData &&
			'isForRegisteredUsers' in couponDetailData &&
			couponDetailData?.isForRegisteredUsers) ??
		false;

	const image = last(couponDetailData?.images ?? []);
	const imageUrl = image?.domainUrls?.original_png ?? null;
	const creationTrigger = couponDetailData?.trigger ?? {};
	const categoryId =
		couponDetailData &&
		'categoryId' in couponDetailData &&
		couponDetailData?.categoryId;
	const categoryName = getLocalizedValue(
		// @ts-expect-error This can't be fixed with the same check as other properties for reason unknown
		couponDetailData?.category?.name ?? []
	);

	const allowedFrom =
		couponDetailData &&
		'allowedFrom' in couponDetailData &&
		(couponDetailData?.allowedFrom as VinistoMongoConnectorModelsCommonPricesPrice);

	const handleDeactivateCoupon = () => {
		apiServiceInstance
			.put<VinistoHelperDllBaseBaseReturn>(
				`order-api/discount-coupons/${discountCouponId}/DeactivateDiscountCoupon`,
				{
					userLoginHash: loginHash,
				},
				true
			)
			.then(async () => {
				await refetchCouponDetailData();
				notificationsContext.handleShowSuccessNotification(
					'admin.deactivateCoupon.success'
				);
			})
			.catch(() => {
				notificationsContext.handleShowErrorNotification(
					'admin.deactivateCoupon.error'
				);
			});
	};

	const handleActivateCoupon = () => {
		apiServiceInstance
			.put<VinistoHelperDllBaseBaseReturn>(
				`order-api/discount-coupons/${discountCouponId}/activate`,
				{
					userLoginHash: loginHash,
				},
				true
			)
			.then(async () => {
				await refetchCouponDetailData();
				notificationsContext.handleShowSuccessNotification(
					'admin.activateCoupon.success'
				);
			})
			.catch((e) => {
				if (
					e?.message ===
					VinistoHelperDllEnumsErrorSpecificError.DISCOUNT_COUPON_ACTIVE_CODE_ALREADY_EXISTS
				) {
					notificationsContext.handleShowErrorNotification(
						'admin.coupon.errorDuplicate'
					);
					return;
				}

				notificationsContext.handleShowErrorNotification(
					'admin.activateCoupon.error'
				);
			});
	};

	const detailSchema = [
		{
			icon: RiBarcodeBoxLine,
			label: 'admin.couponDetail.identifier.label',
			value: couponDetailData?.id ?? '',
			type: null,
		},
		{
			icon: RiCoupon2Fill,
			label: 'admin.couponDetail.code.label',
			value: couponDetailData?.code ?? '?',
			type: null,
		},
		{
			icon: RiCalendarEventFill,
			label: 'admin.couponDetail.creationDate.label',
			value: creationDate
				? dayjs
						.unix(creationDate)
						.format(`${t({ id: 'admin.dateTimeFormat' })}`)
				: null,
			type: null,
		},
		{
			icon: RiCalendarEventFill,
			label: 'admin.couponDetail.validFrom.label',
			value: validFrom
				? dayjs.unix(validFrom).format(`${t({ id: 'admin.dateTimeFormat' })}`)
				: null,
			type: null,
		},
		{
			icon: RiCalendarEventFill,
			label: 'admin.couponDetail.validTo.label',
			value: validTo
				? dayjs.unix(validTo).format(`${t({ id: 'admin.dateTimeFormat' })}`)
				: null,
			type: null,
		},
		{
			icon: MdCategory,
			label: 'admin.header.coupon.whoCreated',
			value: (() => {
				if (
					creationTrigger.type === COUPON_CREATION_ACTION_TYPE.MANUAL ||
					creationTrigger.type ===
						COUPON_CREATION_ACTION_TYPE.NEW_USER_REGISTRATION
				) {
					return <UserDetail trigger={creationTrigger} />;
				} else if (
					creationTrigger.type === COUPON_CREATION_ACTION_TYPE.NEXT_ORDER
				) {
					return (
						<div>
							{t({ id: 'admin.header.coupon.whoCreated.createdNextOrder' })}{' '}
							<Link to={`/order-detail/${creationTrigger.itemId}`}>
								{creationTrigger.itemId}
							</Link>
						</div>
					);
				}
				return t({ id: 'admin.header.coupon.whoCreated.none' });
			})(),
			type: null,
		},
		{
			icon: MdCategory,
			label: 'admin.couponDetail.type.label',
			value: couponType,
			type: null,
		},
		{
			icon: FaPercentage,
			label: 'admin.couponDetail.discount.label',
			value:
				couponType ===
				VinistoHelperDllEnumsDiscountCouponDiscountCouponType.AMOUNT
					? t(
							{ id: 'admin.couponDetail.amountDiscount.withVat' },
							{
								value: (
									couponDetailData as VinistoOrderDllModelsApiDiscountCouponDefinitionModelsAmountDiscountCouponDefinition
								)?.amountDiscount?.value,
								currency: (
									couponDetailData as VinistoOrderDllModelsApiDiscountCouponDefinitionModelsAmountDiscountCouponDefinition
								)?.amountDiscount?.currency,
							}
					  )
					: (
							couponDetailData as VinistoOrderDllModelsApiDiscountCouponDefinitionModelsPercentageDiscountCouponDefinition
					  )?.percentageDiscount ?? '?',
			type: null,
		},
		{
			icon: BsCurrencyBitcoin,
			label: 'admin.couponDetail.unit.label',
			value: couponDetailData?.unit?.value,
			type: null,
		},
		{
			icon: MdProductionQuantityLimits,
			label: 'admin.couponDetail.allowedFrom.label',
			value: allowedFrom ? (
				<>
					{t(
						{ id: 'admin.couponDetail.allowedFrom.withVat' },
						{
							value: allowedFrom.value,
							currency: allowedFrom.currency,
						}
					)}
				</>
			) : (
				'-'
			),
			type: null,
		},
		{
			icon: BsArrowClockwise,
			label: 'admin.couponDetail.isReusable.label',
			value: isReusable ? <FaCheck /> : <MdClose />,
			type: null,
		},
		{
			icon: RiCoupon2Line,
			label: 'admin.couponDetail.isUsed.label',
			value: (
				<IsCouponUsed
					orders={discountCouponOrdersData ?? []}
					isReusable={!!isReusable}
				/>
			),
			type: null,
		},
		{
			icon: GrValidate,
			label: 'admin.couponDetail.isActive.label',
			value: isActive ? <FaCheck /> : <MdClose />,
			type: null,
		},
		{
			icon: MdProductionQuantityLimits,
			label: 'admin.header.coupon.limitationType',
			value: (() => {
				if (
					// @ts-expect-error Complicated union type, not worth the typing hassle
					limitationDefinition.limitationType ===
					LIMITATION_TYPE.CATEGORY_LIMITATION
				) {
					return (
						<CategoryDetail
							categoryId={
								(
									limitationDefinition as VinistoCommonDllModelsApiCouponLimitationsLimitationDefinitionCategory
								).categoryId ?? ''
							}
						/>
					);
				}
				if (
					// @ts-expect-error Complicated union type, not worth the typing hassle
					limitationDefinition.limitationType ===
					LIMITATION_TYPE.SPECIFICATION_LIMITATION
				) {
					return (
						<SpecificationDetail
							specification={
								(
									limitationDefinition as VinistoCommonDllModelsApiCouponLimitationsLimitationDefinitionSpecification
								).specification
							}
						/>
					);
				}
				if (
					// @ts-expect-error Complicated union type, not worth the typing hassle
					limitationDefinition.limitationType ===
					LIMITATION_TYPE.SUPPLIER_LIMITATION
				) {
					return (
						<SupplierDetail
							supplierId={
								(
									limitationDefinition as VinistoCommonDllModelsApiCouponLimitationsLimitationDefinitionSupplier
								).supplierId ?? ''
							}
						/>
					);
				}
				return t({ id: 'admin.header.coupon.limitationType.none' });
			})(),
			type: null,
		},
		{
			icon: MdCategory,
			label: 'admin.couponDetail.isCombinable.label',
			value: isCombinable ? <FaCheck /> : <MdClose />,
			type: null,
		},
		{
			icon: GrValidate,
			label: 'admin.couponDetail.isForDiscountedItems.label',
			value: isForDiscountedItems ? <FaCheck /> : <MdClose />,
			type: null,
		},

		{
			icon: FaWineBottle,
			label: 'admin.modal.form.isVisibleOnProductDetail',
			value: isVisibleOnProductDetail ? <FaCheck /> : <MdClose />,
			type: null,
		},
		{
			icon: GrUser,
			label: 'admin.modal.form.isAsSupplier',
			value: isSupplierDiscount ? <FaCheck /> : <MdClose />,
			type: null,
		},
		{
			icon: MdCategory,
			label: 'admin.dynamicCategory.label',
			value: categoryId ? (
				<Link to={`/category-detail/${categoryId}`}>{categoryName}</Link>
			) : (
				'-'
			),
			type: null,
		},
	];

	const actionButtonsSchema = [
		{
			rowId: 'COUPON_1',
			items: [
				{
					label: 'admin.btn.deleteCoupon',
					key: 'deleteCoupon',
					disabled: !couponDetailData,
					onClick: () => {
						confirmAlert({
							title: `${t({
								id: 'admin.confirm.deleteCoupon.title',
							})}`,
							message: `${t({
								id: 'admin.confirm.deleteCoupon.message',
							})}`,
							buttons: [
								{
									label: `${t({
										id: 'admin.confirm.deleteCoupon.yes',
									})}`,
									onClick: () => {
										apiServiceInstance
											.delete(
												`order-api/discount-coupons`,
												discountCouponId,
												true,
												[
													{
														key: 'userLoginHash',
														value: loginHash,
													},
												]
											)
											.then(() => {
												notificationsContext.handleShowSuccessNotification(
													'admin.deleteCoupon.success'
												);
												history(`/discount-coupon-list`);
											})
											.catch(() => {
												notificationsContext.handleShowErrorNotification(
													'admin.deleteCoupon.error'
												);
											});
									},
								},
								{
									label: `${t({
										id: 'admin.confirm.deleteCoupon.no',
									})}`,
								},
							],
						});
					},
					icon: MdOutlineDelete,
				},
				{
					label: 'admin.btn.createCategory',
					key: 'createCategory',
					className:
						!categoryId &&
						isReusable &&
						isActive &&
						name?.length &&
						description?.length &&
						validTo > +new Date() / 1000 &&
						// @ts-expect-error Complicated union type, not worth the typing hassle
						limitationDefinition.limitationType !==
							LIMITATION_TYPE.CATEGORY_LIMITATION
							? ''
							: 'invisible',
					onClick: () => {
						confirmAlert({
							title: `${t({
								id: 'admin.confirm.createCategory.title',
							})}`,
							message: `${t({
								id: 'admin.confirm.createCategory.message',
							})}`,
							buttons: [
								{
									label: `${t({
										id: 'admin.yes',
									})}`,
									onClick: () => {
										api
											.post(
												`order-api/discount-coupons/${discountCouponId}/create-category-from-coupon`,
												undefined,
												{
													userLoginHash: loginHash,
												}
											)
											.then(async () => {
												notificationsContext.handleShowSuccessNotification(
													'admin.createCategory.success'
												);
												await refetchCouponDetailData();
											})
											.catch(() => {
												notificationsContext.handleShowErrorNotification(
													'admin.createCategory.error'
												);
											});
									},
								},
								{
									label: `${t({
										id: 'admin.no',
									})}`,
								},
							],
						});
					},
					icon: MdCategory,
				},
			],
		},
		{
			rowId: 'COUPON_2',
			items: [
				isActive
					? {
							label: 'admin.btn.deactivateCoupon',
							key: 'deactivateCoupon',
							icon: MdOutlineClosedCaptionDisabled,
							disabled: !couponDetailData,
							onClick: () => {
								confirmAlert({
									title: `${t({ id: 'admin.confirm.deactivateCoupon.title' })}`,
									message: `${t({
										id: 'admin.confirm.deactivateCoupon.message',
									})}`,
									buttons: [
										{
											label: `${t({
												id: 'admin.confirm.deactivateCoupon.yes',
											})}`,
											onClick: handleDeactivateCoupon,
										},
										{
											label: `${t({
												id: 'admin.confirm.deactivateCoupon.no',
											})}`,
										},
									],
								});
							},
					  }
					: {
							label: 'admin.btn.activateCoupon',
							key: 'activateCoupon',
							icon: MdOutlineClosedCaptionDisabled,
							disabled: !couponDetailData,
							onClick: () => {
								confirmAlert({
									title: `${t({ id: 'admin.confirm.activateCoupon.title' })}`,
									message: `${t({
										id: 'admin.confirm.activateCoupon.message',
									})}`,
									buttons: [
										{
											label: `${t({ id: 'admin.confirm.activateCoupon.yes' })}`,
											onClick: handleActivateCoupon,
										},
										{
											label: `${t({ id: 'admin.confirm.activateCoupon.no' })}`,
										},
									],
								});
							},
					  },
				{
					label: 'admin.btn.back',
					onClick: () => {
						history(-1);
					},
					icon: MdKeyboardBackspace,
				},
			],
		},
	];

	const customComponentRender = () => {
		return (
			<div className="_container_1soga_1">
				<h5 className="_containerHeading_a8j2n_1">
					{t({ id: 'admin.couponDetail.vinistoClub' })}
				</h5>
				<h6 className="_subheading_1x02g_1">
					{t({ id: 'admin.couponDetail.name' })}
				</h6>
				<p className="_text_1x02g_1">{getLocalizedValue(name ?? [])}</p>
				<h6 className="_subheading_1x02g_1">
					{t({ id: 'admin.couponDetail.shortDescription' })}
				</h6>
				<p className="_text_1x02g_1">
					{getLocalizedValue(shortDescription ?? [])}
				</p>
				<h6 className="_subheading_1x02g_1">
					{t({ id: 'admin.couponDetail.longDescription' })}
				</h6>
				<p className="_text_1x02g_1">{getLocalizedValue(description ?? [])}</p>
				{imageUrl && (
					<>
						<h6 className="_subheading_1x02g_1">{t({ id: 'image' })}</h6>
						<a
							href={imageUrl}
							target="_blank"
							rel="noreferrer"
						>
							<img
								src={imageUrl}
								style={{ objectFit: 'contain', maxWidth: '300px' }}
							/>
						</a>
					</>
				)}
				<div className="admin-detail-grid">
					<div className="admin-detail-grid-item">
						<span>{t({ id: 'admin.couponDetail.showInVinistoClub' })}</span>{' '}
						{isVisibleInUsersSection ? <FaCheck /> : <MdClose />}
					</div>
					<div className="admin-detail-grid-item">
						<span>{t({ id: 'admin.couponDetail.forMembersOnly' })}</span>{' '}
						{isForRegisteredUsers ? <FaCheck /> : <MdClose />}
					</div>
				</div>
			</div>
		);
	};

	return (
		<AdminDetail
			{...{ detailSchema, actionButtonsSchema, customComponentRender }}
		/>
	);
};

export default DiscountCouponDetailPage;
