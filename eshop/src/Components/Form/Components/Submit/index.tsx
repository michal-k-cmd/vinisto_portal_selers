import { useCallback, useContext } from 'react';
import { get } from 'lodash-es';
import { LocalizationContext } from 'Services/LocalizationService';

import { ISubmitButtonProps } from './interfaces';

const SubmitButton = (props: ISubmitButtonProps) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const submitting = get(props, 'submitting', false);
	const pristine = get(props, 'pristine', true);
	const valid = get(props, 'valid', false);

	const isSubmitButtonDisabled = useCallback((): boolean => {
		if (submitting) {
			return true;
		} else if (pristine) {
			return true;
		} else if (!valid) {
			return true;
		}

		return false;
	}, [submitting, pristine, valid]);

	return (
		<button
			className="vinisto-btn vinisto-bg vinisto-popup__btn vinisto-popup__btn--green"
			type="submit"
			style={{
				cursor: isSubmitButtonDisabled() ? 'not-allowed' : 'pointer',
			}}
			disabled={isSubmitButtonDisabled()}
			data-testid={props.dataTestid}
		>
			{t({ id: props.submitText })}
		</button>
	);
};

export default SubmitButton;
