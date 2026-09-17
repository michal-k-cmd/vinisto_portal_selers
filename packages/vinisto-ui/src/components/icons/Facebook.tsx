import { FC } from 'react';

import { IconProps } from './interfaces';

const FacebookIcon: FC<IconProps> = ({ className }) => {
	return (
		<svg
			width={12.5}
			height={18.2}
			viewBox="0 0 12.475 18.193"
			className={className}
		>
			<path
				d="M-22610.176,2724.233a11.512,11.512,0,0,1-6.687-2.105,11.636,11.636,0,0,0,5.1,1.988v-7.778h-2.721v-2.862h2.721v-1.9c0-3.008,1.414-4.533,4.2-4.533a15.706,15.706,0,0,1,2.234.132l.021,0v2.5h-1.8a1.285,1.285,0,0,0-1.182.677,3.183,3.183,0,0,0-.336,1.567v1.562h3.293l-.447,2.862h-2.846v7.782a11.669,11.669,0,0,0,3.727-1.141,11.457,11.457,0,0,1-1.551.649A11.653,11.653,0,0,1-22610.176,2724.233Z"
				transform="translate(22617.152 -2706.541)"
				fill="#4d4d4e"
				stroke="rgba(0,0,0,0)"
				strokeMiterlimit="10"
				strokeWidth="1"
			/>
		</svg>
	);
};

export default FacebookIcon;
