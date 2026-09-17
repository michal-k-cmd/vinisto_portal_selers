import { FC } from 'react';

import { IIconProps } from './Interfaces';

const PlusIcon: FC<IIconProps> = ({ className }) => {
	return (
		<svg
			width={12}
			height={12}
			viewBox="0 0 12 12"
			className={className}
		>
			<g transform="translate(1 1)">
				<line
					x2="10"
					transform="translate(0 5)"
					fill="none"
					stroke="#4d4d4e"
					strokeLinecap="round"
					strokeWidth="2"
				/>
				<line
					y1="10"
					transform="translate(5)"
					fill="none"
					stroke="#4d4d4e"
					strokeLinecap="round"
					strokeWidth="2"
				/>
			</g>
		</svg>
	);
};

export default PlusIcon;
