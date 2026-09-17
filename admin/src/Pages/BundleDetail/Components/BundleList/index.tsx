import { useContext, useState } from 'react';
import { UseQueryResult } from '@tanstack/react-query';
import { confirmAlert } from 'react-confirm-alert';
import { useNavigate } from 'react-router-dom';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { LocalizationContext } from 'Services/LocalizationService';
import DeleteIcon from 'Components/Icons/Delete';
import { MdCategory } from 'react-icons/md';
import { BiLink } from 'react-icons/bi';
import BundleService from 'vinisto_api_client/src/product-service/bundle';
import EditIcon from 'Components/Icons/Edit';
import { Modal } from 'Components/Modal';
import { Form } from 'react-final-form';
import { apiServiceInstance } from 'Services/ApiService';
import { InputCheckBox, InputNumber } from 'Components/Form';
import { getPriceWithoutVAT } from 'vinisto_shared/src/price/get-price-without-vat';
import { BUNDLE_SET_PRICE_HIGHER_STANDARD_PRICE } from 'Components/Modal/Components/AddBundleToSet';
import { isB2b, isB2c, isVicom } from 'Services/IntergationService/helpers';
import formatPrice from 'Helpers/format-price';
import { truncateToDecimalPlaces } from 'vinisto_shared/src/price/truncate-to-decimal-places';
import {
	B2B_NUMERIC_CODE,
	B2C_NUMERIC_CODE,
	VICOM_NUMERIC_CODE,
} from 'Services/IntergationService/constants';

import {
	VinistoCommonDllModelsApiPricesPrice,
	VinistoCommonDllModelsApiPricesSetItemPrice,
	VinistoHelperDllEnumsPriceDiscountType,
	VinistoHelperDllEnumsPriceLevel,
	VinistoHelperDllEnumsVatRate,
	VinistoProductDllModelsApiBundleBundleUnassignParameters,
	VinistoProductDllModelsApiBundlePricesReturn,
} from '@/api-types/product-api';
import { Bundle } from '@/domain/bundle';
import Price, { SetDiscount } from '@/domain/price';
import { priceAdapter } from '@/index';
import BundleItem from '@/domain/bundle/item';

import './styles.css';

const BundleList = ({
	bundle,
	refetchBundleDetail,
	pricesQuery,
}: {
	bundle: Bundle | undefined;
	refetchBundleDetail: () => void;
	pricesQuery: UseQueryResult<
		VinistoProductDllModelsApiBundlePricesReturn,
		unknown
	>;
}) => {
	const { vinistoUser } = useContext(AuthenticationContext);
	const userLoginHash = vinistoUser.loginHash;
	const { handleShowErrorNotification, handleShowSuccessNotification } =
		useContext(NotificationsContext);
	const { useFormatMessage } = useContext(LocalizationContext);

	const t = useFormatMessage();
	const getLocalizedValue = useLocalizedValue();
	const navigate = useNavigate();

	const handleOnRemoveBundleFromSet =
		(params: VinistoProductDllModelsApiBundleBundleUnassignParameters) =>
		() => {
			const bundleId = bundle?.id ?? '';

			confirmAlert({
				title: `${t({ id: 'admin.confirm.removeBundleFromSet.title' })}`,
				message: `${t({ id: 'admin.confirm.removeBundleFromSet.message' })}`,
				buttons: [
					{
						label: `${t({ id: 'admin.confirm.yes' })}`,
						onClick: () => {
							BundleService.removeBundleFromSet(bundleId, { ...params })
								.then(() => {
									handleShowSuccessNotification(
										'admin.removeBundleFromSet.success'
									);
									refetchBundleDetail();
									pricesQuery.refetch();
								})
								.catch(() => {
									handleShowErrorNotification(
										'admin.removeBundleFromSet.error'
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
		};

	const handleOnClickRedirect = (bundleId: string) => () => {
		navigate(`/bundle-detail/${bundleId}`);
	};

	const [editModalData, setEditModalData] = useState<{
		isOpen: boolean;
		itemId: string | null;
		amount: number | null;
		b2cPrice: VinistoCommonDllModelsApiPricesSetItemPrice | null;
		vinistoPlusPrice: VinistoCommonDllModelsApiPricesSetItemPrice | null;
		b2bPrice: VinistoCommonDllModelsApiPricesSetItemPrice | null;
		externalPrice?: VinistoCommonDllModelsApiPricesSetItemPrice | null;
		isSupplierDiscount: boolean;
	}>({
		isOpen: false,
		itemId: null,
		amount: null,
		b2cPrice: null,
		vinistoPlusPrice: null,
		b2bPrice: null,
		externalPrice: null,
		isSupplierDiscount: false,
	});

	const handleOpenEditModal = ({
		itemId,
		amount,
		b2cPrice,
		vinistoPlusPrice,
		b2bPrice,
		externalPrice = null,
		isSupplierDiscount,
	}: {
		itemId: string;
		amount: number;
		b2cPrice: VinistoCommonDllModelsApiPricesSetItemPrice | null;
		vinistoPlusPrice: VinistoCommonDllModelsApiPricesSetItemPrice | null;
		b2bPrice: VinistoCommonDllModelsApiPricesSetItemPrice | null;
		externalPrice?: VinistoCommonDllModelsApiPricesSetItemPrice | null;
		isSupplierDiscount: boolean;
	}) => {
		setEditModalData({
			isOpen: true,
			itemId,
			amount,
			b2cPrice,
			vinistoPlusPrice,
			b2bPrice,
			externalPrice,
			isSupplierDiscount,
		});
	};

	const handleCloseEditModal = () => {
		setEditModalData({
			isOpen: false,
			itemId: null,
			amount: null,
			b2cPrice: null,
			vinistoPlusPrice: null,
			b2bPrice: null,
			externalPrice: null,
			isSupplierDiscount: false,
		});
	};

	const discountedBundlePrices = (pricesQuery.data?.discountPrices ?? []).map(
		(price) => priceAdapter.fromApiWithDiscount(price)
	);

	const setBundles = bundle?.items
		.map((item) => {
			const bundleSetItem = bundle.setBundles?.find((bundle) => {
				return bundle?.id === item.productId;
			});

			if (!('id' in item) || !item.id) return null;

			const originalPrice =
				bundle.bundlePrices.setItemsPrices?.[item.id].originalPrice;
			const setPrice = bundle.bundlePrices.setItemsPrices?.[item.id].setPrice;

			const isSupplierDiscount =
				bundle.bundlePrices.setItemsPrices?.[item.id].isSupplierDiscount;

			const b2cPriceLevel1 =
				discountedBundlePrices?.find(
					(price): price is SetDiscount =>
						!!(
							price.discountType ===
								VinistoHelperDllEnumsPriceDiscountType.SetDiscount &&
							price.priceType === VinistoHelperDllEnumsPriceLevel.Level1 &&
							isB2c(price.platformId) &&
							price.values &&
							item.id &&
							item.id in price.values
						)
				)?.values?.[item.id] ?? null;

			const b2cPriceVinistoPlus =
				discountedBundlePrices.find(
					(price): price is SetDiscount =>
						!!(
							price.discountType ===
								VinistoHelperDllEnumsPriceDiscountType.SetDiscount &&
							price.priceType === VinistoHelperDllEnumsPriceLevel.VinistoPlus &&
							isB2c(price.platformId) &&
							price.values &&
							item.id &&
							item.id in price.values
						)
				)?.values?.[item.id] ?? null;

			const b2bPriceLevel1 =
				discountedBundlePrices.find(
					(price): price is SetDiscount =>
						!!(
							price.discountType ===
								VinistoHelperDllEnumsPriceDiscountType.SetDiscount &&
							price.priceType === VinistoHelperDllEnumsPriceLevel.Level1 &&
							isB2b(price.platformId) &&
							price.values &&
							item.id &&
							item.id in price.values
						)
				)?.values?.[item.id] ?? null;

			const externalPriceLevel1 =
				discountedBundlePrices.find(
					(price): price is SetDiscount =>
						!!(
							price.discountType ===
								VinistoHelperDllEnumsPriceDiscountType.SetDiscount &&
							price.priceType === VinistoHelperDllEnumsPriceLevel.Level1 &&
							isVicom(price.platformId) &&
							price.values &&
							item.id &&
							item.id in price.values
						)
				)?.values?.[item.id] ?? null;

			if (!originalPrice || !setPrice) return;

			return {
				bundleData: bundleSetItem,
				itemData: item,
				originalPrice: priceAdapter.fromApi(originalPrice),
				setPrice: priceAdapter.fromApi(setPrice),
				b2cPrice: b2cPriceLevel1,
				vinistoPlusPrice: b2cPriceVinistoPlus,
				b2bPrice: b2bPriceLevel1,
				externalPrice: externalPriceLevel1,
				isSupplierDiscount: isSupplierDiscount,
			};
		})
		.filter(
			(
				item
			): item is {
				bundleData: Bundle;
				itemData: BundleItem;
				originalPrice: Price;
				setPrice: Price;
				b2cPrice: VinistoCommonDllModelsApiPricesSetItemPrice | null;
				vinistoPlusPrice: VinistoCommonDllModelsApiPricesSetItemPrice | null;
				b2bPrice: VinistoCommonDllModelsApiPricesSetItemPrice | null;
				externalPrice: VinistoCommonDllModelsApiPricesSetItemPrice | null;
				isSupplierDiscount: boolean;
			} => item !== null
		);

	return (
		<div className="product-detail-category-list">
			<div className="detail-category-list-title">
				{t({ id: 'admin.bundleDetail.bundles' })}
			</div>
			{setBundles?.map((bundleInSet) => {
				if (!bundleInSet) return null;

				const bundleB2cPriceInSetWithVat =
					bundleInSet.b2cPrice?.setPrice?.valueWithVat;
				const bundleB2cPriceInSetWithoutVat =
					bundleInSet.b2cPrice?.setPrice?.value;
				const bundleB2cPriceInSetCurrency =
					bundleInSet.b2cPrice?.setPrice?.currency;

				const bundleVinistoPlusPriceInSetWithVat =
					bundleInSet.vinistoPlusPrice?.setPrice?.valueWithVat;
				const bundleVinistoPlusPriceInSetWithoutVat =
					bundleInSet.vinistoPlusPrice?.setPrice?.value;
				const bundleVinistoPlusPriceInSetCurrency =
					bundleInSet.vinistoPlusPrice?.setPrice?.currency;

				const bundleB2bPriceInSetWithVat =
					bundleInSet.b2bPrice?.setPrice?.valueWithVat;
				const bundleB2bPriceInSetWithoutVat =
					bundleInSet.b2bPrice?.setPrice?.value;
				const bundleB2bPriceInSetCurrency =
					bundleInSet.b2bPrice?.setPrice?.currency;

				const bundleExternalPriceInSetWithVat =
					bundleInSet.externalPrice?.setPrice?.valueWithVat;
				const bundleExternalPriceInSetWithoutVat =
					bundleInSet.externalPrice?.setPrice?.value;
				const bundleExternalPriceInSetCurrency =
					bundleInSet.externalPrice?.setPrice?.currency;

				const bundleName = getLocalizedValue(
					bundleInSet.bundleData?.name ?? []
				);
				const productAmount = bundleInSet.itemData.amount;
				const bundleId = bundleInSet.itemData.productId;

				return (
					<div
						key={bundleInSet.itemData.id}
						className="product-category w-auto h-auto mb-3"
					>
						<MdCategory className="product-category-icon" />
						<div className="product-category-label flex-column h-auto">
							<strong>{bundleName}</strong>
							<div>
								<div>
									{t({ id: 'admin.bundleDetail.id' }, { value: bundleId })}
								</div>
								<div>
									{t(
										{ id: 'admin.bundleDetail.itemAmount' },
										{ value: productAmount }
									)}
								</div>
							</div>
							<div>
								B2C: {formatPrice(bundleB2cPriceInSetWithoutVat)}{' '}
								{bundleB2cPriceInSetCurrency}{' '}
								{t({ id: 'admin.bundleDetail.price.withoutVAT' })}
								{' | '}
								{formatPrice(bundleB2cPriceInSetWithVat)}{' '}
								{bundleB2cPriceInSetCurrency}{' '}
								{t({ id: 'admin.bundleDetail.price.withVAT' })}
							</div>
							{bundleInSet.vinistoPlusPrice && (
								<div>
									vinisto PLUS+:{' '}
									{formatPrice(bundleVinistoPlusPriceInSetWithoutVat)}{' '}
									{bundleVinistoPlusPriceInSetCurrency}{' '}
									{t({ id: 'admin.bundleDetail.price.withoutVAT' })}
									{' | '}
									{formatPrice(bundleVinistoPlusPriceInSetWithVat)}{' '}
									{bundleVinistoPlusPriceInSetCurrency}{' '}
									{t({ id: 'admin.bundleDetail.price.withVAT' })}
								</div>
							)}
							{bundleInSet.b2bPrice && (
								<div>
									B2B: {formatPrice(bundleB2bPriceInSetWithoutVat)}{' '}
									{bundleB2bPriceInSetCurrency}{' '}
									{t({ id: 'admin.bundleDetail.price.withoutVAT' })}
									{' | '}
									{formatPrice(bundleB2bPriceInSetWithVat)}{' '}
									{bundleB2bPriceInSetCurrency}{' '}
									{t({ id: 'admin.bundleDetail.price.withVAT' })}
								</div>
							)}
							{bundleInSet.externalPrice && (
								<div>
									Externí: {formatPrice(bundleExternalPriceInSetWithoutVat)}{' '}
									{bundleExternalPriceInSetCurrency}{' '}
									{t({ id: 'admin.bundleDetail.price.withoutVAT' })}
									{' | '}
									{formatPrice(bundleExternalPriceInSetWithVat)}{' '}
									{bundleExternalPriceInSetCurrency}{' '}
									{t({ id: 'admin.bundleDetail.price.withVAT' })}
								</div>
							)}

							<div>
								{bundleInSet.isSupplierDiscount
									? t({
											id: 'admin.bundleInSet.isSupplierDiscount.yes',
									  })
									: t({
											id: 'admin.bundleInSet.isSupplierDiscount.no',
									  })}
							</div>
						</div>
						<div className="d-flex gap-2">
							<BiLink
								onClick={handleOnClickRedirect(bundleId)}
								className="bundle-detail__btn product-category-icon"
							/>
							<EditIcon
								onClick={() =>
									handleOpenEditModal({
										itemId: bundleInSet.itemData.productId,
										amount: bundleInSet.itemData.amount,
										b2cPrice: bundleInSet.b2cPrice,
										vinistoPlusPrice: bundleInSet.vinistoPlusPrice,
										b2bPrice: bundleInSet.b2bPrice,
										externalPrice: bundleInSet.externalPrice,
										isSupplierDiscount: bundleInSet.isSupplierDiscount,
									})
								}
								className="bundle-detail__btn product-category-icon"
							/>
							<DeleteIcon
								onClick={handleOnRemoveBundleFromSet({
									itemId: bundleInSet.itemData.productId,
									amount: bundleInSet.itemData.amount,
									price: bundleInSet.setPrice,
									userLoginHash,
								})}
								className="bundle-detail__btn product-category-icon"
							/>
						</div>
					</div>
				);
			})}

			<Modal
				title={t({
					id: 'admin.bundleDetail.editBundleInSet',
				})?.toString()}
				handleClose={handleCloseEditModal}
				show={editModalData.isOpen}
			>
				{editModalData.isOpen &&
					editModalData.itemId &&
					bundle?.id &&
					editModalData.b2cPrice && (
						<EditBundleForm
							key={editModalData.itemId}
							itemId={editModalData.itemId}
							oldAmount={editModalData.amount ?? 0}
							oldB2cPrice={editModalData.b2cPrice.setPrice ?? null}
							oldVinistoPlusPrice={
								editModalData.vinistoPlusPrice?.setPrice ?? null
							}
							oldB2bPrice={editModalData.b2bPrice?.setPrice ?? null}
							oldExternalPrice={editModalData.externalPrice?.setPrice ?? null}
							oldIsSupplierDiscount={editModalData.isSupplierDiscount}
							userLoginHash={userLoginHash}
							bundleId={bundle.id}
							onSubmit={() => {
								handleCloseEditModal();
								refetchBundleDetail();
								pricesQuery.refetch();
							}}
						/>
					)}
			</Modal>
		</div>
	);
};

export default BundleList;

/**
 * bundleId is more like setId
 */
type EditBundleProps = {
	itemId: string;
	oldAmount: number;
	oldB2bPrice: VinistoCommonDllModelsApiPricesPrice | null;
	oldVinistoPlusPrice: VinistoCommonDllModelsApiPricesPrice | null;
	oldB2cPrice: VinistoCommonDllModelsApiPricesPrice | null;
	oldExternalPrice: VinistoCommonDllModelsApiPricesPrice | null;
	oldIsSupplierDiscount: boolean;
	userLoginHash: string;
	bundleId: string;
	onSubmit: () => void;
};

type FormValues = {
	newAmount: number;
	newB2cPrice: number;
	newVinistoPlusPrice: number;
	newB2bPrice: number;
	newExternalPrice: number;
	discountCostsSupplier: boolean;
};

const EditBundleForm = ({
	oldB2cPrice,
	oldB2bPrice,
	oldVinistoPlusPrice,
	oldExternalPrice,
	bundleId,
	itemId,
	oldAmount,
	oldIsSupplierDiscount,
	userLoginHash,
	onSubmit,
}: EditBundleProps) => {
	const { handleShowSuccessNotification, handleShowErrorNotification } =
		useContext(NotificationsContext);

	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();

	if (!oldB2cPrice) return null;

	const handleOnSubmit = (values: FormValues) => {
		apiServiceInstance
			.post<unknown>(`product-api/bundles/${bundleId}/edit-set-bundle-item`, {
				itemId: itemId,
				oldAmount: oldAmount,
				newAmount: values.newAmount,
				oldPrices: [
					oldB2cPrice,
					oldVinistoPlusPrice,
					oldB2bPrice,
					oldExternalPrice,
				].filter((price) => price !== null),
				newPrices: [
					{
						...oldB2cPrice,
						value: getPriceWithoutVAT(
							values.newB2cPrice,
							oldB2cPrice.vat ?? VinistoHelperDllEnumsVatRate.BaseVat
						),
					},
					...(oldVinistoPlusPrice != null || values.newVinistoPlusPrice
						? [
								{
									...oldVinistoPlusPrice,
									platformId:
										oldVinistoPlusPrice?.platformId ?? B2C_NUMERIC_CODE,
									currency: oldB2cPrice?.currency,
									vat: oldB2cPrice?.vat,
									vatValue: oldB2cPrice?.vatValue,
									level: VinistoHelperDllEnumsPriceLevel.VinistoPlus,
									value: truncateToDecimalPlaces(
										getPriceWithoutVAT(
											values.newVinistoPlusPrice,
											oldB2cPrice?.vat ?? VinistoHelperDllEnumsVatRate.BaseVat
										),
										4
									),
								},
						  ]
						: []),
					...(oldB2bPrice != null || values.newB2bPrice
						? [
								{
									...oldB2bPrice,
									platformId: oldB2bPrice?.platformId ?? B2B_NUMERIC_CODE,
									currency: oldB2cPrice?.currency,
									vat: oldB2cPrice?.vat,
									vatValue: oldB2cPrice?.vatValue,
									level: VinistoHelperDllEnumsPriceLevel.Level1,
									value: truncateToDecimalPlaces(
										getPriceWithoutVAT(
											values.newB2bPrice,
											oldB2bPrice?.vat ?? VinistoHelperDllEnumsVatRate.BaseVat
										),
										4
									),
								},
						  ]
						: []),
					...(oldExternalPrice != null || values.newExternalPrice
						? [
								{
									...oldExternalPrice,
									platformId:
										oldExternalPrice?.platformId ?? VICOM_NUMERIC_CODE,
									currency: oldB2cPrice?.currency,
									vat: oldB2cPrice?.vat,
									vatValue: oldB2cPrice?.vatValue,
									level: VinistoHelperDllEnumsPriceLevel.Level1,
									value: truncateToDecimalPlaces(
										getPriceWithoutVAT(
											values.newExternalPrice,
											oldExternalPrice?.vat ??
												VinistoHelperDllEnumsVatRate.BaseVat
										),
										4
									),
								},
						  ]
						: []),
				],
				discountCostsSupplier: values.discountCostsSupplier,
				userLoginHash: userLoginHash,
			})
			.then(() => {
				handleShowSuccessNotification('admin.editBundleInSet.success');
				onSubmit();
			})
			.catch((error) => {
				if (error.message === BUNDLE_SET_PRICE_HIGHER_STANDARD_PRICE) {
					handleShowErrorNotification(
						'admin.addBundleToSet.priceCannotBeHigherThanStandard'
					);
					return;
				}
				if (
					/Bundle with id: \w+ has not standard price in \w+\. Level: \w+\./.test(
						error.message
					)
				) {
					const { groups: { bundleId = '', level = '' } = {} } =
						/Bundle with id: (?<bundleId>\w+) has not standard price in CZK. Level: (?<level>\w+)\./.exec(
							error.message
						) || { groups: {} };

					handleShowErrorNotification(
						{
							id: `admin.addBundleToSet.standardPriceNotFoundForBundleIdAndLevel`,
							bundleId: bundleId,
							level: level,
						},
						{ style: { width: 'fit-content' } }
					);
					return;
				}
				handleShowErrorNotification('admin.editBundleInSet.error');
			});
	};

	return (
		<Form
			onSubmit={handleOnSubmit}
			initialValues={{
				newAmount: oldAmount,
				newB2cPrice: oldB2cPrice?.valueWithVat,
				newVinistoPlusPrice: oldVinistoPlusPrice?.valueWithVat,
				newB2bPrice: oldB2bPrice?.valueWithVat,
				newExternalPrice: oldExternalPrice?.valueWithVat,
				discountCostsSupplier: oldIsSupplierDiscount,
			}}
		>
			{({ handleSubmit, pristine }) => (
				<form
					onSubmit={handleSubmit}
					className="align-self-start"
				>
					<InputNumber
						name="newAmount"
						identifier="newAmount"
						label={'admin.bundleDetail.newAmount'}
					/>
					<InputNumber
						name="newB2cPrice"
						identifier="newB2cPrice"
						label={'admin.modal.form.newB2cPriceIncludingVAT'}
					/>
					<InputNumber
						name="newVinistoPlusPrice"
						identifier="newVinistoPlusPrice"
						label={'admin.modal.form.newVinistoPlusPriceIncludingVAT'}
					/>
					<InputNumber
						name="newB2bPrice"
						identifier="newB2bPrice"
						label={'admin.modal.form.newB2bPriceIncludingVAT'}
					/>
					<InputNumber
						name="newExternalPrice"
						identifier="newExternalPrice"
						label={'admin.modal.form.newExternalPriceIncludingVAT'}
					/>
					<InputCheckBox
						name="discountCostsSupplier"
						identifier="discountCostsSupplier"
						label="discountCostsSupplier"
					/>
					<button
						type="submit"
						className="btn btn-primary"
						disabled={pristine}
					>
						{t({ id: 'save' })}
					</button>
				</form>
			)}
		</Form>
	);
};
