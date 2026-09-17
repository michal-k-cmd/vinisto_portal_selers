import { useCallback, useContext } from 'react';
import { Form, FormRenderProps, useForm } from 'react-final-form';
import { ModalContext } from 'Components/Modal/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import {
	CurrencySelect,
	Input,
	InputCheckBox,
	InputNumber,
	Validators,
} from 'Components/Form';
import { Button } from 'react-bootstrap';
import { useMutation } from '@tanstack/react-query';
import AutocompleteBundle from 'Components/Form/Components/AutocompleteBundle';
import useAutocompleteBundles from 'Hooks/useAutocompleteBundles';
import BundleOption from 'Components/Form/Components/AutocompleteBundle/BundleOption';
import {
	VinistoHelperDllEnumsPriceLevel,
	VinistoProductDllModelsApiBundleBundleAssignParameters,
} from 'vinisto_api_client/src/api-types/product-api';
import { getPriceWithoutVAT } from 'vinisto_shared/src/price';
import { truncateToDecimalPlaces } from 'vinisto_shared/src/price/truncate-to-decimal-places';
import { AutocompleteBundleOption } from 'Components/Form/Components/AutocompleteBundle/interfaces';
import { isB2b, isB2c, isVicom } from 'Services/IntergationService/helpers';
import {
	B2B_NUMERIC_CODE,
	B2C_NUMERIC_CODE,
	VICOM_NUMERIC_CODE,
} from 'Services/IntergationService/constants';
import { IntegrationContext } from 'Services/IntergationService';

import BundleService from '@/product-service/bundle';
import {
	VinistoHelperDllEnumsCurrency,
	VinistoHelperDllEnumsVatRate,
} from '@/api-types/product-api';

export const BUNDLE_SET_PRICE_HIGHER_STANDARD_PRICE =
	'BUNDLE_SET_PRICE_HIGHER_STANDARD_PRICE';

interface AddBundleToSetFormValues {
	item: string;
	amount: number;
	b2cPrice: number;
	b2cVinistoPlusPrice: number;
	b2bPrice: number;
	externalPrice?: number;
	currency: VinistoHelperDllEnumsCurrency;
	vat: VinistoHelperDllEnumsVatRate;
	discountCostsSupplier: boolean;
}

const AddBundleToSetModal = () => {
	const modalContext = useContext(ModalContext);
	const authenticationContext = useContext(AuthenticationContext);
	const localizationContext = useContext(LocalizationContext);
	const notificationsContext = useContext(NotificationsContext);
	const { getIntegrationById } = useContext(IntegrationContext);

	const refetchBundleDetail = modalContext.data?.refetchBundleDetail;
	const refetchBundlePrices = modalContext.data?.refetchBundlePrices;
	const bundleId = modalContext.data?.bundle?.id;

	const t = localizationContext.useFormatMessage();

	const addBundleToSetMutationFn = ({
		bundleId,
		params,
	}: {
		bundleId: string;
		params: VinistoProductDllModelsApiBundleBundleAssignParameters;
	}) => BundleService.addBundleToSet(bundleId, params);

	const createBundleSetMutation = useMutation(addBundleToSetMutationFn, {
		onSuccess: () => {
			modalContext.handleCloseModal();
			notificationsContext.handleShowSuccessNotification(
				'admin.addBundleToSet.success'
			);
			refetchBundleDetail?.();
			refetchBundlePrices?.();
		},

		onError: (error: Error) => {
			if (error.message === BUNDLE_SET_PRICE_HIGHER_STANDARD_PRICE) {
				notificationsContext.handleShowErrorNotification(
					'admin.addBundleToSet.priceCannotBeHigherThanStandard'
				);
				return;
			}
			if (
				/Bundle with id: \w+ has not standard price in CZK. Level: \w+ and platform: \d\./.test(
					error.message
				)
			) {
				const { groups: { bundleId = '', level = '', platform = '' } = {} } =
					/Bundle with id: (?<bundleId>\w+) has not standard price in CZK. Level: (?<level>\w+) and platform: (?<platform>\d)\./.exec(
						error.message
					) || { groups: {} };

				notificationsContext.handleShowErrorNotification(
					{
						id: `admin.addBundleToSet.standardPriceNotFoundForBundleIdAndLevel`,
						bundleId: bundleId,
						level: level,
						platform: getIntegrationById(+platform)?.integrationName,
					},
					{ style: { width: 'fit-content' } }
				);

				return;
			}
		},
	});

	const handleOnAddBundleToSet = (
		formValues: Partial<AddBundleToSetFormValues> = {}
	) => {
		const requestData = {
			params: {
				itemId: String(formValues.item),
				amount: formValues.amount ?? 1,
				prices: [
					{
						vat: formValues.vat,
						currency: formValues.currency ?? VinistoHelperDllEnumsCurrency.CZK,
						level: VinistoHelperDllEnumsPriceLevel.Level1,
						value: formValues.b2cPrice,
						platformId: B2C_NUMERIC_CODE,
					},
					...(formValues.b2cVinistoPlusPrice
						? [
								{
									vat: formValues.vat,
									currency:
										formValues.currency ?? VinistoHelperDllEnumsCurrency.CZK,
									level: VinistoHelperDllEnumsPriceLevel.VinistoPlus,
									value: formValues.b2cVinistoPlusPrice,
									platformId: B2C_NUMERIC_CODE,
								},
						  ]
						: []),
					...(formValues.b2bPrice
						? [
								{
									vat: formValues.vat,
									currency:
										formValues.currency ?? VinistoHelperDllEnumsCurrency.CZK,
									level: VinistoHelperDllEnumsPriceLevel.Level1,
									value: formValues.b2bPrice,
									platformId: B2B_NUMERIC_CODE,
								},
						  ]
						: []),
					...(formValues.externalPrice
						? [
								{
									vat: formValues.vat,
									currency:
										formValues.currency ?? VinistoHelperDllEnumsCurrency.CZK,
									level: VinistoHelperDllEnumsPriceLevel.Level1,
									value: formValues.externalPrice,
									platformId: VICOM_NUMERIC_CODE,
								},
						  ]
						: []),
				],
				discountCostsSupplier: formValues.discountCostsSupplier,
				userLoginHash: authenticationContext.vinistoUser?.loginHash,
			},
		};

		createBundleSetMutation.mutateAsync({ bundleId, ...requestData });
	};

	const RenderAutocompleteBundle = ({
		form,
		values,
	}: Partial<
		FormRenderProps<AddBundleToSetFormValues, Partial<AddBundleToSetFormValues>>
	>) => {
		const { autocompleteOptions, handleOnSearch } = useAutocompleteBundles({
			alreadyUsedBundleIds: values?.item ? [values.item] : [],
		});

		const { change } = useForm();

		const renderOption = useCallback((option: AutocompleteBundleOption) => {
			return (
				<BundleOption
					bundle={option?.bundle}
					label={option?.label}
				/>
			);
		}, []);

		return (
			<AutocompleteBundle
				label="admin.sideBar.bundleList"
				labelKey="label"
				name="item"
				identifier="item"
				onSearchCallback={(val) => {
					handleOnSearch(val, {
						isSet: false,
					});
				}}
				onChange={([val]) => {
					if (!val || !val.bundle) return;

					const bundle = val.bundle;

					const b2cPriceLevel1 = bundle.prices.find(
						(price) =>
							price.level === VinistoHelperDllEnumsPriceLevel.Level1 &&
							isB2c(price.platformId)
					);

					const b2cVinistoPlusPrice = bundle.prices.find(
						(price) =>
							price.level === VinistoHelperDllEnumsPriceLevel.VinistoPlus &&
							isB2c(price.platformId)
					);

					const b2bPriceLevel1 = bundle.prices.find(
						(price) =>
							price.level === VinistoHelperDllEnumsPriceLevel.Level1 &&
							isB2b(price.platformId)
					);

					const externalPriceLevel1 = bundle.prices?.find(
						(price) =>
							price.level === VinistoHelperDllEnumsPriceLevel.Level1 &&
							isVicom(price.platformId)
					);

					form?.mutators.setValue('vat', b2cPriceLevel1?.vat);
					form?.mutators.setValue('currency', b2cPriceLevel1?.currency);
					form?.mutators.setValue('amount', Math.max(1, values?.amount ?? 1));

					// B2C Level 1
					form?.mutators.setValue(
						'b2cPriceIncludingVAT',
						b2cPriceLevel1?.valueWithVat
					);
					form?.mutators.setValue('b2cPrice', b2cPriceLevel1?.value);

					// B2C vinisto PLUS+
					form?.mutators.setValue(
						'b2cVinistoPlusPriceIncludingVAT',
						b2cVinistoPlusPrice?.valueWithVat
					);
					form?.mutators.setValue(
						'b2cVinistoPlusPrice',
						b2cVinistoPlusPrice?.value
					);

					// B2B Level 1
					form?.mutators.setValue(
						'b2bPriceIncludingVAT',
						b2bPriceLevel1?.valueWithVat
					);
					form?.mutators.setValue('b2bPrice', b2bPriceLevel1?.value);

					// Vicom Level 1
					form?.mutators.setValue(
						'externalPriceIncludingVAT',
						externalPriceLevel1?.valueWithVat
					);
					form?.mutators.setValue('externalPrice', externalPriceLevel1?.value);

					const id = val.bundle.id;
					if (id) {
						change('item', id);
					}
				}}
				options={autocompleteOptions}
				validate={Validators.required}
				renderOption={renderOption}
			/>
		);
	};

	return (
		<div>
			<Form<AddBundleToSetFormValues>
				onSubmit={handleOnAddBundleToSet}
				submitText={'admin.modal.form.createBundle'}
				mutators={{
					setValue: ([field, value], state, { changeValue }) => {
						changeValue(state, field, () => value);
					},
				}}
				initialValues={{
					discountCostsSupplier: true,
				}}
				render={({ form, handleSubmit, values }) => (
					<form onSubmit={handleSubmit}>
						<RenderAutocompleteBundle
							form={form}
							values={values}
						/>

						<InputNumber
							name="amount"
							identifier="amount"
							label="admin.modal.form.amount"
							validate={Validators.required}
							min={1}
						/>
						<fieldset>
							<div className="d-flex items-center gap-3">
								<InputNumber
									name="b2cPriceIncludingVAT"
									identifier="b2cpriceIncludingVAT"
									label="admin.modal.form.b2cPriceIncludingVAT"
									validate={Validators.required}
									onChange={(value) =>
										form.mutators.setValue(
											'b2cPrice',
											truncateToDecimalPlaces(
												getPriceWithoutVAT(value, values.vat),
												4
											)
										)
									}
								/>

								<Input
									type="number"
									name="b2cPrice"
									identifier="b2cPrice"
									label="admin.modal.form.b2cPriceWithoutVAT"
									disabled
								/>
							</div>
						</fieldset>

						<fieldset>
							<div className="d-flex items-center gap-3">
								<InputNumber
									name="b2cVinistoPlusPriceIncludingVAT"
									identifier="b2cVinistoPlusPriceIncludingVAT"
									label="admin.modal.form.vinistoPlusPriceIncludingVAT"
									onChange={(value) =>
										form.mutators.setValue(
											'b2cVinistoPlusPrice',
											truncateToDecimalPlaces(
												getPriceWithoutVAT(value, values.vat),
												4
											)
										)
									}
								/>

								<Input
									type="number"
									name="b2cVinistoPlusPrice"
									identifier="b2cVinistoPlusPrice"
									label="admin.modal.form.vinistoPlusPriceWithoutVAT"
									disabled
								/>
							</div>
						</fieldset>

						<fieldset>
							<div className="d-flex items-center gap-3">
								<InputNumber
									name="b2bPriceIncludingVAT"
									identifier="b2bpriceIncludingVAT"
									label="admin.modal.form.b2bPriceIncludingVAT"
									onChange={(value) =>
										form.mutators.setValue(
											'b2bPrice',
											truncateToDecimalPlaces(
												getPriceWithoutVAT(value, values.vat),
												4
											)
										)
									}
								/>

								<Input
									type="number"
									name="b2bPrice"
									identifier="b2bPrice"
									label="admin.modal.form.b2bPriceWithoutVAT"
									disabled
								/>
							</div>
						</fieldset>

						<fieldset>
							<div className="d-flex items-center gap-3">
								<InputNumber
									name="externalPriceIncludingVAT"
									identifier="externalPriceIncludingVAT"
									label="admin.modal.form.externalPriceIncludingVAT"
									onChange={(value) =>
										form.mutators.setValue(
											'externalPrice',
											truncateToDecimalPlaces(
												getPriceWithoutVAT(value, values.vat),
												4
											)
										)
									}
								/>

								<Input
									type="number"
									name="externalPrice"
									identifier="externalPrice"
									label="admin.modal.form.externalPriceWithoutVAT"
									disabled
								/>
							</div>
						</fieldset>

						<CurrencySelect
							name="currency"
							identifier="currency"
							label="admin.modal.form.currency"
						/>

						<input
							type="hidden"
							name="vat"
							id="vat"
						/>

						<InputCheckBox
							name="discountCostsSupplier"
							identifier="discountCostsSupplier"
							label="discountCostsSupplier"
						/>

						<div className="d-flex align-items-center justify-content-between">
							<Button type="submit">
								{t({ id: 'admin.btn.addBundleToSet' })}
							</Button>
						</div>
					</form>
				)}
			/>
		</div>
	);
};
export default AddBundleToSetModal;
