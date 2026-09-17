import { FC } from 'react';

import { IconProps } from '../interfaces';

const AddToCartButtonPlusWhite: FC<IconProps> = (props: IconProps) => {
	return (
		<svg
			width={18}
			height={18}
			viewBox="0 0 18 18"
			className={props.className}
		>
			<title>{props.title}</title>
			<desc>{props.alt}</desc>
			<g
				fill="none"
				stroke="#ffffff"
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

export default AddToCartButtonPlusWhite;
