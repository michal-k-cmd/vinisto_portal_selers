import { FC } from 'react';

import { IIconProps } from './Interfaces';

const Warning: FC<IIconProps> = ({ className, fill, title = '', alt = '' }) => {
	return (
		<svg
			width="22.705"
			height="22"
			viewBox="0 0 22.705 22"
			className={className}
		>
			<title>{title}</title>
			<desc>{alt}</desc>
			<g transform="translate(-48 -417.572)">
				<path
					d="M11.824,0a2,2,0,0,1,1.743,1.019l3.206,5.7a2,2,0,0,1,0,1.961l-3.206,5.7A2,2,0,0,1,11.824,15.4H5.5a2,2,0,0,1-1.743-1.019L.552,8.681a2,2,0,0,1,0-1.961l3.206-5.7A2,2,0,0,1,5.5,0Z"
					transform="translate(48 426.235) rotate(-30)"
					fill={fill ?? '#ffb265'}
				/>
				<text
					transform="translate(57.549 432.615)"
					fill="#fff"
					fontSize="12"
					fontFamily="Ubuntu-Medium, Ubuntu"
					fontWeight="500"
				>
					<tspan
						x="0"
						y="0"
					>
						!
					</tspan>
				</text>
			</g>
		</svg>
	);
};

export default Warning;
