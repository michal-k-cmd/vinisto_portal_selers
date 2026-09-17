import { FC } from 'react';

import { IIconProps } from './Interfaces';

const OkayRedIcon: FC<IIconProps> = ({ className }) => {
	return (
		<svg
			width={16.809}
			height={13.763}
			viewBox="0 0 16.809 13.763"
			className={className}
		>
			<path
				d="M1.748 7.025s1.162 6.277 4.412 5.036 8.588-10 8.588-10"
				fill="none"
				stroke="#9e163c"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={3}
			/>
		</svg>
	);
};

export default OkayRedIcon;
