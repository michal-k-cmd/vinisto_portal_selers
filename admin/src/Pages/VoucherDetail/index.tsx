import AdminDetail from 'Components/AdminDetail';
import { COUPON_CREATION_ACTION_TYPE } from 'Components/Modal/Components/CreateDiscountCoupon/constants';
import { apiServiceInstance } from 'Services/ApiService';
import {
	VinistoHelperDllBaseBaseReturn,
	VinistoHelperDllEnumsErrorSpecificError,
	VinistoOrderDllModelsApiDiscountCouponDefinitionModelsGiftCouponDefinition,
	VinistoOrderDllModelsApiReturnDataDiscountCouponReturn,
} from 'vinisto_api_client/src/api-types/order-api/';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { dayjsInstance as dayjs } from 'Services/Date';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import { last } from 'Helpers/lodash';
import { useContext } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { BsCurrencyBitcoin } from 'react-icons/bs';
import { FaCheck, FaPercentage } from 'react-icons/fa';
import { GrValidate } from 'react-icons/gr';
import {
	MdCategory,
	MdClose,
	MdKeyboardBackspace,
	MdOutlineClosedCaptionDisabled,
	MdOutlineDelete,
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

import UserDetail from './Components/UserDetail';
import IsCouponUsed from './IsCouponUsed';

const VoucherCouponDetailPage = () => {
	const authenticationContext = useContext(AuthenticationContext);
	const { loginHash } = authenticationContext.vinistoUser;
	const localizationContext = useContext(LocalizationContext);
	const notificationsContext = useContext(NotificationsContext);
	const t = localizationContext.useFormatMessage();
	const getLocalizedValue = useLocalizedValue();
	const navigate = useNavigate();
	const { id: voucherId } = useParams();

	const { data: voucherDetailData, refetch: refetchVoucherDetailData } =
		useQuery(
			['voucherDetail', voucherId],
			() =>
				api
					.get<VinistoOrderDllModelsApiReturnDataDiscountCouponReturn>(
						`order-api/discount-coupons/${voucherId}/GetDiscountCoupon`,
						{ UserLoginHash: loginHash }
					)
					.then((data) => data.discountCoupon)
					.catch(() => {
						notificationsContext.handleShowErrorNotification(
							'admin.couponDetail.loadingError'
						);
					}),
			{
				enabled: !!voucherId,
			}
		);

	const { data: voucherOrdersData } = useQuery(
		['ordersWithDiscountCode', voucherId],
		() =>
			OrderService.getOrdersWithDiscountCode(voucherId ?? '', {
				UserLoginHash: loginHash,
			}),
		{
			enabled: !!voucherId,
		}
	);

	const isActive = voucherDetailData?.isActive;
	const validFrom = voucherDetailData?.validFrom ?? 0;
	const validTo = voucherDetailData?.validTo ?? 0;
	const creationDate = voucherDetailData?.createdAt ?? 0;

	const name = voucherDetailData?.name ?? [];
	const shortDescription = voucherDetailData?.shortDescription ?? [];
	const description = voucherDetailData?.description ?? [];

	const image = last(voucherDetailData?.images ?? []);
	const imageUrl = image?.domainUrls?.original_png ?? null;
	const creationTrigger = voucherDetailData?.trigger ?? {};

	const handleDeactivateCoupon = () => {
		apiServiceInstance
			.put<VinistoHelperDllBaseBaseReturn>(
				`order-api/discount-coupons/${voucherId}/DeactivateDiscountCoupon`,
				{
					userLoginHash: loginHash,
				},
				true
			)
			.then(async () => {
				await refetchVoucherDetailData();
				notificationsContext.handleShowSuccessNotification(
					'admin.deactivateVoucher.success'
				);
			})
			.catch(() => {
				notificationsContext.handleShowErrorNotification(
					'admin.deactivateVoucher.error'
				);
			});
	};

	const handleActivateCoupon = () => {
		apiServiceInstance
			.put<VinistoHelperDllBaseBaseReturn>(
				`order-api/discount-coupons/${voucherId}/activate`,
				{
					userLoginHash: loginHash,
				},
				true
			)
			.then(async () => {
				await refetchVoucherDetailData();
				notificationsContext.handleShowSuccessNotification(
					'admin.activateVoucher.success'
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
					'admin.activateVoucher.error'
				);
			});
	};

	const detailSchema = [
		{
			icon: RiBarcodeBoxLine,
			label: 'admin.couponDetail.identifier.label',
			value: voucherDetailData?.id ?? '',
			type: null,
		},
		{
			icon: RiCoupon2Fill,
			label: 'admin.couponDetail.code.label',
			value: voucherDetailData?.code ?? '?',
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
			label: 'admin.voucher.creator',
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
			icon: FaPercentage,
			label: 'admin.couponDetail.discount.label',
			value: t(
				{ id: 'admin.couponDetail.amountDiscount.withVat' },
				{
					value: (
						voucherDetailData as VinistoOrderDllModelsApiDiscountCouponDefinitionModelsGiftCouponDefinition
					)?.amount?.value,
					currency: (
						voucherDetailData as VinistoOrderDllModelsApiDiscountCouponDefinitionModelsGiftCouponDefinition
					)?.amount?.currency,
				}
			),

			type: null,
		},
		{
			icon: BsCurrencyBitcoin,
			label: 'admin.couponDetail.unit.label',
			value: voucherDetailData?.unit?.value,
			type: null,
		},
		{
			icon: RiCoupon2Line,
			label: 'admin.couponDetail.isUsed.label',
			value: (
				<IsCouponUsed
					orders={voucherOrdersData ?? []}
					isReusable={false}
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
	];

	const actionButtonsSchema = [
		{
			rowId: 'COUPON_1',
			items: [
				{
					label: 'admin.btn.deleteVoucher',
					key: 'deleteVoucher',
					disabled: !voucherDetailData,
					onClick: () => {
						confirmAlert({
							title: `${t({
								id: 'admin.confirm.deleteVoucher.title',
							})}`,
							message: `${t({
								id: 'admin.confirm.deleteVoucher.message',
							})}`,
							buttons: [
								{
									label: `${t({
										id: 'admin.yes',
									})}`,
									onClick: () => {
										apiServiceInstance
											.delete(`order-api/discount-coupons`, voucherId, true, [
												{
													key: 'userLoginHash',
													value: loginHash,
												},
											])
											.then(() => {
												notificationsContext.handleShowSuccessNotification(
													'admin.deleteVoucher.success'
												);
												navigate(`/voucher-list`);
											})
											.catch(() => {
												notificationsContext.handleShowErrorNotification(
													'admin.deleteVoucher.error'
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
					icon: MdOutlineDelete,
				},
			],
		},
		{
			rowId: 'COUPON_2',
			items: [
				isActive
					? {
							label: 'admin.btn.deactivateVoucher',
							key: 'deactivateVoucher',
							icon: MdOutlineClosedCaptionDisabled,
							disabled: !voucherDetailData,
							onClick: () => {
								confirmAlert({
									title: `${t({
										id: 'admin.confirm.deactivateVoucher.title',
									})}`,
									message: `${t({
										id: 'admin.confirm.deactivateVoucher.message',
									})}`,
									buttons: [
										{
											label: `${t({
												id: 'admin.yes',
											})}`,
											onClick: handleDeactivateCoupon,
										},
										{
											label: `${t({
												id: 'admin.no',
											})}`,
										},
									],
								});
							},
					  }
					: {
							label: 'admin.btn.activateVoucher',
							key: 'activateVoucher',
							icon: MdOutlineClosedCaptionDisabled,
							disabled: !voucherDetailData,
							onClick: () => {
								confirmAlert({
									title: `${t({ id: 'admin.confirm.activateVoucher.title' })}`,
									message: `${t({
										id: 'admin.confirm.activateVoucher.message',
									})}`,
									buttons: [
										{
											label: `${t({ id: 'admin.yes' })}`,
											onClick: handleActivateCoupon,
										},
										{
											label: `${t({ id: 'admin.no' })}`,
										},
									],
								});
							},
					  },
				{
					label: 'admin.btn.back',
					onClick: () => {
						navigate(-1);
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
			</div>
		);
	};

	return (
		<AdminDetail
			{...{ detailSchema, actionButtonsSchema, customComponentRender }}
		/>
	);
};

export default VoucherCouponDetailPage;
