import { FC } from 'react';
import { get } from 'Helpers/lodash';
import { InputNumber } from 'Components/Form';
import {
	TYPE_DECIMAL_NUMBER_IMPERIAL,
	TYPE_NUMBER_IMPERIAL,
} from 'Services/Specification/constants';

const NumberForm: FC<Record<any, any>> = (props) => {
	const specification = get(props, 'specification', {});

	return (
		<>
			<InputNumber
				identifier="numberValue"
				name="numberValue"
				label="admin.modal.form.numberValue"
			/>
			{(get(
				specification,
				'specificationType',
				get(specification, 'definition.specificationType')
			) === TYPE_NUMBER_IMPERIAL ||
				get(
					specification,
					'specificationType',
					get(specification, 'definition.specificationType')
				) === TYPE_DECIMAL_NUMBER_IMPERIAL) && (
				<InputNumber
					identifier="imperialNumberValue"
					name="imperialNumberValue"
					label="admin.modal.form.imperialNumberValue"
				/>
			)}
		</>
	);
};

export default NumberForm;
