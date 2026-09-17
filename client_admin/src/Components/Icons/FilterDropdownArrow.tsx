import { FC } from 'react';

import { IconProps } from './interfaces';

const FilterDropdownArrowIcon: FC<IconProps> = ({ className, title, alt }) => {
	return (
		<svg
			width={15.825}
			height={8.683}
			viewBox="0 0 15.825 8.683"
			className={className}
		>
			{title != undefined && <title>{title}</title>}
			{alt != undefined && <desc>{alt}</desc>}
			<path
				d="m14.413 1.412-6.5 5.918-6.5-5.918"
				fill="none"
				stroke="#280044"
				strokeLinecap="round"
				strokeWidth={2}
			/>
		</svg>
	);
};

export default FilterDropdownArrowIcon;
