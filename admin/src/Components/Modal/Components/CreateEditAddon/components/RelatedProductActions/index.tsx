import { InputNumber, Validators } from 'Components/Form';
import { Field, useForm } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import useBundleById from 'Hooks/Queries/useBundleById';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import AutocompleteBundle from 'Components/Form/Components/AutocompleteBundle';
import useAutocompleteBundles from 'Hooks/useAutocompleteBundles';
import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';

import styles from './styles.module.css';

import { ActionRequest } from '@/api-types/addons-api';
import { B2C_NUMERIC_CODE } from '@/shared';

const RelatedProductActions = ({
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
								onClick={() => fields.push({})}
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

export default RelatedProductActions;

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
	const itemId = initialAction?.setRelatedProductRequest?.itemId;

	const { data: initialBundle, isFetched } = useBundleById({
		bundleId: itemId ?? '',
	});

	const getLocalizedValue = useLocalizedValue();

	const isError = isFetched && !initialBundle;

	const selectedPlatform = form.getFieldState('availableOnPlatform')?.value;

	return (
		<Field
			name={`${name}.setRelatedProductRequest.itemId`}
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
							name={`${name}.setRelatedProductRequest.itemId`}
							identifier={`${name}.setRelatedProductRequest.itemId`}
							onSearchCallback={(val) =>
								handleOnSearch(val, {}, selectedPlatform ?? B2C_NUMERIC_CODE)
							}
							options={autocompleteOptions}
							validate={Validators.required}
							onChange={(options) => {
								const bundleId = options[0]?.value;
								form.change(
									`${name}.setRelatedProductRequest.itemId`,
									bundleId
								);
							}}
						/>
						<div className="d-flex gap-3">
							<InputNumber
								name={`${name}.setRelatedProductRequest.quantity`}
								identifier={`${name}.setRelatedProductRequest.quantity`}
								label="admin.createEditAddon.showProductService.quantity"
								validate={Validators.required}
							/>
						</div>
						<div className="d-flex justify-content-between gap-3 align-items-start">
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
