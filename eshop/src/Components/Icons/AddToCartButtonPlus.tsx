import { FC } from 'react';

import { IIconProps } from './Interfaces';

const AddToCartButtonPlus: FC<IIconProps> = ({
	className,
	title = '',
	alt = '',
}) => {
	return (
		<svg
			width={18}
			height={18}
			viewBox="0 0 18 18"
			className={className}
		>
			<title>{title}</title>
			<desc>{alt}</desc>
			<g
				fill="none"
				stroke="#280044"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
			>
				<path d="M1 9h16" />
				<path d="M9 17V1" />
			</g>
		</svg>
	);
};

export default AddToCartButtonPlus;
