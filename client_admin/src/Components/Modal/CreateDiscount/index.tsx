import { CCol, CContainer, CRow } from '@coreui/react';
import { Form, Input, InputRadio } from 'Components/Form';
import InputTimePicker from 'Components/Form/Components/TimePicker';
import { ModalContext } from 'Components/Modal/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { dayjsInstance as dayjs } from 'Services/Date';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import { FormApi, MutableState, Tools } from 'final-form';
import { useCallback, useContext, useMemo } from 'react';
import useIdenticalBundles from 'Hooks/Queries/useIdenticalBundles';
import { dayjsInstance } from 'vinisto_shared';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';

import {
	DISCOUNT_TYPE,
	PERCENTAGE_DISCOUNT_MAX,
	PERCENTAGE_DISCOUNT_MIN,
} from './constants';
import {
	getPriceFromNumber,
	getPriceFromPercentage,
	getPriceWithoutVatFromNumber,
	getPriceWithoutVatFromPercentage,
} from './helpers';
import { DiscountFormValues } from './interfaces';

import {
	VinistoHelperDllEnumsCurrency,
	VinistoHelperDllEnumsPriceDiscountType,
	VinistoHelperDllEnumsPriceLevel,
	VinistoHelperDllEnumsVatRate,
	VinistoProductDllModelsApiBundleBundleReturn,
	VinistoProductDllModelsApiBundlePriceBundleDiscountPriceCreateParameters,
} from '@/api-types/product-api';
import { bundleAdapter } from '@/index';
import api from '@/api';

/**
 * @category Component Create Discount Modal Content
 */
const CreateDiscountModal = () => {
	const authenticationContext = useContext(AuthenticationContext);
	const localizationContext = useContext(LocalizationContext);
	const modalContext = useContext(ModalContext);
	const notificationsContext = useContext(NotificationsContext);
	const {
		activeCurrency: { currency },
	} = localizationContext;
	const t = localizationContext.useFormatMessage();
	const modalData = modalContext.data ?? {};
	const isB2B = modalData.isB2B ?? false;

	const identicalBundlesQuery = useIdenticalBundles(modalData.bundle?.id ?? '');

	const bundlePrices = modalData.bundle
		? bundleAdapter.fromApi(modalData.bundle, {
				currency: VinistoHelperDllEnumsCurrency.CZK,
		  }).bundlePrices
		: null;

	const { basePrice } = bundlePrices ?? {};

	const priceWithVat = basePrice?.valueWithVat ?? 0;
	const priceVat = basePrice?.vat ?? VinistoHelperDllEnumsVatRate.BaseVat;
	const priceWithoutVat = basePrice?.value ?? 0;

	const lowestPriceWithVat = useMemo(() => {
		const bundlesSortedByLowestStandardPrice = [
			modalData.bundle,
			...(identicalBundlesQuery.data ?? []),
		]
			.map(
				(bundleItem) =>
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					bundleAdapter.fromApi(bundleItem!, {
						currency: VinistoHelperDllEnumsCurrency.CZK,
					}).bundlePrices.basePrice.valueWithVat
			)
			.sort((a, b) => a - b);

		return bundlesSortedByLowestStandardPrice[0] ?? basePrice?.valueWithVat;
	}, [basePrice?.valueWithVat, identicalBundlesQuery.data, modalData.bundle]);

	const discountedPrice = modalData.discountedPrice ?? 0;
	const discountValidFrom = (modalData.discountValidFrom ?? 0) * 1000;
	const discountValidTo = modalData.discountValidTo
		? (modalData.discountValidTo ?? 0) * 1000
		: dayjsInstance().endOf('day').add(14, 'day').unix() * 1000;

	const currentDate = useMemo(() => new Date(), []);
	const currentDatePlusOneHour = dayjs().add(1, 'h');
	const currentDatePlusOneHourMiliseconds = currentDatePlusOneHour
		.toDate()
		.getTime();
	const currentDatePlusOneHourFormatted = currentDatePlusOneHour.format(
		`${t({ id: 'dateTimeHourMinuteFormat' })}`
	);

	const partialDiscountMin = Math.round(
		(priceWithVat / 100) * PERCENTAGE_DISCOUNT_MIN
	);
	const partialDiscountMax = Math.round(
		(priceWithVat / 100) * PERCENTAGE_DISCOUNT_MAX
	);

	const handleDiscountPriceRefresh =
		(form: FormApi<DiscountFormValues>) => () =>
			form.mutators.displayPriceAfterDiscount();

	const handleOnSubmit = useCallback(
		(formValues: DiscountFormValues) => {
			const userLoginHash = authenticationContext.vinistoUser?.loginHash;
			if (!userLoginHash) return;
			if (!formValues.partialDiscount && !formValues.percentageDiscount) return;

			const requestData = {
				userLoginHash: userLoginHash,
				value:
					formValues.discountType === DISCOUNT_TYPE.NUMBER
						? getPriceWithoutVatFromNumber(
								priceWithoutVat,
								priceWithVat,
								Number(formValues.partialDiscount),
								priceVat
						  )
						: getPriceWithoutVatFromPercentage(
								priceWithoutVat,
								priceWithVat,
								Number(formValues.percentageDiscount),
								priceVat
						  ),
				vat: String(priceVat),
				currency,
				validFrom: Math.round(
					(formValues.validFrom
						? formValues.validFrom
						: currentDatePlusOneHourMiliseconds) / 1000
				),
				validTo: formValues.validTo
					? Math.round(formValues.validTo / 1000)
					: null,
				discountType: VinistoHelperDllEnumsPriceDiscountType.SupplierDiscount,
				priceLevel: VinistoHelperDllEnumsPriceLevel.Level1,
			};
			const bundleId = modalData.bundle.id;
			api
				.post<
					VinistoProductDllModelsApiBundleBundleReturn,
					VinistoProductDllModelsApiBundlePriceBundleDiscountPriceCreateParameters
				>(
					`product-api/bundles/${bundleId}/CreateDiscountPrice`,
					undefined,
					requestData
				)
				.then((res) => res.bundle)
				.then(() => {
					notificationsContext.handleShowSuccessNotification(
						'addDiscountPriceToBundle.success'
					);
					modalContext.data?.refetchPrices?.();
					modalContext.handleCloseModal();
				})
				.catch(() => {
					// TODO: Handle different errors returned from server
					notificationsContext.handleShowErrorNotification(
						'addDiscountPriceToBundle.error'
					);
				});
		},
		[
			authenticationContext.vinistoUser?.loginHash,
			priceWithoutVat,
			priceWithVat,
			priceVat,
			currency,
			currentDatePlusOneHourMiliseconds,
			modalData.bundle.id,
			notificationsContext,
			modalContext,
		]
	);

	const formMutators = {
		displayPriceAfterDiscount: (
			_: [],
			state: MutableState<DiscountFormValues>,
			utils: Tools<DiscountFormValues>
		) => {
			utils.changeValue(state, 'priceAfterDiscount', () => {
				const values = state.formState.values as DiscountFormValues;
				return values.discountType === DISCOUNT_TYPE.NUMBER
					? getPriceFromNumber(priceWithVat, Number(values.partialDiscount))
					: getPriceFromPercentage(
							priceWithVat,
							Number(values.percentageDiscount)
					  );
			});
		},
	};

	return (
		<CContainer className="d-flex flex-column align-items-center w-100">
			<CRow className="justify-content-center">
				<CCol
					md={6}
					className="flex-grow-1"
				>
					<p className="vinisto_modal__info mt-3 fst-italic">
						{t({ id: 'admin.modal.createDiscount.info' })}
					</p>
					<Form<DiscountFormValues>
						onSubmit={handleOnSubmit}
						submitLabel={
							isB2B
								? 'admin.modal.form.createB2BDiscount'
								: 'admin.modal.form.createB2CDiscount'
						}
						initialValues={{
							sellingPrice: priceWithVat,
							lowestPrice: lowestPriceWithVat,
							validFrom: discountValidFrom,
							validTo: discountValidTo,
							discountType: DISCOUNT_TYPE.NUMBER,
							partialDiscount:
								discountedPrice !== 0 ? priceWithVat - discountedPrice : 0,
							percentageDiscount:
								discountedPrice !== 0
									? Math.round(
											(priceWithVat - discountedPrice) / (priceWithVat / 100)
									  )
									: 0,
							priceAfterDiscount:
								discountedPrice !== 0 ? discountedPrice : priceWithVat,
						}}
						mutators={formMutators}
					>
						{({ form, values }) => (
							<>
								<Input
									type="number"
									name="sellingPrice"
									identifier="sellingPrice"
									label={t(
										{
											id: isB2B
												? 'admin.modal.b2bPriceWithWithoutVat.label'
												: 'admin.modal.b2cPriceWithWithoutVat.label',
										},
										{
											priceWithoutVat: (
												<em className="ms-1">
													{t(
														{
															id: 'bundleDetail.sell.priceWithVat.label.priceWithoutVat',
														},
														{
															value: getLocalizedPrice({
																price: priceWithoutVat,
																currency,
																displayCurrency: false,
																decimalPlaces: 2,
															}),
														}
													)}
												</em>
											),
										}
									)}
									disabled
								/>
								{!isB2B && (
									<Input
										type="number"
										name="lowestPrice"
										identifier="lowestPrice"
										label="admin.modal.createDiscount.lowestPrice"
										disabled
									/>
								)}
								<div className="vinisto-modal__row">
									<InputRadio
										value={DISCOUNT_TYPE.NUMBER}
										name="discountType"
										identifier="reducePriceByNumber"
										label="admin.modal.form.reducePriceBy"
										onChange={handleDiscountPriceRefresh(form)}
									/>
									<Input
										type="number"
										name="partialDiscount"
										identifier="partialDiscount"
										className="input-number-container"
										disabled={values.discountType !== DISCOUNT_TYPE.NUMBER}
										min={partialDiscountMin}
										max={partialDiscountMax}
										onChange={handleDiscountPriceRefresh(form)}
									/>

									<span className="unit">
										{t({ id: 'admin.modal.form.currencyCode' })}
									</span>
								</div>
								<div className="vinisto-modal__row">
									<InputRadio
										value={DISCOUNT_TYPE.PERCENT}
										name="discountType"
										identifier="reducePriceByPercent"
										label="admin.modal.form.reducePriceBy"
										onChange={handleDiscountPriceRefresh(form)}
									/>
									<Input
										type="number"
										name="percentageDiscount"
										identifier="percentageDiscount"
										className="input-number-container"
										disabled={values.discountType !== DISCOUNT_TYPE.PERCENT}
										min={PERCENTAGE_DISCOUNT_MIN}
										max={PERCENTAGE_DISCOUNT_MAX}
										onChange={handleDiscountPriceRefresh(form)}
									/>
									<span className="unit">
										{t({ id: 'admin.modal.form.percent' })}
									</span>
								</div>
								<div className="w-100 vinisto-modal__row-header">
									{t({ id: 'modal.createDiscount.priceAfterDiscount' })}
								</div>
								<Input
									identifier="priceAfterDiscount"
									name="priceAfterDiscount"
									disabled
								/>
								<div className="vinisto-modal__row">
									<div className="w-100 vinisto-modal__row-header">
										{t({ id: 'admin.modal.createDiscount.discountValidity' })}
									</div>
									<div className="d-flex">
										<InputTimePicker
											name="validFrom"
											identifier="dateFrom"
											label="admin.modal.form.from"
											minDate={currentDate}
											placeholderText={currentDatePlusOneHourFormatted}
										/>
										<InputTimePicker
											name="validTo"
											identifier="validTo"
											label="admin.modal.form.to"
											minDate={currentDate}
											placeholderText={t({
												id: 'admin.modal.form.dateFormat',
											})?.toString()}
										/>
									</div>
								</div>
							</>
						)}
					</Form>
				</CCol>
			</CRow>
		</CContainer>
	);
};

export default CreateDiscountModal;
