import { ReactNode, useContext, useEffect, useState } from 'react';
import { get, head } from 'Helpers/lodash';
import { useNavigate, useParams } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import {
	MdDoneOutline,
	MdKeyboardBackspace,
	MdOutlineClosedCaptionDisabled,
	MdOutlineDelete,
	MdOutlineEdit,
	MdOutlineSubtitles,
	MdPriceChange,
	MdTextSnippet,
} from 'react-icons/md';
import { FaCoins, FaList, FaWeightHanging } from 'react-icons/fa';
import { RiBarcodeBoxLine } from 'react-icons/ri';
import { GiEarthAmerica } from 'react-icons/gi';
import { IoTimerSharp } from 'react-icons/io5';
import { MdDeliveryDining } from 'react-icons/md';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { ModalContext } from 'Components/Modal/context';
import { apiServiceInstance as apiService } from 'Services/ApiService';
import AdminDetail from 'Components/AdminDetail';
import {
	ADD_COUNTRY_TO_DELIVERY,
	ADD_PAYMENT_TO_DELIVERY,
	ADD_POSTCODES,
	ADD_PRICE_TO_DELIVERY,
	EDIT_DELIVERY,
} from 'Components/Modal/constants';
import { VinistoOrderDllModelsApiReturnDataDeliveryReturn } from 'vinisto_api_client/src/api-types/order-api/';
import { ActionButtonSchema } from 'Components/AdminDetail/Components/ActionButtons/interfaces';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import VinistoSwitch from 'Components/Switch';

import PaymentList from './Components/PaymentList';
import PostCodeList from './Components/PostCodeList';
import DeliveryCountryList from './Components/DeliveryCountryList';
import DeliveryPriceList from './Components/DeliveryPriceList';
import { DeliveryDetailState } from './interfaces';

import { VinistoHelperDllEnumsDeliveryAndPaymentPlatform } from '@/api-types/supplier-api';
import api from '@/api';
import { VinistoHelperDllEnumsLanguage } from '@/api-types/user-api';

const SixSevenIcon = ({ children }: { children: ReactNode }) => (
	<strong className="admin-detail-icone lh-1 border border-dark d-flex align-items-center justify-content-center border-bottom-0 border-top-0">
		{children}
	</strong>
);

const DeliveryDetailPage = () => {
	const authenticationContext = useContext(AuthenticationContext);
	const modalContext = useContext(ModalContext);
	const localizationContext = useContext(LocalizationContext);
	const notificationsContext = useContext(NotificationsContext);
	const t = localizationContext.useFormatMessage();
	const history = useNavigate();
	const { id: deliveryId } = useParams();
	const [deliveryDetailState, setDeliveryDetailState] =
		useState<DeliveryDetailState>({
			loading: false,
			loaded: false,
			deliveryDetailData: null,
			error: null,
		});

	const getLocalizedValue = useLocalizedValue();

	const isForStocking =
		deliveryDetailState.deliveryDetailData?.isForStocking ?? false;

	useEffect(() => {
		if (
			deliveryId &&
			!get(deliveryDetailState, 'loading', false) &&
			!get(deliveryDetailState, 'loaded', false)
		) {
			setDeliveryDetailState({
				loading: true,
				loaded: false,
				deliveryDetailData: null,
				error: null,
			});
			apiService
				.get<VinistoOrderDllModelsApiReturnDataDeliveryReturn>(
					`order-api/deliveries/${deliveryId}/GetDelivery`,
					true
				)
				.then((payload) => {
					setDeliveryDetailState({
						loading: false,
						loaded: true,
						deliveryDetailData: payload.delivery as any,
						error: null,
					});
				})
				.catch((error) => {
					notificationsContext.handleShowErrorNotification(
						'admin.deliveryDetail.loadingError'
					);
					setDeliveryDetailState({
						loading: false,
						loaded: true,
						deliveryDetailData: null,
						error: get(error, 'message', ''),
					});
				});
		}
	}, [
		authenticationContext,
		deliveryDetailState,
		deliveryId,
		notificationsContext,
	]);

	const handleToggleSubscriber = () => {
		const currentIsSubscriber = get(
			deliveryDetailState,
			'deliveryDetailData.isSubscriber',
			false
		);
		const newState = !currentIsSubscriber;
		const payload = {
			userLoginHash: authenticationContext.vinistoUser.loginHash,
		};

		if (newState) {
			apiService
				.put(
					`order-api/deliveries/${deliveryId}/ActivateIsSubscriberDelivery`,
					payload,
					true
				)
				.then(() => {
					setDeliveryDetailState({
						loading: false,
						loaded: false,
						deliveryDetailData: null,
						error: null,
					});
					notificationsContext.handleShowSuccessNotification(
						'admin.activateDeliveryAsSubscriber.success'
					);
				})
				.catch(() => {
					notificationsContext.handleShowErrorNotification(
						'admin.activateDeliveryAsSubscriber.error'
					);
				});
		} else {
			apiService
				.put(
					`order-api/deliveries/${deliveryId}/DeactivateIsSubscriberDelivery`,
					payload,
					true
				)
				.then(() => {
					setDeliveryDetailState({
						loading: false,
						loaded: false,
						deliveryDetailData: null,
						error: null,
					});
					notificationsContext.handleShowSuccessNotification(
						'admin.deactivateDeliveryAsSubscriber.success'
					);
				})
				.catch(() => {
					notificationsContext.handleShowErrorNotification(
						'admin.deactivateDeliveryAsSubscriber.error'
					);
				});
		}
	};

	const togglePlatform = (
		platform: VinistoHelperDllEnumsDeliveryAndPaymentPlatform,
		targetState: boolean
	) => {
		const currentPlatforms =
			deliveryDetailState?.deliveryDetailData?.allowedOnPlatforms ?? [];
		const updatedPlatforms = targetState
			? [...currentPlatforms, platform]
			: currentPlatforms.filter((member) => member !== platform);

		api
			.put(`order-api/deliveries/${deliveryId}/EditDelivery`, undefined, {
				...deliveryDetailState?.deliveryDetailData,
				name: getLocalizedValue(deliveryDetailState?.deliveryDetailData?.name),
				alternativeName: getLocalizedValue(
					deliveryDetailState?.deliveryDetailData?.alternativeName ?? undefined
				),
				description: getLocalizedValue(
					deliveryDetailState?.deliveryDetailData?.description
				),
				note: getLocalizedValue(
					deliveryDetailState?.deliveryDetailData?.note ?? undefined
				),
				language: VinistoHelperDllEnumsLanguage.CZECH,
				allowedOnPlatforms: updatedPlatforms,
				userLoginHash: authenticationContext.vinistoUser.loginHash,
			})
			.then(() => {
				notificationsContext.handleShowSuccessNotification(
					'admin.editDelivery.success'
				);
				setDeliveryDetailState({
					loading: false,
					loaded: false,
					deliveryDetailData: null,
					error: null,
				});
			})
			.catch(() => {
				notificationsContext.handleShowErrorNotification(
					'admin.editDelivery.error'
				);
			});
	};

	const detailSchema = [
		{
			icon: RiBarcodeBoxLine,
			label: 'admin.deliveryDetail.identifier.label',
			value: deliveryDetailState.deliveryDetailData?.id ?? '',
			type: null,
		},
		{
			icon: MdOutlineSubtitles,
			label: 'admin.deliveryDetail.name.label',
			value: get(
				head(
					get(get(deliveryDetailState, 'deliveryDetailData', {}), 'name', '')
				),
				'value',
				''
			),
			type: null,
		},
		{
			icon: MdOutlineSubtitles,
			label: 'admin.deliveryDetail.alternativeName.label',
			value: getLocalizedValue(
				deliveryDetailState.deliveryDetailData?.alternativeName ?? []
			),
			type: null,
		},

		{
			icon: MdOutlineSubtitles,
			label: 'admin.deliveryDetail.note.label',
			value: get(
				head(
					get(get(deliveryDetailState, 'deliveryDetailData', {}), 'note', '')
				),
				'value',
				''
			),
			type: null,
		},
		{
			icon: MdTextSnippet,
			label: 'admin.deliveryDetail.description.label',
			value: get(
				head(
					get(
						get(deliveryDetailState, 'deliveryDetailData', {}),
						'description',
						''
					)
				),
				'value',
				''
			),
			type: null,
		},
		{
			icon: MdTextSnippet,
			label: 'admin.deliveryDetail.deliveryType.label',
			value: get(deliveryDetailState, 'deliveryDetailData.deliveryType', ''),
			type: null,
		},
		{
			icon: MdTextSnippet,
			label: 'admin.deliveryDetail.deliveryBaseType.label',
			value: get(
				deliveryDetailState,
				'deliveryDetailData.deliveryBaseType',
				''
			),
			type: null,
		},

		{
			icon: IoTimerSharp,
			label: 'admin.deliveryDetail.deliveryTime.label',
			value: get(deliveryDetailState, 'deliveryDetailData.deliveryTime', '0'),
			type: 'number',
			visible: !isForStocking,
		},

		{
			icon: IoTimerSharp,
			label: 'admin.deliveryDetail.orderTresholdTime.label',
			value:
				deliveryDetailState.deliveryDetailData?.orderTresholdTime
					.toString()
					.replace(':00', '') ?? '',
			type: 'number',
			visible: !isForStocking,
		},
		{
			icon: () => <SixSevenIcon>6</SixSevenIcon>,
			label: 'admin.deliveryDetail.isDeliveryOnSaturday',
			value: deliveryDetailState.deliveryDetailData?.isDeliveryOnSaturday,
			type: 'boolean',
			visible: !isForStocking,
		},
		{
			icon: () => <SixSevenIcon>7</SixSevenIcon>,
			label: 'admin.deliveryDetail.isDeliveryOnSunday',
			value: deliveryDetailState.deliveryDetailData?.isDeliveryOnSunday,
			type: 'boolean',
			visible: !isForStocking,
		},
		{
			icon: FaWeightHanging,
			label: 'admin.deliveryDetail.minWeight.label',
			value: get(
				deliveryDetailState,
				'deliveryDetailData.minAllowedWeight',
				'0'
			),
			type: 'number',
			visible: !isForStocking,
		},
		{
			icon: FaWeightHanging,
			label: 'admin.deliveryDetail.maxWeight.label',
			value: `${get(
				deliveryDetailState,
				'deliveryDetailData.maxAllowedWeight',
				0
			)}`,
			type: 'number',
			visible: !isForStocking,
		},
		{
			icon: FaCoins,
			label: 'admin.deliveryDetail.costs.label',
			value: `${deliveryDetailState.deliveryDetailData?.costs ?? 0} CZK`,
			type: 'number',
			visible: !isForStocking,
		},
		{
			icon: MdTextSnippet,
			label: 'admin.deliveryDetail.deliveryCode.label',
			value: get(deliveryDetailState, 'deliveryDetailData.deliveryCode', ''),
			type: null,
			visible: !isForStocking,
		},
		{
			icon: MdDeliveryDining,
			label: 'admin.deliveryDetail.trackingUrl.label',
			value: get(deliveryDetailState, 'deliveryDetailData.trackingUrl', ''),
			type: null,
		},
		{
			icon: FaList,
			label: 'admin.deliveryDetail.order.label',
			value: `${get(deliveryDetailState, 'deliveryDetailData.order', '-')}`,
			type: null,
		},
		{
			icon: FaList,
			label: 'admin.deliveryDetail.isSubscriber.label',
			value: (
				<div className="vinisto-toggle">
					{get(deliveryDetailState, 'deliveryDetailData.isSubscriber', false)
						? t({ id: 'admin.yes' })
						: t({ id: 'admin.no' })}
					<VinistoSwitch
						onChange={handleToggleSubscriber}
						checked={Boolean(
							get(deliveryDetailState, 'deliveryDetailData.isSubscriber', false)
						)}
						id="isSubscriber"
					/>
				</div>
			),
			type: null,
		},
		{
			icon: FaList,
			label: 'admin.deliveryDetail.forB2C.label',
			value: (
				<div className="vinisto-toggle">
					{deliveryDetailState?.deliveryDetailData?.allowedOnPlatforms?.includes(
						VinistoHelperDllEnumsDeliveryAndPaymentPlatform.B2C
					)
						? t({ id: 'admin.yes' })
						: t({ id: 'admin.no' })}
					<VinistoSwitch
						onChange={() =>
							togglePlatform(
								VinistoHelperDllEnumsDeliveryAndPaymentPlatform.B2C,
								!deliveryDetailState?.deliveryDetailData?.allowedOnPlatforms?.includes(
									VinistoHelperDllEnumsDeliveryAndPaymentPlatform.B2C
								)
							)
						}
						checked={Boolean(
							deliveryDetailState?.deliveryDetailData?.allowedOnPlatforms?.includes(
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
					{deliveryDetailState?.deliveryDetailData?.allowedOnPlatforms?.includes(
						VinistoHelperDllEnumsDeliveryAndPaymentPlatform.B2B
					)
						? t({ id: 'admin.yes' })
						: t({ id: 'admin.no' })}
					<VinistoSwitch
						onChange={() =>
							togglePlatform(
								VinistoHelperDllEnumsDeliveryAndPaymentPlatform.B2B,
								!deliveryDetailState?.deliveryDetailData?.allowedOnPlatforms?.includes(
									VinistoHelperDllEnumsDeliveryAndPaymentPlatform.B2B
								)
							)
						}
						checked={Boolean(
							deliveryDetailState?.deliveryDetailData?.allowedOnPlatforms?.includes(
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

	const actionButtonsSchema: ActionButtonSchema[] = [
		{
			rowId: 'DELIVERY_1',
			items: [
				{
					label: 'admin.btn.editDeliveryDetails',
					key: 'editDeliveryDetails',
					disabled: get(deliveryDetailState, 'loading', true),
					onClick: () => {
						modalContext.handleOpenModal(EDIT_DELIVERY, {
							deliveryDetailState,
							setDeliveryDetailState,
							isForStocking: isForStocking,
						});
					},
					icon: MdOutlineEdit,
				},
				{
					label: 'admin.btn.addCountryToDelivery',
					key: 'addCountryToDelivery',
					disabled: get(deliveryDetailState, 'loading', true),
					onClick: () => {
						modalContext.handleOpenModal(ADD_COUNTRY_TO_DELIVERY, {
							deliveryDetailState,
							setDeliveryDetailState,
						});
					},
					icon: GiEarthAmerica,
					visible: !isForStocking,
				},
				{
					label: 'admin.btn.deleteDelivery',
					key: 'deleteDelivery',
					disabled: get(deliveryDetailState, 'loading', true),
					onClick: () => {
						confirmAlert({
							title: `${t({
								id: 'admin.confirm.deleteDelivery.title',
							})}`,
							message: `${t({
								id: 'admin.confirm.deleteDelivery.message',
							})}`,
							buttons: [
								{
									label: `${t({
										id: 'admin.confirm.deleteDelivery.yes',
									})}`,
									onClick: () => {
										apiService
											.delete(`order-api/deliveries`, deliveryId, true, [
												{
													key: 'userLoginHash',
													value: authenticationContext.vinistoUser.loginHash,
												},
											])
											.then(() => {
												notificationsContext.handleShowSuccessNotification(
													'admin.deleteDelivery.success'
												);
												history(-1);
											})
											.catch(() => {
												notificationsContext.handleShowErrorNotification(
													'admin.deleteDelivery.error'
												);
											});
									},
								},
								{
									label: `${t({
										id: 'admin.confirm.deleteDelivery.no',
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
			rowId: 'DELIVERY_2',
			items: [
				get(deliveryDetailState, 'deliveryDetailData.isActive', false)
					? {
							label: 'admin.btn.deactivateDelivery',
							key: 'deactivateDelivery',
							disabled: get(deliveryDetailState, 'loading', true),
							icon: MdOutlineClosedCaptionDisabled,
							onClick: () => {
								confirmAlert({
									title: `${t({
										id: 'admin.confirm.deactivateDelivery.title',
									})}`,
									message: `${t({
										id: 'admin.confirm.deactivateDelivery.message',
									})}`,
									buttons: [
										{
											label: `${t({
												id: 'admin.confirm.deactivateDelivery.yes',
											})}`,
											onClick: () => {
												apiService
													.put(
														`order-api/deliveries/${deliveryId}/DeactivateDelivery`,
														{
															userLoginHash:
																authenticationContext.vinistoUser.loginHash,
														},
														true
													)
													.then(() => {
														setDeliveryDetailState({
															loading: false,
															loaded: false,
															deliveryDetailData: null,
															error: null,
														});
														notificationsContext.handleShowSuccessNotification(
															'admin.deactivateDelivery.success'
														);
													})
													.catch(() => {
														notificationsContext.handleShowErrorNotification(
															'admin.deactivateDelivery.error'
														);
													});
											},
										},
										{
											label: `${t({
												id: 'admin.confirm.deactivateDelivery.no',
											})}`,
										},
									],
								});
							},
					  }
					: {
							label: 'admin.btn.activateDelivery',
							key: 'activateDelivery',
							icon: MdDoneOutline,
							disabled: get(deliveryDetailState, 'loading', true),
							onClick: () => {
								confirmAlert({
									title: `${t({
										id: 'admin.confirm.activateDelivery.title',
									})}`,
									message: `${t({
										id: 'admin.confirm.activateDelivery.message',
									})}`,
									buttons: [
										{
											label: `${t({
												id: 'admin.confirm.activateDelivery.yes',
											})}`,
											onClick: () => {
												apiService
													.put(
														`order-api/deliveries/${deliveryId}/ActivateDelivery`,
														{
															userLoginHash:
																authenticationContext.vinistoUser.loginHash,
														},
														true
													)
													.then(() => {
														setDeliveryDetailState({
															loading: false,
															loaded: false,
															deliveryDetailData: null,
															error: null,
														});
														notificationsContext.handleShowSuccessNotification(
															'admin.activateDelivery.success'
														);
													})
													.catch(() => {
														notificationsContext.handleShowErrorNotification(
															'admin.activateDelivery.error'
														);
													});
											},
										},
										{
											label: `${t({
												id: 'admin.confirm.activateDelivery.no',
											})}`,
										},
									],
								});
							},
					  },
				{
					label: 'admin.btn.addPriceToDelivery',
					key: 'addPriceToDelivery',
					disabled: get(deliveryDetailState, 'loading', true),
					onClick: () => {
						modalContext.handleOpenModal(ADD_PRICE_TO_DELIVERY, {
							deliveryDetailState,
							setDeliveryDetailState,
						});
					},
					icon: MdPriceChange,
					visible: !isForStocking,
				},
				{
					label: 'admin.btn.addPaymentToDelivery',
					key: 'addPaymentToDelivery',
					disabled: get(deliveryDetailState, 'loading', true),
					onClick: () => {
						modalContext.handleOpenModal(ADD_PAYMENT_TO_DELIVERY, {
							deliveryDetailState,
							setDeliveryDetailState,
						});
					},
					icon: MdPriceChange,
					visible: !isForStocking,
				},
			],
		},
		{
			rowId: 'DELIVERY_3',
			items: [
				{
					label: 'admin.btn.addPostCodes',
					key: 'addPostCodes',
					disabled: deliveryDetailState.loading,
					onClick: () => {
						modalContext.handleOpenModal(
							ADD_POSTCODES,
							deliveryDetailState.deliveryDetailData ?? undefined
						);
					},
					icon: MdPriceChange,
					visible: !isForStocking,
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

	const zipCodes = deliveryDetailState.deliveryDetailData?.servingZipCodes;

	return (
		<AdminDetail
			detailSchema={detailSchema}
			actionButtonsSchema={actionButtonsSchema}
			customComponentRender={() => (
				<>
					{!isForStocking && (
						<div className="admin-page-list">
							<PaymentList
								customData={deliveryDetailState}
								customMethods={{ setDeliveryDetailState }}
							/>
							{zipCodes && <PostCodeList servingZipCodes={zipCodes} />}
							<DeliveryCountryList
								customData={deliveryDetailState}
								customMethods={{ setDeliveryDetailState }}
							/>
							<DeliveryPriceList
								customData={deliveryDetailState}
								customMethods={{ setDeliveryDetailState }}
							/>
						</div>
					)}
				</>
			)}
		/>
	);
};

export default DeliveryDetailPage;
