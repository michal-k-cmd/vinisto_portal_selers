import { FC } from 'react';

import { IIconProps } from './Interfaces';

const SmallPlusIcon: FC<IIconProps> = ({ className }) => {
	return (
		<svg
			width={10}
			height={10}
			viewBox="0 0 10 10"
			className={className}
		>
			<g
				fill="none"
				stroke="#440063"
				strokeLinecap="round"
				strokeWidth={2}
			>
				<path d="M1 5h8" />
				<path d="M5 1v8" />
			</g>
		</svg>
	);
};

export default SmallPlusIcon;
