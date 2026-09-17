import { FC } from 'react';

import { IconProps } from './interfaces';

const SuccessSmallIcon: FC<IconProps> = ({ className, title, alt }) => {
	return (
		<svg
			width={50.553}
			height={50.553}
			viewBox="0 0 50.553 50.553"
			className={className}
		>
			{title != undefined && <title>{title}</title>}
			{alt != undefined && <desc>{alt}</desc>}
			<g transform="translate(-814.973 -410.447)">
				<circle
					cx={25.277}
					cy={25.277}
					r={25.277}
					transform="translate(814.973 410.447)"
					fill="#68a910"
				/>
				<path
					d="m852.16 423.653-16.289 16.3-7.526-7.526-3.919 3.919 11.445 11.443 20.21-20.214Z"
					fill="#fff"
				/>
			</g>
		</svg>
	);
};

export default SuccessSmallIcon;
