import { FC } from 'react';

import { IIconProps } from './Interfaces';

const FilterCloseIcon: FC<IIconProps> = ({ className }) => {
	return (
		<svg
			width={11.314}
			height={11.314}
			viewBox="0 0 11.314 11.314"
			className={className}
		>
			<g
				fill="none"
				stroke="#440063"
				strokeLinecap="round"
				strokeWidth={3}
			>
				<path d="m2.122 2.121 7.07 7.071" />
				<path d="M9.193 2.121 2.122 9.192" />
			</g>
		</svg>
	);
};

export default FilterCloseIcon;
