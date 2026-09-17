import {
	CurrencySelect,
	Input,
	InputCheckBox,
	InputNumber,
	InputSelect,
	InputTimePicker,
	Validators,
	VatSelect,
} from 'Components/Form';
import { Form, FormRenderProps } from 'react-final-form';
import { ModalContext } from 'Components/Modal/context';
import { round } from 'Helpers/lodash';
import { useContext, useEffect } from 'react';
import { apiServiceInstance } from 'Services/ApiService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import Radio from 'Components/Form/Components/Radio';
import { FormApi, MutableState, Tools } from 'final-form';
import { VinistoHelperDllEnumsCurrency } from 'vinisto_api_client/src/api-types/user-api/';
import {
	BundlesCreateDiscountPriceCreatePayload,
	VinistoHelperDllEnumsPriceDiscountType,
	VinistoHelperDllEnumsPriceLevel,
	VinistoHelperDllEnumsVatRate,
	VinistoProductDllModelsApiBundlePricesReturn,
} from 'vinisto_api_client/src/api-types/product-api/';
import { Button } from 'react-bootstrap';
import { getPriceWithoutVAT } from 'vinisto_shared/src/price';
import { dayjsInstance } from 'vinisto_shared';
import { LocalizationContext } from 'Services/LocalizationService';
import { IntegrationContext } from 'Services/IntergationService';
import { UseQueryResult } from '@tanstack/react-query';
import { B2C_NUMERIC_CODE } from 'Services/IntergationService/constants';
import DeleteBundleAlert from 'Components/DeleteBundleAlert';

import {
	DISCOUNT_TYPE,
	PERCENTAGE_DISCOUNT_MAX,
	PERCENTAGE_DISCOUNT_MIN,
} from './constants';
import styles from './styles.module.css';

import { Bundle } from '@/domain/bundle';

type AddDiscountPriceToBundleFormProps = FormRenderProps<DiscountFormValues> & {
	pricesQuery: UseQueryResult<
		VinistoProductDllModelsApiBundlePricesReturn,
		unknown
	>;
	identicalBundlesPricesQuery: UseQueryResult<
		VinistoProductDllModelsApiBundlePricesReturn[],
		unknown
	>;
	existingPriceLevelsByPlatform: {
		[k: string]: Set<VinistoHelperDllEnumsPriceLevel | undefined>;
	};
	availablePlatforms: Set<number>;
	handleDiscountPriceRefresh: (form: FormApi<DiscountFormValues>) => () => void;
	bundleId: string;
};

const AddDiscountPriceToBundleForm = ({
	form,
	handleSubmit,
	values,
	errors,
	existingPriceLevelsByPlatform,
	availablePlatforms,
	pricesQuery,
	identicalBundlesPricesQuery,
	handleDiscountPriceRefresh,
	bundleId,
}: AddDiscountPriceToBundleFormProps) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const { integrations } = useContext(IntegrationContext);

	// TODO Get rid off the effect, make this a mutator
	useEffect(() => {
		const newStandardPriceObject = pricesQuery.data?.prices?.find(
			(price) =>
				price.level === values.priceLevel &&
				price.platformId === Number(values.platformId)
		);

		if (newStandardPriceObject) {
			form.change('sellingPrice', newStandardPriceObject.valueWithVat ?? 0);
			form.change('vat', newStandardPriceObject.vat);

			const newLowestPrice =
				[
					...(pricesQuery.data?.prices ?? []),
					...(identicalBundlesPricesQuery.data?.flatMap((d) => d.prices) ?? []),
				]
					.filter(
						(price) =>
							price != null &&
							price.level === values.priceLevel &&
							price.platformId === Number(values.platformId)
					)
					.map((price) => price?.valueWithVat ?? 0)
					.sort((a, b) => a - b)[0] ?? 0;

			form.change('lowestPrice', Number(newLowestPrice.toFixed(2)));

			form.mutators.displayPriceAfterDiscount();
		}
		// Some of the dependencies are causing infinite loop
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [values.priceLevel, values.platformId]);

	const currentStandardPriceIncludingVAT = values.sellingPrice;

	const partialDiscountMin = Math.ceil(
		(currentStandardPriceIncludingVAT / 100) * PERCENTAGE_DISCOUNT_MIN
	);
	const partialDiscountMax = Math.floor(
		(currentStandardPriceIncludingVAT / 100) * PERCENTAGE_DISCOUNT_MAX
	);

	return (
		<form onSubmit={handleSubmit}>
			<InputSelect
				name="platformId"
				identifier="platformId"
				label="admin.modal.form.availableOnPlatforms.label"
				options={
					integrations
						?.filter((platform) =>
							availablePlatforms.has(platform.integrationId)
						)
						.map((platform) => ({
							value: `${platform.integrationId}`,
							label: `${platform.integrationName}`,
						})) ?? []
				}
				onChange={handleDiscountPriceRefresh(form)}
				validate={Validators.required}
			/>
			<InputSelect
				name="priceLevel"
				identifier="priceLevel"
				label="admin.modal.addDiscountPriceToBundle.priceType"
				options={Object.keys(VinistoHelperDllEnumsPriceLevel)
					.map((level) => ({
						label: level,
						value: level,
					}))
					.filter((option) =>
						existingPriceLevelsByPlatform[
							form.getState().values['platformId']
						]?.has(option.value as VinistoHelperDllEnumsPriceLevel)
					)}
				onChange={handleDiscountPriceRefresh(form)}
				validate={Validators.required}
			/>
			<Input
				type="number"
				name="sellingPrice"
				identifier="sellingPrice"
				label={t({
					id: 'admin.addDiscountPriceToBundle.currentPriceVithVAT',
				})}
				disabled
			/>
			<Input
				type="number"
				name="lowestPrice"
				identifier="lowestPrice"
				label={t({
					id: 'admin.addDiscountPriceToBundle.lowestPlatformPriceVithVAT',
				})}
				disabled
			/>
			<Radio
				name="discountType"
				options={[
					{
						label: 'admin.addDiscountPriceToBundle.discountByAmount',
						value: DISCOUNT_TYPE.AMOUNT,
					},
					{
						label: 'admin.addDiscountPriceToBundle.discountByPercentage',
						value: DISCOUNT_TYPE.PERCENTAGE,
					},
				]}
				onChange={handleDiscountPriceRefresh(form)}
				className={styles.radio}
			/>
			{values.discountType === DISCOUNT_TYPE.AMOUNT && (
				<div className="d-flex text-nowrap align-items-center mb-4">
					<InputNumber
						className="d-flex gap-2 align-items-center flex-grow-1"
						labelClassName="mb-0"
						name="amountDiscount"
						identifier="amountDiscount"
						label="admin.addDiscountPriceToBundle.discountBy"
						disabled={values.discountType !== DISCOUNT_TYPE.AMOUNT}
						min={partialDiscountMin}
						max={partialDiscountMax}
						{...(values.discountType === DISCOUNT_TYPE.AMOUNT && {
							validate: Validators.required,
						})}
						onChange={handleDiscountPriceRefresh(form)}
					/>
					{!errors?.amountDiscount && <span>{t({ id: 'currency' })}</span>}
				</div>
			)}
			{values.discountType === DISCOUNT_TYPE.PERCENTAGE && (
				<div className="d-flex text-nowrap align-items-center mb-4">
					<InputNumber
						className="d-flex gap-2 align-items-center flex-grow-1"
						labelClassName="mb-0"
						name="percentageDiscount"
						identifier="percentageDiscount"
						label="admin.addDiscountPriceToBundle.discountBy"
						disabled={values.discountType !== DISCOUNT_TYPE.PERCENTAGE}
						min={PERCENTAGE_DISCOUNT_MIN}
						max={PERCENTAGE_DISCOUNT_MAX}
						{...(values.discountType === DISCOUNT_TYPE.PERCENTAGE && {
							validate: Validators.required,
						})}
						onChange={handleDiscountPriceRefresh(form)}
					/>
					{!errors?.percentageDiscount && <span>%</span>}
				</div>
			)}
			<Input
				type="number"
				name="priceAfterDiscountIncludingVAT"
				identifier="priceAfterDiscountIncludingVAT"
				label="admin.addDiscountPriceToBundle.discountedPriceWithVAT"
				disabled
			/>
			<VatSelect
				name="vat"
				identifier="vat"
				label="admin.modal.form.vat"
				disabled
			/>
			<Input
				type="number"
				name="priceAfterDiscountWithoutVAT"
				identifier="priceAfterDiscountWithoutVAT"
				label="admin.addDiscountPriceToBundle.discountedPriceWithoutVAT"
				disabled
			/>
			<CurrencySelect
				name="currency"
				identifier="currency"
				label="admin.modal.form.currency"
			/>
			<div className="d-flex gap-2">
				<InputTimePicker
					name="validFrom"
					identifier="validFrom"
					label="admin.modal.form.validFrom"
					validate={Validators.required}
					onChange={handleDiscountPriceRefresh(form)}
				/>
				<InputTimePicker
					name="validTo"
					identifier="validTo"
					label="admin.modal.form.validTo"
					validate={Validators.required}
				/>
			</div>
			<InputCheckBox
				name="isAsSupplier"
				identifier="isAsSupplier"
				label="admin.modal.form.isAsSupplier"
			/>
			<DeleteBundleAlert
				bundleId={bundleId}
				translations={{
					checking: `${t({ id: 'admin.deleteBundle.checking' })}`,
					deleting: `${t({ id: 'admin.addPrice.affectedSets.adding' })}`,
					set: `${t({ id: 'admin.deleteBundle.set' })}`,
				}}
			/>
			<Button type="submit">
				{t({ id: 'admin.modal.addDiscountPriceToBundle' })}
			</Button>
		</form>
	);
};

export interface DiscountFormValues {
	sellingPrice: number;
	lowestPrice: number;
	currency: VinistoHelperDllEnumsCurrency;
	discountType: DISCOUNT_TYPE;
	amountDiscount: number;
	percentageDiscount: number;
	priceAfterDiscountIncludingVAT: number;
	priceAfterDiscountWithoutVAT: number;
	priceLevel: VinistoHelperDllEnumsPriceLevel;
	validFrom: Date | number;
	validTo: Date | number;
	vat: VinistoHelperDllEnumsVatRate;
	isAsSupplier: boolean;
	platformId: string;
}

const AddDiscountPriceToBundleModal = () => {
	const modalContext = useContext(ModalContext);
	const { integrations } = useContext(IntegrationContext);
	const notificationsContext = useContext(NotificationsContext);
	const authenticationContext = useContext(AuthenticationContext);
	const refetchBundleDetail = modalContext.data?.refetchBundleDetail;
	const refetchBundlePrices = modalContext.data?.refetchBundlePrices;
	const bundle: Bundle = modalContext.data?.bundle;
	const pricesQuery: UseQueryResult<
		VinistoProductDllModelsApiBundlePricesReturn,
		unknown
	> = modalContext.data?.pricesQuery;
	const identicalBundlesPricesQuery: UseQueryResult<
		VinistoProductDllModelsApiBundlePricesReturn[],
		unknown
	> = modalContext.data?.identicalBundlesPricesQuery;
	const bundleId = bundle.id;

	const isVinistoPlus = modalContext.data?.isVinistoPlus ?? false;

	if (pricesQuery.isLoading || identicalBundlesPricesQuery.isLoading)
		return null;

	const existingPriceLevelsByPlatform = Object.fromEntries(
		(integrations ?? [])?.map((platform) => [
			platform.integrationId,
			new Set(
				pricesQuery.data?.prices
					?.filter((price) => price.platformId === platform.integrationId)
					.map((price) => price.level)
			),
		])
	);

	const availablePlatforms = new Set(
		pricesQuery.data?.prices
			?.map((price) => price.platformId)
			.filter((id) => typeof id === 'number') ?? []
	);

	const getDiscountedPriceFromAmount = (
		currentStandardPriceIncludingVAT: number,
		value = 0
	) => currentStandardPriceIncludingVAT - value;

	const getDiscountedPriceFromPercentage = (
		currentStandardPriceIncludingVAT: number,
		value = 0
	) =>
		currentStandardPriceIncludingVAT -
		(currentStandardPriceIncludingVAT / 100) * value;

	const handleDiscountPriceRefresh =
		(form: FormApi<DiscountFormValues>) => () =>
			form.mutators.displayPriceAfterDiscount();

	const formMutators = {
		displayPriceAfterDiscount: (
			_: [],
			state: MutableState<DiscountFormValues>,
			utils: Tools<DiscountFormValues>
		) => {
			const values = state.formState.values as DiscountFormValues;

			const currentStandardPriceIncludingVAT =
				pricesQuery.data?.prices?.find(
					(price) =>
						price.level === values.priceLevel &&
						price.platformId === Number(values.platformId)
				)?.valueWithVat ?? 0;

			const priceAfterDiscountIncludingVAT =
				values.discountType === DISCOUNT_TYPE.AMOUNT
					? getDiscountedPriceFromAmount(
							currentStandardPriceIncludingVAT,
							Number(values.amountDiscount)
					  )
					: getDiscountedPriceFromPercentage(
							currentStandardPriceIncludingVAT,
							Number(values.percentageDiscount)
					  );

			const priceAfterDiscountWithoutVAT = getPriceWithoutVAT(
				priceAfterDiscountIncludingVAT,
				values.vat
			);

			utils.changeValue(state, 'priceAfterDiscountIncludingVAT', () =>
				Math.max(parseFloat(priceAfterDiscountIncludingVAT.toFixed(2)), 0)
			);

			utils.changeValue(state, 'priceAfterDiscountWithoutVAT', () =>
				Math.max(parseFloat(priceAfterDiscountWithoutVAT.toFixed(2)), 0)
			);
		},
	};

	const handleOnAddDiscountPriceToBundle = (formValues: DiscountFormValues) => {
		if (!formValues.validFrom) {
			return notificationsContext.handleShowErrorNotification(
				'admin.addDiscountPriceToBundle.error',
				{}
			);
		}
		if (!formValues.validTo) {
			return notificationsContext.handleShowErrorNotification(
				'admin.addDiscountPriceToBundle.error',
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

		const requestData: BundlesCreateDiscountPriceCreatePayload = {
			userLoginHash: authenticationContext.vinistoUser.loginHash,
			value: formValues.priceAfterDiscountWithoutVAT,
			currency: formValues.currency,
			validFrom: validFromValue,
			validTo:
				formValues.validTo instanceof Date
					? Math.floor(formValues.validTo.getTime() / 1000)
					: null,
			discountType: formValues.isAsSupplier
				? VinistoHelperDllEnumsPriceDiscountType.SupplierDiscount
				: VinistoHelperDllEnumsPriceDiscountType.VinistoDiscount,
			priceLevel: formValues.priceLevel,
			platformId: Number(formValues.platformId),
		};

		apiServiceInstance
			.post(
				`product-api/bundles/${bundleId}/CreateDiscountPrice`,
				requestData,
				true
			)
			.then(() => {
				notificationsContext.handleShowSuccessNotification(
					'admin.addDiscountPriceToBundle.success'
				);
				refetchBundleDetail();
				refetchBundlePrices?.();
				modalContext.handleCloseModal();
			})
			.catch(() => {
				notificationsContext.handleShowErrorNotification(
					'admin.addDiscountPriceToBundle.error',
					{}
				);
			});
	};

	const initialPlatformId = B2C_NUMERIC_CODE;
	const initialPriceLevel =
		isVinistoPlus &&
		bundle.prices.some(
			(price) => price.priceType === VinistoHelperDllEnumsPriceLevel.VinistoPlus
		)
			? VinistoHelperDllEnumsPriceLevel.VinistoPlus
			: bundle.prices[0].priceType;
	const initialStandardPrice = bundle.prices.find(
		(price) => price.priceType === initialPriceLevel
	);
	const initialStandardPriceIncludingVAT =
		initialStandardPrice?.valueWithVat ?? 0;
	const initialStandardPriceVAT =
		initialStandardPrice?.vat ?? VinistoHelperDllEnumsVatRate.BaseVat;

	const initialLowestPrice =
		[
			...(pricesQuery.data?.prices ?? []),
			...(identicalBundlesPricesQuery.data?.flatMap((d) => d.prices) ?? []),
		]
			.filter(
				(price) =>
					price != null &&
					price.level === initialPriceLevel &&
					price.platformId === initialPlatformId
			)
			.map((price) => price?.valueWithVat ?? 0)
			.sort((a, b) => a - b)[0] ?? 0;

	const initialPartialDiscountMin = Math.ceil(
		(initialStandardPriceIncludingVAT / 100) * PERCENTAGE_DISCOUNT_MIN
	);

	return (
		<Form<DiscountFormValues>
			submitCallback={handleOnAddDiscountPriceToBundle}
			initialValues={{
				sellingPrice: Number(initialStandardPriceIncludingVAT.toFixed(2)),
				lowestPrice: Number(initialLowestPrice.toFixed(2)),
				discountType: DISCOUNT_TYPE.AMOUNT,
				amountDiscount: initialPartialDiscountMin,
				percentageDiscount: PERCENTAGE_DISCOUNT_MIN,
				platformId: String(initialPlatformId),
				priceLevel: initialPriceLevel,
				priceAfterDiscountIncludingVAT:
					initialStandardPriceIncludingVAT - initialPartialDiscountMin,
				priceAfterDiscountWithoutVAT: parseFloat(
					getPriceWithoutVAT(
						initialStandardPriceIncludingVAT - initialPartialDiscountMin,
						initialStandardPriceVAT
					).toFixed(2)
				),
				isAsSupplier: false,
				validFrom: Date.now() + 600_000,
				validTo: dayjsInstance().endOf('day').add(14, 'day').toDate(),
				vat: initialStandardPriceVAT,
				currency: VinistoHelperDllEnumsCurrency.CZK,
			}}
			onSubmit={handleOnAddDiscountPriceToBundle}
			mutators={formMutators}
			render={(props) => (
				<AddDiscountPriceToBundleForm
					{...props}
					bundleId={bundleId}
					pricesQuery={pricesQuery}
					identicalBundlesPricesQuery={identicalBundlesPricesQuery}
					existingPriceLevelsByPlatform={existingPriceLevelsByPlatform}
					availablePlatforms={availablePlatforms}
					handleDiscountPriceRefresh={handleDiscountPriceRefresh}
				/>
			)}
		/>
	);
};

export default AddDiscountPriceToBundleModal;
