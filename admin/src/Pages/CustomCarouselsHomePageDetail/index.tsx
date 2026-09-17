import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import {
	ADD_BUNDLE_TO_HOMEPAGE_CUSTOM_CAROUSEL,
	EDIT_HOMEPAGE_CUSTOM_CAROUSEL,
} from 'Components/Modal/constants';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { ModalContext } from 'Components/Modal/context';
import { apiServiceInstance } from 'Services/ApiService';
import AdminDetail from 'Components/AdminDetail';
import {
	MdKeyboardBackspace,
	MdOutlineDelete,
	MdOutlineEdit,
	MdOutlineSubtitles,
	MdTextSnippet,
} from 'react-icons/md';
import { RiBarcodeBoxLine } from 'react-icons/ri';
import { FaPowerOff } from 'react-icons/fa';
import { BsFillTagsFill } from 'react-icons/bs';
import { USER_ADMIN_IMAGE } from 'Services/AuthorizationService/Components/RequirePermissions/constants';
import {
	VinistoProductDllModelsApiHomePageHomePageCustomCarousel,
	VinistoProductDllModelsApiHomePageHomePageCustomCarouselReturn,
} from 'vinisto_api_client/src/api-types/product-api/';
import { BundleItemList } from 'Components/BundleItem';
import useWarehouseCount from 'Hooks/Queries/useWarehouseCount';
import { useMutation } from '@tanstack/react-query';
import { platformIdLabelMap } from 'Pages/OrderList/constants';

import { PlatformIdType } from '@/shared';

const CustomCarouselsHomePageDetail = () => {
	const authenticationContext = useContext(AuthenticationContext);
	const modalContext = useContext(ModalContext);
	const localizationContext = useContext(LocalizationContext);
	const notificationsContext = useContext(NotificationsContext);
	const t = localizationContext.useFormatMessage();

	const history = useNavigate();
	const { id: customCarouselId } = useParams();

	const getLocalizedValue = useLocalizedValue();

	const [customCarouselState, setCustomCarouselState] = useState<{
		loading: boolean;
		loaded: boolean;
		homePageCustomCarousel:
			| Partial<VinistoProductDllModelsApiHomePageHomePageCustomCarousel>
			| undefined
			| null;
		error: string | null;
	}>({
		loading: false,
		loaded: false,
		homePageCustomCarousel: undefined,
		error: null,
	});

	const toggleHomePageCustomCarouselIsEnabledMutation = useMutation({
		mutationFn: (currentIsEnabled: boolean) =>
			apiServiceInstance
				.put<VinistoProductDllModelsApiHomePageHomePageCustomCarouselReturn>(
					`product-api/home-page/custom-carousels/${customCarouselState?.homePageCustomCarousel?.id}`,
					{
						userLoginHash: authenticationContext.vinistoUser.loginHash,
						...customCarouselState?.homePageCustomCarousel,
						name: getLocalizedValue(
							customCarouselState?.homePageCustomCarousel?.name ?? []
						),
						language: localizationContext.activeLanguageKey,
						isEnabled: !currentIsEnabled,
					},
					true
				)
				.then((payload) => {
					const homePageCustomCarousel = payload?.homePageCustomCarousel;

					setCustomCarouselState(() => ({
						...customCarouselState,
						homePageCustomCarousel,
					}));
					notificationsContext.handleShowSuccessNotification(
						`admin.customHomePageCarousels.${
							currentIsEnabled ? 'deactivate' : 'activate'
						}.success`
					);
				})
				.catch(() => {
					notificationsContext.handleShowErrorNotification(
						`admin.customHomePageCarousels.${
							currentIsEnabled ? 'deactivate' : 'activate'
						}.error`
					);
				}),
		mutationKey: [
			'toggleHomePageCustomCarouselIsEnabled',
			customCarouselState?.homePageCustomCarousel?.id,
		],
	});

	useEffect(() => {
		if (
			customCarouselId &&
			customCarouselState?.loading !== true &&
			customCarouselState?.loaded !== true
		) {
			setCustomCarouselState({
				loading: true,
				loaded: false,
				homePageCustomCarousel: undefined,
				error: null,
			});

			apiServiceInstance
				.get<VinistoProductDllModelsApiHomePageHomePageCustomCarouselReturn>(
					'product-api/home-page/custom-carousels',
					true,
					customCarouselId
				)
				.then((payload) => {
					setCustomCarouselState({
						loading: false,
						loaded: true,
						homePageCustomCarousel: payload.homePageCustomCarousel,
						error: null,
					});
				})
				.catch((error) => {
					notificationsContext.handleShowErrorNotification(
						'admin.customCarouselsHomePageDetail.loadingError'
					);
					setCustomCarouselState({
						loading: false,
						loaded: true,
						homePageCustomCarousel: undefined,
						error: error.message,
					});
				});
		}
	}, [
		authenticationContext,
		customCarouselState,
		customCarouselId,
		notificationsContext,
	]);

	const detailSchema = [
		{
			icon: RiBarcodeBoxLine,
			label: 'admin.customCarouselsHomePageDetail.identifier.label',
			value: customCarouselId ?? '',
			type: null,
		},
		{
			icon: MdOutlineSubtitles,
			label: 'availableOnPlatform',
			value:
				typeof customCarouselState.homePageCustomCarousel
					?.availableOnPlatform === 'number'
					? platformIdLabelMap[
							customCarouselState.homePageCustomCarousel
								.availableOnPlatform as PlatformIdType
					  ]
					: null,
			type: null,
		},
		{
			icon: MdOutlineSubtitles,
			label: 'admin.customCarouselsHomePageDetail.name.label',
			value: getLocalizedValue(
				customCarouselState.homePageCustomCarousel?.name ?? []
			),
			type: null,
		},
		{
			icon: MdTextSnippet,
			label: 'admin.customCarouselsHomePageDetail.sequenceNumber.label',
			value: customCarouselState.homePageCustomCarousel?.sequenceNumber ?? null,
			type: 'number',
		},
		{
			icon: MdTextSnippet,
			label: 'isActive',
			value: customCarouselState.homePageCustomCarousel?.isEnabled ?? false,
			type: 'boolean',
		},
	];

	const actionButtonsSchema = [
		{
			rowId: 'CUSTOM_CAROUSEL_1',
			items: [
				{
					label: 'admin.btn.editDetails',
					onClick: () => {
						modalContext.handleOpenModal(EDIT_HOMEPAGE_CUSTOM_CAROUSEL, {
							homePageCustomCarousel:
								customCarouselState.homePageCustomCarousel,
							setCustomCarouselState,
						});
					},
					icon: MdOutlineEdit,
				},
				{
					label: 'admin.btn.addBundle',
					key: 'addBundleToCustomCarousel',
					onClick: () => {
						modalContext.handleOpenModal(
							ADD_BUNDLE_TO_HOMEPAGE_CUSTOM_CAROUSEL,
							{ customCarouselState, setCustomCarouselState, customCarouselId }
						);
					},
					icon: BsFillTagsFill,
					rights: [USER_ADMIN_IMAGE],
				},
				{
					label: customCarouselState?.homePageCustomCarousel?.isEnabled
						? 'admin.btn.deactivateCustomCarousel'
						: 'admin.btn.activateCustomCarousel',
					onClick: () => {
						toggleHomePageCustomCarouselIsEnabledMutation.mutateAsync(
							!!customCarouselState?.homePageCustomCarousel?.isEnabled
						);
					},
					icon: FaPowerOff,
				},
			],
		},
		{
			rowId: 'CUSTOM_CAROUSEL_2',
			items: [
				{
					label: 'admin.btn.deleteCustomCarousel',
					onClick: () => {
						confirmAlert({
							title: `${t({
								id: 'admin.confirm.deleteCustomCarousel.title',
							})}`,
							message: `${t({
								id: 'admin.confirm.deleteCustomCarousel.message',
							})}`,
							buttons: [
								{
									label: `${t({
										id: 'admin.confirm.yes',
									})}`,
									onClick: () => {
										apiServiceInstance
											.delete(
												'product-api/home-page/custom-carousels',
												customCarouselId,
												true,
												[
													{
														key: 'userLoginHash',
														value: authenticationContext.vinistoUser.loginHash,
													},
												]
											)
											.then(() => {
												notificationsContext.handleShowSuccessNotification(
													'admin.deleteCustomCarousel.success'
												);
												history(`/custom-carousels-homepage-list`);
											})
											.catch(() => {
												notificationsContext.handleShowErrorNotification(
													'admin.deleteCustomCarousel.error'
												);
											});
									},
								},
								{
									label: `${t({
										id: 'admin.confirm.no',
									})}`,
								},
							],
						});
					},
					icon: MdOutlineDelete,
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

	const handleOnRemoveBundleFromCustomCarousel = (bundleId: string) => {
		confirmAlert({
			title: `${t({
				id: 'admin.confirm.deleteCustomCarouselBundle.title',
			})}`,
			message: `${t({
				id: 'admin.confirm.deleteCustomCarouselBundle.message',
			})}`,
			buttons: [
				{
					label: `${t({
						id: 'admin.confirm.yes',
					})}`,
					onClick: () => {
						apiServiceInstance
							.delete<VinistoProductDllModelsApiHomePageHomePageCustomCarouselReturn>(
								`product-api/home-page/custom-carousels/${customCarouselState?.homePageCustomCarousel?.id}/bundles/${bundleId}`,
								undefined,
								true,
								[
									{
										key: 'userLoginHash',
										value: authenticationContext.vinistoUser.loginHash,
									},
								]
							)
							.then((payload) => {
								const homePageCustomCarousel = payload?.homePageCustomCarousel;
								setCustomCarouselState((customCarouselState) => ({
									...customCarouselState,
									homePageCustomCarousel,
								}));
								notificationsContext.handleShowSuccessNotification(
									'admin.deleteCustomCarouselBundle.success'
								);
							})
							.catch(() => {
								notificationsContext.handleShowErrorNotification(
									'admin.deleteCustomCarouselBundle.error'
								);
							});
					},
				},
				{
					label: `${t({
						id: 'admin.confirm.no',
					})}`,
				},
			],
		});
	};

	const bundleCountQuery = useWarehouseCount(
		(customCarouselState.homePageCustomCarousel?.bundles ?? []).map(
			(bundle) => bundle.id ?? ''
		)
	);

	return (
		<AdminDetail
			detailSchema={detailSchema}
			actionButtonsSchema={actionButtonsSchema}
			customComponentRender={() => (
				<BundleItemList
					bundles={customCarouselState.homePageCustomCarousel?.bundles ?? []}
					idSequenceMaps={
						customCarouselState.homePageCustomCarousel?.items ?? []
					}
					idAvailableCountMaps={bundleCountQuery.data?.map((item) => ({
						itemId: item.id,
						quantity: item.quantity,
					}))}
					onRemove={handleOnRemoveBundleFromCustomCarousel}
				/>
			)}
		/>
	);
};

export default CustomCarouselsHomePageDetail;
