import { useContext, useMemo } from 'react';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { get } from 'Helpers/lodash';
import {
	Input,
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
} from '../CreateEditAddon/types';

import styles from './styles.module.css';
import Actions from './components/Actions';

import {
	ActionRequest,
	ActionType,
	AddonType,
	ConditionType,
	CountryCode,
	CreateAddonRequest,
	Currency,
	ItemSpecificationDecimalNumberConditionRequest,
	Operator,
	PriceRequest,
	SetUxActionRequest,
	UpdateAddonRequest,
	UxActionType,
	VatRate,
} from '@/api-types/addons-api';

export const CreateEditDeliveryRuleModal = () => {
	const modalContext = useContext(ModalContext);

	const { handleShowSuccessNotification, handleShowErrorNotification } =
		useContext(NotificationsContext);
	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();

	const data = modalContext.data as CreateEditAddonModalData;
	const addon = data.addon;
	const isEditMode = !!data.addonId;

	const handleSubmit = (formValues: CreateEditAddonFormValues) => {
		const countryOfSale = get(
			formValues,
			'countries[0].value',
			''
		) as CountryCode;
		const requestData: Partial<CreateAddonRequest | UpdateAddonRequest> = {
			name: get(formValues, 'ruleName', ''),
			description: get(formValues, 'description', ''),
			availableOnPlatform: formValues.availableOnPlatform,
			validFrom: formValues.validFrom
				? formValues.validFrom.getTime() / 1000
				: null,
			validTo: formValues.validTo ? formValues.validTo.getTime() / 1000 : null,
			countryOfSale: countryOfSale,
			currency: countryOfSale === CountryCode.CZ ? Currency.CZK : Currency.EUR,
			conditions: formValues.conditions
				.map((conditionWithTypeProperty) => {
					const { ...condition } = conditionWithTypeProperty;

					if (condition.itemSpecificationDecimalNumberConditionRequest) {
						const data = Array.isArray(
							condition.itemSpecificationDecimalNumberConditionRequest
						)
							? condition.itemSpecificationDecimalNumberConditionRequest[0]
							: condition.itemSpecificationDecimalNumberConditionRequest;
						return {
							operator: condition.operator,
							itemSpecificationDecimalNumberConditionRequest: {
								itemSpecificationId:
									data?.itemSpecificationId ?? data?.id ?? '',
								minValue: data?.minValue,
								maxValue: data?.maxValue,
							} satisfies ItemSpecificationDecimalNumberConditionRequest,
						};
					}
					return condition;
				})
				.filter((condition) => Object.keys(condition).length > 1),
			actions: get(formValues, 'actions', []),
			type: AddonType.Ux,
			isActive: true,
		};

		const apiPromise = isEditMode
			? apiServiceInstance.put(`addons-api/Addons/${addon?.id}`, requestData)
			: apiServiceInstance.post(`addons-api/Addons`, requestData, true);

		apiPromise
			.then(() => {
				data.onSuccess?.();
				handleShowSuccessNotification(
					isEditMode
						? 'admin.createEditAddon.Ux.success.edit'
						: 'admin.createEditAddon.Ux.success.create'
				);
				modalContext.handleCloseModal();
			})
			.catch(() => {
				handleShowErrorNotification(
					isEditMode
						? 'admin.createEditAddon.Ux.error'
						: 'admin.createEditAddon.Ux.error'
				);
			});
	};

	const initialConditions: ConditionRequestWithType[] = useMemo(() => {
		const result: ConditionRequestWithType[] = [];

		addon?.conditions?.forEach((condition) => {
			if (
				condition.conditionType === ConditionType.SalesDirection &&
				'originCountry' in condition &&
				'destinationCountry' in condition
			) {
				result.push({
					operator: addon?.conditions?.[0].operator ?? Operator.None,
					salesDirectionConditionRequest: {
						originCountry: condition.originCountry as CountryCode | undefined,
						destinationCountry: condition.destinationCountry as
							| CountryCode
							| undefined,
					},
					conditionTypeSelect: 'salesDirectionConditionRequest',
				});
			}

			if (
				condition.conditionType ===
					ConditionType.ItemSpecificationDecimalNumber &&
				'itemSpecificationId' in condition &&
				'minValue' in condition &&
				'maxValue' in condition
			) {
				result.push({
					operator: addon?.conditions?.[0].operator ?? Operator.None,
					itemSpecificationDecimalNumberConditionRequest: {
						itemSpecificationId:
							typeof condition.itemSpecificationId === 'string'
								? condition.itemSpecificationId
								: '',
						minValue:
							(condition as { minValue: number | undefined }).minValue ??
							undefined,
						maxValue:
							(condition as { maxValue: number | undefined }).maxValue ??
							undefined,
					} satisfies ItemSpecificationDecimalNumberConditionRequest,
					conditionTypeSelect: 'itemSpecificationDecimalNumberConditionRequest',
				});
			}
		});

		return result;
	}, [addon?.conditions]);

	const initialActions: ActionRequest[] = useMemo(() => {
		return (addon?.actions ?? [])
			.map((action) => {
				if (action.actionType === ActionType.SetUx) {
					return {
						price: {
							value: undefined,
							vat: VatRate.BaseVat,
						} satisfies PriceRequest,
						setUxActionRequest: {
							uxAction: UxActionType.DisableSlovakiaCompanyId,
						} satisfies SetUxActionRequest,
					} satisfies ActionRequest;
				}
			})
			.filter(Boolean) as ActionRequest[];
	}, [addon?.actions]);

	const initialValues: CreateEditAddonFormValues = useMemo(() => {
		if (isEditMode) {
			return {
				isVisibleOnDetail: addon?.isVisibleOnDetail ?? false,
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
			};
		} else {
			return {
				isVisibleOnDetail: false,
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
					{
						price: { value: undefined, vat: VatRate.BaseVat },
					} as ActionRequest,
				],
			};
		}
	}, [addon, isEditMode, initialActions, initialConditions]);

	const title = useMemo(() => {
		return isEditMode
			? t({ id: 'admin.createEditAddon.Ux.title.edit' })
			: t({ id: 'admin.createEditAddon.Ux.title.create' });
	}, [isEditMode, t]);

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
								ConditionType.SalesDirection,
								ConditionType.ItemSpecificationDecimalNumber,
							]}
						/>

						<hr />

						<h4 className="mt-4 mb-3">
							{t({
								id: 'admin.createEditDeliveryRule.showProductService.title',
							})}
						</h4>

						<Actions initialActions={initialActions} />

						<button
							type="submit"
							className="btn btn-primary mt-4"
						>
							{t({
								id: isEditMode
									? 'admin.createEditDeliveryRule.gift.submit.edit'
									: 'admin.createEditDeliveryRule.gift.submit.create',
							})}
						</button>
					</form>
				);
			}}
		</Form>
	);
};

export default CreateEditDeliveryRuleModal;
