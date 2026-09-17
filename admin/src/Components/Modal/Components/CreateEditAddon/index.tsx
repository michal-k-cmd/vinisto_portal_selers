import { useContext, useMemo } from 'react';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { SpecificationType } from 'Services/Specification/constants';
import { Option } from 'Components/Multiselect/interfaces';
import {
	Input,
	InputCheckBox,
	InputDatePicker,
	InputMultiselect,
	InputTextArea,
	Validators,
} from 'Components/Form';
import { ModalContext } from 'Components/Modal/context';
import { NotificationsContext } from 'Services/NotificationService';
import { LocalizationContext } from 'Services/LocalizationService';
import { apiServiceInstance } from 'Services/ApiService';
import PlatformSelect from 'Components/Form/Components/PlatformSelect';

import ConditionBuilder from '../CreateEditAddon/components/ConditionBuilder';

import {
	ConditionRequestWithType,
	CreateEditAddonFormValues,
	CreateEditAddonModalData,
} from './types';
import styles from './styles.module.css';
import GiftActions from './components/GiftActions';
import { specificationTypeToRequestParam } from './constants';
import RelatedProductActions from './components/RelatedProductActions';

import {
	ActionRequest,
	ActionType,
	AddonType,
	ConditionType,
	CountryCode,
	CreateAddonRequest,
	Currency,
	Operator,
	PriceRequest,
	SetDeliverActionRequest,
	SetGiftActionRequest,
	SetRelatedProductActionRequest,
	SetServiceActionRequest,
	UpdateAddonRequest,
} from '@/api-types/addons-api';

export const CreateEditAddon = () => {
	const modalContext = useContext(ModalContext);

	const notificationsContext = useContext(NotificationsContext);
	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();

	const data = modalContext.data as CreateEditAddonModalData;
	const addon = data.addon;
	const addonType = data.addonType;
	const isEditMode = !!data.addonId;

	const handleSubmit = (formValues: CreateEditAddonFormValues) => {
		const requestData: Partial<CreateAddonRequest | UpdateAddonRequest> = {
			name: formValues.ruleName ?? '',
			description: formValues.description ?? '',
			availableOnPlatform: formValues.availableOnPlatform,
			validFrom: formValues.validFrom
				? formValues.validFrom.getTime() / 1000
				: null,
			validTo: formValues.validTo ? formValues.validTo.getTime() / 1000 : null,
			countryOfSale: (formValues.countries?.[0]?.value ?? '') as CountryCode,
			currency: Currency.CZK,
			conditions: formValues.conditions
				.map((conditionWithTypeProperty) => {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					const { conditionTypeSelect, ...condition } =
						conditionWithTypeProperty;
					// delete condition.conditionTypeSelect;
					if (condition.itemSpecificationConditionRequest) {
						const data = Array.isArray(
							condition.itemSpecificationConditionRequest
						)
							? condition.itemSpecificationConditionRequest[0]
							: condition.itemSpecificationConditionRequest;
						const specificationType =
							data?.type ?? data?.specificationType ?? '';
						return {
							operator: condition.operator,
							itemSpecificationConditionRequest: {
								specificationId: data?.id ?? data.specificationId ?? '',
								[specificationTypeToRequestParam[specificationType]]: {
									values:
										(data?.values ?? data.allowedValues).map((option: Option) =>
											typeof option === 'string' ? option : option.value
										) ?? [],
									...([
										SpecificationType.DECIMAL_NUMBER,
										SpecificationType.DECIMAL_NUMBER_IMPERIAL,
										SpecificationType.NUMBER,
									].includes(specificationType) && {
										isImperial: specificationType.includes('IMPERIAL'),
									}),
								},
							},
						};
					}
					return condition;
				})
				.filter((condition) => Object.keys(condition).length > 1),
			actions: formValues.actions ?? [],
			type: addonType,
			isActive: true,
			isVisibleOnDetail: formValues.isVisibleOnDetail,
		};

		const apiPromise = isEditMode
			? apiServiceInstance.put(`addons-api/Addons/${addon?.id}`, requestData)
			: apiServiceInstance.post(`addons-api/Addons`, requestData, true);

		apiPromise
			.then(() => {
				data.onSuccess?.();
				notificationsContext.handleShowSuccessNotification(
					isEditMode
						? `admin.createEditAddon.${addonType}.success.edit`
						: `admin.createEditAddon.${addonType}.success.create`
				);
				modalContext.handleCloseModal();
			})
			.catch(() => {
				notificationsContext.handleShowErrorNotification(
					isEditMode
						? `admin.createEditAddon.${addonType}.error`
						: `admin.createEditAddon.${addonType}.error`
				);
			});
	};

	const initialConditions: ConditionRequestWithType[] = useMemo(() => {
		const result: ConditionRequestWithType[] = [];

		addon?.conditions?.forEach((condition) => {
			if (
				condition.conditionType === ConditionType.ItemCategory &&
				'itemCategoryId' in condition
			) {
				result.push({
					operator: addon?.conditions?.[0].operator ?? Operator.None,
					itemCategoryConditionRequest: {
						itemCategoryId: condition.itemCategoryId,
					},
					conditionTypeSelect: 'itemCategoryConditionRequest',
				});
			}

			if (
				condition.conditionType === ConditionType.ItemCoupon &&
				'itemCouponId' in condition
			) {
				result.push({
					operator: addon?.conditions?.[0].operator ?? Operator.None,
					itemCouponConditionRequest: {
						itemCouponId: condition.itemCouponId,
					},
					conditionTypeSelect: 'itemCouponConditionRequest',
				});
			}

			if (
				condition.conditionType === ConditionType.ItemQuantity &&
				'itemId' in condition &&
				'minItemQuantity' in condition
			) {
				result.push({
					operator: addon?.conditions?.[0].operator ?? Operator.None,
					itemQuantityConditionRequest: {
						itemId: condition.itemId,
						minItemQuantity: condition.minItemQuantity,
					},
					conditionTypeSelect: 'itemQuantityConditionRequest',
				});
			}

			if (
				condition.conditionType === ConditionType.ItemSupplier &&
				'itemSupplierId' in condition
			) {
				result.push({
					operator: addon?.conditions?.[0].operator ?? Operator.None,
					itemSupplierConditionRequest: {
						itemSupplierId: condition.itemSupplierId,
					},
					conditionTypeSelect: 'itemSupplierConditionRequest',
				});
			}

			if (
				condition.conditionType === ConditionType.MinOrderPrice &&
				'minOrderPrice' in condition
			) {
				result.push({
					operator: addon?.conditions?.[0].operator ?? Operator.None,
					minOrderPriceConditionRequest: {
						minOrderPrice: condition.minOrderPrice,
					},
					conditionTypeSelect: 'minOrderPriceConditionRequest',
				});
			}

			if (
				condition.conditionType === ConditionType.ItemSpecification &&
				'specification' in condition
			) {
				result.push({
					operator: addon?.conditions?.[0].operator ?? Operator.None,
					itemSpecificationConditionRequest: {
						specificationId:
							condition.specification?.specificationDefinitionId ?? null,
						...(condition.specification ?? {}),
					},
					conditionTypeSelect: 'itemSpecificationConditionRequest',
				});
			}
		});

		return result;
	}, [addon?.conditions]);

	const initialActions: ActionRequest[] = useMemo(() => {
		return (addon?.actions ?? [])
			.map((action) => {
				if (
					action.actionType === ActionType.SetGift &&
					'itemId' in action &&
					'quantity' in action
				) {
					return {
						price: {
							value: action.price?.value,
							vat: action.price?.vat,
						} satisfies PriceRequest,
						setGiftActionRequest: {
							itemId: action.itemId,
							quantity: action.quantity,
						} satisfies SetGiftActionRequest,
						...('isSelectedByDefault' in action && {
							isSelectedByDefault: !!action.isSelectedByDefault,
						}),
						...('isVisibleOnDetail' in action && {
							isVisibleOnDetail: !!action.isVisibleOnDetail,
						}),
					} satisfies ActionRequest;
				}

				if (
					action.actionType === ActionType.SetDelivery &&
					'itemId' in action &&
					'quantity' in action
				) {
					return {
						price: {
							value: action.price?.value,
							vat: action.price?.vat,
						} satisfies PriceRequest,
						setDeliverActionRequest: {
							itemId: action.itemId,
							quantity: action.quantity,
						} satisfies SetDeliverActionRequest,
						...('isSelectedByDefault' in action && {
							isSelectedByDefault: !!action.isSelectedByDefault,
						}),
					} satisfies ActionRequest;
				}

				if (
					action.actionType === ActionType.SetService &&
					'itemId' in action &&
					'quantity' in action
				) {
					return {
						price: {
							value: action.price?.value,
							vat: action.price?.vat,
						} satisfies PriceRequest,
						setServiceActionRequest: {
							itemId: action.itemId,
							quantity: action.quantity,
						} satisfies SetServiceActionRequest,
						...('isSelectedByDefault' in action && {
							isSelectedByDefault: !!action.isSelectedByDefault,
						}),
					} satisfies ActionRequest;
				}

				if (
					action.actionType === ActionType.SetRelatedProduct &&
					'itemId' in action &&
					'quantity' in action
				) {
					return {
						setRelatedProductRequest: {
							itemId: action.itemId,
							quantity: action.quantity,
						} satisfies SetRelatedProductActionRequest,
					};
				}
			})
			.filter(Boolean) as ActionRequest[];
	}, [addon?.actions]);

	const initialValues: CreateEditAddonFormValues = useMemo(() => {
		if (isEditMode) {
			return {
				ruleName: addon?.name ?? '',
				description: addon?.description ?? '',
				availableOnPlatform: addon?.availableOnPlatform,
				validFrom: addon?.validFrom ? new Date(addon?.validFrom * 1000) : null,
				validTo: addon?.validTo ? new Date(addon?.validTo * 1000) : null,
				countries: [
					{
						value: addon?.countryOfSale ?? '',
						label: addon?.countryOfSale ?? '',
					},
				],
				conditions: initialConditions,
				actions: initialActions,
				isVisibleOnDetail: addon?.isVisibleOnDetail ?? false,
			};
		} else {
			return {
				ruleName: '',
				description: '',
				validFrom: null,
				validTo: null,
				countries: [],
				conditions: [
					{
						operator: Operator.And,
						conditionTypeSelect: undefined,
					},
				],
				actions: [
					...(addonType === AddonType.Gift ? [{ price: { value: 0 } }] : []),
					...(addonType === AddonType.RelatedProduct ? [{}] : []),
				],
				isVisibleOnDetail: false,
			};
		}
	}, [addon, addonType, isEditMode, initialActions, initialConditions]);

	const title = useMemo(() => {
		return isEditMode
			? t({
					id: `admin.createEditAddon.${addonType}.title.edit`,
			  })
			: t({
					id: `admin.createEditAddon.${addonType}.title.create`,
			  });
	}, [addonType, isEditMode, t]);

	if (isEditMode && !addon) {
		return null;
	}

	return (
		<Form<CreateEditAddonFormValues>
			onSubmit={handleSubmit}
			initialValues={initialValues}
			mutators={{
				...arrayMutators,
			}}
		>
			{({ handleSubmit: formSubmit }) => {
				return (
					<form
						onSubmit={formSubmit}
						className={styles.wrapper}
					>
						<h4 className="mb-4">{title}</h4>
						<Input
							name="ruleName"
							identifier="ruleName"
							label="admin.createEditAddon.name"
							validate={Validators.required}
						/>
						<InputTextArea
							name="description"
							identifier="description"
							label="admin.createEditAddon.description"
							rows={3}
							validate={Validators.required}
						/>
						<div className="d-flex gap-3">
							<InputDatePicker
								name="validFrom"
								identifier="validFrom"
								label="admin.createEditAddon.validFrom"
							/>
							<InputDatePicker
								name="validTo"
								identifier="validTo"
								label="admin.createEditAddon.validTo"
							/>
						</div>
						<InputMultiselect
							name="countries"
							identifier="countries"
							initialSelected={
								addon?.countryOfSale
									? [
											{
												value: addon?.countryOfSale,
												label: addon?.countryOfSale,
											},
									  ]
									: []
							}
							label="admin.createEditAddon.countries"
							options={Object.values(CountryCode).map((code) => ({
								value: code,
								label: code,
							}))}
						/>

						<PlatformSelect
							name="availableOnPlatform"
							identifier="availableOnPlatform"
							label="availableOnPlatform"
							validate={Validators.required}
						/>

						<hr />
						<h4 className="mt-4 mb-3">
							{t({ id: 'admin.createEditAddon.conditionBuilder.title' })}
						</h4>

						<ConditionBuilder
							initialConditions={initialConditions}
							allowedConditionTypes={[
								ConditionType.ItemSupplier,
								ConditionType.ItemSpecification,
								ConditionType.MinOrderPrice,
								ConditionType.ItemCategory,
								ConditionType.ItemCoupon,
								ConditionType.ItemQuantity,
							]}
						/>

						<hr />

						<h4 className="mt-4 mb-3">
							{t({ id: 'admin.createEditAddon.showProductService.title' })}
						</h4>

						{addonType === AddonType.Gift && (
							<GiftActions initialActions={initialActions} />
						)}
						{addonType === AddonType.RelatedProduct && (
							<RelatedProductActions initialActions={initialActions} />
						)}

						<InputCheckBox
							name="isVisibleOnDetail"
							identifier="isVisibleOnDetail"
							label="admin.createEditAddon.showProductService.isVisibleOnDetail"
						/>

						<button
							type="submit"
							className="btn btn-primary mt-4"
						>
							{t({
								id: isEditMode
									? `admin.createEditAddon.${addonType}.submit.edit`
									: `admin.createEditAddon.${addonType}.submit.create`,
							})}
						</button>
					</form>
				);
			}}
		</Form>
	);
};

export default CreateEditAddon;
