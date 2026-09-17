import { InputSelect, Validators } from 'Components/Form';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { Option } from 'Components/Form/Components/Select/interfaces';
import { LocalizationContext } from 'Services/LocalizationService';
import { useContext } from 'react';

import { ActionRequest, UxActionType } from '@/api-types/addons-api';

const Actions = ({ initialActions }: { initialActions: ActionRequest[] }) => {
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
					</div>
				);
			}}
		</FieldArray>
	);
};

export default Actions;

interface ActionItemProps {
	name: string;
	onRemove: () => void;
	initialAction?: ActionRequest;
}

const ActionItem = ({ name }: ActionItemProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	const UX_ACTION_TYPES: Option<UxActionType>[] = Object.entries(
		UxActionType
	).map(([key, value]) => ({
		label: t({
			id: `admin.createEditDeliveryRuleAddon.uxAction.${key}`,
		}) as string,
		value: value as UxActionType,
	}));

	return (
		<Field
			name={`${name}.setUxActionRequest.uxAction`}
			subscription={{ value: true }}
		>
			{() => {
				return (
					<div className="mb-4">
						<InputSelect
							name={`${name}.setUxActionRequest.uxAction`}
							identifier={`${name}.setUxActionRequest.uxAction`}
							label="admin.createEditAddon.showProductService.itemId"
							validate={Validators.required}
							options={UX_ACTION_TYPES}
						/>
					</div>
				);
			}}
		</Field>
	);
};
