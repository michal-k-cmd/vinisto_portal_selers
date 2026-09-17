import { FC } from 'react';

import { IIconProps } from './Interfaces';

const CloseIcon: FC<IIconProps> = ({
	id,
	className,
	title = '',
	alt = '',
	width = 15,
	height = 15,
}) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 15 15"
			className={className}
		>
			<title>{title}</title>
			<desc>{alt}</desc>
			<defs>
				<clipPath id={id}>
					<rect
						width="15"
						height="15"
						transform="translate(0 -0.374)"
						fill="#4d4d4e"
					/>
				</clipPath>
			</defs>
			<g
				transform="translate(0 0.374)"
				clipPath={`url(#${id})`}
			>
				<path
					d="M9.838,7.5l4.677-4.677A1.653,1.653,0,0,0,12.177.485L7.5,5.162,2.822.484A1.654,1.654,0,1,0,.484,2.823L5.161,7.5.484,12.177a1.653,1.653,0,1,0,2.338,2.338L7.5,9.838l4.677,4.677a1.653,1.653,0,0,0,2.338-2.338Z"
					fill="#4d4d4e"
				/>
			</g>
		</svg>
	);
};

export default CloseIcon;
