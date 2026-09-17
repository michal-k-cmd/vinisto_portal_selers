import { FC } from 'react';

import { IconProps } from '../interfaces';

const AddToCardButtonMinus: FC<IconProps> = (props: IconProps) => {
	return (
		<svg
			width={18}
			height={2}
			viewBox="0 0 18 2"
			className={props.className}
		>
			<title>{props.title}</title>
			<desc>{props.alt}</desc>
			<path
				d="M1 1h16"
				fill="none"
				stroke={props.stroke || '#280044'}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
			/>
		</svg>
	);
};

export default AddToCardButtonMinus;
