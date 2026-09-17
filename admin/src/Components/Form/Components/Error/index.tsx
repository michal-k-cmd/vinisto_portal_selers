import { useCallback, useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import { Validator } from 'Components/Form/interfaces';

import { ErrorProps } from './interfaces';

import './styles.css';

const InputError = ({
	show = false,
	errorMessage,
	touched = false,
}: ErrorProps) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const handleErrorMessage = useCallback(
		(errorMessage: ReturnType<Validator>) => {
			if (typeof errorMessage === 'string') return t({ id: errorMessage });
			if (typeof errorMessage == 'object' && 'id' in errorMessage) {
				const { id, ...values } = errorMessage;
				return t({ id }, { ...values });
			}
			return ' ';
		},
		[t]
	);

	return (
		<div className="input-error">
			{!!errorMessage && (show || touched) && handleErrorMessage(errorMessage)}
		</div>
	);
};

export default InputError;
