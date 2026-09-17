import { CContainer } from '@coreui/react';
import { InputRadio, InputSelect, InputTimePicker } from 'Components/Form';
import { ModalContext } from 'Components/Modal/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import { useContext, useState } from 'react';
import { Form } from 'react-final-form';
import { CFormSelectProps } from '@coreui/react/dist/components/form/CFormSelect';
import { Button } from 'react-bootstrap';
import { dayjsInstance as dayjs } from 'vinisto_shared';
import Config from 'Config';

import api from '@/api';
import {
	ProductApi,
	VinistoHelperDllEnumsCurrency,
	VinistoHelperDllEnumsPriceDiscountType,
	VinistoHelperDllEnumsPriceLevel,
	VinistoProductDllModelsApiBundleBundle,
	VinistoProductDllModelsApiBundleBundleReturn,
	VinistoProductDllModelsApiBundlePriceBundleDiscountPriceCreateParameters,
	VinistoProductDllModelsApiCommonPriceEditParameters,
} from '@/api-types/product-api';

interface AddPriceFormValues {
	percentageDiscountFromB2CPrice: string;
	validFrom: Date;
	discountStartDateOptions: 'immediately' | 'fromDate';
	// It is actually a stringified JSON of e.g., { unit: "month", count: 1 }
	priceDuration: string;
}

const vinistoPlusDiscountOptions = Config.vinistoPlusDiscountOptions;

const CreateVinistoPlusPrice = () => {
	const authenticationContext = useContext(AuthenticationContext);
	const { loginHash: userLoginHash } = authenticationContext.vinistoUser ?? {};
	const localizationContext = useContext(LocalizationContext);
	const modalContext = useContext(ModalContext);
	const notificationsContext = useContext(NotificationsContext);
	const t = localizationContext.useFormatMessage();

	const modalData: Partial<{
		bundle: VinistoProductDllModelsApiBundleBundle | null;
		refetchBundleDetail?: (
			bundle: VinistoProductDllModelsApiBundleBundle | null | undefined
		) => void;
	}> = modalContext.data ?? {};
	const { bundle, refetchBundleDetail } = modalData;

	const [currentDate] = useState(new Date());

	const currentDatePlusTenMinutes = dayjs().add(10, 'minutes');

	const currentDatePlusTenMinutesFormatted =
		currentDatePlusTenMinutes.format('D. M. YYYY');

	const baseB2CPriceLevel1 = bundle?.prices.find(
		(price) =>
			price.level === VinistoHelperDllEnumsPriceLevel.Level1 &&
			price.platformId === 0
	);

	const vinistoPlusPrice = bundle?.prices.find(
		(price) => price.level === VinistoHelperDllEnumsPriceLevel.VinistoPlus
	);

	const vinistoPlusDiscount = bundle?.priceDiscounts?.find(
		(price) => price.level === VinistoHelperDllEnumsPriceLevel.VinistoPlus
	);

	if (!baseB2CPriceLevel1) return null;

	if (typeof baseB2CPriceLevel1.value !== 'number') return null;

	const handleOnAddVinistoPlusSupplierDiscountToBundle =
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		(formValues: AddPriceFormValues) => {
			const discountPercentage = Number(
				formValues.percentageDiscountFromB2CPrice
			);

			const validFromDate =
				formValues.discountStartDateOptions === 'immediately'
					? currentDatePlusTenMinutes
					: dayjs(formValues.validFrom).startOf('day');

			const validFromUnixDate = validFromDate.unix();

			const parsedPriceDuration = JSON.parse(formValues.priceDuration);

			const validToUnixDate = validFromDate
				.add(Number(parsedPriceDuration.count), parsedPriceDuration.unit)
				.endOf('day')
				.unix();

			const vinistoPlusPricePromise = vinistoPlusPrice
				? Promise.resolve()
				: api.post<
						VinistoProductDllModelsApiBundleBundleReturn,
						VinistoProductDllModelsApiCommonPriceEditParameters
				  >(`product-api/bundles/${bundle?.id}/prices`, undefined, {
						...baseB2CPriceLevel1,
						price: baseB2CPriceLevel1.value,
						priceLevel: VinistoHelperDllEnumsPriceLevel.VinistoPlus,
						userLoginHash,
						platformId: 0,
				  });

			vinistoPlusPricePromise
				.then(() =>
					api.post<
						VinistoProductDllModelsApiBundleBundleReturn,
						VinistoProductDllModelsApiBundlePriceBundleDiscountPriceCreateParameters
					>(
						`product-api/bundles/${bundle?.id}/CreateDiscountPrice`,
						undefined,
						{
							value:
								// @ts-expect-error No it is not possibly undefined. You dumb bro?
								baseB2CPriceLevel1.value -
								// @ts-expect-error dtto
								(baseB2CPriceLevel1.value / 100) * discountPercentage,
							currency: baseB2CPriceLevel1.currency,
							validFrom: validFromUnixDate,
							validTo: validToUnixDate,
							discountType:
								VinistoHelperDllEnumsPriceDiscountType.SupplierDiscount,
							priceLevel: VinistoHelperDllEnumsPriceLevel.VinistoPlus,
							userLoginHash,
							platformId: 0,
						}
					)
				)
				.then((createResponse) => {
					const possibleCleanupPromise =
						vinistoPlusDiscount &&
						'type' in vinistoPlusDiscount &&
						vinistoPlusDiscount.type ===
							VinistoHelperDllEnumsPriceDiscountType.VinistoDiscount
							? api.delete<
									ProductApi.BundlesDeleteDiscountPriceDelete.ResponseBody,
									ProductApi.BundlesDeleteDiscountPriceDelete.RequestQuery
							  >(`product-api/bundles/${bundle?.id}/DeleteDiscountPrice`, {
									Currency:
										baseB2CPriceLevel1.currency ??
										VinistoHelperDllEnumsCurrency.CZK,
									PriceLevel: VinistoHelperDllEnumsPriceLevel.VinistoPlus,
									PriceDiscountType:
										VinistoHelperDllEnumsPriceDiscountType.VinistoDiscount,
									DiscountId: `${vinistoPlusDiscount.priceId}`,
									UserLoginHash: `${userLoginHash}`,
									PlatformId: 0,
							  })
							: Promise.resolve(createResponse);

					return possibleCleanupPromise;
				})
				.then((response) => {
					notificationsContext.handleShowSuccessNotification(
						'addDiscountPriceToBundle.success'
					);
					refetchBundleDetail?.(response.bundle);
					modalContext.handleCloseModal();
				})
				.catch(() => {
					notificationsContext.handleShowErrorNotification(
						'bundleDetail.sell.addPriceToBundle.error'
					);
				});
		};

	const percentageDiscountFromB2CPriceOptions =
		vinistoPlusDiscountOptions.percentageOptions.map((option) => ({
			label: `${option.value} %`,
			value: `${option.value}`,
		})) satisfies CFormSelectProps['options'];

	const getDurationLabelTranslation = ({
		unit,
		count,
	}: {
		unit: string;
		count: number;
	}) => t({ id: `${unit}.count` }, { count });

	const priceDurationOptions =
		vinistoPlusDiscountOptions.discountDurationOptions.map((option) => ({
			label: `${getDurationLabelTranslation(option.value)}`,
			value: JSON.stringify(option.value),
		}));

	const initialPercentageDiscountOption =
		vinistoPlusDiscountOptions.percentageOptions.find(
			(option) => option.default
		) ?? vinistoPlusDiscountOptions.percentageOptions[0];

	const initialPriceDurationOption =
		vinistoPlusDiscountOptions.discountDurationOptions.find(
			(option) => option.default
		) ?? vinistoPlusDiscountOptions.discountDurationOptions[0];

	return (
		<CContainer className="d-flex flex-column w-100">
			<Form
				initialValues={{
					percentageDiscountFromB2CPrice: String(
						initialPercentageDiscountOption.value
					),
					discountStartDateOptions: 'immediately',
					priceDuration: JSON.stringify(initialPriceDurationOption.value),
				}}
				onSubmit={handleOnAddVinistoPlusSupplierDiscountToBundle}
				render={({ handleSubmit, values }) => (
					<form onSubmit={handleSubmit}>
						<InputSelect
							name="percentageDiscountFromB2CPrice"
							identifier="percentageDiscountFromB2CPrice"
							label="form.addToVinistoPlus.percentageDiscount.label"
							options={percentageDiscountFromB2CPriceOptions}
						/>
						<InputSelect
							name="priceDuration"
							identifier="priceDuration"
							label="form.addToVinistoPlus.priceDuration.label"
							options={priceDurationOptions}
						/>
						<div className="vinisto-modal__row">
							<InputRadio
								name="discountStartDateOptions"
								identifier="discountStartDateOptions_immediately"
								label="form.addToVinistoPlus.priceStartDate.immediately.label"
								value="immediately"
							/>
						</div>
						<div className="vinisto-modal__row">
							<InputRadio
								name="discountStartDateOptions"
								identifier="discountStartDateOptions_fromDate"
								label="form.addToVinistoPlus.priceStartDate.fromDate.label"
								value="fromDate"
							/>
							<InputTimePicker
								name="validFrom"
								identifier="dateFrom"
								label="admin.modal.form.from"
								showTimeInput={false}
								minDate={currentDate}
								placeholderText={currentDatePlusTenMinutesFormatted}
								disabled={values.discountStartDateOptions === 'immediately'}
							/>
						</div>
						<Button
							className="mt-2"
							type="submit"
						>
							{t({ id: 'form.addToVinistoPlus.submitButton.label' })}
						</Button>
					</form>
				)}
			></Form>
		</CContainer>
	);
};

export default CreateVinistoPlusPrice;
