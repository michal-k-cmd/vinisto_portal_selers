import { isValidElement, ReactNode, useContext, useMemo } from 'react';
import { Field } from 'react-final-form';
import { get, uniqueId } from 'lodash-es';
import { LocalizationContext } from 'Services/LocalizationService';

import InputError from '../Error';

import { ICheckBoxProps } from './interfaces';
import { FIELD_TYPE } from './constants';

const InputCheckBox = (props: ICheckBoxProps) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const fieldId = useMemo(() => get(props, 'identifier', uniqueId()), []);
	const showError = get(props, 'showError', false);

	const isReactNode = (item: any): item is ReactNode => isValidElement(item);
	const labelText = useMemo(
		() =>
			isReactNode(props.label)
				? get(props, 'label', '')
				: get(props, 'label', false)
				? t({ id: `${get(props, 'label', '')}` })
				: '',
		[get(props, 'label')]
	);

	return (
		<Field
			name={props.name}
			type={FIELD_TYPE}
		>
			{(fieldPropTypes) => {
				const { input, meta } = fieldPropTypes;

				return (
					<label
						className="vinisto-popup__checkbox"
						htmlFor={fieldId}
					>
						{labelText}
						<input
							id={fieldId}
							{...input}
							type={FIELD_TYPE}
							onClick={props.onClick}
							data-testid={props.dataTestid}
						/>

						<span className="vinisto-popup__checkmark"></span>
						{get(props, 'isErrorVisible', true) && (
							<InputError
								errorMessage={get(meta, 'error')}
								touched={get(meta, 'touched', false)}
								showError={showError}
							/>
						)}
					</label>
				);
			}}
		</Field>
	);
};

export default InputCheckBox;
