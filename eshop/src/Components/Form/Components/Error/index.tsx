import * as React from 'react';
import { LocalizationContext } from 'Services/LocalizationService';

import { IErrorProps } from './interfaces';

import './styles.css';

/**
 * @category Component Input Error
 */
const InputError = (props: IErrorProps) => {
	const localizationContext = React.useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const showError = Boolean(props.showError);
	const hasErrorMessage = Boolean(props.errorMessage);
	const isTouched = Boolean(props.touched);

	const styles =
		hasErrorMessage && (isTouched || showError)
			? {
					backgroundColor: '#ff0000',
					padding: '0.5rem 0.6875rem',
			  }
			: {
					backgroundColor: 'transparent',
					padding: 0,
			  };

	if (hasErrorMessage) {
		return (
			<div
				className="input-error"
				style={styles}
			>
				{isTouched || showError
					? t({ id: `${props.errorMessage ?? ''}` })
					: null}
			</div>
		);
	}

	return <></>;
};

export default InputError;
