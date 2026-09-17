import { FC } from 'react';

import { IIconProps } from './Interfaces';

const BottleTimesIcon: FC<IIconProps> = ({
	className,
	fill,
	title = '',
	alt = '',
}) => {
	return (
		<svg
			width={12.095}
			height={15.118}
			viewBox="0 0 12.095 15.118"
			className={className}
		>
			<title>{title}</title>
			<desc>{alt}</desc>
			<path
				d="M1.842,15.118c-.441,0-.882,0-1.322,0-.4,0-.517-.11-.518-.491q0-4.258,0-8.516A2.79,2.79,0,0,1,.8,4.148a1.3,1.3,0,0,0,.394-.956c-.02-.854-.033-1.708-.067-2.561C1.1.143,1.217,0,1.7,0h.367c.487,0,.617.193.593.689-.044.889-.069,1.781-.043,2.67a1.3,1.3,0,0,0,.344.741,3.163,3.163,0,0,1,.82,2.178q0,4.111,0,8.223c0,.535-.083.616-.614.617H1.842"
				transform="translate(0 0)"
				fill={fill || '#280044'}
			/>
			<g transform="translate(7.559 5.292)">
				<path
					d="M2.974,2.267,4.389.853A.5.5,0,0,0,3.682.146L2.267,1.56.853.146A.5.5,0,0,0,.146.853L1.56,2.267.146,3.682a.5.5,0,1,0,.707.707L2.267,2.974,3.682,4.389a.5.5,0,0,0,.707-.707Z"
					transform="translate(0.001 0.001)"
					fill={fill || '#280044'}
				/>
				<rect
					width="4.246"
					height="4.246"
					transform="translate(0.145 0.145)"
					fill="none"
				/>
			</g>
		</svg>
	);
};

export default BottleTimesIcon;
