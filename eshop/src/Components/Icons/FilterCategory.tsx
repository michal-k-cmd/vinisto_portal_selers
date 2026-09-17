import { FC } from 'react';

import { IIconProps } from './Interfaces';

const FilterCategoryIcon: FC<IIconProps> = ({ className }) => {
	return (
		<svg
			width={17.5}
			height={16}
			viewBox="0 0 17.5 16"
			className={className}
		>
			<g>
				<path d="M3.9,1.5C3.7,0.6,2.9,0,2,0C0.9,0,0,0.9,0,2s0.9,2,2,2c0.9,0,1.7-0.6,1.9-1.5l13.6-0.1v-1L3.9,1.5z" />
				<path d="M13,6c-0.9,0-1.7,0.6-1.9,1.5H0v1h11.1c0.2,0.9,1,1.5,1.9,1.5s1.7-0.6,1.9-1.5h2.6v-1h-2.6 C14.7,6.6,13.9,6,13,6z" />
				<path d="M6,12c-0.9,0-1.7,0.6-1.9,1.5H0v1h4.1C4.3,15.4,5.1,16,6,16s1.7-0.6,1.9-1.5h9.6v-1H7.9C7.7,12.6,6.9,12,6,12z" />
			</g>
		</svg>
	);
};

export default FilterCategoryIcon;
