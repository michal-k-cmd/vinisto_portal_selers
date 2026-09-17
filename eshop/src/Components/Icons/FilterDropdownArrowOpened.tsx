import { FC } from 'react';

import { IIconProps } from './Interfaces';

const FilterDropdownArrowOpenedIcon: FC<IIconProps> = ({ className }) => {
	return (
		<svg
			width={15.825}
			height={8.683}
			viewBox="0 0 15.825 8.683"
			className={className}
		>
			<path
				d="m1.413 7.27 6.5-5.918 6.5 5.918"
				fill="none"
				stroke="#62072e"
				strokeLinecap="round"
				strokeWidth={2}
			/>
		</svg>
	);
};

export default FilterDropdownArrowOpenedIcon;
