import { FC } from 'react';

import { IconProps } from './interfaces';

const ArrowDownIcon: FC<IconProps> = ({ className, title, alt }) => {
	return (
		<svg
			width={21.5}
			height={11.224}
			viewBox="0 0 21.5 11.224"
			className={className}
		>
			{title != undefined && <title>{title}</title>}
			{alt != undefined && <desc>{alt}</desc>}
			<path
				d="M304.3,77.014l-9.528,9.528a.667.667,0,0,1-.944,0L284.3,77.014Z"
				transform="translate(-283.553 -76.264)"
				fill="#fff"
				stroke="#fff"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.5"
			/>
		</svg>
	);
};

export default ArrowDownIcon;
