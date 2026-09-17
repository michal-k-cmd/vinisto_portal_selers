import { FC } from 'react';

import { IIconProps } from './Interfaces';

const EnvelopeIcon: FC<IIconProps> = ({ className }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="21.2"
			height="15.199"
			viewBox="0 0 21.2 15.199"
			fill="currentColor"
			stroke="currentColor"
			className={className}
		>
			<g transform="translate(0.05 0.05)">
				<path
					d="M10.229,9.379,3.224,2.3H19.776L12.77,9.38h0a1.775,1.775,0,0,1-2.54,0ZM20.154.95H2.846A1.913,1.913,0,0,0,.95,2.875v11.25a1.913,1.913,0,0,0,1.9,1.925H20.154a1.913,1.913,0,0,0,1.9-1.925V2.875A1.912,1.912,0,0,0,20.154.95ZM7.477,8.5l-5.2,5.246V3.252Zm7.1.953,5.2,5.244H3.225l5.2-5.244.869.878a3.092,3.092,0,0,0,4.421,0Zm.943-.953,5.2-5.251v10.5Z"
					transform="translate(-0.95 -0.95)"
					strokeWidth="0.1"
				/>
			</g>
		</svg>
	);
};

export default EnvelopeIcon;
