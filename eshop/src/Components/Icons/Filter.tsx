import { FC } from 'react';

import { IIconProps } from './Interfaces';

const FilterIcon: FC<IIconProps> = ({ className, title = '', alt = '' }) => {
	return (
		<svg
			width={15}
			height={8.361}
			viewBox="0 0 15 8.361"
			className={className}
		>
			<title>{title}</title>
			<desc>{alt}</desc>
			<path
				d="M14 0a1 1 0 0 1 .681 1.735L7.5 8.361.322 1.735A1 1 0 0 1 1.031 0"
				fill="#280044"
			/>
		</svg>
	);
};

export default FilterIcon;
