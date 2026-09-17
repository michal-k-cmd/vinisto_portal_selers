import { LocalizationContext } from 'Services/LocalizationService';
import { useCallback, useContext, useMemo, useState } from 'react';
import { Form } from 'react-final-form';
import cx from 'classnames';
import {
	Input,
	InputCheckBox,
	InputRadio,
	InputTimePicker,
	Label,
	Validators,
} from 'Components/Form';
import { Button } from 'react-bootstrap';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { apiServiceInstance } from 'Services/ApiService';
import { FormApi } from 'final-form';
import { NotificationsContext } from 'Services/NotificationService';
import { useQuery } from '@tanstack/react-query';
import { dayjsInstance } from 'Services/Date';
import { PageListAction } from 'Hooks/useAdminTable/constants';
import { DATE_14_DAYS_BEFORE_ERROR_MESSAGE } from 'Components/Form/validators';

import { CRUD_MODE } from '../constants';

import styles from './styles.module.css';
import {
	CreateOrUpdateDiscountCouponFormProps,
	CreateOrUpdateDiscountCouponFormValues,
} from './interfaces';
import { transformRequestBody } from './helpers';

import {
	VinistoExchangeRateDllModelsApiReturnDataExchangeRatesReturn,
	VinistoHelperDllEnumsCurrency,
} from '@/api-types/services-api';
import {
	DiscountCouponsSuppliersCreatePayload,
	VinistoHelperDllEnumsDiscountCouponDiscountCouponType,
	VinistoHelperDllEnumsErrorSpecificError,
	VinistoOrderDllModelsApiDiscountCouponDefinitionModelsAmountDiscountCouponDefinition,
	VinistoOrderDllModelsApiDiscountCouponDefinitionModelsPercentageDiscountCouponDefinition,
	VinistoOrderDllModelsApiReturnDataDiscountCouponReturn,
} from '@/api-types/order-api';

/**
 * Updates the form’s validTo value if it is less than 14 days after newValidFrom.
 *
 * @param form The Final Form API instance.
 * @param newValidFrom The new validFrom value (expected to be a date or something convertible to Date).
 */
const updateValidToBasedOnValidFrom = (
	form: FormApi<CreateOrUpdateDiscountCouponFormValues>,
	newValidFrom: Date | string
) => {
	const validFromDate = new Date(newValidFrom);
	const minValidTo = dayjsInstance(validFromDate).add(14, 'day').toDate();
	const currentValidTo: Date | undefined = form.getFieldState('validTo')?.value;
	if (!currentValidTo || new Date(currentValidTo) < minValidTo) {
		form.change('validTo', minValidTo);
	}
};

const CreateOrUpdateDiscountCouponForm = ({
	mode,
	handleClose,
	discountCouponId,
	dispatch,
}: CreateOrUpdateDiscountCouponFormProps) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const notificationsContext = useContext(NotificationsContext);
	const { vinistoUser, activeSupplierId } = useContext(AuthenticationContext);
	const { loginHash: userLoginHash } = vinistoUser ?? {};

	const supplierData = useMemo(
		() =>
			vinistoUser?.suppliers?.find(
				(supplier) => supplier.id === activeSupplierId
			),
		[activeSupplierId, vinistoUser]
	);

	const [focusedInput, setFocusedInput] = useState<
		keyof CreateOrUpdateDiscountCouponFormValues | null
	>(null);

	const { data: coupon } = useQuery({
		queryKey: ['discount-coupon', discountCouponId],
		queryFn: () => {
			return apiServiceInstance.get<VinistoOrderDllModelsApiReturnDataDiscountCouponReturn>(
				`order-api/discount-coupons/${discountCouponId}/GetDiscountCoupon`,
				true,
				undefined,
				[
					{
						key: 'UserLoginHash',
						value: userLoginHash as string,
					},
				]
			);
		},
		enabled: !!discountCouponId && mode === CRUD_MODE.UPDATE,
	});

	const { data: exchangeRate } = useQuery({
		queryKey: ['exchange-rate'],
		queryFn: async () => {
			const req =
				await apiServiceInstance.get<VinistoExchangeRateDllModelsApiReturnDataExchangeRatesReturn>(
					'services-api/exchange-rates'
				);

			return req.exchangeRates?.find(
				(item) => item.currency === VinistoHelperDllEnumsCurrency.EUR
			);
		},
	});

	const removeCouponPrefix = useCallback(
		(code: string) => {
			return code.replace(supplierData?.couponPrefix ?? '', '');
		},
		[supplierData]
	);

	const handleCreateCoupon = (
		values: DiscountCouponsSuppliersCreatePayload,
		form: FormApi<CreateOrUpdateDiscountCouponFormValues>
	) => {
		const requestData = {
			...values,
			unit: {
				language: localizationContext.activeLanguageKey,
				value: '',
			},
			code: removeCouponPrefix(String(values.code)),
			// https://vinisto.atlassian.net/browse/VWA-3356
			isForDiscountedItems:
				values.discountCouponType ===
				VinistoHelperDllEnumsDiscountCouponDiscountCouponType.AMOUNT,
		};

		return apiServiceInstance
			.post(
				`order-api/discount-coupons/suppliers/${activeSupplierId}`,
				requestData,
				true
			)
			.then(() => {
				handleClose();
				notificationsContext.handleShowSuccessNotification(
					'discountCoupons.create.success'
				);
				form.reset();
				dispatch({
					type: PageListAction.setShouldReload,
					value: true,
				});
			})
			.catch((e) => {
				if (
					e?.message ===
					VinistoHelperDllEnumsErrorSpecificError.DISCOUNT_COUPON_ACTIVE_CODE_ALREADY_EXISTS
				) {
					notificationsContext.handleShowErrorNotification(
						'discountCoupons.create.errorDuplicate'
					);
					return;
				}

				notificationsContext.handleShowErrorNotification(
					'discountCoupons.create.error'
				);
			});
	};

	const handleEditCoupon = (
		values: DiscountCouponsSuppliersCreatePayload,
		form: FormApi<CreateOrUpdateDiscountCouponFormValues>
	) => {
		const requestData = {
			...values,
			unit: {
				language: localizationContext.activeLanguageKey,
				value: '',
			},
			// https://vinisto.atlassian.net/browse/VWA-3356
			isForDiscountedItems:
				values.discountCouponType ===
				VinistoHelperDllEnumsDiscountCouponDiscountCouponType.AMOUNT,
		};
		return apiServiceInstance
			.put(
				`order-api/discount-coupons/${discountCouponId}/EditDiscountCoupon`,
				requestData,
				true
			)
			.then(() => {
				handleClose();
				notificationsContext.handleShowSuccessNotification(
					'discountCoupons.edit.success'
				);
				form.reset();
				dispatch({
					type: PageListAction.setShouldReload,
					value: true,
				});
			})
			.catch((e) => {
				if (
					e?.message ===
					VinistoHelperDllEnumsErrorSpecificError.DISCOUNT_COUPON_ACTIVE_CODE_ALREADY_EXISTS
				) {
					notificationsContext.handleShowErrorNotification(
						'discountCoupons.create.errorDuplicate'
					);
					return;
				}

				notificationsContext.handleShowErrorNotification(
					'discountCoupons.edit.error'
				);
			});
	};

	const handleInputFocus = (
		inputName: keyof CreateOrUpdateDiscountCouponFormValues
	) => {
		setFocusedInput(inputName);
	};

	const handleInputBlur = () => {
		setFocusedInput(null);
	};

	const initialValues: Partial<CreateOrUpdateDiscountCouponFormValues> =
		useMemo(() => {
			const discountCoupon = coupon?.discountCoupon
				? (coupon.discountCoupon as
						| VinistoOrderDllModelsApiDiscountCouponDefinitionModelsAmountDiscountCouponDefinition
						| VinistoOrderDllModelsApiDiscountCouponDefinitionModelsPercentageDiscountCouponDefinition)
				: null;
			return {
				isReusable: discountCoupon?.isReusable ? 'true' : 'false',
				discountCouponType:
					discountCoupon?.discountCouponType ??
					VinistoHelperDllEnumsDiscountCouponDiscountCouponType.PERCENTAGE,
				allowedFrom: String(discountCoupon?.allowedFrom?.value) ?? null,
				isAlowedFrom: Boolean(discountCoupon?.allowedFrom?.value) ?? null,
				amountDiscount:
					discountCoupon?.discountCouponType ===
					VinistoHelperDllEnumsDiscountCouponDiscountCouponType.AMOUNT
						? String(
								(
									discountCoupon as VinistoOrderDllModelsApiDiscountCouponDefinitionModelsAmountDiscountCouponDefinition
								).amountDiscount?.value
						  ) ?? null
						: null,
				percentageDiscount:
					discountCoupon?.discountCouponType ===
					VinistoHelperDllEnumsDiscountCouponDiscountCouponType.PERCENTAGE
						? String(
								(
									discountCoupon as VinistoOrderDllModelsApiDiscountCouponDefinitionModelsPercentageDiscountCouponDefinition
								).percentageDiscount
						  ) ?? null
						: null,
				code: discountCoupon?.code
					? removeCouponPrefix(discountCoupon.code)
					: undefined,
				validTo: discountCoupon?.validTo
					? new Date(discountCoupon.validTo * 1000)
					: dayjsInstance().add(14, 'day').add(1, 'hour').toDate(),
			};
		}, [coupon, removeCouponPrefix]);

	const handleSubmit = (
		values: CreateOrUpdateDiscountCouponFormValues,
		form: FormApi<CreateOrUpdateDiscountCouponFormValues>
	) => {
		const transformedValues = transformRequestBody(values, userLoginHash);

		if (mode === CRUD_MODE.CREATE) {
			handleCreateCoupon(transformedValues, form);
		} else {
			handleEditCoupon(transformedValues, form);
		}
	};

	const getAmountInEUR = useCallback(
		(amount: string | null) => {
			if (
				!amount ||
				!exchangeRate ||
				!exchangeRate.valueDiscountCoupons ||
				!exchangeRate.coefficient
			) {
				return null;
			}

			if (Number.isNaN(parseFloat(amount))) {
				return null;
			}

			// Formula based on Confluence page https://vinisto.atlassian.net/wiki/spaces/MFS/pages/172720164/Prodej+na+Slovensko#Uplat%C5%88ov%C3%A1n%C3%AD-slevov%C3%BDch-kup%C3%B3n%C5%AF
			return (
				parseFloat(amount) / exchangeRate.valueDiscountCoupons
			).toLocaleString('cs-CZ', {
				style: 'currency',
				currency: 'EUR',
			});
		},
		[exchangeRate]
	);

	return (
		<Form<CreateOrUpdateDiscountCouponFormValues>
			onSubmit={handleSubmit}
			validateOnBlur={false}
			initialValues={initialValues}
			render={({ handleSubmit, values, form }) => {
				const dateInputError = form.getFieldState('validTo')?.error;
				const dateInputError14Days =
					dateInputError === DATE_14_DAYS_BEFORE_ERROR_MESSAGE;

				return (
					<form
						onSubmit={handleSubmit}
						className={styles.formWrapper}
					>
						<em className="">
							{t({ id: 'discountCoupons.form.instructions' })}
						</em>
						<fieldset>
							<Label
								isRequired
								htmlFor="isReusable"
							>
								{t({ id: 'discountCoupons.form.usage' })}
							</Label>

							<InputRadio
								name="isReusable"
								identifier="false"
								value="false"
								label={t(
									{
										id: 'discountCoupons.form.usage.disposable',
									},
									{
										explanation: (
											<em>
												{t({
													id: 'discountCoupons.form.usage.disposable.explanation',
												})}
											</em>
										),
									}
								)}
							/>
							<InputRadio
								name="isReusable"
								identifier="true"
								value="true"
								label={t(
									{
										id: 'discountCoupons.form.usage.reusable',
									},
									{
										explanation: (
											<em>
												{t({
													id: 'discountCoupons.form.usage.reusable.explanation',
												})}
											</em>
										),
									}
								)}
							/>
						</fieldset>
						<div>
							<Input
								type="text"
								name="code"
								identifier="code"
								label={t({ id: 'discountCoupons.form.code' })}
								prefix={
									<span className={styles.couponCodePrefix}>
										{supplierData?.couponPrefix}
									</span>
								}
								onFocus={() => handleInputFocus('code')}
								onBlur={handleInputBlur}
								validate={[Validators.required, Validators.cannotContainSpaces]}
								prohibitedChars={[' ']}
							/>
							{focusedInput === 'code' && (
								<em className={styles.inputDescription}>
									{t({ id: 'discountCoupons.form.code.note' })}
								</em>
							)}
						</div>
						<div className={styles.validUntilContainer}>
							<div
								className={cx(styles.validUntilWrapper, {
									[styles.hasError]: !!dateInputError,
								})}
							>
								<InputTimePicker
									name="validFrom"
									identifier="validFrom"
									label={t({ id: 'discountCoupons.form.validFrom' })}
									onChange={(newValue) => {
										if (!newValue) return;
										updateValidToBasedOnValidFrom(form, newValue);
									}}
									onBlur={handleInputBlur}
									validate={[Validators.required]}
								/>
								<br />
								<InputTimePicker
									name="validTo"
									identifier="validTo"
									label={t({ id: 'discountCoupons.form.validTo' })}
									onFocus={() => handleInputFocus('validTo')}
									onBlur={handleInputBlur}
									validate={[
										Validators.required,
										Validators.validateMoreThan14DaysFromNow,
									]}
									hideErrors={[DATE_14_DAYS_BEFORE_ERROR_MESSAGE]}
									afterInputSlot={
										<div>
											{(focusedInput === 'validTo' || dateInputError14Days) && (
												<em className={styles.validUntilDescription}>
													{t({
														id: 'discountCoupons.form.validTo.note',
													})}
												</em>
											)}
										</div>
									}
								/>
							</div>
						</div>
						<fieldset>
							<Label
								isRequired
								htmlFor="discountCouponType"
							>
								{t({ id: 'discountCoupons.form.type' })}
							</Label>
							<div className={styles.discountTypeContainer}>
								<div className={styles.discountTypeRow}>
									<div className={styles.discountTypeLabel}>
										<InputRadio
											name="discountCouponType"
											identifier={
												VinistoHelperDllEnumsDiscountCouponDiscountCouponType.PERCENTAGE
											}
											label={'discountCoupons.form.type.percentage'}
											value={
												VinistoHelperDllEnumsDiscountCouponDiscountCouponType.PERCENTAGE
											}
											onChange={() => {
												form.change('amountDiscount', null);
											}}
										/>
									</div>
									<div className={styles.discountInputWrapper}>
										<div className={styles.discountInputContainer}>
											<Input
												type="number"
												name="percentageDiscount"
												identifier="percentageDiscount"
												className={styles.discountInput}
												disabled={
													values.discountCouponType !==
													VinistoHelperDllEnumsDiscountCouponDiscountCouponType.PERCENTAGE
												}
												min={5}
												max={50}
												suffix={
													<div className="d-flex align-items-center">
														<div className={styles.unit}>%</div>
														{values.discountCouponType ===
															VinistoHelperDllEnumsDiscountCouponDiscountCouponType.PERCENTAGE && (
															<span className={styles.discountHint}>
																{t({
																	id: 'discountCoupons.form.type.percentage.note',
																})}
															</span>
														)}
													</div>
												}
												validate={
													values.discountCouponType ===
													VinistoHelperDllEnumsDiscountCouponDiscountCouponType.PERCENTAGE
														? Validators.required
														: undefined
												}
											/>
										</div>
									</div>
								</div>
								<div className={styles.discountTypeRow}>
									<div className={styles.discountTypeLabel}>
										<InputRadio
											name="discountCouponType"
											identifier={
												VinistoHelperDllEnumsDiscountCouponDiscountCouponType.AMOUNT
											}
											label="discountCoupons.amount"
											value={
												VinistoHelperDllEnumsDiscountCouponDiscountCouponType.AMOUNT
											}
											onChange={() => {
												form.change('percentageDiscount', null);
											}}
										/>
									</div>
									<div className={styles.discountInputContainer}>
										<Input
											type="number"
											name="amountDiscount"
											identifier="amountDiscount"
											className={styles.discountInput}
											disabled={
												values.discountCouponType !==
												VinistoHelperDllEnumsDiscountCouponDiscountCouponType.AMOUNT
											}
											min={0}
											suffix={
												<div>
													<span className={styles.unit}>Kč</span>
													{values.discountCouponType ===
														VinistoHelperDllEnumsDiscountCouponDiscountCouponType.AMOUNT &&
														values.amountDiscount && (
															<span className={styles.discountHint}>
																{`= ${getAmountInEUR(
																	values.amountDiscount
																)} (dle aktuálního kurzu)`}
															</span>
														)}
												</div>
											}
											validate={
												values.discountCouponType ===
												VinistoHelperDllEnumsDiscountCouponDiscountCouponType.AMOUNT
													? Validators.required
													: undefined
											}
										/>
									</div>
								</div>
								{values.discountCouponType ===
									VinistoHelperDllEnumsDiscountCouponDiscountCouponType.AMOUNT && (
									<div className={styles.minimumCartValueRow}>
										<InputCheckBox
											name="isAlowedFrom"
											identifier="isAlowedFrom"
											label="discountCoupons.form.type.minimumCartValue.label"
											className={styles.minimumCartValueCheckbox}
										/>
										{values.isAlowedFrom && (
											<div className={styles.discountInputContainer}>
												<Input
													type="number"
													name="allowedFrom"
													identifier="minimumCartValue"
													className={styles.discountInput}
													suffix={<span className={styles.unit}>Kč</span>}
													validate={Validators.required}
												/>
											</div>
										)}
									</div>
								)}
							</div>
						</fieldset>
						<Button type="submit">
							{mode === CRUD_MODE.CREATE
								? t({ id: 'discountCoupons.create' })
								: t({ id: 'discountCoupons.update' })}
						</Button>
					</form>
				);
			}}
		/>
	);
};

export default CreateOrUpdateDiscountCouponForm;
