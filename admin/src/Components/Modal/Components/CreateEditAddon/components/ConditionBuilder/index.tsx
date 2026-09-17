import React, { useContext } from 'react';
import { useForm } from 'react-final-form';
import { LocalizationContext } from 'Services/LocalizationService';
import { FieldArray } from 'react-final-form-arrays';
import { InputSelect, Validators } from 'Components/Form';

import { CreateEditAddonFormValues } from '../../types';
import OperatorSwitcher from '../OperatorSwitcher';

import styles from './styles.module.css';
import ItemSupplier from './ItemSupplier';
import ItemSpecification from './ItemSpecification';
import MinOrderPrice from './MinOrderPrice';
import ItemCategory from './ItemCategory';
import ItemCoupon from './ItemCoupon';
import ItemQuantity from './ItemQuantity';
import { conditionTypesTranslationMap } from './constants';
import { getIsLastConditionEmpty } from './helpers';
import SalesDirection from './SalesDirection';
import ItemSpecificationDecimal from './ItemSpecificationDecimal';

import {
	ConditionRequest,
	ConditionType,
	Operator,
} from '@/api-types/addons-api';

const conditionTypeToField: Omit<
	Record<ConditionType, keyof ConditionRequest>,
	'None'
> = {
	[ConditionType.ItemSupplier]: 'itemSupplierConditionRequest',
	[ConditionType.ItemSpecification]: 'itemSpecificationConditionRequest',
	[ConditionType.MinOrderPrice]: 'minOrderPriceConditionRequest',
	[ConditionType.ItemCategory]: 'itemCategoryConditionRequest',
	[ConditionType.ItemCoupon]: 'itemCouponConditionRequest',
	[ConditionType.ItemQuantity]: 'itemQuantityConditionRequest',
	[ConditionType.SalesDirection]: 'salesDirectionConditionRequest',
	[ConditionType.ItemSpecificationDecimalNumber]:
		'itemSpecificationDecimalNumberConditionRequest',
	[ConditionType.MinProductPrice]: 'minProductPriceConditionRequest',
};

const conditionTypeToComponent: Record<
	string,
	React.FC<{ name: string; initialConditions: ConditionRequest }>
> = {
	[ConditionType.ItemSupplier]: ItemSupplier,
	[ConditionType.ItemSpecification]: ItemSpecification,
	[ConditionType.MinOrderPrice]: MinOrderPrice,
	[ConditionType.ItemCategory]: ItemCategory,
	[ConditionType.ItemCoupon]: ItemCoupon,
	[ConditionType.ItemQuantity]: ItemQuantity,
	[ConditionType.SalesDirection]: SalesDirection,
	[ConditionType.ItemSpecificationDecimalNumber]: ItemSpecificationDecimal,
};

interface ConditionBuilderProps {
	initialConditions: ConditionRequest[];
	allowedConditionTypes: Exclude<ConditionType, ConditionType.None>[];
}

const ConditionBuilder = ({
	initialConditions,
	allowedConditionTypes,
}: ConditionBuilderProps) => {
	const form = useForm<CreateEditAddonFormValues>();

	const isLastConditionEmpty = getIsLastConditionEmpty(form.getState().values);

	return (
		<FieldArray name="conditions">
			{({ fields }) => (
				<>
					<div className="mb-3">
						{fields.map((name, index) => {
							return (
								<div
									key={name}
									className="mb-3"
								>
									<ConditionBuilderItem
										initialConditions={initialConditions}
										allowedConditionTypes={allowedConditionTypes}
										index={index}
									/>
									<div className="mt-3 d-flex justify-content-between">
										<div>
											<OperatorSwitcher index={index} />
										</div>
										{(fields.length ?? 0) > 1 && (
											<button
												type="button"
												className={styles.button}
												onClick={() => fields.remove(index)}
											>
												Odstranit podmínku
											</button>
										)}
									</div>
								</div>
							);
						})}
					</div>
					{!isLastConditionEmpty && (
						<div className="d-flex justify-content-center">
							<button
								type="button"
								className={styles.button}
								onClick={() =>
									fields.push({
										operator:
											form.getState().values.conditions?.[0]?.operator ??
											Operator.And,
									})
								}
							>
								Přidat podmínku
							</button>
						</div>
					)}
				</>
			)}
		</FieldArray>
	);
};

export default ConditionBuilder;

interface ConditionBuilderItemProps {
	initialConditions: ConditionRequest[];
	index: number;
	allowedConditionTypes: ConditionType[];
}

export const conditionTypeToFieldMap: Record<
	Exclude<ConditionType, ConditionType.None>,
	keyof ConditionRequest
> = {
	[ConditionType.ItemSupplier]: 'itemSupplierConditionRequest',
	[ConditionType.ItemSpecification]: 'itemSpecificationConditionRequest',
	[ConditionType.MinOrderPrice]: 'minOrderPriceConditionRequest',
	[ConditionType.ItemCategory]: 'itemCategoryConditionRequest',
	[ConditionType.ItemCoupon]: 'itemCouponConditionRequest',
	[ConditionType.ItemQuantity]: 'itemQuantityConditionRequest',
	[ConditionType.SalesDirection]: 'salesDirectionConditionRequest',
	[ConditionType.ItemSpecificationDecimalNumber]:
		'itemSpecificationDecimalNumberConditionRequest',
	[ConditionType.MinProductPrice]: 'minProductPriceConditionRequest',
} as const;

const getType = (condition: ConditionRequest | undefined) => {
	if (condition == undefined) return null;
	if ('itemSupplierConditionRequest' in condition) {
		return ConditionType.ItemSupplier;
	}
	if ('itemSpecificationConditionRequest' in condition) {
		return ConditionType.ItemSpecification;
	}
	if ('minOrderPriceConditionRequest' in condition) {
		return ConditionType.MinOrderPrice;
	}
	if ('itemCategoryConditionRequest' in condition) {
		return ConditionType.ItemCategory;
	}
	if ('itemCouponConditionRequest' in condition) {
		return ConditionType.ItemCoupon;
	}
	if ('itemQuantityConditionRequest' in condition) {
		return ConditionType.ItemQuantity;
	}
	if ('salesDirectionConditionRequest' in condition) {
		return ConditionType.SalesDirection;
	}
	if ('itemSpecificationDecimalNumberConditionRequest' in condition) {
		return ConditionType.ItemSpecificationDecimalNumber;
	}
	if ('minProductPriceConditionRequest' in condition) {
		return ConditionType.MinProductPrice;
	}
	return ConditionType.None;
};

const ConditionBuilderItem = ({
	index,
	initialConditions,
	allowedConditionTypes,
}: ConditionBuilderItemProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const form = useForm<CreateEditAddonFormValues>();
	const type = getType(form.getState().values.conditions[index]);

	const allowedConditionTypeToFieldMap = Object.entries(
		conditionTypeToFieldMap
	).reduce((acc, [key, value]) => {
		if (allowedConditionTypes.includes(key as ConditionType)) {
			acc[key as ConditionType] = value;
		}
		return acc;
	}, {} as Record<ConditionType, keyof ConditionRequest>);

	const availableOptions = [
		...Object.values(allowedConditionTypeToFieldMap).map((conditionType) => ({
			value: conditionType,
			label: t({
				id: conditionTypesTranslationMap[
					conditionType as keyof typeof conditionTypesTranslationMap
				],
			}),
		})),
	];

	const ConditionComponent = type ? conditionTypeToComponent[type] : null;
	const fieldName =
		type && type !== ConditionType.None
			? conditionTypeToField[type]
			: undefined;

	return (
		<div className={styles.conditionRow}>
			<div>
				<label htmlFor="conditionType">
					{t({ id: 'admin.modal.createEditAddon.conditionType' })}
				</label>
				<InputSelect
					name={`conditions[${index}].conditionTypeSelect`}
					identifier={`conditions[${index}].conditionTypeSelect`}
					onChange={(val) => {
						const updatedValue =
							val as (typeof conditionTypeToFieldMap)[Exclude<
								ConditionType,
								ConditionType.None
							>];

						const selectedOperator =
							form.getState().values.conditions[index].operator;

						form.batch(() => {
							form.change(`conditions[${index}]`, undefined);
							form.change(`conditions[${index}][${updatedValue}]`, null);
							form.change(`conditions[${index}].operator`, selectedOperator);

							form.change(
								`conditions[${index}].conditionTypeSelect`,
								updatedValue
							);
						});
					}}
					options={availableOptions.map((option) => ({
						value: option.value,
						label: `${option.label}`,
					}))}
					validate={Validators.required}
				/>
			</div>

			<div className={styles.conditionValue}>
				{ConditionComponent && fieldName && (
					<ConditionComponent
						name={`conditions[${index}].${fieldName}`}
						initialConditions={initialConditions[index]}
					/>
				)}
			</div>
		</div>
	);
};
