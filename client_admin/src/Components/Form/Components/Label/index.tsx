import { FC } from 'react';
import { CFormLabel } from '@coreui/react';
import cx from 'classnames';

import { ILabelProps } from './interfaces';

import './styles.css';

const Label: FC<ILabelProps> = ({
	htmlFor,
	className,
	isRequired,
	children,
}) => {
	return (
		<CFormLabel
			htmlFor={htmlFor}
			className={cx(
				'vinisto-label',
				{
					'vinisto-label--required': !!isRequired,
				},
				className
			)}
		>
			{children}
		</CFormLabel>
	);
};

export default Label;
