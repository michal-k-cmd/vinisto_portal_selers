import { FC, useContext } from 'react';
import cx from 'classnames';
import { includes } from 'lodash-es';
import { LocalizationContext } from 'Services/LocalizationService';

import { IErrorProps } from './interfaces';

import './styles.css';

/**
 * @category Component Input Error
 */
const InputError: FC<IErrorProps> = ({
	show = false,
	errorMessage,
	touched = false,
}) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	return (
		<div
			className={cx('input-error mt-1 mb-2', {
				warning: includes(errorMessage, 'validation.warning.'),
			})}
		>
			{!!errorMessage && (show || touched) ? t({ id: errorMessage }) : null}
		</div>
	);
};

export default InputError;
