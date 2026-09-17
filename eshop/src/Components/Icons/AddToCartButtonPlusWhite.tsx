import { FC } from 'react';

import { IIconProps } from './Interfaces';

const AddToCartButtonPlusWhite: FC<IIconProps> = ({ className, alt = '' }) => {
	return (
		<svg
			width={14}
			height={14}
			viewBox="0 0 14 14"
			className={className}
		>
			<desc>{alt}</desc>
			<g
				fill="none"
				stroke="#ffffff"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
			>
				<path d="M1 7h12" />
				<path d="M7 13V1" />
			</g>
		</svg>
	);
};

export default AddToCartButtonPlusWhite;
