import { FC } from 'react';

import { IconProps } from './interfaces';

const XIcon: FC<IconProps> = ({ className }) => {
	return (
		<svg
			width={17.5}
			height={17.9}
			viewBox="0 0 17.493 17.877"
			className={className}
		>
			<path d="M10.411,7.57,16.923,0H15.38L9.725,6.573,5.209,0H0L6.829,9.939,0,17.877H1.543l5.971-6.941,4.769,6.941h5.209L10.41,7.57ZM8.3,10.027,7.6,9.037,2.1,1.162H4.47L8.913,7.517l.692.99,5.776,8.261H13.01L8.3,10.027Z" fill="#4d4d4e"/>
		</svg>
	);
};

export default XIcon;
