import { FC } from 'react';
import { CFormLabel } from '@coreui/react';
import cx from 'classnames';

import { LabelProps } from './interfaces';

import './styles.css';

const Label: FC<LabelProps> = ({
	htmlFor,
	className,
	isRequired,
	children,
}) => {
	return (
		<CFormLabel
			htmlFor={htmlFor}
			className={cx(
				'vinisto-label--semibold',
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
