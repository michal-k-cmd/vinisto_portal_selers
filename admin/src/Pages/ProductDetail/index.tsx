import { useCallback, useContext, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { apiServiceInstance } from 'Services/ApiService';
import { NotificationsContext } from 'Services/NotificationService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { ModalContext } from 'Components/Modal/context';
import AdminDetail from 'Components/AdminDetail';
import {
	MdAdd,
	MdCategory,
	MdKeyboardBackspace,
	MdOutlineDelete,
	MdOutlineEdit,
	MdOutlineSubtitles,
} from 'react-icons/md';
import { FaCheck, FaLink, FaTrash, FaUser } from 'react-icons/fa';
import { BsFillFileEarmarkRichtextFill, BsFillTagsFill } from 'react-icons/bs';
import { AiFillFileText } from 'react-icons/ai';
import { RiBarcodeBoxLine } from 'react-icons/ri';
import { FaMoneyBillAlt, FaRegImage } from 'react-icons/fa';
import DeleteIcon from 'Components/Icons/Delete';
import { USER_ADMIN_IMAGE } from 'Services/AuthorizationService/Components/RequirePermissions/constants';
import ImageService from 'Services/Image';
import VinistoSwitch from 'Components/Switch';
import {
	ADD_CATEGORY_TO_PRODUCT,
	ADD_IMAGE_TO_PRODUCT,
	ADD_PRICE_TO_PRODUCT,
	ADD_SPECIFICATION_TO_PRODUCT,
	ADD_TAG_TO_PRODUCT,
	EDIT_PRODUCT,
} from 'Components/Modal/constants';
import ImageList from 'Components/ImageList';
import { useMutation, useQuery } from '@tanstack/react-query';
import ProductService from 'Services/ProductService/Product';

import ProductCategoryList from './Components/ProductCategoryList';
import ProductSpecificationList from './Components/ProductSpecificationList';
import ProductTagList from './Components/ProductTagList';
import AssociatedBundlesList from './Components/AssociatedBundlesList';

import './styles.css';
import {
	VinistoHelperDllEnumsCurrency,
	VinistoProductDllModelsApiProductProductReturn,
} from '@/api-types/product-api';

const ProductDetailPage = () => {
	const { handleShowErrorNotification, handleShowSuccessNotification } =
		useContext(NotificationsContext);
	const authenticationContext = useContext(AuthenticationContext);
	const localizationContext = useContext(LocalizationContext);
	const modalContext = useContext(ModalContext);
	const t = localizationContext.useFormatMessage();

	const history = useNavigate();

	const { id: productId } = useParams();

	const {
		data: product,
		isLoading,
		refetch: refetchProductDetail,
		isError,
	} = useQuery(
		['productDetail', productId],
		async () => ProductService.getProductById(String(productId)),
		{
			enabled: !!productId,
		}
	);

	const { mutate: deletePrices } = useMutation({
		mutationFn: ProductService.deleteProductPrices,
		onSuccess: async () => {
			await refetchProductDetail();
			handleShowSuccessNotification('admin.deleteProductPrice.success');
		},
		onError: () => {
			handleShowErrorNotification('admin.deleteProductPrice.error');
		},
	});

	const { mutate: enableProduct } = useMutation({
		mutationFn: ProductService.enableProduct,
		onSuccess: async () => {
			await refetchProductDetail();
			handleShowSuccessNotification('admin.enableProduct.success');
		},
		onError: () => {
			handleShowErrorNotification('admin.enableProduct.error');
		},
	});

	const { mutate: disableProduct } = useMutation({
		mutationFn: ProductService.disableProduct,
		onSuccess: async () => {
			await refetchProductDetail();
			handleShowSuccessNotification('admin.disableProduct.success');
		},
		onError: () => {
			handleShowErrorNotification('admin.disableProduct.error');
		},
	});

	const { mutate: deleteProduct } = useMutation({
		mutationFn: ProductService.deleteProduct,
		onSuccess: async () => {
			await refetchProductDetail();
			handleShowSuccessNotification('admin.deleteProduct.success');
		},
		onError: () => {
			handleShowErrorNotification('admin.deleteProduct.error');
		},
	});

	useEffect(() => {
		if (isError) {
			handleShowErrorNotification('admin.productDetail.loadingFailed');
		}
	}, [isError, handleShowErrorNotification]);

	const handleOnRemoveProductPrice = useCallback(
		(currency: VinistoHelperDllEnumsCurrency) => () => {
			confirmAlert({
				title: `${t({
					id: 'admin.confirm.deleteProductPrice.title',
				})}`,
				message: `${t({
					id: 'admin.confirm.deleteProductPrice.message',
				})}`,
				buttons: [
					{
						label: `${t({
							id: 'admin.confirm.yes',
						})}`,
						onClick: () => {
							const productId = product?.id;
							if (!productId) return;
							deletePrices({
								UserLoginHash: authenticationContext.vinistoUser.loginHash,
								Currency: currency,
								productId,
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
		[t, product?.id, deletePrices, authenticationContext.vinistoUser.loginHash]
	);

	const onProductDisable = useCallback(() => {
		confirmAlert({
			title: `${t({
				id: 'admin.confirm.disableProduct.title',
			})}`,
			message: `${t({
				id: 'admin.confirm.disableProduct.message',
			})}`,
			buttons: [
				{
					label: `${t({
						id: 'admin.confirm.yes',
					})}`,
					onClick: () => {
						const productId = product?.id;
						if (!productId) return;
						disableProduct({
							payload: {
								userLoginHash: authenticationContext.vinistoUser.loginHash,
							},
							productId,
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
	}, [
		t,
		product?.id,
		disableProduct,
		authenticationContext.vinistoUser.loginHash,
	]);

	const onProductEnable = useCallback(() => {
		confirmAlert({
			title: `${t({
				id: 'admin.confirm.enableProduct.title',
			})}`,
			message: `${t({
				id: 'admin.confirm.enableProduct.message',
			})}`,
			buttons: [
				{
					label: `${t({
						id: 'admin.confirm.yes',
					})}`,
					onClick: () => {
						const productId = product?.id;
						if (!productId) return;
						enableProduct({
							payload: {
								userLoginHash: authenticationContext.vinistoUser.loginHash,
							},
							productId,
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
	}, [
		t,
		product?.id,
		enableProduct,
		authenticationContext.vinistoUser.loginHash,
	]);

	const handleToggleProductForLoggedUsersOnly = useCallback(() => {
		const isForLogged = product?.flags?.isForLogged ?? false;

		const endpoint = isForLogged
			? 'DisableProductForLoggedUsersOnly'
			: 'EnableProductForLoggedUsersOnly';

		const confirmMessageId = isForLogged
			? 'admin.confirm.disableForLogged.message'
			: 'admin.confirm.isForLogged.message';
		const successNotificationId = isForLogged
			? 'admin.disableForLogged.success'
			: 'admin.isForLogged.success';
		const errorNotificationId = isForLogged
			? 'admin.disableForLogged.error'
			: 'admin.isForLogged.error';

		confirmAlert({
			title: `${t({ id: 'admin.confirm.isForLogged.title' })}`,
			message: `${t({ id: confirmMessageId })}`,
			buttons: [
				{
					label: `${t({ id: 'admin.confirm.yes' })}`,
					onClick: () => {
						apiServiceInstance
							.put<VinistoProductDllModelsApiProductProductReturn>(
								`product-api/products/${productId}/${endpoint}`,
								{
									userLoginHash: authenticationContext.vinistoUser.loginHash,
									isForLogged: !isForLogged,
								},
								true
							)
							.then(async () => {
								await refetchProductDetail();
								handleShowSuccessNotification(successNotificationId);
							})
							.catch(() => {
								handleShowErrorNotification(errorNotificationId);
							});
					},
				},
				{
					label: `${t({ id: 'admin.confirm.no' })}`,
				},
			],
		});
	}, [
		product?.flags?.isForLogged,
		t,
		productId,
		authenticationContext.vinistoUser.loginHash,
		refetchProductDetail,
		handleShowSuccessNotification,
		handleShowErrorNotification,
	]);

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
								userLoginHash: authenticationContext.vinistoUser.loginHash,
							})
								.then(async () => {
									await refetchProductDetail();
									handleShowSuccessNotification(
										'admin.confirm.deleteImage.success'
									);
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
			authenticationContext.vinistoUser.loginHash,
			handleShowErrorNotification,
			handleShowSuccessNotification,
			refetchProductDetail,
			t,
		]
	);

	const handleOnSetMainImage = useCallback(
		(imageId: string) => () => {
			return ImageService.setMainImage({
				imageId: imageId,
				userLoginHash: authenticationContext.vinistoUser.loginHash,
				itemId: `${productId}`,
				itemType: 'Product',
			})
				.then(async () => {
					await refetchProductDetail();
					handleShowSuccessNotification('admin.image.setAsMain.success');
				})
				.catch(() => {
					handleShowErrorNotification('admin.image.setAsMain.error');
				});
		},
		[
			authenticationContext.vinistoUser.loginHash,
			productId,
			refetchProductDetail,
			handleShowSuccessNotification,
			handleShowErrorNotification,
		]
	);

	const priceRows = useMemo(() => {
		const basePrice = product?.productPrices.basePrice;
		if (!basePrice?.priceType || !basePrice?.currency) return '-';
		return (
			<ul className="product-detail__list">
				<li>
					{`${basePrice.value} ${basePrice.currency} ${t({
						id: 'admin.bundleDetail.price.withoutVAT',
					})}`}
					{` | `}
					{`${basePrice.valueWithVat} ${basePrice.currency} ${t({
						id: 'admin.bundleDetail.price.withVAT',
					})}`}
					<DeleteIcon
						onClick={handleOnRemoveProductPrice(basePrice.currency)}
						className="product-detail__btn ms-2"
					/>
				</li>
			</ul>
		);
	}, [handleOnRemoveProductPrice, product?.productPrices, t]);

	const detailSchema = [
		{
			icon: RiBarcodeBoxLine,
			label: 'admin.productDetail.identifier.label',
			value: product?.id ?? '',
			type: null,
		},
		{
			icon: MdOutlineSubtitles,
			label: 'admin.productDetail.name.label',
			value: product?.name?.[0]?.value ?? '',
			type: null,
		},
		{
			icon: FaLink,
			label: 'admin.productDetail.url.label',
			value: product?.url?.[0]?.value ?? '',
			type: null,
		},
		{
			icon: AiFillFileText,
			label: 'admin.productDetail.description.label',
			value: product?.description?.[0]?.value ?? '',
			type: null,
		},
		{
			icon: BsFillFileEarmarkRichtextFill,
			label: 'admin.productDetail.text.label',
			value: product?.text?.[0]?.value ?? '',
			type: null,
		},
		{
			icon: FaLink,
			label: 'admin.productDetail.warehouseId.label',
			value: product?.warehouseId ?? '',
			type: null,
		},
		{
			icon: FaLink,
			label: 'admin.productDetail.EAN.label',
			value: product?.ean ?? '',
			type: null,
		},
		{
			icon: FaMoneyBillAlt,
			label: 'admin.bundleDetail.price.label',
			value: priceRows,
			type: null,
		},
		{
			icon: FaCheck,
			label: 'admin.productDetail.isEnabled.label',
			value: (
				<div className="vinisto-toggle">
					{product?.flags?.isEnabled
						? t({ id: 'admin.yes' })
						: t({ id: 'admin.no' })}

					<VinistoSwitch
						checked={product?.flags?.isEnabled ?? false}
						onChange={
							product?.flags?.isEnabled ? onProductDisable : onProductEnable
						}
					/>
				</div>
			),
			type: null,
		},
		{
			icon: FaUser,
			label: 'admin.isForLogged.label',
			value: (
				<div className="vinisto-toggle">
					{product?.flags?.isForLogged
						? t({ id: 'admin.yes' })
						: t({ id: 'admin.no' })}
					<VinistoSwitch
						checked={product?.flags?.isForLogged ?? false}
						onChange={handleToggleProductForLoggedUsersOnly}
					/>
				</div>
			),
			type: null,
		},
		{
			icon: FaTrash,
			label: 'admin.productDetail.isDeleted.label',
			value: product?.flags?.isDeleted
				? t({ id: 'admin.yes' })
				: t({ id: 'admin.no' }),
			type: null,
		},
	];

	const actionButtonsSchema = [
		{
			rowId: 'PRODUCT_BUTTON_ROW_1',
			items: [
				{
					label: 'admin.btn.editProductDetails',
					key: 'editProductDetails',
					onClick: () => {
						modalContext.handleOpenModal(EDIT_PRODUCT, {
							product,
						});
					},
					icon: MdOutlineEdit,
					disabled: isLoading,
				},
				{
					label: 'admin.btn.deleteProduct',
					key: 'deleteProduct',
					onClick: () => {
						confirmAlert({
							title: `${t({
								id: 'admin.confirm.deleteProduct.title',
							})}`,
							message: `${t({
								id: 'admin.confirm.deleteProduct.message',
							})}`,
							buttons: [
								{
									label: `${t({
										id: 'admin.confirm.yes',
									})}`,
									onClick: () => {
										const productId = product?.id;
										if (!productId) return;
										deleteProduct({
											UserLoginHash:
												authenticationContext.vinistoUser.loginHash,
											productId,
										});
									},
								},
								{
									label: `${t({
										id: 'admin.confirm.no',
									})}`,
									onClick: () => {},
								},
							],
						});
					},
					icon: MdOutlineDelete,
					disabled: isLoading || product?.flags?.isDeleted,
				},
			],
		},
		{
			rowId: 'PRODUCT_BUTTON_ROW_2',
			items: [
				{
					label: 'admin.btn.uploadImage',
					key: 'addImgToProduct',
					disabled: isLoading,
					onClick: () => {
						modalContext.handleOpenModal(ADD_IMAGE_TO_PRODUCT, {
							product,
						});
					},
					icon: FaRegImage,
					rights: [USER_ADMIN_IMAGE],
				},
				{
					label: 'admin.btn.addPriceToProduct',
					disabled: isLoading,
					key: 'addPriceToProduct',
					onClick: () => {
						modalContext.handleOpenModal(ADD_PRICE_TO_PRODUCT, {
							product,
						});
					},
					icon: FaMoneyBillAlt,
				},
				{
					label: 'admin.btn.addCategoryToProduct',
					key: 'addCategoryToProduct',
					disabled: isLoading,
					onClick: () => {
						modalContext.handleOpenModal(ADD_CATEGORY_TO_PRODUCT, {
							product,
						});
					},
					icon: MdCategory,
				},
			],
		},
		{
			rowId: 'PRODUCT_BUTTON_ROW_3',
			items: [
				{
					label: 'admin.btn.addTagToProduct',
					key: 'addTagToProduct',
					disabled: isLoading,
					onClick: () => {
						modalContext.handleOpenModal(ADD_TAG_TO_PRODUCT, {
							product,
						});
					},
					icon: BsFillTagsFill,
				},
				{
					label: 'admin.btn.addSpecificationToProduct',
					key: 'addSpecificationToProduct',
					disabled: isLoading,
					onClick: () => {
						modalContext.handleOpenModal(ADD_SPECIFICATION_TO_PRODUCT, {
							product,
						});
					},
					icon: MdAdd,
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
	];

	if (isLoading) return;

	return (
		<AdminDetail
			detailSchema={detailSchema}
			actionButtonsSchema={actionButtonsSchema}
			customComponentRender={() => (
				<>
					<ProductCategoryList product={product} />
					<ProductSpecificationList product={product} />
					<ProductTagList product={product} />
					<AssociatedBundlesList productId={productId} />
					<ImageList
						images={product?.images}
						handleOnDelete={handleOnDeleteImage}
						handleOnSetMain={handleOnSetMainImage}
					/>
				</>
			)}
		/>
	);
};

export default ProductDetailPage;
