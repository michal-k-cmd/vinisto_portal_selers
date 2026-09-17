import { FC } from 'react';

import { IIconProps } from './Interfaces';

const AddToCartButtonMinus: FC<IIconProps> = ({
	className,
	stroke,
	title = '',
	alt = '',
}) => {
	return (
		<svg
			width={12}
			height={2}
			viewBox="0 0 12 2"
			className={className}
		>
			<title>{title}</title>
			<desc>{alt}</desc>
			<path
				d="M1 1h12"
				fill="none"
				stroke={stroke || '#280044'}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
			/>
		</svg>
	);
};

export default AddToCartButtonMinus;
