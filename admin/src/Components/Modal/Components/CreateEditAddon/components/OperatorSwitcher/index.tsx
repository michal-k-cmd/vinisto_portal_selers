import { InputRadio } from 'Components/Form';
import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import { useForm } from 'react-final-form';

import { Operator } from '@/api-types/addons-api';

const OperatorSwitcher = ({ index }: { index: number }) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext?.useFormatMessage();
	const form = useForm();

	const operators = Object.values(Operator)
		.filter((op) => op != Operator.None)
		.map((op) => ({
			value: op,
			label: `admin.createEditAddon.conditionBuilder.operator.${op}`,
		}));

	if (index === 0) {
		return (
			<InputRadio
				className="d-flex gap-2"
				name={`conditions[${index}].operator`}
				options={operators}
				onChange={(operator: string) => {
					const { conditions } = form.getState().values;

					if (!conditions) {
						return;
					}

					form.batch(() => {
						conditions.forEach((_: unknown, i: number) => {
							form.change(`conditions[${i}].operator`, operator as Operator);
						});
					});
				}}
			/>
		);
	}

	const selectedOperator = form.getState().values.conditions[0].operator;

	return (
		<span>
			{t({
				id: `admin.createEditAddon.conditionBuilder.operator.${selectedOperator}`,
			})}
		</span>
	);
};

export default OperatorSwitcher;
