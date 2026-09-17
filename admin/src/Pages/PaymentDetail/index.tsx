import { FC, useCallback, useContext, useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { useNavigate, useParams } from 'react-router-dom';
import {
	goPayPaymentTypes,
	paymentTypes,
} from 'Components/Modal/Components/CreatePayment/constants';
import {
	ADD_COUNTRY_TO_PAYMENT,
	ADD_PRICE_TO_PAYMENT,
	EDIT_PAYMENT,
	UPLOAD_PAYMENT_ICON,
} from 'Components/Modal/constants';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { apiServiceInstance } from 'Services/ApiService';
import { ModalContext } from 'Components/Modal/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import AdminDetail from 'Components/AdminDetail';
import Image from 'Pages/SupplierDetail/Components/Image';
import { BsCamera } from 'react-icons/bs';
import { FaCheck, FaList } from 'react-icons/fa';
import { GiEarthAmerica } from 'react-icons/gi';
import {
	MdCreditCard,
	MdDoneOutline,
	MdKeyboardBackspace,
	MdOutlineClosedCaptionDisabled,
	MdOutlineDelete,
	MdOutlineEdit,
	MdOutlineSubtitles,
	MdPriceChange,
	MdTextSnippet,
} from 'react-icons/md';
import { RiBarcodeBoxLine } from 'react-icons/ri';
import VinistoSwitch from 'Components/Switch';

import PaymentPriceList from './Components/PaymentPriceList';
import PaymentCountryList from './Components/PaymentCountryList';

import { VinistoHelperDllEnumsDeliveryAndPaymentPlatform } from '@/api-types/supplier-api';
import { VinistoHelperDllEnumsLanguage } from '@/api-types/user-api';
import api from '@/api';

/**
 * @category Component Payment Detail Page
 */
const PaymentDetailPage: FC = () => {
	const authenticationContext = useContext(AuthenticationContext);
	const modalContext = useContext(ModalContext);
	const localizationContext = useContext(LocalizationContext);
	const notificationsContext = useContext(NotificationsContext);
	const t = localizationContext.useFormatMessage();
	const getLocalizedValue = useLocalizedValue();
	const history = useNavigate();
	const { id: paymentId } = useParams();
	const [paymentDetailState, setPaymentDetailState] = useState<
		Record<any, any>
	>({
		loading: false,
		loaded: false,
		paymentDetailData: {},
		error: null,
	});

	useEffect(() => {
		if (
			paymentId &&
			!paymentDetailState.loading &&
			!paymentDetailState.loaded
		) {
			setPaymentDetailState({
				loading: true,
				loaded: false,
				paymentDetailData: {},
				error: null,
			});
			apiServiceInstance
				.get(`order-api/payments/${paymentId}/GetPayment`, true)
				.then((payload: Record<any, any>) => {
					setPaymentDetailState({
						loading: false,
						loaded: true,
						paymentDetailData: payload.payment ?? {},
						error: null,
					});
				})
				.catch((error) => {
					notificationsContext.handleShowErrorNotification(
						'admin.paymentDetail.loadingError'
					);
					setPaymentDetailState({
						loading: false,
						loaded: true,
						paymentDetailData: {},
						error: error.message ?? '',
					});
				});
		}
	}, [
		authenticationContext,
		paymentDetailState,
		paymentId,
		notificationsContext,
	]);

	const paymentDetailData = paymentDetailState.paymentDetailData ?? {};

	const handleOnDeleteImage = useCallback(
		(imageId: string) => () => {
			confirmAlert({
				title: `${t({ id: 'admin.confirm.deleteImage.title' })}`,
				message: `${t({ id: 'admin.confirm.deleteImage.message' })}`,
				buttons: [
					{
						label: `${t({
							id: 'admin.confirm.yes',
						})}`,
						onClick: () => {
							apiServiceInstance
								.delete(`image-api/images/${imageId}`, undefined, true, [
									{
										key: 'UserLoginHash',
										value: authenticationContext.vinistoUser.loginHash,
									},
								])
								.then(() => {
									setPaymentDetailState((paymentDetailState) => ({
										...paymentDetailState,
										loaded: false,
										loading: false,
									}));
									notificationsContext.handleShowSuccessNotification(
										'admin.confirm.deleteImage.success'
									);
								})
								.catch(() => {
									notificationsContext.handleShowErrorNotification(
										'admin.confirm.deleteImage.error'
									);
								});
						},
					},
					{
						label: `${t({ id: 'admin.confirm.no' })}`,
						onClick: () => {},
					},
				],
			});
		},
		[paymentDetailState, authenticationContext]
	);

	const togglePlatform = (
		platform: VinistoHelperDllEnumsDeliveryAndPaymentPlatform,
		targetState: boolean
	) => {
		const currentPlatforms =
			paymentDetailState?.paymentDetailData?.allowedOnPlatforms ?? [];
		const updatedPlatforms = targetState
			? [...currentPlatforms, platform]
			: // @ts-expect-error Record<any, any>, seriously?!
			  currentPlatforms.filter((member) => member !== platform);

		api
			.put(`order-api/payments/${paymentId}/EditPayment`, undefined, {
				...paymentDetailState?.paymentDetailData,
				name: getLocalizedValue(paymentDetailState?.paymentDetailData?.name),
				description: getLocalizedValue(
					paymentDetailState?.paymentDetailData?.description
				),
				note: getLocalizedValue(paymentDetailState?.paymentDetailData?.note),
				language: VinistoHelperDllEnumsLanguage.CZECH,
				allowedOnPlatforms: updatedPlatforms,
				userLoginHash: authenticationContext.vinistoUser.loginHash,
			})
			.then(() => {
				notificationsContext.handleShowSuccessNotification(
					'admin.editPayment.success'
				);
				setPaymentDetailState({
					loading: false,
					loaded: false,
					paymentDetailData: null,
					error: null,
				});
			})
			.catch(() => {
				notificationsContext.handleShowErrorNotification(
					'admin.editPayment.error'
				);
			});
	};

	const detailSchema = [
		{
			icon: RiBarcodeBoxLine,
			label: 'admin.paymentDetail.identifier.label',
			value: paymentDetailData.id,
			type: null,
		},
		{
			icon: MdOutlineSubtitles,
			label: 'admin.paymentDetail.name.label',
			value: getLocalizedValue(paymentDetailData.name ?? []),
			type: null,
		},
		{
			icon: MdOutlineSubtitles,
			label: 'admin.paymentDetail.note.label',
			value: getLocalizedValue(paymentDetailData.note ?? []),
			type: null,
		},
		{
			icon: MdTextSnippet,
			label: 'admin.paymentDetail.description.label',
			value: getLocalizedValue(paymentDetailData.description ?? []),
			type: null,
		},
		{
			icon: MdCreditCard,
			label: 'admin.paymentDetail.paymentType.label',
			value:
				paymentTypes.find(
					(paymentType) => paymentType.value === paymentDetailData.paymentType
				)?.label ?? '-',
			type: null,
		},
		{
			icon: MdCreditCard,
			label: 'admin.paymentDetail.gopayType.label',
			value:
				goPayPaymentTypes.find(
					(paymentType) => paymentType.value === paymentDetailData.goPayType
				)?.label ?? '-',
			type: null,
		},
		{
			icon: FaList,
			label: 'admin.paymentDetail.order.label',
			value: paymentDetailData.order ?? '-',
			type: null,
		},
		{
			icon: FaCheck,
			label: 'admin.paymentDetail.isActive.label',
			value: paymentDetailData.isActive,
			type: 'boolean',
		},
		{
			icon: FaList,
			label: 'admin.deliveryDetail.forB2C.label',
			value: (
				<div className="vinisto-toggle">
					{paymentDetailState?.paymentDetailData?.allowedOnPlatforms?.includes(
						VinistoHelperDllEnumsDeliveryAndPaymentPlatform.B2C
					)
						? t({ id: 'admin.yes' })
						: t({ id: 'admin.no' })}
					<VinistoSwitch
						onChange={() =>
							togglePlatform(
								VinistoHelperDllEnumsDeliveryAndPaymentPlatform.B2C,
								!paymentDetailState?.paymentDetailData?.allowedOnPlatforms?.includes(
									VinistoHelperDllEnumsDeliveryAndPaymentPlatform.B2C
								)
							)
						}
						checked={Boolean(
							paymentDetailState?.paymentDetailData?.allowedOnPlatforms?.includes(
								VinistoHelperDllEnumsDeliveryAndPaymentPlatform.B2C
							)
						)}
						id="allowedOnPlatforms.B2B"
					/>
				</div>
			),
			type: null,
		},
		{
			icon: FaList,
			label: 'admin.deliveryDetail.forB2B.label',
			value: (
				<div className="vinisto-toggle">
					{paymentDetailState?.paymentDetailData?.allowedOnPlatforms?.includes(
						VinistoHelperDllEnumsDeliveryAndPaymentPlatform.B2B
					)
						? t({ id: 'admin.yes' })
						: t({ id: 'admin.no' })}
					<VinistoSwitch
						onChange={() =>
							togglePlatform(
								VinistoHelperDllEnumsDeliveryAndPaymentPlatform.B2B,
								!paymentDetailState?.paymentDetailData?.allowedOnPlatforms?.includes(
									VinistoHelperDllEnumsDeliveryAndPaymentPlatform.B2B
								)
							)
						}
						checked={Boolean(
							paymentDetailState?.paymentDetailData?.allowedOnPlatforms?.includes(
								VinistoHelperDllEnumsDeliveryAndPaymentPlatform.B2B
							)
						)}
						id="allowedOnPlatforms.B2B"
					/>
				</div>
			),
			type: null,
		},
	];

	const actionButtonsSchema: Record<any, any>[] = [
		{
			rowId: 'PAYMENT_1',
			items: [
				{
					label: 'admin.btn.editPaymentDetails',
					key: 'editPaymentDetails',
					disabled: paymentDetailState.loading,
					onClick: () => {
						modalContext.handleOpenModal(EDIT_PAYMENT, {
							paymentDetailState,
							setPaymentDetailState,
						});
					},
					icon: MdOutlineEdit,
				},
				{
					label: 'admin.btn.addCountryToPayment',
					key: 'addCountryToPayment',
					disabled: paymentDetailState.loading,
					onClick: () => {
						modalContext.handleOpenModal(ADD_COUNTRY_TO_PAYMENT, {
							paymentDetailState,
							setPaymentDetailState,
						});
					},
					icon: GiEarthAmerica,
				},
				{
					label: 'admin.btn.deletePayment',
					key: 'deletePayment',
					disabled: paymentDetailState.loading,
					onClick: () => {
						confirmAlert({
							title: `${t({
								id: 'admin.confirm.deletePayment.title',
							})}`,
							message: `${t({
								id: 'admin.confirm.deletePayment.message',
							})}`,
							buttons: [
								{
									label: `${t({
										id: 'admin.confirm.deletePayment.yes',
									})}`,
									onClick: () => {
										apiServiceInstance
											.delete(`order-api/payments`, paymentId, true, [
												{
													key: 'userLoginHash',
													value: authenticationContext.vinistoUser.loginHash,
												},
											])
											.then(() => {
												notificationsContext.handleShowSuccessNotification(
													'admin.deletePayment.success'
												);
												history(`/payment-list`);
											})
											.catch(() => {
												notificationsContext.handleShowErrorNotification(
													'admin.deletePayment.error'
												);
											});
									},
								},
								{
									label: `${t({
										id: 'admin.confirm.deletePayment.no',
									})}`,
									onClick: () => {},
								},
							],
						});
					},
					icon: MdOutlineDelete,
				},
			],
		},
		{
			rowId: 'PAYMENT_2',
			items: [
				paymentDetailData.isActive === true
					? {
							label: 'admin.btn.deactivatePayment',
							key: 'deactivatePayment',
							disabled: paymentDetailState.loading,
							icon: MdOutlineClosedCaptionDisabled,
							onClick: () => {
								confirmAlert({
									title: `${t({
										id: 'admin.confirm.deactivatePayment.title',
									})}`,
									message: `${t({
										id: 'admin.confirm.deactivatePayment.message',
									})}`,
									buttons: [
										{
											label: `${t({
												id: 'admin.confirm.deactivatePayment.yes',
											})}`,
											onClick: () => {
												apiServiceInstance
													.put(
														`order-api/payments/${paymentId}/DeactivatePayment`,
														{
															userLoginHash:
																authenticationContext.vinistoUser.loginHash,
														},
														true
													)
													.then((payload: Record<any, any>) => {
														setPaymentDetailState(
															(paymentDetailState: Record<any, any>) => ({
																...paymentDetailState,
																paymentDetailData: payload.payment ?? {},
															})
														);
														notificationsContext.handleShowSuccessNotification(
															'admin.deactivatePayment.success'
														);
													})
													.catch(() => {
														notificationsContext.handleShowErrorNotification(
															'admin.deactivatePayment.error'
														);
													});
											},
										},
										{
											label: `${t({
												id: 'admin.confirm.deactivatePayment.no',
											})}`,
											onClick: () => {},
										},
									],
								});
							},
					  }
					: {
							label: 'admin.btn.activatePayment',
							key: 'activatePayment',
							disabled: paymentDetailState.loading,
							icon: MdDoneOutline,
							onClick: () => {
								confirmAlert({
									title: `${t({
										id: 'admin.confirm.activatePayment.title',
									})}`,
									message: `${t({
										id: 'admin.confirm.activatePayment.message',
									})}`,
									buttons: [
										{
											label: `${t({
												id: 'admin.confirm.activatePayment.yes',
											})}`,
											onClick: () => {
												apiServiceInstance
													.put(
														`order-api/payments/${paymentId}/ActivatePayment`,
														{
															userLoginHash:
																authenticationContext.vinistoUser.loginHash,
														},
														true
													)
													.then((payload: Record<any, any>) => {
														setPaymentDetailState(
															(paymentDetailState: Record<any, any>) => ({
																...paymentDetailState,
																paymentDetailData: payload.payment ?? {},
															})
														);
														notificationsContext.handleShowSuccessNotification(
															'admin.activatePayment.success'
														);
													})
													.catch(() => {
														notificationsContext.handleShowErrorNotification(
															'admin.activatePayment.error'
														);
													});
											},
										},
										{
											label: `${t({
												id: 'admin.confirm.activatePayment.no',
											})}`,
											onClick: () => {},
										},
									],
								});
							},
					  },
				{
					label: 'admin.btn.addPriceToPayment',
					key: 'addPriceToPayment',
					disabled: paymentDetailState.loading,
					onClick: () => {
						modalContext.handleOpenModal(ADD_PRICE_TO_PAYMENT, {
							paymentDetailState,
							setPaymentDetailState,
						});
					},
					icon: MdPriceChange,
				},
				{
					label: 'admin.btn.addImageToPayment',
					key: 'addImageToPayment',
					disabled: paymentDetailState.loading,
					onClick: () => {
						modalContext.handleOpenModal(UPLOAD_PAYMENT_ICON, {
							paymentDetailState,
							setPaymentDetailState,
						});
					},
					icon: BsCamera,
				},
			],
		},
		{
			rowId: 'PAYMENT_3',
			items: [
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

	return (
		<AdminDetail
			detailSchema={detailSchema}
			actionButtonsSchema={actionButtonsSchema}
			customComponentRender={() => (
				<>
					{!paymentDetailState?.paymentDetailData?.image?.id ? (
						<p>{t({ id: 'admin.supplierDetail.noLogoUploaded' })}</p>
					) : (
						<Image
							imageUrl={
								paymentDetailState?.paymentDetailData?.image?.domainUrls
									?.original_png ?? ''
							}
							onDelete={handleOnDeleteImage(
								paymentDetailState.paymentDetailData.image.id
							)}
						/>
					)}
					<PaymentCountryList
						customData={paymentDetailState}
						customMethods={{ setPaymentDetailState }}
					/>
					<PaymentPriceList
						customData={paymentDetailState}
						customMethods={{ setPaymentDetailState }}
					/>
				</>
			)}
		/>
	);
};

export default PaymentDetailPage;
