import { InputCheckBox, InputNumber, Validators } from 'Components/Form';
import { Field, useForm } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import useBundleById from 'Hooks/Queries/useBundleById';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import AutocompleteBundle from 'Components/Form/Components/AutocompleteBundle';
import useAutocompleteBundles from 'Hooks/useAutocompleteBundles';
import { isB2c } from 'Services/IntergationService/helpers';
import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';

import styles from './styles.module.css';

import { VinistoHelperDllEnumsPriceLevel } from '@/api-types/product-api';
import { ActionRequest } from '@/api-types/addons-api';
import { B2C_NUMERIC_CODE } from '@/shared';

const GiftActions = ({
	initialActions,
}: {
	initialActions: ActionRequest[];
}) => {
	return (
		<FieldArray name="actions">
			{({ fields }) => {
				return (
					<div>
						{fields.map((name, index) => {
							return (
								<ActionItem
									key={name}
									name={name}
									initialAction={initialActions?.[index]}
									onRemove={() => fields.remove(index)}
								/>
							);
						})}
						<div className="d-flex justify-content-center">
							<button
								className={styles.button}
								type="button"
								onClick={() => fields.push({ price: { value: 0 } })}
							>
								Přidat akci
							</button>
						</div>
					</div>
				);
			}}
		</FieldArray>
	);
};

export default GiftActions;

interface ActionItemProps {
	name: string;
	onRemove: () => void;
	initialAction?: ActionRequest;
}

const ActionItem = ({ name, onRemove, initialAction }: ActionItemProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	const form = useForm();
	const actions = form.getState().values.actions || [];

	const { autocompleteOptions, handleOnSearch } = useAutocompleteBundles({});
	const itemId = initialAction?.setGiftActionRequest?.itemId;

	const { data: initialBundle, isFetched } = useBundleById({
		bundleId: itemId ?? '',
	});

	const getLocalizedValue = useLocalizedValue();

	const isError = isFetched && !initialBundle;

	const selectedPlatform = form.getFieldState('availableOnPlatform')?.value;

	return (
		<Field
			name={`${name}.setGiftActionRequest.itemId`}
			subscription={{ value: true }}
		>
			{() => {
				return (
					<div className="mb-4">
						<AutocompleteBundle
							placeholder={
								isError
									? 'error.bundleNotFound'
									: getLocalizedValue(initialBundle?.name)
							}
							labelKey="label"
							defaultInputValue={
								isError
									? 'error.bundleNotFound'
									: getLocalizedValue(initialBundle?.name)
							}
							name={`${name}.setGiftActionRequest.itemId`}
							identifier={`${name}.setGiftActionRequest.itemId`}
							onSearchCallback={(val) =>
								handleOnSearch(
									val,
									{
										isGift: true,
									},
									selectedPlatform ?? B2C_NUMERIC_CODE
								)
							}
							options={autocompleteOptions}
							validate={Validators.required}
							onChange={(options) => {
								const bundleId = options[0]?.value;
								const bundleVat =
									options[0]?.bundle?.prices.find(
										(price) =>
											price.level === VinistoHelperDllEnumsPriceLevel.Level1 &&
											price.platformId &&
											isB2c(price.platformId)
									)?.vat ?? 'NoVat';
								form.change(`${name}.setGiftActionRequest.itemId`, bundleId);
								form.change(`${name}.price.vat`, bundleVat);
							}}
						/>
						<div className="d-flex gap-3">
							<InputNumber
								name={`${name}.price.value`}
								identifier={`${name}.price.value`}
								label="admin.createEditAddon.showProductService.price"
							/>
							<InputNumber
								name={`${name}.setGiftActionRequest.quantity`}
								identifier={`${name}.setGiftActionRequest.quantity`}
								label="admin.createEditAddon.showProductService.quantity"
								validate={Validators.required}
							/>
						</div>
						<div className="d-flex justify-content-between gap-3 align-items-start">
							<InputCheckBox
								name={`${name}.isSelectedByDefault`}
								identifier={`${name}.isSelectedByDefault`}
								label="admin.createEditAddon.showProductService.isSelectedByDefault"
							/>
							{actions.length > 1 && (
								<button
									type="button"
									onClick={onRemove}
									className={styles.button}
								>
									{t({
										id: 'admin.createEditAddon.showProductService.removeAction',
									})}
								</button>
							)}
						</div>
					</div>
				);
			}}
		</Field>
	);
};
