import { useCallback, useContext, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import {
	QueryClient,
	QueryClientProvider,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';
import Config from 'Config';
import { dayjsInstance as dayjs } from 'Services/Date';
import {
	MdAdd,
	MdCategory,
	MdKeyboardBackspace,
	MdLocalShipping,
	MdOutlineDelete,
	MdOutlineEdit,
	MdOutlineRestore,
	MdOutlineSubtitles,
	MdProductionQuantityLimits,
	MdThumbDownAlt,
	MdThumbUpAlt,
} from 'react-icons/md';
import { FiPackage } from 'react-icons/fi';
import {
	FaBan,
	FaCheck,
	FaGift,
	FaLink,
	FaPercent,
	FaTrash,
	FaUser,
} from 'react-icons/fa';
import sanitizeHtml from 'sanitize-html';
import { AiOutlineFall, AiOutlineNotification } from 'react-icons/ai';
import { BsFillTagsFill } from 'react-icons/bs';
import { AiFillFileText } from 'react-icons/ai';
import { RiBarcodeBoxLine, RiEyeOffLine } from 'react-icons/ri';
import { FaMoneyBillAlt, FaRegImage } from 'react-icons/fa';
import { GiTrophyCup } from 'react-icons/gi';
import { FiBookOpen } from 'react-icons/fi';
import { BiPackage } from 'react-icons/bi';
import {
	ADD_ALTERNATIVE_BUNDLE_TO_BUNDLE,
	ADD_BUNDLE_TO_SET,
	ADD_CATEGORY_TO_BUNDLE,
	ADD_DISCOUNT_PRICE_TO_BUNDLE,
	ADD_IMAGE_TO_BUNDLE,
	ADD_NOT_ALLOWED_COUNTRY_TO_BUNDLE,
	ADD_PRICE_TO_BUNDLE,
	ADD_PRODUCT_TO_BUNDLE,
	ADD_SPECIFICATION_TO_BUNDLE,
	ADD_TAG_TO_BUNDLE,
	ADD_VOLUME_DISCOUNT_TO_BUNDLE,
	CONFIRM_BUNDLE_FLAGS_UPDATE,
	EDIT_BUNDLE,
	EDIT_BUNDLE_SET,
} from 'Components/Modal/constants';
import {
	USER_ADMIN_DISCOUNT,
	USER_ADMIN_IMAGE,
} from 'Services/AuthorizationService/Components/RequirePermissions/constants';
import BundleServiceV2 from 'vinisto_api_client/src/product-service/bundle';
import WarehouseService from 'vinisto_api_client/src/warehouse-service';
import {
	VinistoHelperDllBaseBaseReturn,
	VinistoHelperDllEnumsBundleBundleState,
	VinistoHelperDllEnumsPriceDiscountType,
	VinistoProductDllModelsApiBundlePricesReturn,
} from 'vinisto_api_client/src/api-types/product-api/';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { IntegrationContext } from 'Services/IntergationService';
import { LocalizationContext } from 'Services/LocalizationService';
import ApiService, { apiServiceInstance } from 'Services/ApiService';
import BundleService from 'Services/Bundle';
import ImageService from 'Services/Image';
import useLocalizedValue, { useLocalizedValues } from 'Hooks/useLocalizedValue';
import { ModalContext } from 'Components/Modal/context';
import AdminDetail from 'Components/AdminDetail';
import DeleteIcon from 'Components/Icons/Delete';
import VinistoSwitch from 'Components/Switch';
import { IS_GIFT, TEMPORARY_UNAVAILABLE } from 'Constants/flags';
import ImageList from 'Components/ImageList';
import useIdenticalBundles from 'Hooks/useIdenticalBundles';
import { BundleEditService } from 'vinisto_api_client';
import DeleteBundleAlert from 'Components/DeleteBundleAlert';
import useBundleById, { bundleQueryKeys } from 'Hooks/Queries/useBundleById';

import BundleCategoryList from './Components/BundleCategoryList';
import BundleTagList from './Components/BundleTagList';
import AlternativeBundlesList from './Components/AlternativeBundlesList';
import ProductList from './Components/ProductList';
import BundleSpecificationList from './Components/BundleSpecificationList';
import IdenticalBundlesList from './Components/IdenticalBundlesList';
import getIncompatibleFlags from './helpers';
import './styles.css';
import styles from './styles.module.css';
import {
	CLEARANCE_SALE_TAG_ID,
	countryCodeToCountryNameMap,
	JANUARY_FIRST_2038_IN_SECONDS,
} from './constants';
import BundleList from './Components/BundleList';
import FeeRules from './Components/FeeRules';
import PriceTable from './Components/PriceTable';
import StateDetail from './Components/StateDetail';
import AddPrices from './Components/PriceTable/AddPrices';

import api from '@/api';
import { VinistoHelperDllEnumsPriceLevel } from '@/api-types/cms-api';
import { VinistoHelperDllEnumsCountryCode } from '@/api-types/user-api';
import { VinistoServicesApiServicesIntegrationListItemDto } from '@/api-types/services-api';

const BundleDetailPage = () => {
	const { handleShowErrorNotification, handleShowSuccessNotification } =
		useContext(NotificationsContext);
	const authenticationContext = useContext(AuthenticationContext);
	const userLoginHash = authenticationContext?.vinistoUser?.loginHash;
	const localizationContext = useContext(LocalizationContext);
	const {
		activeCurrency: { currency },
	} = localizationContext;
	const modalContext = useContext(ModalContext);
	const { integrations } = useContext(IntegrationContext);

	const t = localizationContext.useFormatMessage();
	const getLocalizedValue = useLocalizedValue();
	const localizeArray = useLocalizedValues();
	const history = useNavigate();

	const { id: bundleId = '' } = useParams();

	const queryClient = useQueryClient();

	const {
		data: bundle,
		isLoading,
		refetch: refetchBundleDetail,
		error,
	} = useBundleById({ bundleId });

	const pricesQuery = useQuery({
		queryKey: ['getBundlePrices', bundle?.id],
		queryFn: () =>
			api.get<VinistoProductDllModelsApiBundlePricesReturn>(
				`product-api/bundles/${bundle?.id}/GetPrices`,
				{
					userLoginHash: userLoginHash,
					currency,
				}
			),
		enabled: !!bundle?.id,
	});

	const { data: warehouseAvailableCount } = useQuery(
		['warehouseItemQuantities', bundleId],
		async () =>
			WarehouseService.getWarehouseItemQuantities([bundleId]).then(
				(res) => res.warehouseItemQuantities?.[0].quantity ?? null
			),
		{
			enabled: !!bundleId,
		}
	);

	const {
		data: identicalBundlesData,
		isFetched: isIdenticalBundlesDataFetched,
	} = useIdenticalBundles(bundleId);

	const identicalBundlesPricesQuery = useQuery({
		queryKey: ['identicalBundlesPrices', { bundleId, userLoginHash, currency }],
		queryFn: () =>
			Promise.all(
				(identicalBundlesData ?? []).map(async (bundle) =>
					api.get<VinistoProductDllModelsApiBundlePricesReturn>(
						`product-api/bundles/${bundle.id}/GetPrices`,
						{
							userLoginHash,
							currency,
						}
					)
				)
			),
		enabled: isIdenticalBundlesDataFetched,
	});

	const isSet = bundle?.flags.isSet;

	const handleOnRemoveBundlePrice = useCallback(
		(
				currency: string,
				priceLevel: VinistoHelperDllEnumsPriceLevel,
				discountType?: VinistoHelperDllEnumsPriceDiscountType,
				platformId?: number,
				discountId?: string
			) =>
			() => {
				const bundleId = bundle?.id;
				const isDiscount = !!discountType;

				const tempQueryClient = new QueryClient({
					defaultOptions: {
						queries: {
							retry: 0,
							staleTime: 10000,
							refetchOnMount: false,
							refetchOnWindowFocus: false,
						},
					},
				});

				const handleOnEditPrice = (
					isDiscount: boolean,
					priceLevel: VinistoHelperDllEnumsPriceLevel,
					discountType: VinistoHelperDllEnumsPriceDiscountType | undefined,
					platformId: number | undefined
				) => {
					if (!isDiscount) {
						apiServiceInstance
							.delete(
								`product-api/bundles/${bundleId}/prices`,
								undefined,
								true,
								[
									{
										key: 'currency',
										value: currency,
									},
									{
										key: 'userLoginHash',
										value: userLoginHash,
									},
									{
										key: 'priceLevel',
										value: priceLevel,
									},
									{
										key: 'platformId',
										value: Number(platformId),
									},
								]
							)
							.then(() => {
								handleShowSuccessNotification(
									'admin.deleteBundlePrice.success'
								);
								refetchBundleDetail();
								pricesQuery.refetch?.();
							})
							.catch(() => {
								handleShowErrorNotification('admin.deleteBundlePrice.error');
							});
					} else {
						if (discountType === undefined) {
							handleShowErrorNotification('admin.deleteBundlePrice.error');
							return;
						}
						apiServiceInstance
							.delete(
								`product-api/bundles/${bundleId}/DeleteDiscountPrice`,
								undefined,
								true,
								[
									{
										key: 'currency',
										value: currency,
									},
									{
										key: 'userLoginHash',
										value: userLoginHash,
									},
									{
										key: 'priceLevel',
										value: priceLevel,
									},
									{
										key: 'priceDiscountType',
										value: discountType,
									},
									{
										key: 'platformId',
										value: Number(platformId),
									},
									{
										key: 'discountId',
										value: discountId ?? '',
									},
								]
							)
							.then(() => {
								handleShowSuccessNotification(
									'admin.deleteBundlePrice.success'
								);
								refetchBundleDetail();
								pricesQuery.refetch?.();
							})
							.catch(() => {
								handleShowErrorNotification('admin.deleteBundlePrice.error');
							});
					}
				};

				confirmAlert({
					customUI: ({ onClose }) => (
						<QueryClientProvider client={tempQueryClient}>
							<DeleteBundleAlert
								bundleId={bundleId ?? ''}
								onSave={() =>
									handleOnEditPrice(
										isDiscount,
										priceLevel,
										discountType,
										platformId
									)
								}
								onClose={onClose}
								title={`${t(
									{
										id: 'admin.confirm.deleteBundlePrice.title',
									},
									{
										priceTypeAccusative: String(
											isDiscount
												? t({ id: 'priceTypeAccusative.discount' })
												: t({ id: 'priceTypeAccusative.price' })
										),
									}
								)}`}
								message={`${t(
									{
										id: 'admin.confirm.deleteBundlePrice.message',
									},
									{
										priceTypeAccusative: String(
											isDiscount
												? t({ id: 'priceTypeAccusative.discount' })
												: t({ id: 'priceTypeAccusative.price' })
										),
									}
								)}`}
								confirmText={`${t({
									id: 'admin.confirm.deleteBundlePrice.yes',
								})}`}
								declineText={`${t({
									id: 'admin.confirm.deleteBundlePrice.no',
								})}`}
								translations={{
									checking: `${t({ id: 'admin.deleteBundle.checking' })}`,
									deleting: `${t({ id: 'admin.deleteBundle.deleting' })}`,
									set: `${t({ id: 'admin.deleteBundle.set' })}`,
								}}
							/>
						</QueryClientProvider>
					),
				});
			},
		[
			bundle?.id,
			userLoginHash,
			handleShowSuccessNotification,
			refetchBundleDetail,
			pricesQuery,
			handleShowErrorNotification,
			t,
		]
	);

	const bundleState = bundle?.state;

	const togglePlatform = (
		platform: VinistoServicesApiServicesIntegrationListItemDto
	) => {
		const platformCount = bundle?.availableOnPlatforms?.length ?? 0;
		const currentPlatformSetting = bundle?.availableOnPlatforms?.includes(
			platform.integrationId
		);
		const deletingLastPlatform = currentPlatformSetting && platformCount === 1;

		if (deletingLastPlatform) {
			handleShowErrorNotification(
				'admin.bundleDetail.platform.deleteLastPlatform'
			);
			return;
		}
		if (currentPlatformSetting) {
			BundleServiceV2.removePlatform({
				bundleId,
				UserLoginHash: userLoginHash,
				PlatformId: platform.integrationId,
			})
				.then(() => {
					handleShowSuccessNotification(
						`${t(
							{
								id: 'admin.removePlatform.success',
							},
							{
								platform: platform.integrationName,
							}
						)}`
					);
					refetchBundleDetail();
				})
				.catch(() => {
					handleShowErrorNotification(
						`${t(
							{
								id: 'admin.removePlatform.error',
							},
							{
								platform: platform.integrationName,
							}
						)}`
					);
				});
		} else {
			BundleServiceV2.addPlatform({
				bundleId,
				UserLoginHash: userLoginHash,
				PlatformId: platform.integrationId,
			})
				.then(() => {
					handleShowSuccessNotification(
						`${t(
							{
								id: 'admin.setPlatform.success',
							},
							{
								platform: platform.integrationName,
							}
						)}`
					);
					refetchBundleDetail();
				})
				.catch(() => {
					handleShowErrorNotification(
						`${t(
							{
								id: 'admin.setPlatform.error',
							},
							{ platform: platform.integrationName }
						)}`
					);
				});
		}
	};

	const platforms: Record<string, unknown>[] = [];
	{
		integrations?.map((platform) =>
			platforms.push({
				icon: AiOutlineNotification,
				label: platform.integrationName,
				value: (
					<div className="vinisto-toggle">
						{bundle?.availableOnPlatforms?.includes(platform.integrationId)
							? t({ id: 'admin.yes' })
							: t({ id: 'admin.no' })}
						<VinistoSwitch
							onChange={() => togglePlatform(platform)}
							checked={Boolean(
								bundle?.availableOnPlatforms?.includes(platform.integrationId)
							)}
							id={`${platform.integrationId}`}
						/>
					</div>
				),
				type: null,
			})
		);
	}

	const addBundlePriceFunction = (isVinistoPlus: boolean) => {
		modalContext.handleOpenModal(ADD_PRICE_TO_BUNDLE, {
			bundle,
			refetchBundleDetail,
			refetchBundlePrices: pricesQuery.refetch,
			isVinistoPlus,
		});
	};

	const addBundleDiscountPriceFunction = (isVinistoPlus: boolean) => {
		modalContext.handleOpenModal(ADD_DISCOUNT_PRICE_TO_BUNDLE, {
			bundle,
			pricesQuery,
			identicalBundlesPricesQuery,
			refetchBundleDetail,
			refetchBundlePrices: pricesQuery.refetch,
			isVinistoPlus,
		});
	};

	const getDetailSchema = (): Record<string, unknown>[] => {
		return [
			{
				icon: RiBarcodeBoxLine,
				label: 'admin.bundleDetail.identifier.label',
				value: bundle?.id,
				type: null,
			},
			{
				icon: RiBarcodeBoxLine,
				label: 'admin.bundleDetail.bundleIdentifier.label',
				value: bundle?.warehouseId.join(', '),
				type: null,
			},
			{
				icon: RiEyeOffLine,
				label: 'admin.bundleDetail.state.label',
				value: <StateDetail state={bundleState} />,
				type: null,
			},
			{
				icon: BiPackage,
				label: 'admin.bundleDetail.isSet.label',
				value: isSet ? t({ id: 'admin.yes' }) : t({ id: 'admin.no' }),
				type: null,
			},
			{
				icon: MdOutlineSubtitles,
				label: 'admin.bundleDetail.name.label',
				value: getLocalizedValue(bundle?.name ?? []),
				type: null,
			},
			{
				icon: FaLink,
				label: 'admin.bundleDetail.url.label',
				value: (
					<a
						href={`${Config.eshopUrl}${t({
							id: 'eshop.routes.product.route',
						})}/${getLocalizedValue(bundle?.url ?? [])}`}
					>
						{getLocalizedValue(bundle?.url ?? [])}
					</a>
				),
				type: null,
			},
			{
				icon: AiFillFileText,
				label: 'admin.bundleDetail.metaDescription.label',
				value: getLocalizedValue(bundle?.metaDescription ?? []),
				type: null,
			},
			{
				icon: AiFillFileText,
				label: 'admin.bundleDetail.shortDescription.label',
				value: getLocalizedValue(bundle?.shortDescription ?? []),

				type: null,
			},
			{
				icon: MdCategory,
				label: 'admin.bundleDetail.keywords.label',
				value: localizeArray(bundle?.keywords ?? []).join(', ') ?? '-',
				type: null,
			},
			{
				icon: AiFillFileText,
				label: 'admin.bundleDetail.description.label',
				value: (
					<div
						dangerouslySetInnerHTML={{
							__html: sanitizeHtml(
								getLocalizedValue(bundle?.description ?? [])
							),
						}}
					></div>
				),
				type: null,
			},
			{
				icon: AiFillFileText,
				label: 'admin.bundleDetail.text.label',
				value: (
					<div className="mb-4">{getLocalizedValue(bundle?.text ?? [])}</div>
				),
				type: null,
			},
			{
				icon: FaMoneyBillAlt,
				label: 'admin.bundleDetail.price.label',
				value: bundle?.prices ? (
					<div className="d-block w-100">
						<PriceTable
							pricesQuery={pricesQuery}
							bundle={bundle}
							handleOnRemoveBundlePrice={handleOnRemoveBundlePrice}
							refetchBundleDetail={refetchBundleDetail}
							refetchBundlePrices={pricesQuery.refetch}
						/>
						<AddPrices
							disabled={isLoading || !!isSet}
							addBundlePriceFunction={addBundlePriceFunction}
							addBundleDiscountPriceFunction={addBundleDiscountPriceFunction}
							bundlePrices={bundle.prices}
						/>
					</div>
				) : null,
			},
			{
				icon: FaPercent,
				label: 'admin.bundleDetail.feeRules.label',
				value: (
					<div className="table-responsive w-100">
						<FeeRules bundle={bundle} />
					</div>
				),
			},
			{
				icon: FiPackage,
				label: 'admin.bundleDetail.availableCount.label',
				value: (
					<Link to={`/warehouse-bundle-detail/${bundle?.id}`}>
						{warehouseAvailableCount ?? '-'}
					</Link>
				),
				type: null,
			},
			{
				icon: MdLocalShipping,
				label: 'admin.bundleDetail.supplier.label',
				value: bundle?.supplier?.id ? (
					<Link to={`/supplier-detail/${bundle.supplier.id}`}>
						{bundle.supplier.nameWeb ?? '-'}
					</Link>
				) : (
					'-'
				),
				type: null,
			},
			{
				icon: MdLocalShipping,
				label: 'admin.bundleDetail.freeDelivery.label',
				value: (
					<div className="vinisto-toggle">
						{bundle?.flags.isDeliveryFree
							? t({ id: 'admin.yes' })
							: t({ id: 'admin.no' })}
						<VinistoSwitch
							onChange={
								bundle?.flags.isDeliveryFree
									? () => {
											apiServiceInstance
												.put(
													`product-api/bundles/${bundleId}/DeactivateDeliveryFreeBundle`,
													{
														userLoginHash: userLoginHash,
													},
													true
												)
												.then(() => {
													handleShowSuccessNotification(
														'admin.deactivateDeliveryFreeBundle.success'
													);
													queryClient.invalidateQueries(
														bundleQueryKeys.byId(bundleId)
													);
												})
												.catch(() => {
													handleShowErrorNotification(
														'admin.deactivateDeliveryFreeBundle.error'
													);
												});
									  }
									: () => {
											apiServiceInstance
												.put(
													`product-api/bundles/${bundleId}/ActivateDeliveryFreeBundle`,
													{
														userLoginHash: userLoginHash,
													},
													true
												)
												.then(() => {
													handleShowSuccessNotification(
														'admin.activateDeliveryFreeBundle.success'
													);
													refetchBundleDetail();
												})
												.catch(() => {
													handleShowErrorNotification(
														'admin.activateDeliveryFreeBundle.error'
													);
												});
									  }
							}
							checked={!!bundle?.flags.isDeliveryFree}
							id={'freeDelivery'}
						/>
					</div>
				),
				type: null,
			},
			{
				icon: FaUser,
				label: 'admin.onlyForMembers.label',
				value: (
					<div className="vinisto-toggle">
						{bundle?.flags.isForLogged
							? t({ id: 'admin.yes' })
							: t({ id: 'admin.no' })}
					</div>
				),
				type: null,
			},
			{
				icon: MdProductionQuantityLimits,
				label: 'admin.bundleDetail.orderLimitation.label',
				value: (
					<div className={styles.keep_whitespace}>
						{bundle?.orderLimitation ? (
							<>
								<div className={styles.bold}>
									{t(
										{ id: 'unitWithPluralModifiers' },
										{ count: bundle?.orderLimitation.limit }
									)}
									<DeleteIcon
										onClick={() => {
											BundleService.removeOrderLimitation({
												bundleId,
												userLoginHash: userLoginHash,
											})
												.then(() => {
													handleShowSuccessNotification(
														'admin.editBundle.success'
													);
													queryClient.invalidateQueries(
														bundleQueryKeys.byId(bundleId)
													);
												})
												.catch(() => {
													handleShowErrorNotification('admin.editBundle.error');
												});
										}}
										className="bundle-detail__btn ms-2 mb-1"
									/>
								</div>

								<span>
									{bundle?.orderLimitation?.validFrom &&
										`${t({ id: 'admin.productDetail.isEnabled.label' })} ${t({
											id: 'admin.from',
										})} ${bundle?.orderLimitation.validFrom.format(
											`${t({ id: 'admin.dateFormat' })}`
										)} `}
								</span>
								<span>
									{bundle?.orderLimitation?.validTo &&
										(bundle.orderLimitation.validTo ===
										dayjs(JANUARY_FIRST_2038_IN_SECONDS)
											? ` ${t({
													id: 'admin.bundleDetail.orderLimitation.untilCancellation',
											  })}`
											: ` ${t({
													id: 'admin.to',
											  })} ${bundle?.orderLimitation.validTo.format(
													`${t({ id: 'admin.dateFormat' })}`
											  )}`)}
								</span>
							</>
						) : (
							'–'
						)}
					</div>
				),
				type: null,
			},
			{
				icon: MdProductionQuantityLimits,
				label: 'admin.modal.form.piecesPerPackage.label',
				value: bundle?.piecesPerPackage ?? false,
				type: 'number',
			},
			{
				icon: MdProductionQuantityLimits,
				label: 'admin.modal.form.packagesOnPallet.label',
				value: bundle?.packagesOnPallet ?? false,
				type: 'number',
			},
			{
				icon: GiTrophyCup,
				label: 'admin.bundleDetail.scoring.label',
				value: bundle?.scoring ?? false,
				type: 'number',
			},
			{
				icon: GiTrophyCup,
				label: 'admin.bundleDetail.scoringAdmin.label',
				value: bundle?.scoringAdmin ?? false,
				type: 'number',
			},
			{
				icon: GiTrophyCup,
				label: 'admin.bundleDetail.scoringDiscount.label',
				value: bundle?.scoringDiscount ?? false,
				type: 'number',
			},
			{
				icon: GiTrophyCup,
				label: 'admin.bundleDetail.scoringWarehouse.label',
				value: bundle?.scoringWarehouse ?? false,
				type: 'number',
			},
			{
				icon: FaTrash,
				label: 'admin.bundleDetail.isDeleted.label',
				value: bundle?.flags.isDeleted ?? false,
				type: 'boolean',
			},
			{
				icon: AiOutlineFall,
				label: 'admin.bundleDetail.isSaleOver.label',
				value: (
					<div className="vinisto-toggle">
						{bundle?.flags.isSaleOver
							? t({ id: 'admin.yes' })
							: t({ id: 'admin.no' })}
						<VinistoSwitch
							onChange={toggleIsSaleOver}
							checked={Boolean(bundle?.flags.isSaleOver)}
							id={'isSaleOver'}
						/>
					</div>
				),
				type: null,
			},
			{
				icon: FaCheck,
				label: 'admin.bundleDetail.isEnabled.label',
				value:
					bundleState === undefined ||
					bundleState === VinistoHelperDllEnumsBundleBundleState.Confirmed ? (
						<div className="vinisto-toggle">
							{bundle?.flags.isEnabled
								? t({ id: 'admin.yes' })
								: t({ id: 'admin.no' })}
							<VinistoSwitch
								onChange={() => {
									const currentIsEnabled = bundle?.flags.isEnabled;

									BundleService.setIsBundleEnabled({
										bundleId: bundleId,
										userLoginHash: userLoginHash,
										desiredState: !currentIsEnabled,
									})
										.then(() => {
											handleShowSuccessNotification(
												currentIsEnabled
													? 'admin.disableBundle.success'
													: 'admin.enableBundle.success'
											);
											refetchBundleDetail();
										})
										.catch(() => {
											handleShowErrorNotification(
												currentIsEnabled
													? 'admin.disableBundle.error'
													: 'admin.enableBundle.error'
											);
										});
								}}
								checked={Boolean(bundle?.flags.isEnabled)}
								id={'isEnabled'}
							/>
						</div>
					) : (
						<>{t({ id: 'admin.bundleDetail.notActive' })}</>
					),
			},
			{
				icon: FaBan,
				label: 'admin.bundleDetail.toBeApproved.label',
				value: (
					<div className="vinisto-toggle">
						{bundle?.flags.isApproved
							? t({ id: 'admin.yes' })
							: t({ id: 'admin.no' })}
						<VinistoSwitch
							onChange={() => {
								const currentIsApproved = bundle?.flags.isApproved ?? false;

								BundleService.setIsApproved({
									bundleId: bundleId,
									userLoginHash: userLoginHash,
									desiredState: !currentIsApproved,
								})
									.then(() => {
										handleShowSuccessNotification(
											'admin.updateToBeApproved.success'
										);
										refetchBundleDetail();
									})
									.catch(() => {
										handleShowErrorNotification(
											'admin.updateToBeApproved.error'
										);
									});
							}}
							checked={Boolean(bundle?.flags.isApproved)}
							id={'isApproved'}
						/>
					</div>
				),
			},
			{
				icon: FaBan,
				label: 'admin.bundleDetail.temporaryUnavailable.label',
				value: (
					<div className="vinisto-toggle">
						{bundle?.flags.isTemporaryUnavailable
							? t({ id: 'admin.yes' })
							: t({ id: 'admin.no' })}
						<VinistoSwitch
							onChange={() => {
								const currentTemporaryUnavailable =
									bundle?.flags.isTemporaryUnavailable;

								const incompatibleFlags = getIncompatibleFlags(
									TEMPORARY_UNAVAILABLE,
									!currentTemporaryUnavailable,
									bundle
								);

								if (incompatibleFlags) {
									return modalContext.handleOpenModal(
										CONFIRM_BUNDLE_FLAGS_UPDATE,
										{
											incompatibleFlags,
											desiredFlag: TEMPORARY_UNAVAILABLE,
											desiredState: !currentTemporaryUnavailable,
											bundleId,
											refetchBundleDetail,
										}
									);
								}
								BundleService.setIsBundleTemporaryUnavailable({
									bundleId: bundleId,
									userLoginHash: userLoginHash,
									desiredState: !currentTemporaryUnavailable,
								})
									.then(() => {
										handleShowSuccessNotification(
											'admin.updateTemporaryAvailability.success'
										);
										refetchBundleDetail();
									})
									.catch(() => {
										handleShowErrorNotification(
											'admin.updateTemporaryAvailability.error'
										);
									});
							}}
							checked={Boolean(bundle?.flags.isTemporaryUnavailable)}
							id={'temporaryUnavailable'}
						/>
					</div>
				),
			},
			{
				icon: FaGift,
				label: 'admin.bundleDetail.isGift.label',
				value: (
					<div className="vinisto-toggle">
						{bundle?.flags.isGift
							? t({ id: 'admin.yes' })
							: t({ id: 'admin.no' })}
						<VinistoSwitch
							onChange={() => {
								const currentIsGift = bundle?.flags.isGift;

								const incompatibleFlags = getIncompatibleFlags(
									IS_GIFT,
									!currentIsGift,
									bundle
								);

								if (incompatibleFlags) {
									return modalContext.handleOpenModal(
										CONFIRM_BUNDLE_FLAGS_UPDATE,
										{
											incompatibleFlags,
											desiredFlag: IS_GIFT,
											desiredState: !currentIsGift,
											bundleId,
										}
									);
								}
								BundleService.setIsBundleGift({
									bundleId: bundleId,
									userLoginHash: userLoginHash,
									desiredState: !currentIsGift,
								})
									.then(() => {
										handleShowSuccessNotification('admin.setGift.success');
										refetchBundleDetail();
									})
									.catch(() => {
										handleShowErrorNotification('admin.setGift.error');
									});
							}}
							checked={Boolean(bundle?.flags.isGift)}
							id={'isGift'}
						/>
					</div>
				),
				type: null,
			},
			{
				icon: AiOutlineFall,
				label: 'admin.bundleDetail.isClearanceSale.label',
				value: (
					<div className="vinisto-toggle">
						{bundle?.flags.isClearanceSale
							? t({ id: 'admin.yes' })
							: t({ id: 'admin.no' })}
						<VinistoSwitch
							onChange={toggleIsClearanceSale}
							checked={Boolean(bundle?.flags.isClearanceSale)}
							id={'isClearanceSale'}
						/>
					</div>
				),
				type: null,
			},
			{
				icon: AiOutlineFall,
				label: 'admin.bundleDetail.canSendToWms.label',
				value: (
					<div className="vinisto-toggle">
						{bundle?.flags.canSendToWms
							? t({ id: 'admin.no' })
							: t({ id: 'admin.yes' })}
						<VinistoSwitch
							onChange={toggleCanSendToWms}
							checked={!bundle?.flags.canSendToWms}
							id={'CanSendToWms'}
						/>
					</div>
				),
				type: null,
			},
			...platforms,
		].filter(
			(item): item is Exclude<typeof item, undefined> => item !== undefined
		);
	};

	const handleDeleteBundle = () => {
		confirmAlert({
			title: `${t({ id: 'admin.confirm.deleteBundle.title' })}`,
			message: `${t({ id: 'admin.confirm.deleteBundle.message' })}`,
			buttons: [
				{
					label: `${t({ id: 'admin.confirm.deleteBundle.yes' })}`,
					onClick: () => {
						apiServiceInstance
							.delete(`product-api/bundles`, bundleId, true, [
								{
									key: 'userLoginHash',
									value: userLoginHash,
								},
							])
							.then(() => {
								handleShowSuccessNotification('admin.deleteBundle.success');
								refetchBundleDetail();
							})
							.catch(() => {
								handleShowErrorNotification('admin.deleteBundle.error');
							});
					},
				},
				{
					label: `${t({ id: 'admin.confirm.deleteBundle.no' })}`,
				},
			],
		});
	};

	const handleRestoreBundle = () => {
		apiServiceInstance
			.put<VinistoHelperDllBaseBaseReturn>(
				`product-api/bundles/${bundleId}/restore-bundle`,
				{
					userLoginHash: userLoginHash,
				}
			)
			.then(() => {
				handleShowSuccessNotification('admin.restoreBundle.success');
				refetchBundleDetail();
			})
			.catch(() => {
				handleShowErrorNotification('admin.restoreBundle.error');
			});
	};

	const toggleIsClearanceSale = () => {
		const currentIsClearanceSale = bundle?.flags.isClearanceSale;
		BundleService.setIsBundleClearanceSale({
			bundleId: bundleId,
			userLoginHash: userLoginHash,
			desiredState: !currentIsClearanceSale,
		})
			.then(() => {
				toggleClearanceSaleTag(!currentIsClearanceSale);
				handleShowSuccessNotification('admin.setIsClearanceSale.success');
			})
			.catch(() => {
				handleShowErrorNotification('admin.setIsClearanceSale.error');
			});
	};

	const toggleClearanceSaleTag = (status: boolean | undefined) => {
		const apiService = new ApiService();
		if (status) {
			const requestData = {
				userLoginHash: authenticationContext.vinistoUser.loginHash,
				itemId: CLEARANCE_SALE_TAG_ID,
			};
			apiService
				.post(`product-api/bundles/${bundleId}/tags`, requestData, true)
				.then(() => {
					handleShowSuccessNotification('admin.addTagToBundle.success');
					modalContext.handleCloseModal();
					refetchBundleDetail();
				})
				.catch(() => {
					handleShowErrorNotification('admin.addTagToBundle.error');
				});
		} else {
			apiService
				.delete(
					`product-api/bundles/${bundleId}/tags`,
					CLEARANCE_SALE_TAG_ID,
					true,
					[
						{
							key: 'userLoginHash',
							value: authenticationContext.vinistoUser.loginHash,
						},
					]
				)
				.then(() => {
					handleShowSuccessNotification('admin.deleteBundleTag.success');
					refetchBundleDetail();
				})
				.catch(() => {
					handleShowErrorNotification('admin.deleteBundleTag.error');
				});
		}
	};

	const toggleCanSendToWms = () => {
		BundleService.setCanSendToWms(bundleId, {
			userLoginHash,
			canSendToWms: !bundle?.flags.canSendToWms,
		})
			.then(() => {
				handleShowSuccessNotification('admin.setCanSendToWms.success');
				refetchBundleDetail();
			})
			.catch(() => {
				handleShowErrorNotification('admin.setCanSendToWms.error');
			});
	};

	const toggleIsSaleOver = () => {
		const currentIsSaleOver = bundle?.flags.isSaleOver;

		BundleServiceV2.setIsSellOver(bundleId, {
			userLoginHash,
			isSaleOver: !currentIsSaleOver,
		})
			.then(() => {
				handleShowSuccessNotification('admin.setIsSaleOver.success');
				refetchBundleDetail();
			})
			.catch(() => {
				handleShowErrorNotification('admin.setIsSaleOver.error');
			});
	};

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
							ImageService.deleteImage({
								imageId,
								userLoginHash: userLoginHash,
							})
								.then(() => {
									handleShowSuccessNotification(
										'admin.confirm.deleteImage.success'
									);
									refetchBundleDetail();
								})
								.catch(() => {
									handleShowErrorNotification(
										'admin.confirm.deleteImage.error'
									);
								});
						},
					},
					{
						label: `${t({ id: 'admin.confirm.no' })}`,
						onClick: () => undefined,
					},
				],
			});
		},
		[
			t,
			userLoginHash,
			handleShowSuccessNotification,
			refetchBundleDetail,
			handleShowErrorNotification,
		]
	);

	const handleOnSetMainImage = useCallback(
		(imageId: string) => () => {
			return ImageService.setMainImage({
				imageId: imageId,
				userLoginHash: userLoginHash,
				itemId: bundleId,
				itemType: 'Bundle',
			})
				.then(() => {
					handleShowSuccessNotification('admin.image.setAsMain.success');
					refetchBundleDetail();
				})
				.catch(() => {
					handleShowErrorNotification('admin.image.setAsMain.error');
				});
		},
		[
			userLoginHash,
			bundleId,
			handleShowSuccessNotification,
			refetchBundleDetail,
			handleShowErrorNotification,
		]
	);

	const handleOnRemoveAllowedCountry = useCallback(
		(country: VinistoHelperDllEnumsCountryCode) => {
			api
				.delete(`product-api/bundles/${bundleId}/remove-allowed-country`, {
					userLoginHash,
					country,
				})
				.then(() => {
					handleShowSuccessNotification(
						'admin.removeAllowedCountryFromBundle.success'
					);
					refetchBundleDetail();
				})
				.catch(() => {
					handleShowErrorNotification(
						'admin.removeAllowedCountryFromBundle.error'
					);
				});
		},
		[
			bundleId,
			handleShowErrorNotification,
			handleShowSuccessNotification,
			refetchBundleDetail,
			userLoginHash,
		]
	);

	const actionButtonsSchema: Record<string, unknown>[] = [
		{
			rowId: 'BUNDLE_BUTTON_ROW_1',
			items: [
				{
					label: isSet
						? 'admin.btn.editBundleSetDetails'
						: 'admin.btn.editBundleDetails',
					key: 'editBundleDetails',
					disabled: isLoading,
					onClick: () => {
						modalContext.handleOpenModal(
							isSet ? EDIT_BUNDLE_SET : EDIT_BUNDLE,
							{
								bundle,
								refetchBundleDetail,
							}
						);
					},
					icon: MdOutlineEdit,
				},
				{
					label: bundle?.flags.isDeleted
						? isSet
							? 'admin.btn.restoreBundleSet'
							: 'admin.btn.restoreBundle'
						: isSet
						? 'admin.btn.deleteBundleSet'
						: 'admin.btn.deleteBundle',
					key: bundle?.flags.isDeleted ? 'restoreBundle' : 'deleteBundle',
					onClick: bundle?.flags.isDeleted
						? handleRestoreBundle
						: handleDeleteBundle,
					icon: bundle?.flags.isDeleted ? MdOutlineRestore : MdOutlineDelete,
					disabled: isLoading,
				},
				{
					label: 'admin.btn.addImgToBundle',
					key: 'addImgToBundle',
					disabled: isLoading,
					onClick: () => {
						modalContext.handleOpenModal(ADD_IMAGE_TO_BUNDLE, {
							bundle,
						});
					},
					icon: FaRegImage,
					rights: [USER_ADMIN_IMAGE],
				},
			],
		},
		{
			rowId: 'BUNDLE_BUTTON_ROW_2',
			items: [
				{
					label: isSet
						? 'admin.btn.addBundleToSet'
						: 'admin.btn.addProductToBundle',
					key: 'addProductToBundle',
					// This button is not longer to use unless the bundle is set
					// Temporary disabled, should be handled better in the future
					disabled: isLoading || !isSet,
					onClick: () => {
						if (isSet) {
							return modalContext.handleOpenModal(ADD_BUNDLE_TO_SET, {
								bundle,
								refetchBundleDetail,
								refetchBundlePrices: pricesQuery.refetch,
							});
						}
						return modalContext.handleOpenModal(ADD_PRODUCT_TO_BUNDLE, {
							bundle,
							refetchBundleDetail,
						});
					},
					icon: MdCategory,
				},
				{
					label: 'admin.btn.addAlternativeBundleToBundle',
					key: 'addAlternativeBundleToBundle',
					disabled: isLoading,
					onClick: () => {
						modalContext.handleOpenModal(ADD_ALTERNATIVE_BUNDLE_TO_BUNDLE, {
							bundle,
							refetchBundleDetail,
						});
					},
					icon: FiPackage,
				},
				{
					label: 'admin.btn.addPriceToBundle',
					key: 'addPriceToBundle',
					disabled: isLoading || isSet,
					onClick: () => {
						addBundlePriceFunction(false);
					},
					icon: FaMoneyBillAlt,
				},
			],
		},
		{
			rowId: 'BUNDLE_BUTTON_ROW_3',
			items: [
				{
					label: 'admin.btn.addDiscountPriceToBundle',
					key: 'addDiscountPriceToBundle',
					disabled: isLoading || isSet,
					onClick: () => {
						addBundleDiscountPriceFunction(false);
					},
					icon: FaMoneyBillAlt,
					rights: [USER_ADMIN_DISCOUNT],
				},
				{
					label: 'admin.btn.addCategoryToBundle',
					key: 'addCategoryToBundle',
					disabled: isLoading,
					onClick: () => {
						modalContext.handleOpenModal(ADD_CATEGORY_TO_BUNDLE, {
							bundle,
							refetchBundleDetail,
						});
					},
					icon: MdCategory,
				},
				{
					label: 'admin.btn.addTagToBundle',
					key: 'addTagToBundle',
					disabled: isLoading,
					onClick: () => {
						modalContext.handleOpenModal(ADD_TAG_TO_BUNDLE, {
							bundle,
							refetchBundleDetail,
						});
					},
					icon: BsFillTagsFill,
				},
			],
		},
		{
			rowId: 'BUNDLE_BUTTON_ROW_4',
			items: [
				{
					label: 'admin.btn.addSpecificationToBundle',
					key: 'addSpecificationToBundle',
					disabled: isLoading,
					onClick: () => {
						modalContext.handleOpenModal(ADD_SPECIFICATION_TO_BUNDLE, {
							bundle,
							refetchBundleDetail,
						});
					},
					icon: MdAdd,
				},
				{
					label: 'admin.btn.showLogs',
					key: 'bundle-logs',
					onClick: () => {
						history(`/bundle-detail/logs/${bundleId}`);
					},
					icon: FiBookOpen,
				},
				{
					label: 'admin.btn.back',
					key: 'back',
					onClick: () => {
						history(-1);
					},
					icon: MdKeyboardBackspace,
				},
			],
		},
		{
			rowId: 'BUNDLE_BUTTON_ROW_5',
			items: [
				{
					label: 'admin.btn.addVolumeDiscountToBundle',
					key: 'addVolumeDiscountToBundle',
					disabled: isLoading || isSet,
					onClick: () => {
						modalContext.handleOpenModal(ADD_VOLUME_DISCOUNT_TO_BUNDLE, {
							bundle,
							refetchBundlePrices: pricesQuery.refetch,
						});
					},
					icon: MdAdd,
				},
				{
					label: 'admin.btn.addAllowedCountry',
					key: 'addVolumeDiscountToBundle',
					onClick: () => {
						modalContext.handleOpenModal(ADD_NOT_ALLOWED_COUNTRY_TO_BUNDLE, {
							bundle,
							refetchBundleDetail,
						});
					},
					icon: MdAdd,
				},
			],
		},
	];

	if (bundleState === VinistoHelperDllEnumsBundleBundleState.ToConfirm) {
		actionButtonsSchema.push({
			rowId: 'BUNDLE_BUTTON_ROW_6',
			items: [
				{
					label: 'admin.btn.confirm',
					key: 'confirm',
					disabled: isLoading,
					onClick: () => {
						BundleEditService.bundleSupplierSetChangeState(bundleId, {
							bundleSupplierState:
								VinistoHelperDllEnumsBundleBundleState.Confirmed,
							userLoginHash,
						})
							.then(() => {
								refetchBundleDetail();
								handleShowSuccessNotification('admin.confirmBundle.success');
							})
							.catch(() => {
								handleShowErrorNotification('admin.confirmBundle.error');
							});
					},
					icon: MdThumbUpAlt,
					className: styles.confirmButton,
				},
				{
					label: 'admin.btn.reject',
					key: 'reject',
					disabled: isLoading,
					onClick: () => {
						BundleEditService.bundleSupplierSetChangeState(bundleId, {
							bundleSupplierState:
								VinistoHelperDllEnumsBundleBundleState.Rejected,
							userLoginHash,
						})
							.then(() => {
								refetchBundleDetail();
								handleShowSuccessNotification('admin.rejectBundle.success');
							})
							.catch(() => {
								handleShowErrorNotification('admin.rejectBundle.error');
							});
					},
					icon: MdThumbDownAlt,
					className: styles.rejectButton,
				},
			],
		});
	}

	useEffect(() => {
		if (error) {
			handleShowErrorNotification('admin.bundleList.loadingError');
			throw error;
		}
	});

	return (
		bundle && (
			<AdminDetail
				detailSchema={getDetailSchema()}
				actionButtonsSchema={actionButtonsSchema}
				customComponentRender={() => (
					<>
						<div className="admin-page-list">
							<IdenticalBundlesList
								identicalBundles={identicalBundlesData ?? []}
								loaded={!!identicalBundlesData}
							/>
							<BundleCategoryList
								bundle={bundle}
								refetchBundleDetail={refetchBundleDetail}
							/>
							<BundleTagList
								bundle={bundle}
								refetchBundleDetail={refetchBundleDetail}
							/>
							<AlternativeBundlesList
								bundle={bundle}
								refetchBundleDetail={refetchBundleDetail}
							/>
							{isSet ? (
								<BundleList
									bundle={bundle}
									refetchBundleDetail={refetchBundleDetail}
									pricesQuery={pricesQuery}
								/>
							) : (
								<ProductList bundle={bundle} />
							)}
						</div>
						<div className="admin-page-list">
							<BundleSpecificationList
								bundle={bundle}
								refetchBundleDetail={refetchBundleDetail}
							/>
							<ImageList
								images={bundle?.images ?? []}
								handleOnDelete={handleOnDeleteImage}
								handleOnSetMain={handleOnSetMainImage}
							/>
							<div className="pt-4 mb-4">
								<span className={styles.bold}>
									{t({ id: 'admin.allowedCountryList' })}
								</span>

								{bundle.allowedCountries?.length ? (
									<ul className="ps-0">
										{bundle.allowedCountries.map((country) => (
											<li
												key={country}
												className="d-flex gap-2 align-items-center"
											>
												{t({ id: countryCodeToCountryNameMap[country] })}
												<DeleteIcon
													onClick={() => handleOnRemoveAllowedCountry(country)}
													className="bundle-detail__btn"
												/>
											</li>
										))}
									</ul>
								) : (
									<div>({t({ id: 'admin.allowedNowhere' })})</div>
								)}
							</div>
						</div>
					</>
				)}
			/>
		)
	);
};

export default BundleDetailPage;
