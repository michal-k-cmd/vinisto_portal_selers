import { FC } from 'react';

import { IIconProps } from './Interfaces';

const SearchIcon: FC<IIconProps> = ({ className }) => {
	return (
		<svg
			width={20.414}
			height={20.415}
			viewBox="0 0 20.414 20.415"
			className={className}
		>
			<g
				transform="translate(1 1)"
				fill="none"
				stroke="#280044"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
			>
				<circle
					cx={8}
					cy={8}
					r={8}
				/>
				<path d="m18 18-4.35-4.35" />
			</g>
		</svg>
	);
};

export default SearchIcon;
