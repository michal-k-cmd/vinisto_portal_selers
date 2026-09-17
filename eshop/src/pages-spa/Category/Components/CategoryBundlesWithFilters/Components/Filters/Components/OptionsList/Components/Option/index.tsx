import * as React from 'react';
import cx from 'classnames';
import { get } from 'lodash-es';

import { IOptionProps } from './interfaces';

const Option: React.FC<IOptionProps> = (props): JSX.Element => {
	const type = get(props, 'type', 'checkbox');
	const prefix = get(props, 'prefix');
	const placeholder = get(props, 'placeholder', '');
	const suffix = get(props, 'suffix', '');
	const checked = get(props, 'checked', false);
	const onCheck = get(props, 'onCheck', () => {});
	const disabled = (!checked && get(props, 'disabled', false)) || !placeholder;

	return (
		<label className={cx('vinisto-popup__checkbox', { disabled: disabled })}>
			{prefix}
			{placeholder || '-'}
			<span className="color-primary">{suffix}</span>
			<input
				onChange={onCheck}
				type={type}
				checked={checked}
				disabled={disabled}
			/>
			<span
				className={`vinisto-popup__checkmark vinisto-popup__checkmark--${type}`}
			></span>
		</label>
	);
};

export default Option;
