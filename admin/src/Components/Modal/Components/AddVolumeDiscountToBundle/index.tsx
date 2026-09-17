import { useCallback, useContext, useMemo } from 'react';
import { Form, FormRenderProps, useForm } from 'react-final-form';
import { ModalContext } from 'Components/Modal/context';
import {
	Input,
	InputCheckBox,
	InputNumber,
	InputSelect,
	InputTimePicker,
	Validators,
} from 'Components/Form';
import { Button } from 'react-bootstrap';
import { LocalizationContext } from 'Services/LocalizationService';
import { Option } from 'Components/Form/Components/Select/interfaces';
import { NotificationsContext } from 'Services/NotificationService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { round } from 'Helpers/lodash';
import { apiServiceInstance } from 'Services/ApiService';
import { getPriceWithoutVAT } from 'vinisto_shared/src/price';

import {
	BundlesCreateVolumeDiscountPriceCreatePayload,
	BundlesEditVolumeDiscountPriceUpdatePayload,
	VinistoHelperDllEnumsPriceDiscountType,
} from '@/api-types/product-api';
import { DiscountedPrice, VolumeDiscount } from '@/domain/price';
import { Bundle } from '@/domain/bundle';

interface AddVolumeDiscountToBundleFormValues {
	currentPriceWithVat: number;
	piecesInBundle?: number;
	piecesPerPackage?: number;
	multipliedPiecesInBundle?: number;
	volumeDiscountType: VolumeDiscountType;
	amount: number;
	quantity: number;
	validFrom: Date | number;
	validTo: Date | number | null;
	isAsSupplier: boolean;
}

// @todo - once BE is ready, remove this type and use it from BE
export type VolumeDiscountType = 'SLEVA_OD_POCTU_ZAKOUPENIH_KUSU';

const AddVolumeDiscountToBundle = () => {
	const { data, handleCloseModal } = useContext(ModalContext);
	const { handleShowSuccessNotification, handleShowErrorNotification } =
		useContext(NotificationsContext);
	const { vinistoUser } = useContext(AuthenticationContext);
	const refetchBundlePrices = data?.refetchBundlePrices;

	const bundle = data?.bundle as Bundle;
	const vat = bundle?.bundlePrices?.basePrice.vat;
	const currentStandardBundlePrice = bundle?.bundlePrices?.basePrice;

	const volumeBundlePrice =
		bundle?.bundlePrices?.allDiscountedPrices?.find(
			(price: DiscountedPrice | VolumeDiscount): price is VolumeDiscount =>
				price.discountType ===
				VinistoHelperDllEnumsPriceDiscountType.VolumeDiscount
		) ?? null;

	const addVolumeDiscount = (
		requestData: BundlesCreateVolumeDiscountPriceCreatePayload
	) => {
		apiServiceInstance
			.post(
				`product-api/bundles/${bundle.id}/CreateVolumeDiscountPrice`,
				requestData,
				true
			)
			.then(() => {
				handleShowSuccessNotification(
					'admin.addVolumeDiscountToBundle.success'
				);
				refetchBundlePrices?.();
				handleCloseModal();
			})
			.catch(() => {
				handleShowErrorNotification(
					'admin.addVolumeDiscountToBundle.error',
					{}
				);
			});
	};

	const editVolumeDiscount = (
		requestData: BundlesEditVolumeDiscountPriceUpdatePayload
	) => {
		const originalValues = volumeBundlePrice?.values.map((value: any) => {
			return {
				[value.quantity]: value.value,
			};
		});

		const mergedValues = { ...requestData.values };
		originalValues?.forEach((value: any) => {
			Object.keys(value).forEach((key) => {
				mergedValues[key] = value[key];
			});
		});

		requestData.values = mergedValues;
		requestData.id = volumeBundlePrice?.priceId;

		apiServiceInstance
			.put(
				`product-api/bundles/${bundle.id}/EditVolumeDiscountPrice`,
				requestData,
				true
			)
			.then(() => {
				handleShowSuccessNotification(
					'admin.addVolumeDiscountToBundle.success'
				);
				refetchBundlePrices?.();
				handleCloseModal();
			})
			.catch(() => {
				handleShowErrorNotification(
					'admin.addVolumeDiscountToBundle.error',
					{}
				);
			});
	};

	const handleOnAddVolumeDiscountToBundle = (
		formValues: AddVolumeDiscountToBundleFormValues
	) => {
		if (!formValues.validFrom) {
			return handleShowErrorNotification(
				'admin.addVolumeDiscountToBundle.error.validFromIsMissing',
				{}
			);
		}

		const validFromInput = formValues.validFrom;
		const dateFromTimestamp = new Date(validFromInput);
		const validFromValue =
			validFromInput instanceof Date
				? round(validFromInput.getTime() / 1000)
				: !isNaN(dateFromTimestamp.getTime())
				? round(dateFromTimestamp.getTime() / 1000)
				: null;

		const pieces =
			Number(bundle?.piecesPerPackage) > 1
				? Number(formValues.multipliedPiecesInBundle)
				: formValues.quantity;

		const requestData: BundlesCreateVolumeDiscountPriceCreatePayload = {
			userLoginHash: vinistoUser.loginHash,
			validFrom: validFromValue,
			validTo:
				formValues.validTo instanceof Date
					? round(formValues.validTo.getTime() / 1000)
					: null,
			values: {
				[pieces]: getPriceWithoutVAT(formValues.amount, vat),
			},
			isSupplierDiscount: formValues.isAsSupplier,
			currency: bundle?.bundlePrices?.basePrice.currency ?? 'CZK',
			priceLevel: bundle.bundlePrices.basePrice.priceType,
		};

		if (volumeBundlePrice) {
			editVolumeDiscount(requestData);
		} else {
			addVolumeDiscount(requestData);
		}
	};

	return (
		<Form<AddVolumeDiscountToBundleFormValues>
			submitCallback={handleOnAddVolumeDiscountToBundle}
			initialValues={{
				currentPriceWithVat: currentStandardBundlePrice?.valueWithVat ?? 0,
				validFrom: Date.now() + 600_000,
				isAsSupplier: false,
				piecesPerPackage: bundle?.piecesPerPackage ?? 1,
				quantity: 1,
				multipliedPiecesInBundle: bundle?.piecesPerPackage ?? 1,
			}}
			onSubmit={handleOnAddVolumeDiscountToBundle}
			mutators={{
				setValue: ([field, value], state, { changeValue }) => {
					changeValue(state, field, () => value);
				},
			}}
			validate={(values) => {
				const errors: Record<string, string> = {};

				const multipliedPiecesInBundle = Number(
					values.multipliedPiecesInBundle
				);
				const quantity = Number(values.quantity);

				if (multipliedPiecesInBundle * quantity <= 1) {
					errors.quantity =
						'admin.modal.form.totalQuantityMustBeGreaterThanOne';
				}

				if (
					(volumeBundlePrice?.values ?? []).some((value) =>
						multipliedPiecesInBundle > 1
							? value.quantity === multipliedPiecesInBundle
							: value.quantity === quantity
					)
				) {
					errors.quantity = 'admin.modal.form.quantityAlreadyExists';
				}

				return errors;
			}}
			render={({ form, handleSubmit, values }) => (
				<FormContent
					form={form}
					handleSubmit={handleSubmit}
					values={values}
				/>
			)}
		/>
	);
};

export default AddVolumeDiscountToBundle;

const FormContent = ({
	handleSubmit,
	values,
}: Partial<
	FormRenderProps<
		AddVolumeDiscountToBundleFormValues,
		Partial<AddVolumeDiscountToBundleFormValues>
	>
>) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const form = useForm<AddVolumeDiscountToBundleFormValues>();
	const { data } = useContext(ModalContext);

	const bundle = data?.bundle;

	const hasPiecesInBundle = bundle?.piecesPerPackage > 1;

	const multiplyPiecesInBundle = useCallback(
		(value: number) => {
			if (!hasPiecesInBundle) return;

			form.mutators.setValue(
				'multipliedPiecesInBundle',
				value * (bundle?.piecesPerPackage ?? 1)
			);
		},
		[bundle?.piecesPerPackage, form.mutators, hasPiecesInBundle]
	);

	const VOLUME_DISCOUNT_TYPES: Option<VolumeDiscountType>[] = [
		{
			label: t({
				id: 'admin.addVolumeDiscountToBundle.discountType.byNumberOfPieces',
				defaultMessage: 'Sleva od počtu zakoupených kusů',
			}) as string,
			value: 'SLEVA_OD_POCTU_ZAKOUPENIH_KUSU',
		},
	];

	const additionalFormFields = useMemo(() => {
		switch (values?.volumeDiscountType) {
			case 'SLEVA_OD_POCTU_ZAKOUPENIH_KUSU':
				return (
					<>
						<InputNumber
							name="quantity"
							identifier="quantity"
							label={hasPiecesInBundle ? 'Počet balení' : 'Počet kusů'}
							validate={Validators.required}
							onChange={multiplyPiecesInBundle}
						/>

						{hasPiecesInBundle && (
							<Input
								type="number"
								name="multipliedPiecesInBundle"
								identifier="multipliedPiecesInBundle"
								label="Počet kusů"
								disabled
							/>
						)}

						<InputNumber
							name="amount"
							identifier="amount"
							label="Cena za kus vč. DPH"
							validate={Validators.required}
						/>

						<div className="d-flex gap-2">
							<InputTimePicker
								name="validFrom"
								identifier="validFrom"
								label="admin.modal.form.validFrom"
								validate={Validators.required}
							/>
							<InputTimePicker
								name="validTo"
								identifier="validTo"
								label="admin.modal.form.validTo"
							/>
						</div>
						<InputCheckBox
							name="isAsSupplier"
							identifier="isAsSupplier"
							label="admin.modal.form.isAsSupplier"
						/>
					</>
				);
			default:
				return null;
		}
	}, [values?.volumeDiscountType, hasPiecesInBundle, multiplyPiecesInBundle]);

	return (
		<form onSubmit={handleSubmit}>
			<Input
				type="number"
				name="currentPriceWithVat"
				identifier="currentPriceWithVat"
				label="Aktuální prodejní cena vč. DPH"
				disabled
			/>

			<Input
				type="number"
				name="piecesPerPackage"
				identifier="piecesPerPackage"
				label="Počet kusů v balení"
				disabled
			/>

			<InputSelect
				name="volumeDiscountType"
				identifier="volumeDiscountType"
				label="Typ množstevní slevy"
				options={VOLUME_DISCOUNT_TYPES}
				validate={Validators.required}
			/>

			{additionalFormFields}

			<Button type="submit">{t({ id: 'admin.modal.addPriceToBundle' })}</Button>
		</form>
	);
};
